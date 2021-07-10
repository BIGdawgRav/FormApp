import React, { useEffect, useState } from "react";
import { ReactFormBuilder, ElementStore } from 'react-form-builder2';
// @material-ui/core
// import { makeStyles } from "@material-ui/core/styles";
// import { makeStyles } from "@boot";
import 'react-form-builder2/dist/app.css';
import './form.css';
import DemoBar from './Demobar'
import { connect } from "react-redux";
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon'


const Form = ({ formData, editForm, editFormId, userData, userToken , creatorId }) => {

  const [state, setState] = useState({
    data: [],
    edittedForm: false,
    modalEditFormId: "",
    creatorId: "",
    formTite: "Missing Title",
    loading:false

  })

  useEffect(() => {
    var isRendered = true
    setState({ ...state, data: ElementStore.state  },
      )
    return () => {
      isRendered = false

  }}, [ElementStore.state]);



if(state.loading){
  return (
    <LoadingIcon />
  )
}
else {
  return (
    
    <div>
      <div>
        <DemoBar formdata={state.data} formId={editFormId} creatorId={creatorId} userToken = {userToken}  formData = {formData} />
      </div>
      <div>
        <ReactFormBuilder
          data={editForm}

        />

        <div >
        </div>
      </div>
    </div>

  )
  }
}


export default connect(
)(Form);