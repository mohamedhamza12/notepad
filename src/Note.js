import React from 'react';
import './Note.css';

const Note = ({ title, body }) => {
    return (
        <div className="note-card-wrapper">
            <div className="note-card">
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        </div>
    );
};

export default Note;