export const dispatchUpdateForm = (
    dispatch,
    element,
    formId,
    formData

) => {

    const tempFormData = [...formData].map((form) => {

        if (form.id === formId){
            form.form_structure =  JSON.stringify(element)
        }
        return form
    })

    dispatch({
        type: "UPDATE_FORM",
        updateformData:tempFormData

      });

}


export const dispatchAddForm = (
    dispatch,
    formData

) => {

    const tempFormData = [...formData]

 

    dispatch({
        type: "ADD_FORM",
        addDormData:tempFormData

      });

}


export const dispatchDeleteForm = (
    dispatch,
    formId,
    formData

) => {
   

    const tempFormData = [...formData].filter( (form) => {

        if (form.id === formId){
            return false
        }
        return true
        
    }
    )

    dispatch({
        type: "UPDATE_FORM",
        updateformData:tempFormData

      });


}

export const dispatchDeployForm = (
    dispatch,
    modalId,
    formData

) => {

    const tempFormData = [...formData].map((form) => {
        if (form.id === modalId){
            form.is_deployed =  true
        }
        return form
    })

    console.log()

    dispatch({
        type: "UPDATE_FORM",
        updateformData:tempFormData

      });


}



export const dispatchResetEdit = (
    dispatch,

) => {



    dispatch({
        type: "EDIT_FORM",
        formToEdit:[[],null]

      });


}


