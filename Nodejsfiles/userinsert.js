
const express=require('express');
const app=express();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'onlineexam',
	port:3306
});

console.log("Connection is established");
let ro={status:0,message:""};
const userid ='U101';
const password='arpita@01';
const prnno=1201;

const sql='insert into user(userid,password,prnno) values(?,?,?)'
const fillargs=[userid,password,prnno];
connection.query(sql,fillargs,function(err,rows)
{
if(err)
	{
		console.log("Primary key violated"+err);
	}
else 
{
	console.log("rows="+rows.affectedRows);
	if(rows.affectedRows>0)
	{
		ro.status=1;
		ro.message=rows.affectedRows+"inserted";
	}
	console.log("This object will be sent to jquery/Angular"+JSON.stringify(ro));
}	
	
});

app.listen(8081,function(){console.log("server running on port no:8081");});

//insert into user values('U101','arpita@01',1201);