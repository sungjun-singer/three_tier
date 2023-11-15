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

app.get("/api/todo",  (req, res) => {
    const sql = 'SELECT * from todo';
    // 쿼리 실핼
    connection.query(sql, function (error, results, fields) {
        if (error) {
            console.error("Error executing SQL query:", error);
            return res.status(500).send("Internal Server Error");
        }
        res.status(200).send(JSON.parse(JSON.stringify(results)));
    });
})

app.post("/api/todo", (req, res) => {
    const { text, done } = req.body;

    // 플레이스홀더를 사용하여 SQL 쿼리 작성
    const sql = 'INSERT INTO test.todo (text, done) VALUES (?, ?)';
    const values = [text, done];

    // 쿼리 실행
    connection.query(sql, values, function (error, results, fields) {
        if (error) {
            console.error("Error executing SQL query:", error);
            return res.status(500).send("Internal Server Error");
        }

        console.log(results);
        res.send("success");
    });
})

// connection.end();

app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 실행중입니다.`);
})



 
