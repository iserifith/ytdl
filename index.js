const express = require("express");
const path = require("path");
const youtubedl = require("youtube-dl-exec");
const bodyParser = require("body-parser");
const serveIndex = require("serve-index");

const app = express();
const port = process.env.PORT || 5002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.use("/downloads", express.static("/downloads"));
app.use("/downloads", serveIndex(__dirname + "/downloads"));

app.post("/add", function (req, res) {
    youtubedl(req.body.url, {
        // dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        youtubeSkipDashManifest: true,
        extractAudio: true,
        audioFormat: "mp3",
        output: "/downloads/%(title)s.%(ext)s",
    })
        .then((output) => {
            console.log(output);
            res.redirect("/downloads");
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
});

app.listen(port);
