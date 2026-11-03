[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/TsciYmrA)
# Exam #2: "Airplane Seats"

## Student: s307741 KARGACI BURAK 

# Server side

## API Server

- POST `/api/seats/addNew` : adds new reservation
- POST `/api/sessions` :saves the user in the session
- GET `/api/seats/`+type : gets the occupied seats id's depends on a plane type
- GET `/api/sessions/current` : gets the information of user who is logged in
- DELETE `/api/reservations/delete/`+type : deletes a reservation
- DELETE `/api/sessions/current` : removes the user from the session

## Database Tables

- Table `seats` - contains all the occupied seats of all type of airplanes accorrding to users (UserName, Local_Plane, Regional_Plane, International_Plane) 
- Table `user` - contains all users informations (email, password, salt, name)

# Client side

## React Client Application Routes

- Route `/`: main page that shows all airplane types and seats.
- Route `/login`: login page

## Main React Components

- `Type` (in `AirplaneType.jsx`): component that shows all airplane types to users
- `LoginForm` (in `AuthComponents.jsx`): login page
- `ConfirmDelete` (in `Confirm.jsx`): component that shows confirm, delete, cancel resevation options
- `Grids` (in `GridComponent.jsx`): component that shows visualisation of seats.
- `NavHeader` (in `NavbarComponents.jsx`): component that shows navbar that contain login/logout button on the top of the page.
- `RandomSelect` (in `RandomSeats.jsx`): component that shows random or manuel selection options.

# Usage info

## Example Screenshot

Main Page
![Screenshot](./client/src/img/reservationPage.png)
Login Page
![Screenshot](./client/src/img/logInPage.png)

## Users Credentials

- marco@polito.it	, marcomarco
- burak@polito.it	, burakburak
- sara@polito.it	, sarasara
- luca@polito.it	, lucaluca
