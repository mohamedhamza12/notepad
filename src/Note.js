import React from 'react';
import { useState } from 'react/cjs/react.development';
import './Note.css';
import { apiUrl } from './strings';

const Note = ({ noteData, updateAndClose }) => {
    const [_title, setTitle] = useState(noteData.title);
    const [_body, setBody] = useState(noteData.body);
    return (
        <div className="note-card-wrapper"
            onClick={e => {
                if (e.target.closest('.note-card') === null) {
                    updateAndClose();
                }
            }}>
            <div className="note-card">
                <input id="note-title" type="text" value={_title} onChange={e => setTitle(e.target.value)} />
                <textarea id="note-body" value={_body} onChange={e => { console.log('changed'); setBody(e.target.value) }} />
                <div className="note-bottom-buttons">
                    <button className="notepad-button primary-button" disabled={!_title && !_body} onClick={() => {
                        if (noteData.id) {
                            fetch(`${apiUrl}/notes/${noteData.id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id: noteData.id,
                                    title: _title,
                                    body: _body
                                })
                            })
                                .then(res => res.json())
                                .then(data => updateAndClose(data));
                        } else {
                            fetch(`${apiUrl}/notes`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    title: _title,
                                    body: _body
                                })
                            })
                                .then(res => res.json())
                                .then(data => updateAndClose(data));
                        }
                    }
                    }>Save</button>
                    <button className="notepad-button danger-button" onClick={() => updateAndClose()}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Note;