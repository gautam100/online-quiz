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
  } //login end


  static signup(email, password, mobile, user_type) {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO users (email, password, mobile, user_type) VALUES (?, ?, ?, ?)`,
        [email, password, mobile, user_type],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
} // class end

module.exports = authModel;
