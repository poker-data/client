import { ROOT_URL } from "../Config/constants";
import axios from "axios";

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    //mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    let data = await response.json();
    // console.log("request login response: ", response);
    data.role = data.user.role;
    data.imageLink = data.user.imageLink;

    if (data.user) {
      // console.log(data);
      localStorage.setItem("currentUser", JSON.stringify(data));
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.err });

    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    // console.log(error + "try catch actions login");
  }
}

export async function logout(dispatch) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    
  };
  let response = await fetch(`${ROOT_URL}/logout`, requestOptions);
  let data = await response.json();
  // console.log(data);

  if (data.status === "loggedout") {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("imageLink");
    // localStorage.clear();
    dispatch({ type: "LOGOUT" });
  } else {
    alert("Error al cerrar sesión");
  }
}
export async function getPlayerStats(dispatch, name,body) {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };

  console.log("name: ", name);

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
    headers: { "Content-Type": "application/json" },
  };
  try {
    let response = await fetch(`${ROOT_URL}/api/getPlayers`, requestOptions);
    let data = await response.json();
    console.log("Players: ",data);
    dispatch({ type: "GET_PLAYERS", payload: data });
    return data;
  } catch (error) {
     dispatch({ type: "LOGIN_ERROR", error: error });
     console.log(error + "try catch actions getPlayers");
  }
}

export  const getPlayerByFilter = async (dispatch, options) => {
  const name = options.playerName;
  const _id = options._id;
  const dateFrom = options.dateFrom || null;
  const dateTo = options.dateTo || null;
  console.log(options)

  try {
    const dateNow = new Date();
    let dateNowToFilter =  dateNow.getTime()
    dateNowToFilter = dateTo ? dateTo : dateNowToFilter

    let url = `${ROOT_URL}/api/playerData/${name}`;
    let body = { filter: null, _id: _id }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    };
    if (dateFrom && dateTo) {
    let filterString = `?filter=Date:${dateFrom}~${dateNowToFilter}`
    body.filter = filterString
  }

    console.log("body: ", body);


/*     let response = await fetch(url, requestOptions);
    let data = await response.json();
     console.log(data);
    dispatch({ type: "GET_PLAYER_BY_FILTER", payload: data }); */
}
catch (error) {
  console.log(error)
}
}

export async function getRooms (dispatch){
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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
