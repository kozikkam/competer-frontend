export default (state, action) => {
  switch (action.type) {
    case "addJWT":
      return {
        ...state,
        jwt: action.payload,
      };
    default:
      return state
  }
};