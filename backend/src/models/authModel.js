const connection = require("../config/connection");

class authModel {
  static login(userName, password) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM users WHERE email = '${userName}' AND password = '${password}'`,
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        }
      );
    });
  } //function
} // class end

module.exports = authModel;
