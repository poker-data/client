let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
  : "";

let role = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).role
  : "";

export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
  users: [],
  players: [],
  playerWithFilter: [],
  rooms: [],
  usersList: [],
  oneUser: [],
  defaultFiltersData: [],
  defaultFilterList: [],
  groups: []
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
    case "GET_PLAYERS":
      return {
        ...initialState,
        players: action.payload.info,
      };
    case "GET_PLAYER_BY_FILTER":
      return {
        ...initialState,
        playerWithFilter: action.payload.info,
      };
    case "GET_ROOMS":
      return {
        ...initialState,
        rooms: action.payload.info,
      };
    case "GET_DEFAULT_FILTERS":
      return {
        ...initialState,
        defaultFiltersData: action.payload.info,
      };
      case "DEFAULT_FILTER_LIST":
        return {
          ...initialState,
          defaultFilterList: action.payload.info,
        };
        case "GROUPS":
          return {
            ...initialState,
            groups: action.payload.info,
          };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};