import { faCircleNotch, faPlus, faSyncAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './NotesList.css';
import { apiUrl } from './strings';
import Note from './Note';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState(new Set());
    const [refreshNotes, setRefreshNotes] = useState(true);
    const [openedNote, setOpenedNote] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (refreshNotes) {
            fetch(`${apiUrl}/notes`)
                .then(res => res.json())
                .then(data => setNotes(data))
                .finally(() => setRefreshNotes(false));
        }

    }, [refreshNotes]);

    const updateAndClose = (data) => {
        setOpenedNote(null);
        if (data)
            setRefreshNotes(true);
    }

    return (
        <>
            <div className="notes-list-container">
                <button className="float-left notepad-button primary-button" 
                onClick={() => {
                    const newNote = {
                        "title": '',
                        "body": ''
                    };
                    setOpenedNote(newNote);
                }}>
                    <FontAwesomeIcon icon={faPlus} /> New Note
                    </button>
                <div className="align-right">
                    {selectedNotes.size ?
                        <button className="notepad-button danger-button"
                            onClick={() => {
                                setLoading(true);
                                let fetches = [];
                                for (const id of selectedNotes) {
                                    fetches.push(
                                        fetch(`${apiUrl}/notes/${id}`, {
                                            method: 'DELETE'
                                        })
                                    );
                                }
                                Promise.all(fetches).then(() => {
                                    setRefreshNotes(true);
                                    setSelectedNotes(new Set());
                                    setLoading(false);
                                })
                            }}>Delete Selected</button> :
                        null}
                    <button className="icon-button" onClick={() => setRefreshNotes(true)}>
                        <FontAwesomeIcon icon={faSyncAlt} color="white" spin={refreshNotes} />
                    </button>
                </div>
                <div className="clear"></div>
                <div className="notes-list">
                    {
                        notes.map((note, i) =>
                            <div className="note-row" key={i}
                                onClick={e => {
                                    if (e.target.closest('[type="checkbox"]'))
                                        return;
                                    if (e.target.closest('#delete-note-button')) {
                                        fetch(`${apiUrl}/notes/${note.id}`, {
                                            method: 'DELETE'
                                        }).then(() => setRefreshNotes(true));
                                    } else {
                                        setOpenedNote(note);
                                    }
                                }}>
                                <input id={`selected-note-${i}`} type="checkbox" checked={selectedNotes.has(note.id)} onChange={e => {
                                    const selectedNotesCopy = new Set(selectedNotes);
                                    if (selectedNotesCopy.has(note.id))
                                        selectedNotesCopy.delete(note.id);
                                    else
                                        selectedNotesCopy.add(note.id);

                                    setSelectedNotes(selectedNotesCopy);
                                }} />
                                <span>{note.title ? note.title : "<Untitled>"}</span>
                                <button id="delete-note-button" className="icon-button end-button">
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                </button>
                            </div>)
                    }
                </div>
            </div>
            {
                openedNote ? <Note noteData={openedNote} updateAndClose={updateAndClose} /> : null
            }
            {
                loading ?
                    <div className="loading-container">
                        <FontAwesomeIcon icon={faCircleNotch} spin={true} size="3x" color="white" />
                    </div> :
                    null
            }
        </>
    );
};

export default NotesList;