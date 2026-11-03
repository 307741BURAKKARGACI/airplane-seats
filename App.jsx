import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert } from 'react-bootstrap';
import Grids from './Components/GridComponent';
import Type from './Components/AirplaneType';
import RandomSelect from './Components/RandomSeats';
import ConfirmDelete from './Components/Confirm';
import React from 'react';
import { useEffect, useState } from 'react';
import API from './API';
import { LoginForm } from './Components/AuthComponents';
import NavHeader from './Components/NavbarComponents';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

function App() {
  const [selectedAirplane, setSelectedAirplane] = useState('');
  const [occupiedSeats1, setoccupiedSeats1] = useState([]);
  const [occupiedSeats2, setoccupiedSeats2] = useState([]);
  const [occupiedSeats3, setoccupiedSeats3] = useState([]);
  const [requestedSeats1, setrequestedSeats1] = useState([]);
  const [requestedSeats2, setrequestedSeats2] = useState([]);
  const [requestedSeats3, setrequestedSeats3] = useState([]);
  const [updateOccupied, setupdateOccupied] = useState(true);
  const [allUsernames, setallUsernames] = useState([]);
  const [username, setusername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [commonSeats1, setcommonSeats1] = useState([]);
  const [commonSeats2, setcommonSeats2] = useState([]);
  const [commonSeats3, setcommonSeats3] = useState([]);
  const [highlightState, sethighlightState] = useState(false);
  const [updateWithoutLogin, setupdateWithoutLogin] = useState(true);

  useEffect(()=> {
    // get all the seats from API for airplanes
    const getPlaneSeats = async () => {
      const seatNames1 = await API.getPlaneSeats('Local_Plane');
      setoccupiedSeats1(seatNames1);
      const seatNames2 = await API.getPlaneSeats('Regional_Plane');
      setoccupiedSeats2(seatNames2);
      const seatNames3 = await API.getPlaneSeats('International_Plane');
      setoccupiedSeats3(seatNames3);
      const userNames = await API.getPlaneSeats('UserName');
      setallUsernames(userNames);
    }
    getPlaneSeats();
  }, [updateOccupied]);//every time user clicked to confirm button, "updateOccupied" changes and new seatNames are read from database

  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo(); // we have the user info here
      setusername(`${user.name}`);
      setLoggedIn(true);
    };
    checkAuth();
  }, []);


  useEffect(() => {
    const updateSeatTable = async () => {
      ShowAirplaneReservations();
    };
    updateSeatTable();
  }, [selectedAirplane, requestedSeats1.length, requestedSeats2.length, requestedSeats3.length,
    occupiedSeats1.length, occupiedSeats2.length, occupiedSeats3.length,highlightState, updateWithoutLogin]);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
      setusername(`${user.name}`);

      setTimeout(function() {//seat table updated
        if(updateWithoutLogin===true) setupdateWithoutLogin(false);//when the user logged out the screen should be updated
        else setupdateWithoutLogin(true);
      }, 20);
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };
  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage('');
    if(updateWithoutLogin===true) setupdateWithoutLogin(false);//when the user logged out the screen should be updated
    else setupdateWithoutLogin(true);
  };
  const handleSelectedAirplaneChange = (option) => {
    setSelectedAirplane(option);
  };

  const ShowAirplaneReservations = () => {
    const columnNamesInternational=['A','B','C','D','E','F'];
    for(let j=0;j<7;j++){
      for(let i=1;i<26;i++){
        const checkbox = document.getElementById(i+columnNamesInternational[j]);
        if(checkbox){
          checkbox.checked=false;
          checkbox.disabled = false;
        }
      }
    }
    switch (selectedAirplane) {
      case 'local':
        for(let i=0; i<requestedSeats1.length ; i++){
          const checkbox = document.getElementById(requestedSeats1[i]);
          if(checkbox) {checkbox.checked=true;}
        }
      for(let i=0; i<occupiedSeats1.length ; i++){
        const checkbox = document.getElementById(occupiedSeats1[i]);
        if(checkbox){
          checkbox.checked=true;
          checkbox.disabled = true;
        }
      }
      for(let i=0; i<commonSeats1.length ; i++){
        const checkbox = document.getElementById(commonSeats1[i]);
        if(highlightState){
          checkbox.style.outline = '2px solid red';
        }else{
          checkbox.style.outline = '2px solid transparent';
        }
      }
        break;
      case 'regional':
        for(let i=0; i<requestedSeats2.length ; i++){
          const checkbox = document.getElementById(requestedSeats2[i]);
          if(checkbox) {checkbox.checked=true;}
        }
        for(let i=0; i<occupiedSeats2.length ; i++){
          const checkbox = document.getElementById(occupiedSeats2[i]);
          if(checkbox){
            checkbox.checked=true;
            checkbox.disabled = true;
          }
        }
        for(let i=0; i<commonSeats2.length ; i++){
          const checkbox = document.getElementById(commonSeats2[i]);
          if(highlightState){
            checkbox.style.outline = '2px solid red';
          }else{
            checkbox.style.outline = '2px solid transparent';
          }
        }
        break;
      case 'international':
        for(let i=0; i<occupiedSeats3.length ; i++){
          const checkbox = document.getElementById(occupiedSeats3[i]);
          if(checkbox){
            checkbox.checked=true;
            checkbox.disabled = true;
          }
        }
        for(let i=0; i<requestedSeats3.length ; i++){
          const checkbox = document.getElementById(requestedSeats3[i]);
          if(checkbox) {checkbox.checked=true;}
        }
        for(let i=0; i<commonSeats3.length ; i++){
          const checkbox = document.getElementById(commonSeats3[i]);
          if(highlightState){
            checkbox.style.outline = '2px solid red';
          }else{
            checkbox.style.outline = '2px solid transparent';
          }
        }
        break;
      default:
        break;}

        if(!loggedIn){// if there is no loggedin user, all the tables should be disabled
          for(let j=0;j<7;j++){
      
            for(let i=1;i<26;i++){
              const checkbox = document.getElementById(i+columnNamesInternational[j]);
              if(checkbox){
                checkbox.disabled = true;
              }
            }
          }
        }
  };
  return ( 
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={         
            loggedIn ? <Navigate replace to='/' /> : <LoginForm login={handleLogin} 
            setupdateWithoutLogin={setupdateWithoutLogin}  updateWithoutLogin={updateWithoutLogin} message={message} setMessage={setMessage}/>
          }
          />
          <Route path="/" element={
            <div>
              <NavHeader loggedIn={loggedIn} handleLogout={handleLogout} />
              <Container fluid className="mt-3">
                {message && <Row>
                  <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
                </Row> }
                <Outlet/>
              </Container>
              <Type
                selectedAirplane={selectedAirplane} onSelectedAirplaneChange={handleSelectedAirplaneChange}
              />
              <RandomSelect loggedIn={loggedIn} selectedAirplane={selectedAirplane} 
              requestedSeats1={requestedSeats1} requestedSeats2={requestedSeats2} requestedSeats3={requestedSeats3} 
              occupiedSeats1={occupiedSeats1} occupiedSeats2={occupiedSeats2} occupiedSeats3={occupiedSeats3}
              setrequestedSeats1={setrequestedSeats1} setrequestedSeats2={setrequestedSeats2} setrequestedSeats3={setrequestedSeats3}/>
              
              <Grids selectedAirplane={selectedAirplane}  setrequestedSeats1={setrequestedSeats1} 
                      setrequestedSeats2={setrequestedSeats2}  setrequestedSeats3={setrequestedSeats3}/>
              
              <ConfirmDelete loggedIn={loggedIn} requestedSeats1={requestedSeats1} requestedSeats2={requestedSeats2} 
              requestedSeats3={requestedSeats3} setrequestedSeats1={setrequestedSeats1} setrequestedSeats2={setrequestedSeats2}  
              setrequestedSeats3={setrequestedSeats3} username={username} allUsernames={allUsernames}
              setcommonSeats1={setcommonSeats1} setcommonSeats2={setcommonSeats2} setcommonSeats3={setcommonSeats3}
              sethighlightState={sethighlightState} updateOccupied={updateOccupied} setupdateOccupied={setupdateOccupied}
              selectedAirplane={selectedAirplane}/>

              <h3>Total Seat Number : {selectedAirplane==='local'? '60': selectedAirplane==='regional'? '100': '150'}</h3>
              <h3>Available Seats : {selectedAirplane==='local'? 60-requestedSeats1.length-occupiedSeats1.length:
               selectedAirplane==='regional'? 100-requestedSeats2.length-occupiedSeats2.length:
               150-requestedSeats3.length-occupiedSeats3.length}</h3>
               <h3>Requested Seats : {selectedAirplane==='local'? requestedSeats1.length:
                selectedAirplane==='regional'? requestedSeats2.length: requestedSeats3.length}</h3>
              <h3>Occupied Seats : {selectedAirplane==='local'? occupiedSeats1.length:
               selectedAirplane==='regional'? occupiedSeats2.length: occupiedSeats3.length}</h3>
            </div>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
