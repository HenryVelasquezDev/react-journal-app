import { typesActions } from '../types/types';

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = ( state = initialState , action ) =>{

    switch ( action.type ) {
        case typesActions.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }
            
        case typesActions.uiRemoveError:
            return {
                ...state,
                msgError: null
            }
        
        case typesActions.uiStartLoading:
            return {
                ...state,
                loading: true
            }

        case typesActions.uiFinishLoading:
            return {
                ...state,
                loading: false
            }
    
        default:
            return state;
    }

}