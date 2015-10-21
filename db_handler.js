var oracledb = require('oracledb');
var dbConfig = require('./db_config.js');

var connection = {
  user: dbConfig.user,
  password: dbConfig.password,
  connectString: dbConfig.connectString
};

var defaultCallback = function (err, result) {
  if (err) {
    callback(err.message);
  } else {
    callback(null, result);
  }
};

module.exports = {
  addTodo: function (id, text, callback) {
    oracledb.getConnection(
      connection,
      function (err, connection) {
        if (err) {
          callback(err);
          return;
        }
        connection.execute(
          'INSERT INTO TODO VALUES (:id, :text, false)',
          [id, text],
          function (err, result) {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          }
        );
      });
  },
  getAll: function (callback) {
    this.getAllWhere('*', callback);
  },
  getAllWhere: function (condition, callback) {
    oracledb.getConnection(
      connection,
      function (err, connection) {
        if (err) {
          callback(err);
          return;
        }
        connection.execute(
          'SELECT * FROM TODO WHERE :condition',
          [condition],
          function (err, result) {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          }
        )
      }
    )
  },
  init: function (callback) {
    oracledb.getConnection(
      connection,
      function (err, connection) {
        if (err) {
          callback(err);
          return;
        }
        connection.execute(
          'SELECT * FROM TODO',
          function (err, result) {
            if (err) {
              connection.execute(
                'CREATE TABLE TODO (id VARCHAR(36), text VARCHAR(36), complete NUMBER(1))',
                function (err, result) {
                  if (err) {
                    console.log(err);
                    callback(err);
                  } else {
                    callback(null, result);
                  }
                }
                );
            } else {
              // we're good
            }
          });
      });
  }
};
