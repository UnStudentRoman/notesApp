"use client";

import React, {useState, useEffect} from 'react'
import styles from './NotesListPage.module.css'

const NotesListPage = () => {

    let [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/notes/');
        const data = await res.json();
        setNotes((currentNotes) => currentNotes = data)
    }
    
  return (
    <div>
        <div className={styles.notes_list}>
            {notes.map((note, index) => (
                <h3 key={note.id}>{note.body}</h3>
            ))}
        </div>
    </div>
  )
}

export default NotesListPage
