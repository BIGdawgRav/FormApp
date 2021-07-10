export const dispatchEditForm = (
    dispatch,
    element,
    modalId,
    editForm,
    editFormId

) => {
    
    dispatch({
        type: "EDIT_FORM",
        formToEdit: [element,modalId],

      });
}