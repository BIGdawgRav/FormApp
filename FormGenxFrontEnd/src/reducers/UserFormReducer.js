import axios from "axios";
import { backEndBaseUrl } from "../constants/Urls";

const userFormReducer = (state = {}, payload) => {
    switch (payload.type) {
        case "FETCH_FORMS":
            return {
              ...state,
              formData: payload.formData,
              isLoading: false,

            };
        case "CREATOR_DETAILS":
            return {
              ...state,
              creatorId: payload.creatorId,
  
            };
        case "START_LOADING":
            return {
                ...state,
                isLoading: true,
            };
        case "STOP_LOADING":
            return {
                ...state,
                isLoading: false,
            };

        case "UPDATE_FORM":

            return {

                ...state,
                formData: payload.updateformData,   
            };

        case "EDIT_FORM":
        
            return {
                ...state,
                editForm: payload.formToEdit[0],
                editFormId: payload.formToEdit[1]
            };

        case "RESET_FORM":
        
            return {
                ...state,
                editForm: null,
                editFormId: null
            };  

        default:
            return state;
            
        };

};

export async function fetchUserForms(dispatch, getState) {

  var userToken = getState().userTokenReducer.userToken;

    if (userToken === undefined) {
        userToken = window.sessionStorage.getItem("userToken");
    }

    dispatch({ type: "START_LOADING" });

    const requestHeader = {
      headers: {
        Authorization: "Token " + userToken,
      },
     
    };

    await axios
      .get(backEndBaseUrl + "/creator/entry/", requestHeader)
      .then((response) => {

        dispatch({
          type: "FETCH_FORMS",
          formData: response.data
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("There was an error in the fetchUserForms reducer");
      });




    dispatch({ type: "STOP_LOADING" });



  }


 export default userFormReducer;
