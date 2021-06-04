import React, { useEffect, useState } from 'react';
import { firebase } from '../firebase/firebase-config';
import {
    BrowserRouter as Router,
    Switch
  } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authAction';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notesAction';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [cheking, setcheking] = useState(true);
    const [IsLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    
        firebase.auth().onAuthStateChanged( async (user) =>{

            if (user?.uid){ //el signo de interrogacion permite evaluar si el objeto user posee información, revisa el uid, sino o ya que es null
                dispatch( login ( user.uid, user.displayName ) );
                setIsLoggedIn( true );

                dispatch( startLoadingNotes( user.uid) );
            }else{
                setIsLoggedIn( false );
            }

            setcheking( false );
        });

    }, [ dispatch,setcheking,setIsLoggedIn ]);

    if ( cheking ){
        return (
            <h3>Wait...</h3>
        )
    }

    return (
        <Router>
            <div>
                {/* <Navbar /> */}

                <Switch>
                    <PublicRoute 
                        path="/auth" 
                        component = { AuthRouter } 
                        isAuthenticated={IsLoggedIn}
                    />

                    <PrivateRoute 
                        exact 
                        isAuthenticated={IsLoggedIn}
                        path="/" 
                        component = { JournalScreen } 
                    />
                    
                    {/* <Redirect to="/auth/login" /> */}
                </Switch>
                
            </div>
        </Router>
    )
}
