const defaultState = {
  // set state here
  usernameInput: "",
  passwordInput: "",
  login: true,
  currentUser: {
    "id": 1,
    "username": "admin",
    "created_by_username": "admin",
    "created_by_userID": 1,
    "password_digest": "$2a$10$87oxu2V2zxOLqIQOXX3e1OAgNPQ0ICPyKRowzWmQYPAl2uGv0FHf6",
    "quote": "",
    "role": "admin manager",
    "status": "active",
    "created_at": "2018-08-10T18:12:09.963Z",
    "updated_at": "2018-08-10T18:12:09.963Z",
    "adjustments": [
      {
        "id": 1,
        "reason_code": "001 missing",
        "product_id": 1,
        "product_name": "apple",
        "qty_to_adjust": -1,
        "user_id": 1,
        "created_by": "admin",
        "total_dollars": "20",
        "created_at": "2018-08-10T18:12:10.286Z",
        "updated_at": "2018-08-10T18:12:10.286Z"
      }
    ],
    "orders": [
      {
        "id": 1,
        "product_id": 1,
        "product_name": "apple",
        "qty": 1,
        "price": 2,
        "vendor_name": "good vendor",
        "user_id": 1,
        "order_by": "admin",
        "on_order": true,
        "received": false,
        "received_by": "admin",
        "total_dollars": "100",
        "created_at": "2018-08-10T18:12:10.244Z",
        "updated_at": "2018-08-10T18:12:10.244Z"
      }
    ],
    "products": [
      {
        "id": 1,
        "user_id": 1,
        "item_name": "apple",
        "retail_price": 10,
        "pomo_price": null,
        "most_recent_vendor": "best Vendor",
        "created_by": "admin",
        "order": 1,
        "inventory": 10,
        "adjustment": -1,
        "status": "active",
        "sales": 10,
        "forecast_sales_three_months": 2,
        "need_to_order_for_next_three_months": 1,
        "annualized_sales": 100,
        "annualized_qty": 5,
        "category": "food",
        "image_url": "https://images.idgesg.net/images/article/2018/07/apple-6-color-logo-100763179-large.jpg",
        "last_edited_by": "admin",
        "last_cost": 2,
        "barcode": 1263527635,
        "created_at": "2018-08-10T18:12:10.155Z",
        "updated_at": "2018-08-10T18:12:10.155Z"
      }
    ],
    "sales_transcations": [
      {
        "id": 1,
        "total": 10,
        "total_saving": 2,
        "user_id": 1,
        "cash_from_customer": 0,
        "change_to_customer": 0,
        "created_at": "2018-08-10T18:12:10.076Z",
        "updated_at": "2018-08-10T18:12:10.076Z"
      }
    ],
    "todolists": [
      {
        "id": 1,
        "user_id": "1",
        "message": "testing",
        "create_by": "admin",
        "to_username": "Steven",
        "task_completed": false,
        "created_at": "2018-08-10T18:12:10.015Z",
        "updated_at": "2018-08-10T18:12:10.015Z"
      },
      {
        "id": 2,
        "user_id": "1",
        "message": "admin",
        "create_by": "admin",
        "to_username": "admin",
        "task_completed": false,
        "created_at": "2018-08-10T18:15:13.501Z",
        "updated_at": "2018-08-10T18:15:13.501Z"
      },
      {
        "id": 3,
        "user_id": "1",
        "message": "admin",
        "create_by": "admin",
        "to_username": "steven",
        "task_completed": false,
        "created_at": "2018-08-10T18:15:21.421Z",
        "updated_at": "2018-08-10T18:15:21.421Z"
      }
    ]
  },
  toDoLists: [],
  task_to: "",
  message: "",
  newUser_username:"",
  newUser_password:"",
  newUser_role:"",
  newUser_status:"",
}

export default function(state = defaultState, action) {
  console.log("login state", state)
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
    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload
      }
    case "SHOW_TODOLISTS":
      return {
        ...state,
        toDoLists: action.payload
      }
    case "SEND_TASK_TO":
      return {
        ...state,
        task_to: action.payload
      }
    case "CREATE_MESSAGE":
      return {
        ...state,
        message: action.payload
      }
    case "NEW_USER_USERNAME_INPUT":
    return{
      ...state,
      newUser_username:action.payload
    }
    case "NEW_USER_PASSWORD_INPUT":
    return{
      ...state,
      newUser_password:action.payload
    }
    case "NEW_USER_ROLE_INPUT":
    return{
      ...state,
      newUser_role:action.payload
    }
    case "NEW_USER_STATUS_INPUT":
    return{
      ...state,
      newUser_status:action.payload
    }
    case "ADD_TASK_TO_YOURSELF":
    return{
      ...state,
      toDoLists:[...state.toDoLists,action.payload]
    }
    case "RESET_TASK_TO_INPUT":
    return{
      ...state,
      task_to:"",
    }
    case "RESET_TASK_MESSAGE_INPUT":
    return{
      ...state,
      message:"",
    }
    default:
      return state
  }
}
