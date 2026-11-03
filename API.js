const SERVER_URL = 'http://localhost:3001';

const getPlaneSeats = async (type) => {
  const response = await fetch(SERVER_URL + '/api/seats/'+type);
  if(response.ok) {
    const questionsJson = await response.json();
    return questionsJson;
  }
  else
    throw new Error('Internal server error');
}
const addReservation = async (newReservation) => {
  const response = await fetch(`${SERVER_URL}/api/seats/addNew`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: newReservation.user, localPlaneSeats: newReservation.localPlaneSeats, 
      regionalPlaneSeats: newReservation.regionalPlaneSeats, internationalPlaneSeats:newReservation.internationalPlaneSeats})
  });

  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
}
const deleteReservation = async (type) => {

  const response = await fetch(`${SERVER_URL}/api/reservations/delete/`+type, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  });

  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
}

const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};
const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  // an object with the error coming from the server
  }
};

const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}

const API = {getPlaneSeats, addReservation, deleteReservation, logIn, getUserInfo, logOut };
export default API;