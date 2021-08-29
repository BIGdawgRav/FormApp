import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card"
import { ReactFormGenerator } from 'react-form-builder2';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { backEndBaseUrl } from "../../constants/Urls"
import { useParams } from "react-router-dom";
import { notify } from "../../functions/functions"
import Button from 'react-bootstrap/Button';


const DeployedForm = () => {

  const [state, setState] = useState({
    currentFormData: [],
    currentFormStructure: [],
    saveUserData: [],
    loading: false,
    showModal: false,
    adminId: "",
    formEntryID: "",
  })

  let { id } = useParams();


  useEffect(() => {

    const requestHeader = {
      headers: { },
    };

    setState({ ...state, loading: true })

    axios.get(backEndBaseUrl + `/form/${id}`, requestHeader).then((response) => {

      setState({ ...state, currentFormData: response.data, currentFormStructure: JSON.parse(response.data[0].form_structure), adminId: response.data[0].admin, formEntryID: response.data[0].id })



    })

      .catch((error) => {
        console.log(error)
      })

  }, [id]);




  const handleClose = () => setState({ ...state, showModal: false });


  const onSubmit = (saveData) => {




    setState({ ...state, saveUserData: saveData, showModal: true })
  }

  const handleSubmit = () => {

    const FormSubmission = state.saveUserData


    axios
      .post(
        backEndBaseUrl + "/form/submit",

        {
          admin: state.adminId,
          submission: FormSubmission,
          form_entry: state.formEntryID
        },
        {
          headers: { },
        }).then((response) => {
          notify("Success", "Form Successfully Submitted", "success");

          setState({ ...state, showPreview: false })
        }).catch((error) => {
          console.log(error.response)
        })
  }

  return (
    <div style={{ marginRight: "5%", marginLeft: "5" }}>

      <Card >
        <div style={{ marginRight: "05%", marginLeft: "05%", marginTop: "05%", marginBottom: "05%" }}>

          <ReactFormGenerator

            download_path=""
            back_action="/"
            back_name="Back"
            form_action=""
            read_only={false}
            onSubmit={(saveData) => { onSubmit(saveData) }}
            hide_actions={false}
            data={state.currentFormStructure}
          />



        </div>


      </Card>

      <>



        <Modal show={state.showModal} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Submit Your Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>

          <Modal.Footer>


            <div>
              <Button variant="secondary" style={{ marginRight: "10px" }} onClick={() => { handleSubmit() }}>
                Yes
              </Button>
              <Button variant="secondary" onClick={handleClose} style={{ marginRight: "10px" }}>
                Close
              </Button>

            </div>

          </Modal.Footer>
        </Modal>

      </>



    </div>

  );
};


export default DeployedForm;
