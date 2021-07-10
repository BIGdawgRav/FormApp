import React, { useEffect, useState } from "react";
import MyFormContent from './MyFormContent'
import { connect } from "react-redux";
import store from "../../app/store"
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import {dispatchResetEdit} from "../../functions/updateStateFunctions"


const MyForms = ({ isLoading , formData, userToken,userData,dispatch}) => {

  // dispatchResetEdit(dispatch)
  if (isLoading) {
       return <LoadingIcon/>;
      }

  return (
   <div > 
       <MyFormContent formData={formData}  isLoading = {isLoading}  userToken = {userToken}   userData = {userData} />             
     </div>
   
  );
};

function mapStateToProps(state) {
  return {
    formData: state.userFormReducer.formData,
    isLoading: state.userFormReducer.isLoading,
    userToken: state.userTokenReducer.userToken,
    userData: state.userTokenReducer.userData,
  };
}

export default connect(mapStateToProps)(MyForms);
