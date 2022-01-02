const express = require("express");
const path = require("path");
const youtubedl = require("youtube-dl-exec");

const app = express();
const port = process.env.PORT || 5002;

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/add", function (req, res) {
    youtubedl(req.body.url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        youtubeSkipDashManifest: true,
        extractAudio: true,
        audioFormat: "mp3",
        output: "%(title)s.%(ext)s",
    }).then((output) => {
        res.redirect(output.url);
    });
});

app.listen(port);
