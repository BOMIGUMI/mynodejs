const { request, response } = require("express");
const express = require("express");                       // 설치된 express를 사용하는 선언
const app = express();                                    // express 실행해서 app이라는 변수에 담아주기, 127.0.0.1 => 몇번 방에서 실행할것인지 까지를 정해줘야함
//console.log("확인");


const router = require("./router/router.js");           // router폴더안의 router.js파일을 가져와 변수로 선언해주기
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:false}));       // post방식일 때 body 영역을 분석해주는 미들웨어로 bodyparser등록, 순서는 라우터 등록 전에 미들웨어 등록 해야함
app.use(router);                                        // 서버에서사용하겠다고 미들웨어로 router 등록 해야함
app.listen(3001);                                       // 현재 서버파일의 포트번호를 설정해주기 
