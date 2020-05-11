const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
var https = require('https');
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.html");
});
app.post("/",(req,res)=>{
	const fname=req.body.firstname;
	const lname=req.body.lastname;
	const emailaddress=req.body.email;
	const data={
		members:[{
			email_address:emailaddress,
			status:"subscribed",
			merge_fields:{FNAME:fname,LNAME:lname}
		}
		]
	}
	const jsonData=JSON.stringify(data);
	const url="https://us18.api.mailchimp.com/3.0/lists/c8aa8871b6";
	const options={
		method:"POST",
		auth:"supracodes:025d326aabf992ffa5077694868662be-us18"
	}

	const request=https.request(url,options,(response)=>{
		if(response.statusCode==200){
			res.sendFile(__dirname+"/success.html");

		}
		else{
			res.sendFile(__dirname+"/failure.html");
		}
		response.on("data",(data)=>{
			console.log(JSON.parse(data));
		})

	})
	request.write(jsonData);
	request.end();



});
app.post("/success",(req,res)=>{
	res.redirect("/");
});
app.post("/failure",(req,res)=>{
	res.redirect("/");
})

app.listen(process.env.PORT||3000,()=>{
	console.log("Server is now running");
})
//025d326aabf992ffa5077694868662be-us18
//c8aa8871b6