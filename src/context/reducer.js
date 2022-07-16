let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
  : "";

let role = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).role
  : "";
let imageLink = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).imageLink
  : "";

export const initialState = {
  user: "" || user,
  token: "" || token,
  role: "" || role,
  imageLink: "" || imageLink,
  loading: false,
  errorMessage: null,
  users: [],
  customers: [],
  customer: [],
  invoices: [],
  usersList: [],
  oneUser: '',
  newInvoice: [],
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        role: action.payload.role,
        imageLink: action.payload.user.imageLink,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
        role: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case "GET_USERS":
      return {
        ...initialState,
        users: action.payoad,
      };
    case "GET_USER":
      return {
        ...initialState,
        oneUser: action.payoad,
      };
    case "GET_CUSTOMERS":
      return {
        ...initialState,
        customers: action.payload.customers,
      };
    case "GET_CUSTOMER":
      return {
        ...initialState,
        customer: action.payload.info[0],
      };
    case "CUSTOMER_BY_ID":
      return {
        ...initialState,
        customers: action.payload.customerByID,
      };
    case "GET_INVOICES":
      return {
        ...initialState,
        invoices: action.payload.filteredInvoices,
      };
    case "NEW_INVOICE":
      return {
        ...initialState,
        newInvoice: action.payload.invoice_id,
      };
    case "GET_USERS_LIST":
      return {
        ...initialState,
        usersList: action.payload.filteredUsers,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};