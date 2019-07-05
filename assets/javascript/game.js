//Create opject fighters that contains 4 sub object, 1 for each fighter
//create construct object for user fighter and defender
//create construct object for the fight stats

var fighters = {
    "Luke" : {
        "image" : "assets/images/luke-img.jpeg",
        "imgAlt" : "luke-img",
        "name" : "Luke",
        "hp" : 160,        
    },

    "Obi-Wan" : {
        "image" : "assets/images/obi-wan-img.jpg",
        "imgAlt" : "Obi-img",
        "name" : "Obi-Wan",
        "hp" : 160,        
    },

    "Boba-Fett" : {
        "image" : "assets/images/boba-fett-img.jpg",
        "imgAlt" : "boba-img",
        "name" : "Boba-Fett",
        "hp" : 160,        
    },

    "Darth-Maul" : {
        "image" : "assets/images/darth-maul-img.jpg",
        "imgAlt" : "Maul-img",
        "name" : "Darth-Maul",
        "hp" : 160,        
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
}

//keeps stats for all fights for duration of the game
var fightStats = {
    "userFighter" : {},
    "botFighter" : "",
}


///////MAIN CODE/////////

//Puts fighters on the bench
fightBench.fillUpBench();

$("#Luke").on("click", function(){
    console.log(fightStats.userFighter)
    if(Object.entries(fightStats.userFighter).length === 0){
        $("#Luke").prependTo("#arena");
        fightStats.userFighter = fighters.Luke;
        $("#Luke").css("disabled", "true");
    }else if(Object.entries(fightStats.botFighter).length === 0){
        $("#Luke").appendTo("#arena");
        fightStats.botFighter = fighters.Luke;
        $("#Luke").css("disabled", "true");
    }  
});

$("#Obi-Wan").on("click", function(){
    if(Object.entries(fightStats.userFighter).length === 0){
        $("#Obi-Wan").prependTo("#arena");
        fightStats.userFighter = fighters.Luke;
        $("#Obi-Wan").css("disabled", "true");
    }else if(Object.entries(fightStats.botFighter).length === 0){
        $("#Obi-Wan").appendTo("#arena");
        fightStats.botFighter = fighters.Luke;
        $("#Obi-Wan").css("disabled", "true");
    }    
});

$("#Darth-Maul").on("click", function(){
    if(Object.entries(fightStats.userFighter).length === 0){
        $("#Darth-Maul").prependTo("#arena");
        fightStats.userFighter = fighters.Luke;
        $("#Darth-Maul").css("disabled", "true");
    }else if(Object.entries(fightStats.botFighter).length === 0){
        $("#Darth-Maul").appendTo("#arena");
        fightStats.botFighter = fighters.Luke;
        $("#Darth-Maul").css("disabled", "true");
    }    
});

$("#Boba-Fett").on("click", function(){
    if(Object.entries(fightStats.userFighter).length === 0){
        $("#Boba-Fett").prependTo("#arena");
        fightStats.userFighter = fighters.Luke;
        $("#Boba-Fett").css("disabled", "true");
    }else if(Object.entries(fightStats.botFighter).length === 0){
        $("#Boba-Fett").appendTo("#arena");
        fightStats.botFighter = fighters.Luke;
        $("#Boba-Fett").css("disabled", "true");
    }    
});