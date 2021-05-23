const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const PORT = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.get("/", (req,res)=>{
	res.sendFile(__dirname + "/index.html");
});
app.post("/resultpage", (req,res)=>{
	const city = req.body.text;
	const apikey = "9e21d98c120b5b7813d182223762aa3d";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
	res.contentType("text/html");
	https.get(url, function(response){
		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
			res.write(`<h1><font face="arial"> The weather is currently ${weatherDescription} </font> </h1>`);
			res.write(`<h5><font face="arial"> The temperature in ${city} is ${Math.floor(temp-273.15)} degree celsius.</font></h5>`);
			res.write(`<img src="${imageURL}"/>`);
			res.send();
		});
		
	});
});

app.listen(PORT, ()=>{
	console.log(`Server is Running on ${PORT}`);
})
