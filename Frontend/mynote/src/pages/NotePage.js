import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as DeleteButton } from '../assets/delete.svg'

const NotePage = () => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const noteId = useParams().id;
    const navigation = useNavigate()
    const [note, setNote] = useState('');

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        if (noteId !== 'new') {
            const res = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}` 
                },
            });
            const data = await res.json();
            const checkUnauthorized = {data}.data.response

            checkUnauthorized === 'Unauthorized' ? navigation('/') : setNote(data);

            
        } else return

    }


    // Update action
    let updateNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/${noteId}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })

    }


    let handleSubmit = async () => {
        if (noteId !== 'new' && note.body === "") {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote();
        } else if (noteId === 'new' && note.body !== null) {
            createNote();
        } else if (noteId === 'new' && note.body === null) {
            navigation('/');
        }

        navigation('/');
    } 


    // Update action
    let createNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}` 
            },
            body: JSON.stringify(note)
        })
    }

    let handleCreate = async () => {
        createNote();
        navigation('/');
    }


    // Delete action
    let deleteNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/${noteId}/delete/`, {
            method: "DELETE",
        })
    }

    let handleDelete = async () => {
        deleteNote();
        navigation('/');
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {noteId !== 'new' ? (
                    <h3>
                        <DeleteButton onClick={handleDelete} />
                    </h3>
                ) : (
                    <h3>
                        <button onClick={handleCreate}>Done</button>
                    </h3>
                )}

            </div>
                <textarea onChange={(currentNote) => {setNote({...note, 'body': currentNote.target.value })}} value={note?.body}></textarea>
        </div>
    )
    }

    // The ? from {note?.body} is used to let the note content load from the getNote async function before rendering it.
    // Otherwise it will give an error.

export default NotePage
