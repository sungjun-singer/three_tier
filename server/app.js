const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors());

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'test'
});

connection.connect();
 
connection.query('SELECT * FROM user', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
// connection.query("INSERT INTO test.user(userid, username) values ('민준', '코딩맨')", function(error, results, fields) {
//     if(error) throw error;
//     console.log(results);
// })

connection.end();


const todoList = [
    {
        id : 1,
        text : "할일1",
        done : false,
    }
]

let id = 2;

app.get("/api/todo", (req, res) => {
    res.json(todoList);
})

app.post("/api/todo", (req, res) => {
    // console.log(req.body);
    const {text, done} = req.body;
    
    todoList.push({
        id : id++,
        text,
        done,
    })
    res.send("success");
})

app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 실행중입니다.`);
})



 
