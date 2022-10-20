const express = require("express");
const router = express.Router();         // express가 가지고있는 기능중에서 라우터 기능 사용을 선언해줌

const conn = require("../config/DBConfig.js");

router.get("/plus",(request, response) => {    // plus라우터 기능정의 및 등록, get 방식으로 가져옴, plus로 들어올때 함수가 실행됨 -> 미들웨어로 등록해줘야함
    console.log("/plus 라우터 호출");
    console.log(parseInt(request.query.num1)+parseInt(request.query.num2));                // html문서에 있는 name의 num1, num2를 가져오기  -> 웹페이지 화면에 나오게 해야함

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});        // 1.웹 브라우저에 응답 해주기 (표시해주기), 응답을 위한 비어있는 html 파일을 만들어준다?
    response.write("<html>");             // 2. html란에다가 글을 입력해줌
    response.write("<body>");
    response.write("응답성공<br>");
    response.write("결과값 : " + (parseInt(request.query.num1)+parseInt(request.query.num2)));          // 문자열 + 숫자열 = 문자열 이므로 숫자열 합을 하는 부분에다가 소괄호를 씌워준다
    response.write("</body>");  
    response.write("</html>");
    response.end();         // -> 3. end가 실행되면 html코드가 실행됨

});

router.get("/cal", (request, response) => {     // cal 라우터 기능정의 및 등록
    //1. 사용자가 입력한 값을 가져오기.
    let num1 = request.query.num1;
    let num2 = request.query.num2;
    let cal = request.query.cal;

    console.log(num1 + cal + num2);

    // 사용자가 입력한 기호에 맞는 연산결과값을 브라우저에 출력하세요.

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});      //1. 비어있는 html 파일 생성
    response.write("<html>");
    response.write("<body>");
    response.write("응답");
    if(cal == "+") {
        response.write("결과값 : " + (parseInt(num1)+parseInt(num2)))
    } else if(cal == "-") {
        response.write("결과값 : " + (parseInt(num1)-parseInt(num2)))
    } else if(cal == "*") {
        response.write("결과값 : " + (parseInt(num1)*parseInt(num2)))
    } else
        response/write("결과값 : " + (parseInt(num1)/parseInt(num2)))

    response.write("</body>");
    response.write("</html>");
    response.end();
});


router.post('/Grade', (req, res) => {           // post방식의 기능정의 및 등록

    const Grade = (parseInt(req.body.java)+parseInt(req.body.web)+parseInt(req.body.iot)+parseInt(req.body.android))/4
    console.log("이름 :" + req.body.name);
    console.log("자바 :" + req.body.java);
    console.log("웹 :" + req.body.web);
    console.log("IoT :" + req.body.iot);
    console.log("안드로이드 :" + req.body.android);

    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
    res.write("<html>");
    res.write("<bodyl>");
    res.write("<결과> <br>");
    res.write("이름 :" + req.body.name + '<br>');
    res.write("자바 :"+ (parseInt(req.body.java))+"<br>");
    res.write("웹 :"+ (parseInt(req.body.web))+ "<br>");
    res.write("IoT :"+ (parseInt(req.body.iot))+"<br>");
    res.write("안드로이드 :"+ (parseInt(req.body.android))+"<br>");
    res.write("avg :" + (parseInt(req.body.java)+parseInt(req.body.web)+parseInt(req.body.iot)+parseInt(req.body.android))/4+"<br>");

    if(Grade < 101 & Grade > 94) {
        res.write("Grade:" + "A+")
    } else if(Grade < 95 & Grade > 89 ) {
        res.write("Grade:" + "A")
    } else if(Grade < 90 & Grade > 84) {
        res.write("Grade:" + "B+")
    } else if(Grade > 85 & Grade > 79) {
        res.write("Grade:" + "C+")
    } else if(Grade > 80 & Grade > 76) {
        res.write("Grade:" + "C")
    } else
        res.write("Grade:" + "F")
    res.write("</body>");
    res.write("</html>");
});

