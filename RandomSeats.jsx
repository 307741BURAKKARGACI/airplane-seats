import { useState } from 'react'
import React from 'react';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function RandomSelect(props){

    const [numberOfRandom, setnumberOfRandom] = useState(0);
    const [warningMessage, setwarningMessage] = useState('');
    
    function generateRandomSeat() {
        let selectedLetters = '';
        let selectedMax = 0;
    
        if (props.selectedAirplane === 'local') {
          selectedLetters = 'ABCD';
          selectedMax = 15;
        } else if (props.selectedAirplane === 'regional') {
          selectedLetters = 'ABCDE';
          selectedMax = 20;
        } else if (props.selectedAirplane === 'international') {
          selectedLetters = 'ABCDEF';
          selectedMax = 25;
        }
    
        const randomIndex = Math.floor(Math.random() * selectedLetters.length);//Math.random() creates a value between 0-1
        const randomLetter = selectedLetters[randomIndex];
    
        const min = 1;
        const randomNumber = Math.floor(Math.random() * (selectedMax - min + 1)) + min;
    
        return randomNumber + randomLetter;
      }
 
      function assignRandomSeat() {
      
        if (props.selectedAirplane === 'local') {
            const mergedArray = props.occupiedSeats1.concat(props.requestedSeats1);
            const uniqueSeats = new Set(mergedArray);//if it is defined as "new Set()", all the elements are gonna be unique in the array
            const totalSize=+uniqueSeats.size + +numberOfRandom// "+" is added because it was concatenating not summing
            
            if(totalSize<=60){
              while (uniqueSeats.size < totalSize) {//end of this loop numberOfRandom seats will be generated
                const newRandomSeat = generateRandomSeat();
                uniqueSeats.add(newRandomSeat);
              }
              for(let i=0;i<props.occupiedSeats1.length;i++){
                uniqueSeats.delete(props.occupiedSeats1[i]);
              }
              const requestedSeatsArray = Array.from(uniqueSeats);
              props.setrequestedSeats1(requestedSeatsArray);
            }else{
              setwarningMessage({msg:'There is no enough seats!',type: 'danger'});
            }

          } 
          else if (props.selectedAirplane === 'regional') {
            const mergedArray = props.occupiedSeats2.concat(props.requestedSeats2);
            const uniqueSeats = new Set(mergedArray);//if it is defined as "new Set()", all the elements are gonna be unique in the array
            const totalSize=+uniqueSeats.size + +numberOfRandom// "+" is added because it was concatenating not summing

            if(totalSize<=100){
              while (uniqueSeats.size < totalSize) {//end of this loop numberOfRandom seats will be generated
                const newRandomSeat = generateRandomSeat();
                uniqueSeats.add(newRandomSeat);
              }
              for(let i=0;i<props.occupiedSeats2.length;i++){
                uniqueSeats.delete(props.occupiedSeats2[i]);
              }
              const requestedSeatsArray = Array.from(uniqueSeats);
              props.setrequestedSeats2(requestedSeatsArray);
            }else{
              setwarningMessage({msg:'There is no enough seats!',type: 'danger'});
            }

          } else if (props.selectedAirplane === 'international') {            
            const mergedArray = props.occupiedSeats3.concat(props.requestedSeats3);
            const uniqueSeats = new Set(mergedArray);//if it is defined as "new Set()", all the elements are gonna be unique in the array
            const totalSize=+uniqueSeats.size + +numberOfRandom// "+" is added because it was concatenating not summing

            if(totalSize<=150){
              while (uniqueSeats.size < totalSize) {//end of this loop numberOfRandom seats will be generated
                const newRandomSeat = generateRandomSeat();
                uniqueSeats.add(newRandomSeat);
              }
              for(let i=0;i<props.occupiedSeats3.length;i++){
                uniqueSeats.delete(props.occupiedSeats3[i]);
              }
              const requestedSeatsArray = Array.from(uniqueSeats);
              props.setrequestedSeats3(requestedSeatsArray);
            }else{
              setwarningMessage({msg:'There is no enough seats!',type: 'danger'});
            }
          }
        return;
      }

    const handleRandom = async (event) => {
        event.preventDefault();
        assignRandomSeat();
    };
    const handleInputChange = (event) => {
        const value = event.target.value;
        setnumberOfRandom(value);
    };

    return (
        <div className='container'>
          <form>
                <div className="mb-1">
                    <label htmlFor="requestedNumber" className="form-label" >
                    How many seats do you need?
                    </label>
                    <input
                    type="number"
                    className="form-control"
                    id="requestedNumber1"
                    disabled={props.loggedIn ? false : true}
                    onChange={handleInputChange}
                    min="1"

                    />
                    <Container fluid className="mt-3">
                      {warningMessage && <Row>
                        <Alert variant={warningMessage.type} onClose={() => setwarningMessage('')} dismissible>{warningMessage.msg}</Alert>
                      </Row> }
                      <Outlet/>
                    </Container>
                </div>
                <button 
                type="submit" 
                className="btn btn-primary mb-3" 
                onClick={handleRandom}
                disabled={props.loggedIn ? false : true}>
                    Assign Random Seats
                </button>
            </form>
            
        </div>
      );
}

export default RandomSelect
