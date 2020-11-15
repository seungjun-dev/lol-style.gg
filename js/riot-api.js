const API_KEY = "RGAPI-68f5f184-ac86-42c5-be19-a66ea8075840";

function getSummonerInfo() {
    var name = document.getElementById("userName").value;

    //console.log(name);

    fetch(
        //`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/%EC%9F%A4%20%EC%9E%84%EC%8A%A4?api_key=RGAPI-68f5f184-ac86-42c5-be19-a66ea8075840`
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            /*
            SUMMONER-V4 
            json.id:
            json.accountId:
            json.puuid:
            json.name:
            json.profileIconId:
            json.revisionDate:
            json.summonerLevel:
            */
            //console.log(json.id);
            getLeagueInfo(json.id);
        });
}

function getLeagueInfo(id) {
    var encryptedId = id;

    fetch(
        //`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/9lZSMawwYs8WUyjQUFLlVGWLLrMu598L_RRdniS3tsOXFQ?api_key=RGAPI-68f5f184-ac86-42c5-be19-a66ea8075840`
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedId}?api_key=${API_KEY}`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json[0].summonerName);
            /*
            LEAGUE-V4
            json[0] -> 자유랭크
            json[1] -> 솔로랭크
            json[i].tier;
            json[i].rank;
            json[i].leaguePoints;
            json[i].wins;
            json[i].losses;
            json[i].veteran;
            json[i].inactive;
            json[i].freshBlood;
            json[i].hotStreak;
            */
        });
}

function init() {
    console.log("riot api start");
}

init();