router.post('/join', (req, res) => {
    console.log("ID :" + req.body.id);
    console.log("NAME : "+req.body.name);
    console.log("EMAIL : "+req.body.email);
    console.log("TEL : " + req.body.tel);
    console.log("GENDER : " + req.body.gender);
    console.log("HOBBY : " + req.body.hobby);
    console.log("BIRTHDAY : " + req.body.birth);
    console.log("COLOR : " + req.body.color);
    console.log("COUNTRY : " + req.body.country);
    console.log("TALK : " + req.body.talk);

    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
    res.write("<html>");
    res.write("<bodyl>");

    res.write("ID :" + req.body.id + '<br>');
    res.write("EMAIL :" + req.body.email + '<br>');
    res.write("TEL :" + req.body.tel + '<br>');
    res.write("GENDER :" + req.body.gender + '<br>');
    res.write("HOBBY :" + req.body.hobby + '<br>');
    res.write("BIRTHDAY :" + req.body.birth + '<br>');
    res.write("COLOR :" + req.body.color + '<br>');
    res.write("COUNTRY :" + req.body.country + '<br>');
    res.write("TALK :" + req.body.talk + '<br>');

    res.write("</body>");
    res.write("</html>");
    res.end();
});


router.post('/Login', (req, res) => {
/*     console.log("ID :" + req.body.id);
    console.log("PW : "+req.body.pw); */
    
    let id = req.body.id;
    let pw = req.body.pw;

    let sql = "Select * from member where id = ? and pw = ?";

    conn.query(sql, [id, pw] ,(err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if(err){
            console.log("검색이 실패했습니다." + err);
        } else if (row.length > 0) {
            // 로그인성공 부분
            res.redirect ("http://127.0.0.1:5500/nodejs/public/ex05Logins.html");
        } else if (row.length == 0){
            // 로그인 실패 부분
            res.redirect ("http://127.0.0.1:5500/nodejs/public/ex05LoginF.html");
        }
    })    

    /* if (id == 'smart' && pw == '123') {
        res.redirect ("http://127.0.0.1:5500/nodejs/public/ex05Logins.html");       // 경로 재설정해줌
    } else 
        res.redirect ("http://127.0.0.1:5500/nodejs/public/ex05LoginF.html"); */

    
});


router.post('/JoinDB', (req, res) => {
    console.log("ID :" + req.body.id);
    console.log("PW : "+req.body.pw);

    // 사용자가 입력한 id : smatr 이고, pw가 123 일때, 성공 -> Logins.html, 실패 -> Login.html
    let id = req.body.id;
    let pw = req.body.pw;
    let nick = req.body.nick;

    let sql = "insert into member values(?, ?, ?)"; // ?의 순서대로 아래 [] 안에 적어주기

    conn.query(sql, [id, pw, nick] ,(err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if(err){
            console.log("입력실패 : "+ err)

            console.log("입력성공 : "+row.affectedRows);
            
        } else if (row.affectedRows > 0) {

            console.log("명령에 성공한 수 : "+ row.affectedRows);
            res.redirect("http://127.0.0.1:5500/nodejs/public/ex06Main.html");

        } else if(row.affectedRows == 0){

            console.log("삭제된 값이 없습니다.")
        }
    })
    
});

// 회원삭제 라우터 만들기
// 1. get 방섹의 /Delete 라우터 생성
// 2. 사용자가 입력한 id 값 가져오기
// 3. id 값을 통해 member테이블에 있는 id값 삭제하기
// 4. 삭제 성공 후 Main.html로 돌아가기

