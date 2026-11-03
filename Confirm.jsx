import { useState } from 'react'
import React from 'react';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {newReservation} from '../Model';
import API from '../API';
import { Container, Row, Alert } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function ConfirmDelete(props){
  const [warningMessage, setwarningMessage] = useState('');
 
  const handleShowOnTable = async (event) => {//requested data sent to database

      const seatNames1 = await API.getPlaneSeats('Local_Plane');
      const seatNames2 = await API.getPlaneSeats('Regional_Plane');
      const seatNames3 = await API.getPlaneSeats('International_Plane');

      const commonElements1 = seatNames1.filter(element => props.requestedSeats1.includes(element));
      const commonElements2 = seatNames2.filter(element => props.requestedSeats2.includes(element));
      const commonElements3 = seatNames3.filter(element => props.requestedSeats3.includes(element));
      if(commonElements1.length!==0 || commonElements2.length!==0 ||commonElements3.length!==0){
        props.setcommonSeats1(commonElements1);
        props.setcommonSeats2(commonElements2);
        props.setcommonSeats3(commonElements3);
        props.sethighlightState(true);
        setTimeout(function() {
          props.sethighlightState(false);
        }, 5000);

        setwarningMessage({msg:'Highlighted seats are occupied',type: 'danger'});

      }else{

        const localSeats = props.requestedSeats1.join(',');//all the elements are converted in a single string. all members are seperated by ","
        const regionalSeats = props.requestedSeats2.join(',');
        const internationalSeats = props.requestedSeats3.join(',');
        
        if(props.selectedAirplane==='local')
        {
          if(!props.allUsernames.includes(props.username+"1")){
            
            const newreservation = new newReservation(props.username+"1", localSeats, "", "");
            await API.addReservation(newreservation);
            setwarningMessage({msg:'Reservation is successfully completed!',type: 'success'});

          }
          else{
            setwarningMessage({msg:'This user already has a reservation for this plane!',type: 'danger'});
          }
        }
        else if(props.selectedAirplane==='regional') 
        {
          if(!props.allUsernames.includes(props.username+"2")){

            const newreservation = new newReservation(props.username+"2", "", regionalSeats, "");
            await API.addReservation(newreservation);
            setwarningMessage({msg:'Reservation is successfully completed!',type: 'success'});
          }
          else{
            setwarningMessage({msg:'This user already has a reservation for this plane!',type: 'danger'});
          }
        }
        else if(props.selectedAirplane==='international') 
        {
          if(!props.allUsernames.includes(props.username+"3")){

            const newreservation = new newReservation(props.username+"3", "", "", internationalSeats);
            await API.addReservation(newreservation);
            setwarningMessage({msg:'Reservation is successfully completed!',type: 'success'});
          }
          else{
            setwarningMessage({msg:'This user already has a reservation for this plane!',type: 'danger'});
          }
        }
      }
      if(props.updateOccupied){
        props.setupdateOccupied(false);
      }
      else{
        props.setupdateOccupied(true);
      }
      props.setrequestedSeats1([]);
      props.setrequestedSeats2([]);
      props.setrequestedSeats3([]);
  };     
    const handleCancel = async (event) => {
      props.setrequestedSeats1([]);
      props.setrequestedSeats2([]);
      props.setrequestedSeats3([]);
    }
    const Delete = async (event) => {

      if(props.selectedAirplane==='local')
      {
        await API.deleteReservation(props.username+"1");
      }
      if(props.selectedAirplane==='regional')
      {
        await API.deleteReservation(props.username+"2");
      }
      if(props.selectedAirplane==='international')
      {
        await API.deleteReservation(props.username+"3");
      }
      if(props.updateOccupied){
        props.setupdateOccupied(false);
      }
      else{
        props.setupdateOccupied(true);
      }
    }

return(
  <>
    <Container fluid className="mt-3">
      {warningMessage && <Row>
        <Alert variant={warningMessage.type} onClose={() => setwarningMessage('')} dismissible>{warningMessage.msg}</Alert>
      </Row> }
      <Outlet/>
    </Container>
    <div className='container'>
      <button 
      type="submit" 
      className="btn btn-primary mt-3 mb-3" 
      disabled={props.loggedIn ? false : true}
      onClick={handleShowOnTable}>
          CONFIRM
      </button>
      <button 
      type="submit" 
      className="btn btn-danger mt-3 mb-3" 
      disabled={props.loggedIn ? false : true}
      onClick={handleCancel}>
          CANCEL
      </button>
    </div>
    <div className='container'>
      <button 
      type="submit" 
      className="btn btn-danger mb-3" 
      disabled={props.loggedIn ? false : true}
      onClick={Delete}>
          Delete Reservation
      </button>
    </div>
  </>
    );
}

export default ConfirmDelete



