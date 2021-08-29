import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import { useHistory } from "react-router-dom";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer.js";
import { ReactFormGenerator } from 'react-form-builder2';
import { connect } from "react-redux";
// import store from "../../app/store"
import { dispatchDeleteForm, dispatchDeployForm } from "../../functions/updateStateFunctions"
import axios from "axios";
import { backEndBaseUrl, baseDeployLink } from "../../constants/Urls"
import { notify } from "../../functions/functions"
import ClickableCard from "../../components/ClickableCard/ClickableCard"
import { dispatchEditForm } from "./helperFunctions";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";


// const useStyles = makeStyles(styles);

const MyFormsContent = ({ formData, isLoading, userToken, userData, editForm, editFormId, dispatch }) => {

  const [state, setState] = useState({
    showPreview: false,
    data: [],
    loading: false,
    modaldata: [],
    modalId: "",
  })

  useEffect(() => {
    setState({ ...state, data: formData })

  }, [formData]);


  const history = useHistory();

  const handleClose = () => setState({ ...state, showPreview: false, modaldata: [] });
  const handleShow = () => setState({ ...state, showPreview: true });

  const handleRefresh = () => {

    const requestHeader = {
      headers: {
        Authorization: "Token " + userToken
      },
    };



    setState({ ...state, loading: true })
    axios.get(backEndBaseUrl + "/creator/entry/", requestHeader).then((response) => {


      setState({ ...state, data: response.data })

      notify("Success", "User details updated.", "success");



    }).catch((error) => {
      console.log(error)

    })

  }

  const handleDelete = (formId) => {

    const requestHeader = {
      headers: {
        Authorization: "Token " + userToken
      },
    };


    setState({ ...state, loading: true })
    axios.delete(backEndBaseUrl + `/creator/entry/${formId}`, requestHeader).then((response) => {

      // dispatchDeleteForm(dispatch,id,formData)
      notify("Success", "User details updated.", "success");
      setState({ ...state, showPreview: false })

      dispatchDeleteForm(dispatch, formId, formData)




    }).catch((error) => {
      console.log(error)

    })

  }

  const handleClick = (element) => {

    setState({ ...state, showPreview: true, modalId: element.id, modaldata: JSON.parse(element.form_structure) })

  }


  const handleEdit = (element, modalId) => {

    dispatchEditForm(dispatch, element, modalId, editForm, editFormId)
    history.push("/admin/createform");
  }


  const handleDeploy = (element, modalId) => {

    const currentForm = formData.filter(x => x.id === modalId)

    axios
      .put(
        backEndBaseUrl + `/creator/entry/${modalId}`,
        {
          id: currentForm[0].id,
          title: currentForm[0].title,
          form_structure: element,
          admin: currentForm[0].admin,
          is_deployed: true
        },
        {
          headers: { Authorization: "Token " + userToken },
        }).then((response) => {
          notify("Success", "User details updated.", "success");


          dispatchDeployForm(dispatch, modalId, formData)

          setState({ ...state, showPreview: false })

        }).catch((error) => {
          console.log(error)
        })

  }

  const handleCopyClipboard = (formId) => {

    const deployLink = baseDeployLink + formId

    navigator.clipboard.writeText(deployLink)

    notify("Success", "Deploy link copied to clipboard", "success");


  }
  // console.log(state)
  return (

    <div >
      <Button color="info" onClick={() => { handleRefresh() }}> Update </Button>
      <GridContainer>

        {state.data.map((element, key) => {


          return (


            <div onClick={() => { handleClick(element) }}>
              <ClickableCard element={element} />

            </div>


          )


        })}
      </GridContainer>


      <Modal show={state.showPreview} onHide={() => handleClose()}>
        <Modal.Header closeButton>

          <div >
            <Modal.Title>Preview

              <Button variant="secondary" style={{ marginLeft: "20px" }} size="sm" onClick={() => handleCopyClipboard(state.modalId)} >
                Deploy Link
              </Button> </Modal.Title>


          </div>






        </Modal.Header>
        <Modal.Body>
          <ReactFormGenerator
            download_path=""
            back_action="/"
            back_name="Back"
            action_name="Save"
            form_action="/"
            form_method="POST"
            read_only={false}
            hide_actions={true}
            data={state.modaldata} />
        </Modal.Body>
        <Modal.Footer>
          <div>

            <Button variant="secondary" style={{ marginRight: "10px" }} onClick={() => { handleEdit(state.modaldata, state.modalId) }}>
              Edit
            </Button>

            <Button variant="secondary" style={{ marginRight: "10px" }} onClick={() => { handleDeploy(state.modaldata, state.modalId) }}>
              Deploy
            </Button>

            <Button variant="secondary" onClick={() => { handleDelete(state.modalId) }} style={{ marginRight: "10px" }}>
              Delete
            </Button>


          </div>


        </Modal.Footer>
      </Modal>


    </div>









  );
};

function mapStateToProps(state) {
  return {
    editForm: state.userFormReducer.editForm,
    editFormId: state.userFormReducer.editFormId,

  };
}



export default connect(mapStateToProps)(MyFormsContent);