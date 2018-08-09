const defaultState = {
  // set state here
  usernameInput: "",
  passwordInput: ""
}

export default function(state = defaultState, action) {
  console.log(action)
  switch (action.type) {
    case "LOGIN_USERNAME":
      return {
        ...state,
        usernameInput: action.payload
      }
    case "LOGIN_PASSWORD":
      return {
        ...state,
        passwordInput: action.payload
      }
    default:
      return state
  }
}
