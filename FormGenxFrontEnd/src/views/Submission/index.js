/*eslint-disable*/
import React , {useState, useEffect } from "react";
import { connect } from "react-redux";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Results from "./FormResults"
const SubmissionPage = ({formData,userToken}) =>{


  const [state, setState] = useState({
    forms:[],
    selectedForm : 'You have no deployed forms'
  })
  useEffect(() => {
    if(formData && formData.length>0){
      setState({ ...state, forms: formData ,selectedForm : formData[0]})

    } else{
      setState({ ...state, forms: formData ,selectedForm :  'You have no deployed forms' })

    }
    
  }, [formData]);


  const handleFormClick = (element) =>{
    
    setState({ ...state, selectedForm : element })
  }


  return(
  <>
  <UncontrolledDropdown>
      <DropdownToggle caret data-toggle="dropdown">
            {state.selectedForm.title}
      </DropdownToggle>
      <DropdownMenu  >
      { state.forms.length >0 ?
        (state.forms.map((element,key) => {
          return <DropdownItem onClick={() => { handleFormClick(element) }}>{element.title}</DropdownItem>

        })):
        null
      }
      </DropdownMenu>
  </UncontrolledDropdown>
 {
   state.selectedForm === 'You have no deployed forms'?
   null

   :
   <div>

      <Results form = {state.selectedForm} userToken = {userToken} />



   </div>


 }

 

  </>
)



}

function mapStateToProps(state) {
  return {
    formData: state.userFormReducer.formData,
    isLoading: state.userFormReducer.isLoading,
    userToken: state.userTokenReducer.userToken,
  };
}


export default connect(mapStateToProps)(SubmissionPage);
