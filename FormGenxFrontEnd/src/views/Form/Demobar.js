import React, { useEffect, useState } from "react";
import store from '../../app/store'
import { ReactFormGenerator } from 'react-form-builder2';
import Grid from "@material-ui/core/Grid";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from "react-redux";
import axios from "axios";
import { fetchUserForms } from "../../reducers/UserFormReducer";
import { backEndBaseUrl } from "../../constants/Urls"
import { notify } from "../../functions/functions"
import { dispatchUpdateForm } from "../../functions/updateStateFunctions"

import GridItem from "../../components/Grid/GridItem.js";
import Input from '@material-ui/core/Input';
import { dispatchResetEdit } from "../../functions/updateStateFunctions"

const DemoBar = ({ formdata, formId, creatorId, userToken, formData, dispatch }) => {

  const [state, setState] = useState({
    showPreview: false,
    data: [],
    formTitle: "Missing Title",
    loading: false,
    creatorAdminId: "",

  })




  const [loading, setLoading] = useState(false)

  useEffect(() => {

    setState({ ...state, data: formdata.data })
  }, [formdata.data]);

  const handleClose = () => setState({ ...state, showPreview: false });
  const handleShow = () => setState({ ...state, showPreview: true });

  const handleRefresh = () => {
    dispatchResetEdit(dispatch)


  };


  const handleTitle = (e) => {

    if (e.target.value.length !== 0) {
      setState({ ...state, formTitle: e.target.value })
    } else {
      setState({ ...state, formTitle: "Missing Title" })
    }
  };
  const handleSubmit = () => {



    if (formId) {
      setLoading(true)

      axios
        .put(
          backEndBaseUrl + `/creator/entry/${formId}`,
          {
            title: state.formTitle,
            form_structure: state.data,
            admin: creatorId,
            is_deployed: false,
          },
          {
            headers: { Authorization: "Token " + userToken },
          }).then((response) => {



            dispatchUpdateForm(dispatch, state.data, formId, formData)

            notify("Success", "User details updated.", "success");
            setState({ ...state, showPreview: false })
            setLoading(true)


          }).catch((error) => {
            console.log(error);

          });
    }
    else {
      setState({ ...state, loading: true })


      axios
        .post(
          backEndBaseUrl + "/creator/entry/",
          {
            title: state.formTitle,
            form_structure: state.data,
            admin: creatorId,
            is_deployed: false,
          },
          {
            headers: { Authorization: "Token " + userToken },
          }).then((response) => {


            store.dispatch(fetchUserForms);

            setState({ ...state, loading: false, showPreview: false })
            notify("Success", "User details updated.", "success");

          }).catch((error) => {
            console.log(error)
          })
    }
  }
  return (

    <>
      <Grid container>



        <div style={{ flexDirection: "row", marginBottom: 10 }}>
          <div></div>
          <Button variant="primary" style={{ marginRight: 10 }} onClick={() => handleShow()}>
            Launch demo modal
          </Button>
        </div>

        <div>
          <Button variant="primary" onClick={() => handleRefresh()}>
            Refresh Form
          </Button>
        </div>





        <GridItem xs={12} sm={12} md={4}>
          <Input

            autoFocus={true}
            onChange={(e) => {
              handleTitle(e);
            }}
          />
        </GridItem>

      </Grid>

      <Modal show={state.showPreview} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <ReactFormGenerator
            download_path=""
            back_action="/"
            back_name="Back"
            action_name="Save"
            form_action="/"
            form_method="POST"
            read_only={true}
            hide_actions={true}
            data={state.data} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            handleSubmit()

          }}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
};


export default connect()(DemoBar);





