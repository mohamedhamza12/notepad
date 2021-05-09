import React from 'react';
import { useState } from 'react/cjs/react.development';
import './Note.css';

const Note = ({ title, body, setOpenNoteState }) => {
    const [_title, setTitle] = useState(title);
    const [_body, setBody] = useState(body);
    return (
        <div className="note-card-wrapper"
            onClick={e => {
                if (e.target.closest('.note-card') === null) {
                    setOpenNoteState(null);
                }
            }}>
            <div className="note-card">
                <input id="note-title" type="text" value={_title} onChange={e => setTitle(e.target.value)} />
                <textarea id="note-body" value={_body} onChange={e => setBody(e.target.value)} />
            </div>
        </div>
    );
};

export default Note;