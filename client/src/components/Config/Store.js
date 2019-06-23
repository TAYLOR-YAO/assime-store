
import {createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import CartReducer from "./CartReducer";
import StoreAuthReducer from "./StoreAuthReducer";
import errorReducer from "./errorReducer";
// const initialState = {};
const middleware = [thunk];



function saveToLocatStorage(state){
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("state", serialisedState)
    }catch(err){
        console.log(err)
    }
}

function loadFromLocatStorage(){
    try{
        const serialisedState = localStorage.getItem("state");
        if(serialisedState === null) return undefined
        return JSON.parse(serialisedState)

    }catch(err){
        console.log(err)
        return undefined
    }
}


const rootReducer = combineReducers({
    cart: CartReducer,
    storeOwner: StoreAuthReducer,
    errors: errorReducer
});

const persistedState = loadFromLocatStorage()

const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
   );

   store.subscribe(()=>saveToLocatStorage(store.getState()))
export default store;