
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
//prnno  sfname  slname  sphone  examdate  password  subid
let ro={status:0,message:""};
const prnno=1201;
const sfname='Arpita';
const slname='Khanna';
const sphone=234657864;
const examdate='2020/04/12';
const password='arpita@01';
const subid=02;

const sql='insert into student values (?,?,?,?,?,?,?)'
const fillargs=[prnno,sfname,slname,sphone,examdate,password,subid];
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

//insert into student values (1201,'Arpita','Khanna',2346578645,'2020/04/12','arpita@01',02);