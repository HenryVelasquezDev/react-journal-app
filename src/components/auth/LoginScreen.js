import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import validator from 'validator';
import Swal from 'sweetalert2';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/authAction';
import { removeError, setError } from '../../actions/uiAction';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();//permite hacer uso del dispatch entregado por el store de redux que se creo

    const state = useSelector( state => state );//me trae el state completo que se observa en el redux con todas las estructuras de los datos en los reducers

    const { msgError, loading } = state.ui;

    const [ formValues, handleInputChange ] = useForm({
        email: 'henry@correo.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = ( e ) => {
        e.preventDefault(); 
        if ( isFormValid() ){
            dispatch( startLoginEmailPassword (email,password))        
        }
        
    }

    const isFormValid = () =>{
        
        if (!validator.isEmail( email )){
            //dispatch(setError('email is not valid')); 
            Swal.fire(
                'Error',
                'email is not valid',
                'error'
              );
            return false;
        }else if (password.trim().length < 6) {
            //dispatch(setError('Password should be at least 6 characters')); 
            Swal.fire(
                'Error',
                'Password should be at least 6 characters',
                'error'
              );
            return false;
        }

        dispatch(removeError());
        return true;
    }

    const handleGoogleLogin = () =>{
        dispatch( startGoogleLogin() );
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form 
                onSubmit= { handleLogin }
                className="animate__animated animate__fadeIn animate__faster"
            >

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value = { email }
                    onChange = { handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value = { password }
                    onChange = { handleInputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login With social networks</p>

                    <div 
                        className="google-btn"
                        onClick= { handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create New Account    
                </Link>
            </form>

        </>
    )
}
