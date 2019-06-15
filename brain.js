var currentgroup = 0;
window.onload = function() {
    $("#final").hide();
    $("#start").on("click", function() {
    setTimeout(setGroups, 1000);
    $("#start").hide("fade_like_snow_white");
    })

}



function setGroups() {
    var top = 65;
    for (var i = 1; i < 5; i++) {
        $(".slot" + i).css({
            "top": top + "px",
            "width": "900px"
        });
        top += 75;
    };
    $("#header").text("Group " + groups[currentgroup][0]);
    $(".slot1 p").text(groups[currentgroup][1]);
    $(".slot1 div").css({
        "background-image": "url(" + flags[groups[currentgroup][1]] + ")"
    });
    $(".slot2 p").text(groups[currentgroup][2]);
    $(".slot2 div").css({
        "background-image": "url(" + flags[groups[currentgroup][2]] + ")"
    });
    $(".slot3 p").text(groups[currentgroup][3]);
    $(".slot3 div").css({
        "background-image": "url(" + flags[groups[currentgroup][3]] + ")"
    });
    $(".slot4 p").text(groups[currentgroup][4]);
    $(".slot4 div").css({
        "background-image": "url(" + flags[groups[currentgroup][4]] + ")"
    });
    setTimeout("sortGroup(groups[currentgroup])", 200);
    //sortGroup(groups[currentgroup]);
}


function sortGroup(data) {
    var max = 55;
    var rand = [
        Rand(0, max), Rand(0, max), Rand(0, max), Rand(0, max)
    ];
    var arr = [
        rank[data[1]] + rand[0],
        rank[data[2]] + rand[1],
        rank[data[3]] + rand[2],
        rank[data[4]] + rand[3]
    ];
    var arr2 = [];
    for (var i in arr) {
        for (var v in arr) {
            if (v == i) continue;
            if (arr[i] == arr[v]) {
                arr[v] += 1;
            }
        }
    }
    for (var i in arr) {
        arr2.push(arr[i]);
    }
    arr2.sort(function(a, b) {
        return a - b
    });
    var changes = [];
    for (var i in arr2) {
        changes.push(arr.indexOf(arr2[i]) + 1);
    }

    var top = 25;
    for (var i = 0; i < 4; i++) {
        $(".slot" + changes[i]).animate({
            "top": top + "px"
        }, 700);
        if (i == 2 || i == 3) {
            $(".slot" + changes[i]).animate({
                "width": "300px"
            }, 700);
        }
        top += 35;
    };


    var first = $(".slot" + changes[0] + " p").html();
    var second = $(".slot" + changes[1] + " p").html();
    enterRoundOf16(first, second)
    currentgroup++;
    if (currentgroup < 8) setTimeout(setGroups, 2500);
    //setGroups();

    else {
        currentgroup = 0;
        //quarters();
        setTimeout(quarters, 2500);
    }
}

function enterRoundOf16(a, b) {
    var group =
        groups[currentgroup][0].toLowerCase();
    setTimeout(function() {
        $("#" + group + "1").text(a);
    }, 2000);
    setTimeout(function() {
        $("#" + group + "2").text(b);
    }, 2000);
}

function quarters() {

    var group =
        groups[currentgroup][0];
    var teamA = $(".box" + group + " .teamA").html();
    var teamB = $(".box" + group + " .teamB").html();
    var rankA = rank[teamA];
    var rankB = rank[teamB];
    if (rankA < rankB)
        var arr = [teamA, teamB, teamA, teamA, teamA];
    else
        var arr = [teamB, teamB, teamA, teamB, teamB];

    arr = arr[Rand(0, 5)]
    $("#" + group.toLowerCase() + "3").text(arr);
    currentgroup++;
    if (currentgroup < 8) {
        setTimeout(quarters, 1000);
        //quarters();
    } else {
        currentgroup = 0;
        //semis();
        setTimeout(semis, 2000);
    }

}

function semis() {
    var group =
        groups[currentgroup][0];
    var teamA = $(".box" + group + "2 .teamA").html();
    var teamB = $(".box" + group + "2 .teamB").html();
    var rankA = rank[teamA];
    var rankB = rank[teamB];
    if (rankA < rankB)
        var arr = [teamA, teamB, teamA, teamA];
    else
        var arr = [teamB, teamB, teamA, teamB];
    arr = arr[Rand(0, 4)];
    $("#" + group.toLowerCase() + "4").animate({
        "opacity": "1"
    }, 500)
    $("#" + group.toLowerCase() + "4").text(arr);
    currentgroup++;
    if (currentgroup < 4) {
        //setTimeout(semis,500);
semis();
    } else {
        currentgroup = 0;
        //final();
        setTimeout(final, 3000);
    }
}

