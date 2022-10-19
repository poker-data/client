import { ROOT_URL } from "../Config/constants";
import axios from "axios";

export async function loginUser(dispatch, loginPayload) {

  try {
    dispatch({ type: "REQUEST_LOGIN" });

    let response = await axios.post(`${ROOT_URL}/login`, loginPayload);

    let data = response.data

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
    // console.log(error + "try catch actions login");
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

  // console.log("name: ", name);

  let response = await fetch(`${ROOT_URL}/api/playerData/${name}`, requestOptions);
  let data = await response.json();
  const finalData = []
  data.info.Response.PlayerResponse.PlayerView.Player.Statistics.StatisticalDataSet[0].Data.map(stat => finalData.push(stat["Y"]));
  //finalData.sort(( a, b )=> b - a );
  console.log("finalData: ", finalData);
  dispatch({ type: "GET_USER", payload: data });

  return data;
}

export async function getPlayers(dispatch) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "auth-token": JSON.parse(localStorage.getItem("currentUser")).token},
  };
  try {
    let response = await fetch(`${ROOT_URL}/api/getPlayers`, requestOptions);
    let data = await response.json();
    dispatch({ type: "GET_PLAYERS", payload: data });
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error + "try catch actions getPlayers");
  }
}

export const getPlayerByFilter = async (dispatch, options) => {
  const name = options.shkUsername;
  const _id = options._id;
  try {
    const dateNow = new Date();


    let url = `${ROOT_URL}/api/playerDataFiltered/${name}`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": JSON.parse(localStorage.getItem("currentUser")).token },
      body: JSON.stringify(options)
    };

    let response = await fetch(url, requestOptions);
    let data = await response.json();
    console.log(data, 'data getplayer');
    dispatch({ type: "GET_PLAYER_BY_FILTER", payload: data });
  }
  catch (error) {
    console.log(error)
  }
}

export const getDataFromDefaultFilters = async (dispatch, options) => {
  try {

    let url = `${ROOT_URL}/api/getDefaultGroupFiltersData`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": JSON.parse(localStorage.getItem("currentUser")).token },
      body: JSON.stringify(options)
    };

    let response = await fetch(url, requestOptions);
    let data = await response.json();
    console.log(data);
    dispatch({ type: "GET_DEFAULT_FILTERS", payload: data });
  }
  catch (error) {
    console.log(error)
  }
}

export async function getRooms(dispatch) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "auth-token": JSON.parse(localStorage.getItem("currentUser")).token},
  };
  try {
    let response = await fetch(`${ROOT_URL}/api/getRooms`, requestOptions);
    let data = await response.json();
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
    headers: { "Content-Type": "application/json", "auth-token": JSON.parse(localStorage.getItem("currentUser")).token},
  };
  try {
    let response = await fetch(`${ROOT_URL}/api/getDefaultFilters`, requestOptions);
    let data = await response.json();
    dispatch({ type: "DEFAULT_FILTER_LIST", payload: data });
    console.log(data)
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error + "try catch actions getRooms");
  }
}

export async function setNewPlayer(values) {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "auth-token": JSON.parse(localStorage.getItem("currentUser")).token },
    body: JSON.stringify(values)
  };
  console.log(values)
  try {
    let response = await fetch(`${ROOT_URL}/api/setPlayerData`, requestOptions);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error + "try catch actions setPlayer");
  }
}

export async function getGroups(dispatch) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "auth-token": JSON.parse(localStorage.getItem("currentUser")).token },
  };
  try {
    let response = await fetch(`${ROOT_URL}/api/getGroups`, requestOptions);
    let data = await response.json();
    dispatch({ type: "GROUPS", payload: data });
    console.log(data)
    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error + "try catch actions getRooms");
  }
}

export async function setNewGroup(values) {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "auth-token": JSON.parse(localStorage.getItem("currentUser")).token },
    body: JSON.stringify(values)
  };
  console.log(values)
  try {
    let response = await fetch(`${ROOT_URL}/api/setGroup`, requestOptions);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error + "try catch actions setPlayer");
  }
}

export const getGroupDataByFilter = async (dispatch, options) => {

  try {

    let url = `${ROOT_URL}/api/getDefaultGroupFiltersData`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": JSON.parse(localStorage.getItem("currentUser")).token },
      body: JSON.stringify(options)
    };

    let response = await fetch(url, requestOptions);
    let data = await response.json();
    console.log(data);
    dispatch({ type: "GET_GROUPDATA_BY_FILTER", payload: data });
  }
  catch (error) {
    console.log(error)
  }
}