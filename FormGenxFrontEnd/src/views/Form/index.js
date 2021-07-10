import React, { useEffect, useState } from "react";
import Form from './Form'
import Card from "../../components/Card/Card.js";
import { connect } from "react-redux";

const CreateForm = ({formData,editForm,editFormId,userData, userToken, creatorId}) => {

  return (

   <div > 

     <Card>  
       <div style = {{marginTop : 70, marginLeft : 0 , marginRight : 5 , marginBottom : 0}}>
       < Form formData= {formData} editForm = {editForm} editFormId = { editFormId}  userData = {userData} userToken = {userToken} creatorId />  
       </div>
     </Card>
     </div>

  );
};

function mapStateToProps(state) {
  return {
    userToken : state.userTokenReducer.userToken,
    formData : state.userFormReducer.formData,
    editForm: state.userFormReducer.editForm,
    editFormId: state.userFormReducer.editFormId,
    userData: state.userTokenReducer.userData,
    creatorId : state.userTokenReducer.creatorId
  };
}

export default connect(
  mapStateToProps,
)(CreateForm);

