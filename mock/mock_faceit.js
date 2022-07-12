const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require("fs");


const server = express();
server.use(cors());
server.use(express.json());
server.use(express.text());
server.use(express.urlencoded()); //deprecated
server.use(cookieParser());


function getTestPlayer() {
    const data = JSON.parse(fs.readFileSync("./player_rs.json").toString("utf-8"));
    return data;
}

function getTestPlayerCsgoStats() {
    const data = JSON.parse(fs.readFileSync("./player_stats_rs.json").toString("utf-8"));
    return data;
}

function getTestMatch() {
    const data = JSON.parse(fs.readFileSync("./match_rs.json").toString("utf-8"));
    return data;
}

server.get('/data/v4/players/:playerId', (req, res) => {
    const playerId = req.params.playerId;

    console.log("GET PLAYER: " + playerId, req.url);
    res.status(200).json(getTestPlayer());
});

server.get('/data/v4/players/:playerId/stats/csgo', (req, res) => {
    const playerId = req.params.playerId;

    console.log("GET PLAYER CSGO STATS: " + playerId, req.url);
    res.status(200).json(getTestPlayerCsgoStats());
});

server.get('/data/v4/matches/:matchId', (req, res) => {
    const matchId = req.params.matchId;

    console.log("GET MATCH: " + matchId, req.url);
    res.status(200).json(getTestMatch());
});

server.listen(8099, () => console.log('Mock FACEIT API is running on http://localhost:8099/'));