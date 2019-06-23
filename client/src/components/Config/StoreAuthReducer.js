import {
    SET_CURRENT_STORE,
    STORE_LOADING
  } from "./types";
  const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    store: {},
    loading: false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_STORE:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          store: action.payload
        };
      case STORE_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }