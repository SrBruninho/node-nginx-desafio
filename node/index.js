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

var peopleList = [];

//const insert_sql = `INSERT INTO people(name) values('Teste_People')`;
//connection.query(insert_sql);

connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM people", function (err, result, fields) {
      if (err) throw err;
      result.forEach(function(entry) {
        peopleList.push(entry.name);
    });
   // console.log(peopleList);
    });
  });


app.get( '/',(req,res) =>{
   // res.send('<h1>Full Teste</h1>');
    res.send(
        peopleList.map(person =>{     
            `<h1>${person.name}</h1><br>
            `
            //`<h1>Full Teste</h1>`//'<li>'+person+'</li>'
            })
        );
});

app.listen(port, ()=>{
    console.log('Rodando na porta '+ port);
});