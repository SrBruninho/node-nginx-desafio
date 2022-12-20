const express = require('express');
const app = express();
const port = 3000;
const config ={
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
}
const mysql = require('mysql');

const connection = mysql.createConnection( config );

const { uniqueNamesGenerator, adjectives, colors, names } = require('unique-names-generator');

const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, names] });


var peopleList = [];
const insert_sql = "INSERT INTO people(name) values('"+randomName+"')";


connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM people", function (err, result, fields) {
      if (err) throw err;
      result.forEach(function(entry) {
        peopleList.push(entry.name);
    });
    });
  });
  connection.query(insert_sql);

app.get( '/',(req,res) =>{
   res.send("<html><body><h1>Full Cycle Rocks!</h1></body>"+peopleList+"</html>");
});

app.listen(port, ()=>{
    console.log('Rodando na porta '+ port);
});