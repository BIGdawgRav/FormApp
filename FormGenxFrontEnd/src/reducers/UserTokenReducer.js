const userTokenReducer = (state = {}, payload) => {
    switch (payload.type) {
      case "SIGNIN":
        return {
          ...state,
          userToken: payload.userToken,
          isCreator: payload.isCreator,
          isFormUser: payload.isFormUser,
          isLoading: false,
          userData: payload.userData,
          creatorId : payload.userData.id
        };
      case "SIGNOUT":
        return {
          ...state,
          userToken: null,
          isCreator: null,
          isFormUser: null,
          isLoading: false,
        };
      case "LOADING":
        return {
          ...state,
          isLoading: true,
        };
      default:
        return state;
    }
  };
  export default userTokenReducer;
  