function final() {
    var teamA = $(".boxA3 .teamA").html();
    var teamB = $(".boxA3 .teamB").html();
    var rankA = rank[teamA];
    var rankB = rank[teamB];
    if (rankA < rankB)
        var arr = [teamA, teamB, teamA, teamA];
    else
        var arr = [teamB, teamB, teamA, teamB];
    var fteamA = arr[Rand(0, 4)];
    if (fteamA == teamA) {
        $(".boxA3 .teamA").css({
            "background": "blue"
        });
    } else {
        $(".boxA3 .teamB").css({
            "background": "blue"
        });
    }
    var teamC = $(".boxB3 .teamA").html();
    var teamD = $(".boxB3 .teamB").html();
    var rankC = rank[teamC];
    var rankD = rank[teamD];
    if (rankC < rankD)
        var arr = [teamC, teamD, teamC, teamC];
    else
        var arr = [teamD, teamD, teamC, teamD];
    var fteamB = arr[Rand(0, 4)];
    if (fteamB == teamC) {
        $(".boxB3 .teamA").css({
            "background": "blue"
        });
    } else {
        $(".boxB3 .teamB").css({
            "background": "blue"
        });
    }
    innerA = fteamA.replace(/_/g, " ");
    innerB = fteamB.replace(/_/g, " ");
    setTimeout("openFinal(innerA,innerB)", 2000);
}

function openFinal(a, b) {
    $("#final").show();
    $("#final #winner").hide();
    $("#final .fA").text(a);
    $("#final .fB").text(b);
    $("#final .fscore").text("0-0");
    setTimeout(
        "winner($('#final .fA').html(),$('#final .fB').html())", 4000);
}

function winner(a, b) {

    var score1 = Rand(0, 4);
    var score2 = Rand(0, 4);
    if (score1 == score2) {
        score1++;
    }

    $("#final .fscore").text(score1 + "-" + score2);
    if (score1 > score2) var wteam = a;
    else var wteam = b;
    $("#final #winner").show();
    $("#final #winner").animate({
        "opacity": "1"
    }, 2000);
    $("#final #winner").text(wteam + " wins the world cup");
}



rank = {
    "Argentina": 11,
    "Australia": 43,
    "Belgium": 1,
    "Brazil": 3,
    "Colombia": 13,
    "Costa_Rica": 39,
    "Croatia": 6,
    "Denmark": 10,
    "Egypt": 58,
    "England": 4,
    "France": 3,
    "Germany": 11,
    "Iceland": 35,
    "Iran": 20,
    "Japan": 28,
    "Korea_Republic": 57,
    "Mexico": 18,
    "Morocco": 41,
    "Nigeria": 48,
    "Panama": 55,
    "Peru": 21,
    "Poland": 19,
    "Portugal": 5,
    "Russia": 43, //-35 because russia's ranking should not be this low,they are pretty good
    "Saudi_Arabia": 67,
    "Senegal": 22,
    "Serbia": 34,
    "Spain": 7,
    "Sweden": 17,
    "Switzerland": 9,
    "Tunisia": 25,
    "Uruguay": 8
}
groups = [
    ["A",
        "Egypt",
        "Russia",
        "Saudi_Arabia",
        "Uruguay"
    ],
    [
        "B",
        "Iran",
        "Morocco",
        "Portugal",
        "Spain"
    ],
    ["C",
        "Australia",
        "Denmark",
        "France",
        "Peru"
    ],
    ["D",
        "Nigeria",
        "Croatia",
        "Iceland",
        "Argentina"
    ],
    ["E",
        "Brazil",
        "Costa_Rica",
        "Serbia",
        "Switzerland"
    ],
    ["F",
        "Germany",
        "Korea_Republic",
        "Mexico",
        "Sweden"
    ],
    ["G",
        "Belgium",
        "England",
        "Panama",
        "Tunisia"
    ],
    ["H",
        "Colombia",
        "Japan",
        "Poland",
        "Senegal"
    ]
];
flags = {
    "Russia": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg",
    "Uruguay": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg",
    "Egypt": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg",
    "Saudi_Arabia": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg",
    "Iran": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg",
    "Portugal": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg",
    "Spain": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
    "Morocco": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg",
    "France": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
    "Denmark": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg",
    "Australia": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
    "Peru": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg",
    "Croatia": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg",
    "Argentina": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
    "Iceland": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg",
    "Nigeria": "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg",
    "Serbia": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Serbia.svg",
    "Brazil": "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg",
    "Switzerland": "https://upload.wikimedia.org/wikipedia/commons/0/08/Flag_of_Switzerland_(Pantone).svg",
    "Costa_Rica": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Costa_Rica_(state).svg",
    "Mexico": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg",
    "Sweden": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg",
    "Germany": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
    "Korea_Republic": "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg",
    "Belgium": "https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Belgium_(civil).svg",
    "England": "https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_England.svg",
    "Tunisia": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg",
    "Panama": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Flag_of_Panama.svg",
    "Senegal": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Senegal.svg",
    "Japan": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
    "Poland": "https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg",
    "Colombia": "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg"
}

function Rand(min, max) {
    return Math.floor(Math.random()*(max-min)+min);}