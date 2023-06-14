import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

const NotePage = () => {

    const noteId = useParams().id;
    const [note, setNote] = useState(null);

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        const res = await fetch(`http://localhost:8000/api/notes/${noteId}`);
        const data = await res.json();
        setNote(data);
    }

    return (
        <div>
        <h2>{note?.body}</h2>
        </div>
    )
    }

export default NotePage
