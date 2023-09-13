import { ROOT_URL } from "../Config/constants";
import axios from "axios";

export async function loginUser(dispatch, loginPayload) {

  try {
    dispatch({ type: "REQUEST_LOGIN" });

    const response = await axios.post(`${ROOT_URL}/api/login`, loginPayload);

    const data = response.data

    if (response.data.ok) { 

      if (data.info) {
        localStorage.setItem("currentUser", JSON.stringify(data.info));
        dispatch({ type: "LOGIN_SUCCESS", payload: data.info });
        return data;
      }
    }


    dispatch({ type: "LOGIN_ERROR", error: data.err });

    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
   
  }
}

export async function logout(dispatch) {
  localStorage.removeItem("currentUser");
  dispatch({ type: "LOGOUT" });
}


export async function getPlayerStats(dispatch, name, body) {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
    body: JSON.stringify(body)
  };

  const response = await fetch(`${ROOT_URL}/api/playerData/${name}`, requestOptions);
  const data = await response.json();
  const finalData = []
  data.info.Response.PlayerResponse.PlayerView.Player.Statistics.StatisticalDataSet[0].Data.map(stat => finalData.push(stat["Y"]));
  //finalData.sort(( a, b )=> b - a );
  dispatch({ type: "GET_USER", payload: data });

  return data;
}

export async function getPlayers(dispatch) {

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
  };

  try {
    const response = await fetch(`${ROOT_URL}/api/getPlayers`, requestOptions);
    const data = await response.json();
    dispatch({ type: "GET_PLAYERS", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
   // console.log(error + "try catch actions getPlayers");
  }
}

export const getPlayerByFilter = async (dispatch, options) => {

  const name = options.shkUsername;

  try {
  
    const url = `${ROOT_URL}/api/playerDataFiltered/${name}`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
      body: JSON.stringify(options)
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    dispatch({ type: "GET_PLAYER_BY_FILTER", payload: data });
  }
  catch (error) {
    console.log(error)
  }
}

export const getDataFromDefaultFilters = async (dispatch, options) => {
  try {

    const url = `${ROOT_URL}/api/getDefaultGroupFiltersData`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
      body: JSON.stringify(options)
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    dispatch({ type: "GET_DEFAULT_FILTERS", payload: data });
  }
  catch (error) {
    console.log(error)
  }
}

export async function getRooms(dispatch) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
  };
  try {
    const response = await fetch(`${ROOT_URL}/api/getRooms`, requestOptions);
    const data = await response.json();
    dispatch({ type: "GET_ROOMS", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error + "try catch actions getRooms");
  }
}

export async function getDefaultFilterList(dispatch) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
  };
  try {
    const response = await fetch(`${ROOT_URL}/api/getDefaultFilters`, requestOptions);
    const data = await response.json();
    dispatch({ type: "DEFAULT_FILTER_LIST", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error + "try catch actions getRooms");
  }
}

export async function setNewPlayer(values) {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
    body: JSON.stringify(values)
  };
  try {
    const response = await fetch(`${ROOT_URL}/api/setPlayerData`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error + "try catch actions setPlayer");
  }
}

export async function getGroups(dispatch) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
  };
  try {
    const response = await fetch(`${ROOT_URL}/api/getGroups`, requestOptions);
    const data = await response.json();
    dispatch({ type: "GROUPS", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error + "try catch actions getRooms");
  }
}

export async function setNewGroup(values) {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
    body: JSON.stringify(values)
  };
  try {
    const response = await fetch(`${ROOT_URL}/api/setGroup`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error + "try catch actions setPlayer");
  }
}


export const getGroupDataByFilter = async (dispatch, options) => {

  try {

    const url = `${ROOT_URL}/api/getDefaultGroupFiltersData`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
      body: JSON.stringify(options)
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    dispatch({ type: "GET_GROUPDATA_BY_FILTER", payload: data });
  }
  catch (error) {
    console.log(error)
  }
}


export const getTournamentData = async (dispatch, options) => {

  try {

    const url = `${ROOT_URL}/api/getTournamentsData`

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
      body: JSON.stringify(options)
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    dispatch({ type: "GET_TOURNAMENTDATA", payload: data });
  }
  catch (error) {
    console.log(error)
  }
}

export const userRegister = async (payload) => {
  const requestOptions = {
    method : "POST",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
    body: JSON.stringify(payload)
  }
  try {
    const response = await fetch(`${ROOT_URL}/register`, requestOptions)
    const data = await response.json()
    return data

  } catch(error){
    console.log(error)
  }
}

export async function getUsers(dispatch, payload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token},
    body: JSON.stringify(payload)
  };
  try {
    const response = await fetch(`${ROOT_URL}/api/admindashboard/users`, requestOptions);
    const data = await response.json();
    dispatch({ type: "GET_USERS", payload: data });
    return data;
  } catch (error) {
    console.log(error)
  }
}

export async function getCountries(dispatch) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token},
  };
  try {
    const response = await fetch(`${ROOT_URL}/api/getRegions`, requestOptions);
    //console.log(response)
    const data = await response.json();
    dispatch({ type: "GET_COUNTRIES", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function getIdUser(dispatch, id) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token},
  };
  try {
    const response = await fetch(`${ROOT_URL}/api/admindashboard/users`, requestOptions);
    const data = await response.json();
    const userIda = await data.info.filter(u => u._id === id)
    dispatch({ type: "GET_ID_USER", payload: userIda });
    return userIda;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logicalDeleteUser(dispatch, id) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token},
  };
  try {
    const response = await fetch(`${ROOT_URL}/api/users/${id}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function userUpdate(dispatch, id, payload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token},
    body: JSON.stringify(payload)
  };
  //console.log(requestOptions.body)
  try {
    const response = await fetch(`${ROOT_URL}/api/useredit/${id}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}


export const getRemainingRequests = async (dispatch, options) => {

  try {

    const url = `${ROOT_URL}/api/remainingRequest`

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "token": JSON.parse(localStorage.getItem("currentUser")).token },
      body: JSON.stringify(options)
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    dispatch({ type: "GET_REMAININGRQUESTS", payload: data });
  }
  catch (error) {
    console.log(error)
  }
}