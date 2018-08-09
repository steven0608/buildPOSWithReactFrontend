const defaultState = {
  // set state here
  usernameInput: "",
  passwordInput: "",
  login: true,
  currentUser:"",
  toDoLists: [],
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
      case "SET_USER" :
      return{
        ...state,
        currentUser: action.payload
      }
      case "SHOW_TODOLISTS":
      return {
        ...state,
        toDoLists: action.payload
      }
    default:
      return state
  }
}
