
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
edetailsid='E010';
prnno=1201;
examdate='2020/04/12';
subid=02;
userid='U101';
const sql='insert into examdetails(edetailsid,prnno,examdate,subid,userid) values(?,?,?,?,?)'
const fillargs=[edetailsid,prnno,examdate,subid,userid];
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

//insert into examdetails(edetailsid,prnno,examdate,subid,userid) values('E010',1201,'2020/04/12',02,'U101');