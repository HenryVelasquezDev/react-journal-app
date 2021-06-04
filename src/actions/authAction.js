import Swal from 'sweetalert2';
import { typesActions } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from './uiAction';
import { notesLogout } from './notesAction';

//definiendo una acción asincrona
export const startLoginEmailPassword = (email,password) => {
    return ( dispatch ) => {
        //cargo loading true
        dispatch( startLoading());
        
        firebase.auth().signInWithEmailAndPassword( email , password  )
        //.then( userCred => { 
        //usamos la desectructuración para obtener el valor de user
        .then( ({ user }) => { 
            dispatch(
                login( user.uid , user.displayName)
            )
            //cargo loading false
            dispatch( finishLoading());
            
        }).catch( e => {
            //cargo loading false
            dispatch( finishLoading());
            
            Swal.fire(
                'Error',
                 e.message,
                'error'
              );
        })

    }
};

export const startRegisterEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        
        firebase.auth().createUserWithEmailAndPassword( email, password)
            .then( async ({ user }) => { 
                /* cuando se registra el usuario, nos retorna el objeto user pero no posee el valor de displayName 
                ya que el registro se realiza unicamente con email y password, pero podemos actualizar el profile
                con la funcion updateProfile el cual retorna una promeso pero para evitar otro then dentro del proceso
                podemos usar las funcionalidades de async y await para luego de actualizar si ejecutar el dispatch*/
                await user.updateProfile({ displayName: name })

                dispatch(
                    login( user.uid , user.displayName)
                )
                
            }).catch( e => {
                Swal.fire(
                    'Error',
                     e.message,
                    'error'
                  );
            })

    }

};


//definimos la acción para acceder por google
export const startGoogleLogin = () => {
    return ( dispatch ) => {// el dispatch lo provee directamente el thunk

        firebase.auth().signInWithPopup( googleAuthProvider )
        //.then( userCred => { 
        //usamos la desectructuración para obtener el valor de user
        .then( ({ user }) => { 
            dispatch(
                login( user.uid , user.displayName)
            )
            
        })

    }
};

//definicion de una acción sincrona
export const login = ( uid , displayName ) => {
    return {
        type: typesActions.login,
        payload: {
            uid,
            displayName
        }
    }
};


export const startLogout = () => {
    return ( dispatch ) => {// el dispatch lo provee directamente el thunk

        firebase.auth().signOut()
        .then( () => { 
            dispatch( logout() );
            dispatch( notesLogout() );
            
        })

    }
}

export const logout = ( ) => {
    return {
        type: typesActions.logout
    }
};