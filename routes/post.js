'use strict';

const Pool = require('pg-pool');
const config = require('../config.json');
const { table, host, database, user, password, port } = config;
const pool = new Pool({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis: 1000
});

module.exports.getStudent = (event, context, callback) => {
  console.log('event', event.body);
  const getAllStudents = `INSERT INTO ${table} VALUES(default, $1, $2);`;

  pool.connect()
    .then(client => {
      client.release();
      return client.query(postStudent, [name, grade_level]);
    })
    .then(data => {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          message: data
        }),
      };

      callback(null, response)
    })
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
