
import { store as notificationStore } from "react-notifications-component";


export function notify(head, body, notifytype) {
    return notificationStore.addNotification({
      title: head,
      message: body,
      type: notifytype,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
      },
    });
  }

  // export function notify(head, body, notifytype) {

 
  //   return (
  //     <SnackbarContent
  //     message= {"hjj"}
  //     close
  //     icon={AddAlert}
  //     color= {notifytype}
  //    />


  //   )
      
  // }

// export function notify(head, body, notifytype) {


//   if (notifytype == "danger"){
  
//     return(
   
//       <Alert color="danger">This is a danger alert—check it out!</Alert>
//     )

//   }

//   else if (notifytype == "success"){
//     return(
//       <Alert color="success">{head} {" "}{ body}</Alert>

//     )
//   }

// }