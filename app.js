const express = require('express');
const PORT = process.env.PORT || 3000;
const request = require("request");

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
});

app.get("/results", (req, res) => {
    let query = req.query.search;
    const url = `http://www.omdbapi.com/?s=${query}&apikey=thewdb`;
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            let data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
})


app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Movie app has started at PORT", PORT);
})