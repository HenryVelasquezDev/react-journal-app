/*
    {
        uid: 'admf8fgu8fgu',
        name: 'Henry Velasquez'
    }
*/

import { typesActions } from '../types/types';


export const authReducer = (state = {} , action) =>{

    switch ( action.type) {
        case typesActions.login:
            
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            };

        case typesActions.logout:

            return { };
    
        default:
            return state;
    }


}