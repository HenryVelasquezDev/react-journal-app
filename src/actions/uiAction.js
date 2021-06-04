import { typesActions } from '../types/types';


export const setError = ( errMsg ) => {
    return {
        type: typesActions.uiSetError,
        payload: errMsg
    }
}


export const removeError = ( ) => {
    return {
        type: typesActions.uiRemoveError
    }
}

export const startLoading = () => {
    return {
        type: typesActions.uiStartLoading
    }
}

export const finishLoading = () => {
    return {
        type: typesActions.uiFinishLoading
    }
}