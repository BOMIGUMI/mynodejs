const express = require("express");
const ex2router = express.Router();
const conn = require("../config/DBConfig.js");

ex2router.post('/ex02', (req, res) => {

    let id = req.body.ID;
    let pw = req.body.PW;


    conn.query(sql, [id, pw], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("검색이 실패했습니다." + err);
        } else if (row.length > 0) {        


            req.session.user = {        
                "id" : row[0].id,
                "pw" : row[0].pw,
            };

            console.log("session 영역에 email저장 성공" + req.session.user);
            console.log("session 영역에 email저장 성공" + req.session.user);
            res.redirect("http://127.0.0.1:3001/ex02");
            
        } else if (row.length == 0) {
            res.redirect("http://127.0.0.1:5500/nodejs/public/ex05LoginF.html");
        }
    })




});

ex2router.get('/ex02', (req, res) => {
    let id = req.query.id;
    let sql = "Delete from member where id = (?)";

    conn.query(sql, [id], (err, row) => {
        if (!err) {
            console.log("명령에 성공한 수 : " + row.affectedRows);
            res.redirect("http://127.0.0.1:3001/ex02");
        } else if (row.affectedRows == 0) {
            console.log("삭제된 값이 없습니다.")
        } else {
            console.log("삭제실패 : " + err);
        }
    })

});

module.exports = ex2router;