router.get('/Delete', (req, res) => {
    let id = req.query.id;
    let sql = "Delete from member where id = (?)";

    conn.query(sql, [id] ,(err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if(!err){
            console.log("명령에 성공한 수 : "+row.affectedRows);
            res.redirect("http://127.0.0.1:5500/nodejs/public/ex06Main.html");
        } else if (row.affectedRows == 0) {
            console.log("삭제된 값이 없습니다.")
        } else {
            console.log("삭제실패 : "+ err);
        }
    })

});


router.post('/Update', (req, res) => {

    // 사용자가 입력한 id 의 pw를 변경하고
    // 성공 후 Main.html페이지로 이동하시오.
    let id = req.body.id;
    let select = req.body.select;       // pw 아니면 nick이 넘어옴
    let data = req.body.data;           // 변경될 데이터가 넘어옴

    let sql;                            // if문이 실행이되면 빠져나올때 선언했던 지역변수가 사라지므로
    if (select == 'pw') {               // 'pw'로 하는 이유는 변수명으로 오는게아니라 text로 넘어오기 때문
        sql = "update member set pw = ? where id = ?";
       
    } else if (select == 'nick') {
        sql = "update member set nick = ? where id = ?"      // set 어떤데이터를 where 어떻게 
    } 

    conn.query(sql, [data, id] , (err, row) => {
        if (err) {
            console.log("수정이 실패했습니다.");
        } else if (row.affectedRows > 0){
            console.log("수정이 성공했습니다." + row.affectedRows);
            res.redirect("http://127.0.0.1:5500/nodejs/public/ex06Main.html");
        } else if (row.affectedRows == 0) {
            console.log(" 수정된 값이 없습니다.")
        }
    })


});

router.get('/selectAll', (req, res) => {


    let sql = "select * from member"; // 전체 데이터 불러오기

    conn.query(sql, (err, row) => {     // query = db에 명령을 할 수 있는것


        if(err){
            console.log("검색실패 : "+ err);
        } else if(row.length > 0) {
            console.log("검색된 데이터의 수 : "+ row.length)

            res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
            res.write("<html>");
            res.write("<bodyl>");
            
            res.write("<table border='1'>")     /* berder : 테이블 선을 만들어줌 (표처럼) */
            res.write("<tr>")
            res.write("<th>ID</th>")
            res.write("<th>PW</th>")
            res.write("<th>NICK</th>")
            res.write("</tr>")

            for(let i=0; i<row.length; i++){
                res.write("<tr>")
                res.write("<td>"+row[i].id+"</td>");
                res.write("<td>"+row[i].pw+"</td>");
                res.write("<td>"+row[i].nick+"</td>");
                res.write("</tr>")
            }
            res.write("</table>")
            res.write("</body>");
            res.write("</html>");
            res.end();

        } else if (row.length == 0){
            console.log("검색된 데이터가 없습니다.")
        }
})

});

// 회원 검색 라우터 만들기
// 1. get방식의 /SlectOne라우터 생성
// 2. 사용자가 입력한 id의 정보만 검색해 브라우저 출력
router.get('/SelectOne', (req, res) => {
    
    let id = req.query.id;
    let sql = "Select * from member where id = ?";

    conn.query(sql, [id] ,(err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if(err){
            console.log("검색이 실패했습니다.")
        } else if (row.length > 0) {
            console.log("검색된 데이터의 수 : "+row.length)

            res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
            res.write("<html>");
            res.write("<body>");
            
            res.write("<table border='1'>")     /* berder : 테이블 선을 만들어줌 (표처럼) */
            res.write("<tr>")
            res.write("<th>ID</th>")
            res.write("</tr>")

            for(let i=0; i<row.length; i++){
                res.write("<tr>")
                res.write("<td>"+row[i].id+"</td>");
                res.write("</tr>")
            }
            res.write("</table>")
            res.write("</body>");
            res.write("</html>");
            res.end();

        } else if (row.length == 0){
            console.log("검색된 값이 없습니다.");
        }
    })
});

// 외부에서 사용할 수 있게 만들어주기
 module.exports = router;