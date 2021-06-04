import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothinSelected } from './NothinSelected';
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {

    const {notes, activeNote} = useSelector( state => state.notes );

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">

            
            <Sidebar />


            <main>
                {
                    ( activeNote )
                        ? ( <NoteScreen /> )
                        : ( <NothinSelected /> )
                }
                
            </main>
        </div>
    )
}
