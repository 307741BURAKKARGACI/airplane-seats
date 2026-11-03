/* Data Access Object (DAO) module*/
const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('seats.sqlite', (err) => {
  if (err) throw err;
});

  exports.getSeatsLocal = (type) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT '+type+' FROM seats';//local plane'i değişken olarak alırsan 3 tane yazmaktan kurtulursun
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  };

exports.addNewReservation = (reservation) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO seats(UserName, Local_Plane, Regional_Plane, International_Plane) VALUES (?, ?, ?, ?)';
    db.run(sql, [reservation.user, reservation.localPlaneSeats, reservation.regionalPlaneSeats,
                reservation.internationalPlaneSeats], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.deleteReservation = (userName) => {
  return new Promise ((resolve, reject) => {
    const sql= 'DELETE FROM seats WHERE UserName =?';

    db.run(sql, [userName], function(err) {
      if(err) {
        console.log(err);
        reject(err);
      }
      else resolve(/*this.lastID*/);
    });
  });
};
