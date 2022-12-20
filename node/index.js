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

const { uniqueNamesGenerator, names, colors } = require('unique-names-generator');

var peopleList = [];

app.get( '/',(req,res) =>{
    const randomName = uniqueNamesGenerator({ dictionaries: [names, colors] });
    const insert_sql = "INSERT INTO people(name) values('"+randomName+"')";
    
    connection.query(insert_sql);

    connection.query("SELECT name FROM people", function (err, result, fields) {
       peopleList = result;        
    });  

    res.write("<h1>Full Cycle Rocks!</h1>");

    peopleList.forEach(p => {
            res.write("<li>"+p.name+"</li>");
        });

    res.end();
});

app.listen(port, ()=>{
    console.log('Rodando na porta '+ port);
});