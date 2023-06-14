
import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'

const NotesListPage = () => {

    let [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async () => {
        const res = await fetch('http://localhost:8000/api/notes/');
        const data = await res.json();
        setNotes((currentNotes) => currentNotes = data)
    }
    
  return (
    <div>
        <div className='notes-list'>
            {notes.map((note, index) => (
                <ListItem key={index} note={note} />
            ))}
        </div>
    </div>
  )
}

export default NotesListPage
