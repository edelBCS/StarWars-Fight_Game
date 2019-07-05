//Create opject fighters that contains 4 sub object, 1 for each fighter
//create construct object for user fighter and defender
//create construct object for the fight stats

var fighters = {
    "Luke" : {
        "image" : "assets/images/luke-img.jpeg",
        "imgAlt" : "luke-img",
        "name" : "Luke",
        "hp" : 150,   
        "power" : 25,
        "limit" : 5,
        "defense" : 5
    },

    "Obi-Wan" : {
        "image" : "assets/images/obi-wan-img.jpg",
        "imgAlt" : "Obi-img",
        "name" : "Obi-Wan",
        "hp" : 125, 
        "power" : 50,
        "limit" : 3,
        "defense" : 6      
    },

    "Boba-Fett" : {
        "image" : "assets/images/boba-fett-img.jpg",
        "imgAlt" : "boba-img",
        "name" : "Boba-Fett",
        "hp" : 200, 
        "power" : 30,
        "limit" : 6,
        "defense" : 3      
    },

    "Darth-Maul" : {
        "image" : "assets/images/darth-maul-img.jpg",
        "imgAlt" : "Maul-img",
        "name" : "Darth-Maul",
        "hp" : 175, 
        "power" : 55,
        "limit" : 8,
        "defense" : 7      
    }    
}

//The bench houses the fighters until they are ready to fight
var fightBench = {
    //loads fighter into the game
    "loadFighter" : function(imgSrc, imgAlt, fighterName, health) {
        $("#fighterBench").append("<div id='" + fighterName + "' class='fighter rounded-lg m-2'></div>");
        $("#" + fighterName).append("<img class='fighterImg' src='" + imgSrc + "' alt='" + imgAlt + "'>");
        $("#" + fighterName).append("<p class='fighterInfo'><Strong class='fighterName'>" + fighterName + "</Strong>  <small>Health: <span id='fighterHealth'>" + health + "</span>HP</small></p>");
    },

    //addes fighter to the bench to be selected
    "addToBench" : function(fighter){
        this.loadFighter(fighter.image, fighter.imgAlt, fighter.name, fighter.hp);
    },

    //fills the bench with fighters
    "fillUpBench" : function(){
        this.addToBench(fighters.Luke);
        this.addToBench(fighters["Obi-Wan"]);
        this.addToBench(fighters["Boba-Fett"]);
        this.addToBench(fighters["Darth-Maul"]);
    },

    "moveFighterToUser" : function(fighter){
        $("#" + fighter).prependTo("#arena");
        fightStats.userFighter = fighters[fighter];
        $("#" + fighter).css("disabled", "true");
        $("#fightArea h2").text("Choose Your Opponent");
        $.extend(fightStats.userFighter, {"currentLimit" : 0});
    },

    "moveFighterToBot" : function(fighter){
        $("#" + fighter).appendTo("#arena");
        fightStats.botFighter = fighters[fighter];
        $("#" + fighter).css("disabled", "true");
        $.extend(fightStats.userFighter, {"currentLimit" : 0});
    }
}

var fightActions = {
    "fightModes" : ["fight", "defend", "dodge"],

    "selectBotFightMode" : function(){
        return this.fightModes[Math.floor((Math.random() * 3))];
    },

    "updateHealth" : function(){
        $("#" + fightStats.userFighter.name + " .fighterInfo #fighterHealth").text(fightStats.userFighter.hp);        
        $("#" + fightStats.botFighter.name + " .fighterInfo #fighterHealth").text(fightStats.botFighter.hp);
    }
}

//keeps stats for all fights for duration of the game
var fightStats = {
    "userFighter" : {},
    "botFighter" : {}
}


///////MAIN CODE/////////

//Puts fighters on the bench
fightBench.fillUpBench();

$("#Luke").on("click", function(){
    if(Object.entries(fightStats.userFighter).length === 0){
        fightBench.moveFighterToUser("Luke");
    }else if(Object.entries(fightStats.botFighter).length === 0){
        fightBench.moveFighterToBot("Luke");
    }  
});

$("#Obi-Wan").on("click", function(){
    if(Object.entries(fightStats.userFighter).length === 0){
        fightBench.moveFighterToUser("Obi-Wan");
    }else if(Object.entries(fightStats.botFighter).length === 0){
        fightBench.moveFighterToBot("Obi-Wan");
    }    
});

$("#Darth-Maul").on("click", function(){
    if(Object.entries(fightStats.userFighter).length === 0){
        fightBench.moveFighterToUser("Darth-Maul");
    }else if(Object.entries(fightStats.botFighter).length === 0){
        fightBench.moveFighterToBot("Darth-Maul");
    }    
});

$("#Boba-Fett").on("click", function(){
    if(Object.entries(fightStats.userFighter).length === 0){
        fightBench.moveFighterToUser("Boba-Fett");
    }else if(Object.entries(fightStats.botFighter).length === 0){
        fightBench.moveFighterToBot("Boba-Fett");
    }    
});

//console.log(fightStats);

console.log(fightStats);

//User Fights
$("#fightBtn").on("click", function(){
    var botMode = fightActions.selectBotFightMode();
    //Bot Fights
    if(botMode === "fight"){        
        fightStats.userFighter.hp = fightStats.userFighter.hp - fightStats.botFighter.power;
        fightStats.botFighter.hp = fightStats.botFighter.hp - fightStats.userFighter.power;
        fightActions.updateHealth();
    //Bot Blocks
    }else if(botMode === "defend"){
        fightStats.botFighter.hp = fightStats.botFighter.hp - (fightStats.userFighter.power - (((Math.floor(Math.random() * fightStats.botFighter.defense)+1) / 10) * fightStats.userFighter.power));
        fightActions.updateHealth();
    //Bot Dodges
    }else if(botMode === "dodge"){
        
    }
    console.log(botMode);
    console.log(fightStats);

});

$("#defendBtn").on("click", function(){

});

$("#dodgeBtn").on("click", function(){

});

