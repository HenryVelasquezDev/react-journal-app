import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/authAction';
import { startNewNote } from '../../actions/notesAction';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();

    const state = useSelector( state => state );

    const {name: displayName } = state.auth 

    const handleLogout = () => {
        dispatch ( startLogout() );
    }

    const handleAddNewEntry = ()=>{
        dispatch( startNewNote() );
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="fa fa-moon"></i>
                    <span> { displayName }</span>
                </h3>

                <button
                    className="btn"
                    onClick= { handleLogout }
                >
                    Logout
                </button>
            </div>

            <div 
                className="journal__new-entry"
                onClick = { handleAddNewEntry }
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />
        </aside>
    )
}
