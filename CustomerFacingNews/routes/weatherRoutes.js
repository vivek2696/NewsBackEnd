const express = require("express");
const router = express.Router();
const request = require("request");
const apiKey = "0169ab435c72d9dab701f2428245af24";
const iplocate = require("node-iplocate");
const publicIp = require("public-ip");
const LocalStorage = require("node-localstorage").LocalStorage;
let localStorage = new LocalStorage("./scratch");

function getWeather(url) {
    publicIp.v4().then(function (ip) {
        iplocate(ip).then(function (results) {
            var city = results.city;
            const newcity = city.split(" ").join("+");
            localStorage.setItem("userCity", newcity);
        });
    });

    let city = localStorage.getItem("userCity");
    // console.log(city);
    let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    // console.log(weatherUrl);

    var options = {
        url: weatherUrl,
        headers: {
            "User-Agent": "request",
        },
    };

    return new Promise(function (resolve, reject) {
        request.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
}

router.route("/weather").get((req, res) => {
    const dataPromise = getWeather();

    dataPromise
        .then(JSON.parse)
        .then(function (result) {
            //res.render('weather_view',{result, title: 'Current Weather'})
            res.send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

module.exports = router;
