const express = require("express"); // 라우터 기능을 불러오기위해 express 가져오기
const Messagerouter = express.Router();
const conn = require("../config/DBConfig.js")
//DB정보등록(conn)


//app.js 미들웨어 등록해주기

Messagerouter.get("/Message", (req,res) => {
    res.render("message", {
        user : req.session.user       // 로그인 x : null 값이 넘어감
    });
})

Messagerouter.get("/MessageLogout", (req,res) => {
    
    delete req.session.user;  // 삭제

    res.redirect("http://127.0.0.1:3001/Message");      // Message.ejs실행 => null값이 렌더링됨

})

Messagerouter.post("/MessageJoin", (req, res) =>{

    let email = req.body.email;
    let pw = req.body.pw;
    let tel = req.body.tel;
    let address = req.body.address;

    let sql = "insert into web_member values(?, ?, ?, ?, now())"; // ?의 순서대로 아래 [] 안에 적어주기

    conn.query(sql, [email, pw, tel, address], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("입력실패 : " + err);

        } else if (row.affectedRows > 0) {

            console.log("명령에 성공한 수 : " + row.affectedRows);
            res.redirect("http://127.0.0.1:3001/Message");

        } else if (row.affectedRows == 0) {

            console.log("삭제된 값이 없습니다.");
        }
    })  

});

// Login기능 구현하시오.
// 1. message.ejs에 form수정
// 2.MessageLogin라우터를 구현
// 3. 로그인 성공 후 Message 페이지로 이동

Messagerouter.post('/MessageLogin', (req, res) => {
    /*     console.log("ID :" + req.body.id);
        console.log("PW : "+req.body.pw); */

    let email = req.body.email;
    let pw = req.body.pw;

    let sql = "Select * from web_member where email = ? and pw = ?";

    conn.query(sql, [email, pw], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("검색이 실패했습니다." + err);
        } else if (row.length > 0) {        // row : 로그인에 성공한 사람의 email, tel, pw, adress다 저장되어있음
            // 로그인성공 부분
            // loginS.html을 ejs파일로 변경하여 views 이동 v
            // Login라우터에서 Login.ejs파일을 랜더링v
            // 랜더링 할 때 로그인에 성공한 id값을 전송v
            // ejs파일에서 로그인에성공한 id값을 출력

            req.session.user = {        // user라는 값안에 저장되는 데이터들
                "email" : row[0].email,
                "tel" : row[0].tel,
                "address" : row[0].address
            };

            console.log("session 영역에 email저장 성공" + req.session.user);
            res.render("message", {
                user : req.session.user       // 로그인에 성공한사람의 정보값을 가져갈 수 있게함
                // -> 바로 ejs파일로 넘어가게됨
            })
            
        } else if (row.length == 0) {
            // 로그인 실패 부분
            res.redirect("http://127.0.0.1:5500/nodejs/public/ex05LoginF.html");
        }
    })

    /* if (id == 'smart' && pw == '123') {
        res.redirect ("http://127.0.0.1:5500/nodejs/public/ex05Logins.html");       // 경로 재설정해줌
    } else 
        res.redirect ("http://127.0.0.1:5500/nodejs/public/ex05LoginF.html"); */


});



module.exports = Messagerouter;