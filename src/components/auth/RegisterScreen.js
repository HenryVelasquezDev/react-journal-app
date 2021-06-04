import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import validator from 'validator'
import { startRegisterEmailPasswordName } from '../../actions/authAction';
import { removeError, setError } from '../../actions/uiAction';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const state = useSelector( state => state );//me trae el state completo que se observa en el redux con todas las estructuras de los datos en los reducers

    const { msgError } = state.ui;
    
    const [ formValues, handleInputChange ] = useForm({
        name:   'Vegeta',
        email: 'henry@correo.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleSubmitRegister = (e) =>{
        e.preventDefault(); 
        if ( isFormValid() ){
            dispatch( startRegisterEmailPasswordName( email , password, name) );
        }
    } 

    const isFormValid = () =>{
        
        if ( name.trim().length === 0 ){
            dispatch(setError('name is required')); 
            return false;
        }else if (!validator.isEmail( email )){
            dispatch(setError('email is not valid')); 
            return false;
        }else if (password2 !== password  || password.length < 6) {
            dispatch(setError('Password should be at least 6 characters and match each other')); 
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit= { handleSubmitRegister }
                className="animate__animated animate__fadeIn animate__faster"
            > 

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>

                    )
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value = { name }
                    onChange = { handleInputChange }
                />

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

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value = { password2 }
                    onChange = { handleInputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?    
                </Link>
            </form>

        </>
    )
}
