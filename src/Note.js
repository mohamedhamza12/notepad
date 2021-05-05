import React from 'react';
import './Note.css';

const Note = ({ title, body, setOpenNoteState }) => {
    return (
        <div className="note-card-wrapper"
            onClick={e => {
                if (e.target.className !== "note-card") {
                    setOpenNoteState(null);
                }
            }}>
            <div className="note-card">
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        </div>
    );
};

export default Note;