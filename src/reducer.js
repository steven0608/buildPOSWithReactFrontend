const defaultState = {
  // set state here
  usernameInput: "",
  passwordInput: "",
  login: true,
  currentUser: "",
  toDoLists: [],
  task_to:"",
  message:"",
}

export default function(state = defaultState, action) {
  console.log("login state",state)
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
      case "SEND_TASK_TO" :
      return {
        ...state,
        task_to: action.payload
      }
      case "CREATE_MESSAGE" :
      return {
        ...state,
        message:action.payload
      }
    default:
      return state
  }
}
