from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import Note
from .serializers import NoteSerializer
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
import json
# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = [
            {
                'Endpoint': '/notes/',
                'method': 'GET',
                'body': None,
                'description': 'Returns an array of notes'
            },
            {
                'Endpoint': '/notes/id',
                'method': 'GET',
                'body': None,
                'description': 'Returns a single note object'
            },
            {
                'Endpoint': '/notes/create/',
                'method': 'POST',
                'body': {'body': ""},
                'description': 'Creates new note with data sent in post request'
            },
            {
                'Endpoint': '/notes/id/update/',
                'method': 'PUT',
                'body': {'body': ""},
                'description': 'Creates an existing note with data sent in post request'
            },
            {
                'Endpoint': '/notes/id/delete/',
                'method': 'DELETE',
                'body': None,
                'description': 'Deletes and exiting note'
            },
        ]
    return Response(routes)




# ---------------------------------- REGISTER ---------------------------------- #

@api_view(['POST'])
def registerUser(request):
    # print(request.data)
    newUser = request.data['username']
    newMail = request.data['email']
    newPasswd = request.data['password']
    try:
        newUser = User.objects.get(username=newUser)
        if newUser:
            response = {'response': 'User already exists.'}
            return HttpResponseBadRequest(json.dumps(response), headers={"Content-Type": "application/json"})

    except User.DoesNotExist:
        newUser = User.objects.create_user(username=newUser, email=newMail, password=newPasswd)
        newUser.save()
        return JsonResponse({'response':'Success'})

# ---------------------------------- END REGISTER ---------------------------------- #



# ---------------------------------- LOGIN ---------------------------------- #

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# ---------------------------------- END LOGIN ---------------------------------- #




@api_view(['GET'])
@login_required
def getNotes(request):
    notes = Note.objects.filter(user=request.user).order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@login_required
def createNote(request):
    newNote = request.data
    note = Note.objects.create(
        body=newNote['body'],
        user=request.user
    )
    serializer = NoteSerializer(note, many=False)

    return Response()


@api_view(['GET'])
def getNote(request, pk):
    try:
        notes = Note.objects.get(id=pk)
        if request.user != notes.user:
            return JsonResponse({'response':'Unauthorized'})
        
    except ObjectDoesNotExist:
        return JsonResponse({'response':'Unauthorized'})

    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)


# ---------------------------------- MODIFY ---------------------------------- #

@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)

    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# ---------------------------------- MODIFY END ---------------------------------- #


# ---------------------------------- DELETE ---------------------------------- #

@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()

    return Response('Note was deleted.')

# ---------------------------------- END DELETE ---------------------------------- #

