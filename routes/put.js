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

module.exports.putStudent = (event, context, callback) => {
  console.log('event', event.body);
  const putStudent = `UPDATE ${table} SET name = $1, grade = $2 WHERE id = $3;`;
  let {name, grade, id} = event.body;

  pool.connect()
    .then(client => {
      client.release();
      return client.query(putStudent, [name, grade]);
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
    .catch(error=>{
      console.log('error', error);
    })
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
