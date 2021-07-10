import { combineReducers } from "redux";
import userFormReducer from './UserFormReducer'
import userTokenReducer from './UserTokenReducer'

const initialState = {
    sidebarShow: "responsive",
  };
  
const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case "set":
        return { ...state, ...rest };
      default:
        return state;
    }
  };

  const rootReducer = combineReducers({
    nav: changeState,
    userFormReducer,
    userTokenReducer

  });

  export default rootReducer;
