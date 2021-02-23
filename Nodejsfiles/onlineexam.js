const express=require('express');
const app=express();

var session=require('express-session');

app.use(session({secret:'loginsession', 
                 saveUninitialized:false,
				 resave:false,
				 cookie: {secure:false}
				 }));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


const cors=require('cors');
app.use(cors());

//app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'onlineexam',
	port:3306
});
console.log("Connection is established");

app.get('/logout',function(req,res)
{
	 let ro={login:0,message:"Logged Out Successfully"}; 
	   req.session.user="";	  
	   req.session.destroy();
	res.send(ro);	
});

app.get('/getexamquestions',function(req,res){
	let  ro = {status:0,questions:[]};
    // ro.status = 0;
    // ro.questions; 
	const username=req.query.username;
	const subid=Number(req.query.subid);
	//if(req.session.data.user==username)
	//{
		const sql='select qbankid,stem,opt1,opt2 ,opt3,opt4 ,anskey from questionbank where subid=? limit 10';
		  const fillargs=[subid];
		connection.query(sql,fillargs,function(err,result,fields)
		 {
				   if(err)
	         {
		          console.log("Error in where clause"+err);		
				  ro.status = 0;
                   ro.questions = "";
                   console.log(err);
             }
          else 
             {	
				    ro.status = 1;
                   ro.questions = result;
                   console.log(err);         
	         }
			 res.send(JSON.stringify(ro));
			 console.log(JSON.stringify(ro));
		   });		
	//}
	
	
});

//http://localhost:8081/studlogin?username=1230&password=3456
app.get('/studlogin',function(req,res){
	let ro={login:0,message:"Invalid Username and password",username:"",subname:"",prn:0,subid:0};    //object to be returned to client
    const username =req.query.username;         //userid-login details from angular
    const password=req.query.password;  //password-login details from angular
    //console.log(username+" "+password);
                        
    if (username==0 || password.trim()=="")
     {	 ro.login=0;
    	 ro.message="userneame and/or password is blank";
		
		   res.send(ro);
   }
	else
	{
        //const sql='select prnno,password from user where prnno=? and password=?';
		const sql='select u.prnno,u.password,s.sfname,s.slname,s.subid from user u,student s where u.prnno=s.prnno and u.prnno=? and u.password=?';
        const fillargs=[username,password.trim()];
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
		      if(username == sel[0].prnno && password.trim() == sel[0].password)
		      {			
			   req.session.data={"user":username};//writing into session
			   ro.login=1;
			   ro.message="Login successful";
			   ro.username= sel[0].sfname+"_"+sel[0].slname+" "+sel[0].prnno;
                switch(sel[0].subid) 
				   {
                       case 1:
                        ro.subname="CPP";
						break;
					  case 2:
						ro.subname="Core Java";
						break;
					  case 3:
						ro.subname="Dot Net";
						break;
					  case 4:
						ro.subname="Database Technologies";
						break;
					  case 5:
					   ro.subname="Data Structures";
					   break;
					
					  default:
						 ro.subname="CPP";
						break;
				   }//switch		
               	   ro.prn=sel[0].prnno;
				   ro.subid=sel[0].subid;
              }	 
			 res.send(ro);
			 console.log(ro);
		  }//inner else
		});//con.query
	
    }//else

});//app.get
app.get('/chkifuserreg', function (req, res) {
	let sendtoclient={status:0,message:"Not Registered for exam!Please register first!"}; 
	let prnfromclient=req.query.p1;
	console.log("reading params"+prnfromclient);
	const prnno=prnfromclient;
	const sql='select prnno,password from student where prnno=?';  
	const fillargs=[prnno];
	connection.query(sql,fillargs,function(err,rows){
		if(err)
		{
			console.log("Error occured due to incorrect where clause");
			sendtoclient.status=0;
			sendtoclient.message="Error!";
		}
		else
		{
		    
			if(rows.length > 0)
			{
			sendtoclient.status = 1;
			sendtoclient.message="Registerd!You can take test.";
			//sendtoclient.content=rows;
			console.log("rows selected: "+rows.length);
			}
			else{
				sendtoclient.status=0;
				sendtoclient.message="Not Registered for exam!Please register first!";
			}
		}
		res.send(sendtoclient);
		});
		console.log(JSON.stringify(sendtoclient));		
	
});


app.get('/sselect', function (req, res) {
	//What is to be returned to clientInformation
	let sendtoclient={status:0,content:[]};	
	
	//what is to be the input from client
	let inpfromclient=req.query.p1;
	console.log("reading params"+inpfromclient);
	
	//start Database logic
	const prnno=inpfromclient;
	const sql='select prnno,sfname,slname,sphone,examdate,password,subid from student where prnno=?';  // prnno sfname  slname  sphone      examdate    password   subid 

	const fillargs=[prnno];
	connection.query(sql,fillargs,function(err,rows){
		if(err)
		{
			console.log("Error occured due to incorrect where clause");
		}
		else
		{
		    console.log("rows selected: "+rows.length);
			sendtoclient.status=1;
			sendtoclient.content=rows;
		
		}
	//End Database logic and send to client	
		res.send(sendtoclient);
	});
				
});

	

app.get('/isuserloggedin',function(req,res){
	 const username =req.query.username; 
	 let ro={loggedin:"false"};
	if(req.session.data.user==username)
	{
		ro.loggedin=true;
	}
	
	res.send(ro);
	
});

app.post('/insert', function (req, res) { 	

let sendtoclient={status:0,message:"Record not inserted"};
const prnno=req.body.prnno;    //1201;
const sfname=req.body.sfname;    //'Arpita';
const slname=req.body.slname;//'Khanna';
const sphone=req.body.sphone;           //234657864;
const examdate= req.body.examdate;          //'2020/04/12';
const password=  req.body.password;                 //'arpita@01';
const subid=req.body.subid;//02;


const sql='insert into student values (?,?,?,?,str_to_date(?,"%m/%d/%Y"),?,?)'
const fillargs=[prnno,sfname,slname,sphone,examdate,password,subid];  
connection.query(sql,fillargs,function(err,rows)
{
	if(err)
	{
		sendtoclient.message="Student with this PRN No has already Registered!";//+err;
		sendtoclient.status=0;
		console.log("Primary key violated"+err);
	}
else 
{
	console.log("rows="+rows.affectedRows);
	if(rows.affectedRows>0)
	{
		sendtoclient.status=1;
		//sendtoclient.message=rows.affectedRows+"inserted";
		sendtoclient.message="Great! you registered for exam on: "+examdate.toString('dd-MM-YYYY')+".";  //date.toString('YYYY-MM-dd'); '
	}
	//console.log("This object will be sent to jquery/Angular"+JSON.stringify(ro));
}	
	res.send(sendtoclient);
	
});

});
app.listen(8081, function () {
   console.log("server listening at port 8081...");});