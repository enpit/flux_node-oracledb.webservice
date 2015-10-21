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
          callback(err.message);
          return;
        }
        connection.execute(
          'INSERT INTO TODO VALUES (:id, :text, false)', [id, text],
          defaultCallback
        );
      });
  },
  init: function (callback) {
    oracledb.getConnection(
      connection,
      function (err, connection) {
        if (err) {
          callback(err.message);
          return;
        }
        connection.execute(
          'SELECT * FROM TODO',
          function (err, result) {
            if (err) {
              connection.execute(
                'CREATE TABLE TODO (id VARCHAR(20), text VARCHAR(30), complete NUMBER(1))',
                defaultCallback);
            } else {
              // we're good
            }
          });
      });
  }
};
