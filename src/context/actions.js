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
    /*   let data = {
      user: "oscar",
      auth_token:"secret-token"
    }; */

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
export async function getPlayerStats(dispatch, name) {

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
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

/* export async function getClients(dispatch) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  try {
    let response = await fetch(`${ROOT_URL}/api/customers`, requestOptions);
    let data = await response.json();
    // console.log(data);
    dispatch({ type: "GET_CUSTOMERS", payload: data });
    return data;
  } catch (error) {
    // dispatch({ type: "LOGIN_ERROR", error: error });
    // console.log(error + "try catch actions getClients");
  }
}
export async function getClient(dispatch, id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(`${ROOT_URL}/api/customer/${id}`, requestOptions);
  let data = await response.json();
  dispatch({ type: "GET_CUSTOMER", payload: data });
  return data;
}

export async function addNewClient(newClient, history) {
  // console.log("new client ");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newClient),
  };
  let response = await fetch(`${ROOT_URL}/api/customer`, requestOptions);
  let data = await response.json();
  history.go(0);
  // console.log("new client" + data);
  return data;
}

export async function modifyClientBy_id(_id, body, history) {
  // console.log("modifying client ");
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  let response = await fetch(`${ROOT_URL}/api/customer/${_id}`, requestOptions);
  let data = await response.json();
  // console.log("modifying client" + data);
  history.go(0);
  return data;
}

export async function uploadImgBy_id(_id, data) {
  const response = await axios.post(
    `${ROOT_URL}/api/users/img/${_id}`,
    data,
    {}
  );
  return response;
}

export async function deleteClientById(_id, history) {
  // console.log(_id);
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(`${ROOT_URL}/api/customer/${_id}`, requestOptions);
  let data = await response.json();
  history.go(0);
  return data;
}

export async function getUsers(dispatch) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(`${ROOT_URL}/api/users`, requestOptions);
  let data = await response.json();
  // console.log(data);
  dispatch({ type: "GET_USERS_LIST", payload: data });
  return data;
}
export async function getUser(dispatch, id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(`${ROOT_URL}/api/users/${id}`, requestOptions);
  let data = await response.json();
  // console.log(data);
  dispatch({ type: "GET_USER", payload: data });
  return data;
}
export async function addNewUser(newUser, history) {
  // console.log("new user ");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  };
  let response = await fetch(`${ROOT_URL}/register`, requestOptions);
  let data = await response.json();
  history.go(0);
  // console.log("new user" + data);
  return data;
}

export async function modifyUserBy_id(_id, body, history) {
  // console.log(body);
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  let response = await fetch(`${ROOT_URL}/api/users/${_id}`, requestOptions);
  let data = await response.json();
  history.go(0);
  return data;
}

export async function deleteUserById(_id, history) {
  // console.log(_id);
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(`${ROOT_URL}/api/users/${_id}`, requestOptions);
  let data = await response.json();
  history.go(0);
  return data;
}

export async function getInvoices(dispatch) {
  try {
    // console.log("getting invoices");
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(`${ROOT_URL}/api/invoice`, requestOptions);
    let data = await response.json();
    // console.log(data);
    dispatch({ type: "GET_INVOICES", payload: data });
    return data;
  } catch (e) {
    // console.log("get invoices error ", e);
  }
}

export async function getInvoiceById(_id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  try {
    let response = await fetch(
      `${ROOT_URL}/api/invoice/${_id}`,
      requestOptions
    );
    let data = await response.json();
    return data;
  } catch (e) {
    // console.log("get invoice by id error ", e);
  }
}

export async function addInvoice(dispatch, body) {
  // console.log(body);
  // console.log("adding invoice: ", body);
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  let response = await fetch(`${ROOT_URL}/api/invoice`, requestOptions);
  let data = await response.json();
  // console.log(data);
  dispatch({ type: "NEW_INVOICE", payload: data });
  return data;
}

export async function sendInvoiceToHistory(_id, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  let response = await fetch(
    `${ROOT_URL}/api/invoice/sendToHistory/${_id}`,
    requestOptions
  );
  let data = await response.json();
  // console.log(data);
  return data;
}

export async function removeInvoiceFromHistory(_id, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  let response = await fetch(
    `${ROOT_URL}/api/invoice/removeFromHistory/${_id}`,
    requestOptions
  );
  let data = await response.json();
  // console.log(data);
  return data;
}

export async function modifyInvoiceById(id, body) {
  // console.log("modifying ", body);
  //console.log(body + " ----- " + id);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  let response = await fetch(`${ROOT_URL}/api/invoice/${id}`, requestOptions);
  let data = await response.json();
  // console.log(data);
  return data;
}

export async function deleteInvoiceById(id) {
  // console.log(id);
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(`${ROOT_URL}/api/invoice/${id}`, requestOptions);
  let data = await response.json();
  return data;
} */