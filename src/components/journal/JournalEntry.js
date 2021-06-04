import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notesAction';

export const JournalEntry = ({ id, body, date, title, url}) => {

    const dispatch = useDispatch();

    const noteDate = moment(date);

    const handleEntryClick = () => {
        const Note = {
            title,
            body,
            date,
            url
        }

        dispatch( activeNote (id, Note ));
    }

    return (
        <div 
            onClick= { handleEntryClick } 
            className="journal__entry animate__animated animate__fadeIn animate__faster"
        >
            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url( ${ url } )`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd')}</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        </div>
    )
}
