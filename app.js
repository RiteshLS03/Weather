const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { stringify } = require("querystring");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/", function(req, res){

    console.log(req.body.cityName);
    

const query = req.body.cityName;
const apikey = "820d3b90d73761aaaf02bb05a688a1a4";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?units="+unit+"&q="+query+"&appid="+apikey+"";

https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {

        const whetherData = JSON.parse(data)
        console.log(whetherData);

        const temp = whetherData.main.temp;
        console.log(temp);

        const description = whetherData.weather[0].description;
        console.log(description);

        const location = whetherData.name;
        console.log(location);

        const icon = whetherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

        res.write("<p>the whether description is "+ description+"</p>");
        res.write("<h1>the tempreture in " + location + " is in " + temp + " degree celcius</h1>",);
        res.write("<img src=" + imageURL + ">");
        res.send()

});
});
})

app.listen( process.env.PORT || 3000, function () {
    console.log("server started on port 3000");
});
