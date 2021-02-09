const API_KEY = "#";

var goContents = {
    
    //start baseInfo
    baseInfo : {
        id: '',
        accountId: '',
        puuid: '',
        name: '',
        profileIconId: '',
        level: ''
    }//end baseInfo
    
    //start leagueInfo
    , leagueInfo : {
        rankYn: false,
        flexYn: false,
        
        //rank - flex
        flex : {
            tier: '',
            rank: '',
            tierImg: '',
            leaguePoints: '',
            wins: '',
            losses: '',
            veteran: '',
            inactive: '',
            freshBlood: '',
            hotStreak: ''
        }

        //rank - solo
        , solo : {
            tier: '',
            rank: '',
            tierImg: '',
            leaguePoints: '',
            wins: '',
            losses: '',
            veteran: '',
            inactive: '',
            freshBlood: '',
            hotStreak: ''
        }
    }//end leagueInfo
}

getSummonerInfo = function() {
     var name = document.getElementById("userName").value;
    console.log("getSummonerIngo():name -> " + name);
    fetch(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            //유저 기본 정보 세팅
            setBaseInfo(json);
            
            console.log("getSummonerIngo():id -> "+json.id);
            //유저의 리그 정보 가져오기
            getLeagueInfo(json.id);
        });
}

getLeagueInfo = function(id) {
    var encryptedId = id;

    fetch(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedId}?api_key=${API_KEY}`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            
            console.log("getLeagueInfo():json[0].summonerName -> "+json[0].summonerName);
            console.log("getLeagueInfo():json[1].summonerName -> "+json[1].summonerName);

            if(json[0].queueType == "RANKED_SOLO_5x5"){
                setSoloRankInfo(json[0]);
                setFlexRankInfo(json[1]);
            } else {
                setFlexRankInfo(json[0]);
                setSoloRankInfo(json[1]);
            }
            
            renderInfo();
        });
}

setBaseInfo = function(res) {
    goContents.baseInfo = {
        id: res.id,
        accountId: res.accountId,
        puuid: res.puuid,
        name: res.name,
        profileIconId: res.profileIconId,
        level: res.summonerLevel
    }
}

setFlexRankInfo = function(res) {
    goContents.leagueInfo.flex = {
        tier: res.tier,
        rank: res.rank,
        tierImg: getTierImage(res.tier, res.rank),
        leaguePoints: res.leaguePoints,
        wins: res.wins,
        losses: res.losses,
        veteran: res.veteran,
        inactive: res.inactive,
        freshBlood: res.freshBlood,
        hotStreak: res.hotStreak
    }
}

setSoloRankInfo = function(res) {
    goContents.leagueInfo.solo = {
        tier: res.tier,
        rank: res.rank,
        tierImg: getTierImage(res.tier, res.rank),
        leaguePoints: res.leaguePoints,
        wins: res.wins,
        losses: res.losses,
        veteran: res.veteran,
        inactive: res.inactive,
        freshBlood: res.freshBlood,
        hotStreak: res.hotStreak
    }
}

getTierImage = function(tier, rank) {
    var url = "./img/tier-icons/tier-icons/";
    var tierRank = tier + "_" + rank + ".png";

    url = url + tierRank.toLowerCase();
    console.log(url);

    return url;
}

renderInfo = function() {
    var app = new Vue({
        el: '#styleInfo',
        data: goContents
    })
    
    $('#styleInfo').show();
}

init = function() {
    console.log("riot api start");
}

init();