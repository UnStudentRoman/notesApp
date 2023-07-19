
import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import { useNavigate } from 'react-router-dom'

const NotesListPage = () => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const navigation = useNavigate()

    let [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/notes/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}` 
                },
            });
            if (res.ok) {
                const data = await res.json();
                setNotes((currentNotes) => currentNotes = data);
            } else {
                navigation('/login');
            }

        } catch (err) {
            console.log(err);
            navigation('/login');
        }
    }
    
  return (
    <div className='notes'>
        <div className='notes-header'>
            <h2 className='notes-title'>&#9782; Notes</h2>
            <p className='notes-count'>{notes.length}</p>
        </div>

        <div className='notes-list'>
            {notes.map((note, index) => (
                <ListItem key={index} note={note} />
            ))}
        </div>
        <AddButton />
    </div>
  )
}

export default NotesListPage
