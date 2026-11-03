'use strict';

function newReservation(user, localPlaneSeats, regionalPlaneSeats, internationalPlaneSeats) {
  this.user = user;
  this.localPlaneSeats = localPlaneSeats;
  this.regionalPlaneSeats = regionalPlaneSeats;
  this.internationalPlaneSeats = internationalPlaneSeats;
}

export { newReservation };