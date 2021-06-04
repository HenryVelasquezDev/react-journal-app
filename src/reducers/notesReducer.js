import { typesActions } from "../types/types";

/*
    {
        notes: [],
        activeNote: null
            o
        activeNote: {
            id: 'sdfsdf',
            title: '',
            body: '',
            imageUrl: '',
            date: 3546465
        }    
    }
*/
const initialState = {
    notes: [],
    activeNote: null
}

export const notesReducer = ( state = initialState , action ) => {
    switch (action.type) {
        
        case typesActions.notesActive:
            return {
                ...state,
                activeNote: {
                    ...action.payload
                }
            }

        case typesActions.notesAddNew:
            return{
                ...state,
                notes: [action.payload, ...state.notes]
            }

        case typesActions.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case typesActions.notesUpdated:
            return{
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }

        case typesActions.notesDelete:
            return{
                ...state,
                activeNote: null,
                notes: state.notes.filter( note => note.id !== action.payload)
            }

        case typesActions.notesLogoutCleaning:
            return{
                ...state,
                activeNote: null,
                notes: []
            }
    
        default:
            return state;
    }
}