import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";



/*Se crea un compose que contendra las herramientas de DEVTOOLS para poder hacer uso de las mismas aun cuando
estamos haciendo uso de un middleware ya que el createStore solo aceptaria un middleWare a la vez */
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/*Se realiza la configuración necesaria para hacer uso de multiples reducers */
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
});

//el createStore solo acepta un reducer a la vez, por eso se crea un combineReducers
//para combinar multiples reducers en nuestra aplicacion y ubicarlos dentro de nuestro STORE
export const store = createStore( 
    reducers,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//se agrega para verla en la etiqueta REDUX del inspec element de chrome
    composeEnhancers(//hacemos uso del compose y le aplicamos el middleware de thunk que instalamos
        applyMiddleware( thunk ) // de este modo ya podemos empezar a utilizar acciones asincronas en la APP
    )
);