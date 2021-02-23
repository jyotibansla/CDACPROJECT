
const express=require('express');
const app=express();

const mysql = require('mysql2');
var session=require('express-session');

app.use(session({secret:'loginsession', 
                 saveUninitialized:false,
				 resave:false,
				 cookie: {secure:false}
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'onlineexam',
	port:3306
});

console.log("Connection is established");
let ro={login:0,message:"Invalid Username and password"};    
const username =1201;         //userid-login details from angular
const password='oooooo'//'arpita@01';    ////password-login details from angular



     if (username==0 || password=="")
     {	 ro.login=0;
    	 ro.message="userneame and/or password is blank";
		  console.log(username+" "+password+" "+ro.login+"  "+ro.message);
     }
	 else{
   const sql='select prnno,password from user where prnno=? and password=?';
   const fillargs=[username,password];
   connection.query(sql,fillargs,function(err,sel,fields)
   {
      if(err)
	  {
		console.log("Error in select statement "+err);
		
      }
      else 
     {
		 
	     //If username and password mathes with those in database then put uesr in session
		 if(sel.length==0)
			 {
			 ro.login=0;
			 ro.message="Invalid userneame and password";
			 
		 }	
		 else
		 if(username == sel[0].prnno && password == sel[0].password)
		 {
			 console.log("+++++++++++"+sel[0].prnno+" "+sel[0].password);
			/* req.session.data={"k1":username};//writing into session*/
			 ro.login=1;
			 ro.message="Login successful";
		 }
		
		 
      }
	  console.log(username+" "+password+" "+ro.login+"  "+ro.message);
    }); 
 }

//   res.send (ro);	


app.listen(8081,function(){console.log("server running on port no:8081");});

