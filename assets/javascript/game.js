//Object for fighter stats
var fighters = {
    "Luke" : {
        "image" : "assets/images/luke-img.jpeg",
        "imgAlt" : "luke-img",
        "name" : "Luke",
        "hp" : 150,   
        "power" : 40,
        "defense" : 4
    },

    "Obi-Wan" : {
        "image" : "assets/images/obi-wan-img.jpg",
        "imgAlt" : "Obi-img",
        "name" : "Obi-Wan",
        "hp" : 125, 
        "power" : 50,
        "defense" : 8      
    },

    "Boba-Fett" : {
        "image" : "assets/images/boba-fett-img.jpg",
        "imgAlt" : "boba-img",
        "name" : "Boba-Fett",
        "hp" : 200, 
        "power" : 30,
        "defense" : 3      
    },

    "Darth-Maul" : {
        "image" : "assets/images/darth-maul-img.jpg",
        "imgAlt" : "Maul-img",
        "name" : "Darth-Maul",
        "hp" : 175, 
        "power" : 55,
        "defense" : 7      
    }    
}

//The bench houses the fighters until they are ready to fight
var fightBench = {
    //loads fighter into the game
    "loadFighter" : function(imgSrc, imgAlt, fighterName, health) {
        $("#fighterBench").append("<div id='" + fighterName + "' class='fighter rounded-lg mx-auto fighterIcon'></div>");
        $("#" + fighterName).append("<img class='fighterImg' src='" + imgSrc + "' alt='" + imgAlt + "'>");
        $("#" + fighterName).append("<p class='fighterInfo'><Strong class='fighterName'>" + fighterName + "</Strong>  <small>Health: <span id='fighterHealth'>" + health + "</span>HP</small></p>");
        $("#" + fighterName).append("<span id='deathX'>X</span>");
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

    //moves fighter from bench to playerArea
    "moveFighterToUser" : function(fighter){
        $("#" + fighter).fadeOut(500, function(){
            $("#" + fighter).prependTo("#playerArea").fadeIn(500);
        });
        
        fightStats.userFighter = fighters[fighter];
        $("#fightArea h2").text("Choose Your Opponent");
        $.extend(fightStats.userFighter, {"multiplyer" : 1});
    },
    //move fighter from bench to bot area
    "moveFighterToBot" : function(fighter){
        $("#" + fighter).fadeOut(500, function(){
            $("#" + fighter).prependTo("#botArea").fadeIn(500);
        });
        fightStats.botFighter = fighters[fighter];
        fightStats.fightActive = true;
        $("#fightArea h2").text("Fight");
    }
}

var fightActions = {
    //these are the fight options for the bot
    "fightModes" : ["fight", "defend", "dodge"],

    //this randomly selects the fight mode for the bot
    "selectBotFightMode" : function(){
        return this.fightModes[Math.floor((Math.random() * 3))];
    },

    //updates the HP counters and displays
    "updateHealth" : function(){
        (fightStats.userFighter.hp < 0)?(fightStats.userFighter.hp = 0):"";
        (fightStats.botFighter.hp < 0)?(fightStats.botFighter.hp = 0):"";
        $("#" + fightStats.userFighter.name + " .fighterInfo #fighterHealth").text(fightStats.userFighter.hp);        
        $("#" + fightStats.botFighter.name + " .fighterInfo #fighterHealth").text(fightStats.botFighter.hp);
    },

    //checks to see if anyone has won the fight
    "checkForWinner" : function(){
        //Player Won
        if(fightStats.userFighter.hp > 0 && fightStats.botFighter.hp === 0){
            fightStats.fightActive = false;      
            $("#" + fightStats.botFighter.name).fadeOut(500, function(){
                $("#" + fightStats.botFighter.name).prependTo("#fighterBench").fadeIn(500);
                $("#" + fightStats.botFighter.name + " #deathX").css("display", "block");
                fightStats.deadFighters.push(fightStats.botFighter.name);
                fightStats.botFighter = {};
                ++fightStats.userFighter.multiplyer;
                ++fightStats.userFighter.multiplyer;
                if(fightStats.deadFighters.length === 3){
                    $("#fightArea").html("<h2>Fight</h2>");
                    $("#fightArea").append("<br><br><br>You are VICTORIOUS.<br>You have defeated everyone.");
                }else{
                    $("#fightArea").html("<h2>Fight</h2>");
                    $("#fightArea").append("<br><br><br>You are VICTORIOUS.<br>Choose you next opponent.");
                }
            });
        //Player Lost
        }else if(fightStats.userFighter.hp === 0 && fightStats.botFighter.hp > 0){
            fightStats.fightActive = false;            
            $("#" + fightStats.userFighter.name + " #deathX").css("display", "block");
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br><br>" + fightStats.botFighter.name + " has defeated you.");
        //Both Lost
        }else if(fightStats.userFighter.hp === 0 && fightStats.botFighter.hp === 0){
            fightStats.fightActive = false;            
            $("#" + fightStats.userFighter.name + " #deathX").css("display", "block");
            $("#" + fightStats.botFighter.name + " #deathX").css("display", "block");
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br><br>You and " + fightStats.botFighter.name + " have slain each other.");
        }
    },

    //cause fighter the blink when taking damage
    "blinkFighter" : function(fighter){
        for(var i = 0; i < 3; ++i){
            $("#" + fighter).fadeOut(100, function(){});     
            $("#" + fighter).fadeIn(100, function(){});
        } 
    }
}

//keeps stats for all fights for duration of the game
var fightStats = {
    "userFighter" : {},
    "botFighter" : {},
    "fightActive" : false,
    "deadFighters" : []
}


///////MAIN CODE/////////

//Puts fighters on the bench
fightBench.fillUpBench();

$(".fighterIcon").on("click", function(){
    var fighterName = $(this).attr("id");
    console.log("You Clicked on " + fighterName);
    if(fightStats.deadFighters.indexOf(fighterName) === -1){
        if(Object.entries(fightStats.userFighter).length === 0){
            fightBench.moveFighterToUser(fighterName);
        }else if(Object.entries(fightStats.botFighter).length === 0){
            fightBench.moveFighterToBot(fighterName);
        }
    }else{
        $("#fightArea").html("<h2>Fight</h2>");
        $("#fightArea").append("<br><br><br>This Chapion has already been defeated");
    } 
})

console.log(fightStats);

//User Fights
$("#fightBtn").on("click", function(){
    if(fightStats.fightActive === true){
        var botMode = fightActions.selectBotFightMode();
        console.log(botMode);

        //Bot Fights
        if(botMode === "fight"){
            fightActions.blinkFighter(fightStats.userFighter.name);
            fightActions.blinkFighter(fightStats.botFighter.name);
            fightStats.userFighter.hp = fightStats.userFighter.hp - fightStats.botFighter.power;
            fightStats.botFighter.hp = fightStats.botFighter.hp - (fightStats.userFighter.power * fightStats.userFighter.multiplyer);
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br>You Attack each other.<br>You take " + fightStats.botFighter.power + " damage.");
            $("#fightArea").append("<br>" + fightStats.botFighter.name + " takes " + fightStats.userFighter.power * fightStats.userFighter.multiplyer + " damage.");
            fightActions.updateHealth();
        //Bot Blocks
        }else if(botMode === "defend"){
            fightActions.blinkFighter(fightStats.botFighter.name);
            var damage = fightStats.userFighter.power - Math.floor(((Math.random() * fightStats.botFighter.defense) / 10) * fightStats.userFighter.power);
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br><br>" + fightStats.botFighter.name + " defends the attack.<br>Takes " + damage + " damage.");
            fightStats.botFighter.hp = fightStats.botFighter.hp - damage;
            fightActions.updateHealth();
        //Bot Dodges
        }else if(botMode === "dodge"){
            //Dodge has a 50% chance to cause attacker to miss and the attacker takes damage,  however if you fail you take 150% of attacker's damage
            if(Math.floor((Math.random() * 100) + 1) < 50){
                fightActions.blinkFighter(fightStats.botFighter.name);
                fightStats.botFighter.hp = fightStats.botFighter.hp - Math.floor(fightStats.userFighter.power * 1.5);
                $("#fightArea").html("<h2>Fight</h2>");
                $("#fightArea").append("<br><br><br>" + fightStats.botFighter.name + " tries to dodge but Fails.<br>Takes " + Math.floor(fightStats.userFighter.power * 1.5) + " damage.");
            }else{
                fightActions.blinkFighter(fightStats.userFighter.name);
                fightStats.userFighter.hp = fightStats.userFighter.hp - Math.floor(fightStats.botFighter.power * 0.25);
                $("#fightArea").html("<h2>Fight</h2>");
                $("#fightArea").append("<br><br><br>" + fightStats.botFighter.name + " Dodges your Attack.");
                $("#fightArea").append("<br> You stumble and take " + Math.floor(fightStats.botFighter.power * 0.25) + " damage.");
            }
            fightActions.updateHealth();
        }
        fightActions.checkForWinner();
        console.log(fightStats);
    }
});

//player defends
$("#defendBtn").on("click", function(){
    if(fightStats.fightActive === true){
        var botMode = fightActions.selectBotFightMode();
        console.log(botMode);

        if(botMode === "fight"){
            fightActions.blinkFighter(fightStats.userFighter.name);
            var damage = fightStats.botFighter.power - Math.floor(((Math.random() * fightStats.userFighter.defense) / 10) * fightStats.botFighter.power);
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br><br>You defend the attack and take " + damage + " damage.");
            fightStats.userFighter.hp = fightStats.userFighter.hp - damage;
            fightActions.updateHealth();
        }else if(botMode === "defend"){
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br><br>You Both are in a defensive stance.");
        }else if(botMode === "dodge"){
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br><br>You defend while " + fightStats.botFighter.name + " tries to move away.");
        }
        fightActions.checkForWinner();
    }
});

//player dodges
$("#dodgeBtn").on("click", function(){
    if(fightStats.fightActive === true){
        var botMode = fightActions.selectBotFightMode();
        console.log(botMode);

        if(botMode === "fight"){
            if(Math.floor((Math.random() * 100) + 1) < 50){
                fightActions.blinkFighter(fightStats.userFighter.name);
                fightStats.userFighter.hp = fightStats.userFighter.hp - Math.floor(fightStats.botFighter.power * 1.5);
                $("#fightArea").html("<h2>Fight</h2>");
                $("#fightArea").append("<br><br><br>You try to dodge but you are not quick enough.<br>You take " + Math.floor(fightStats.botFighter.power * 1.5) + " damage.");
            }else{
                fightActions.blinkFighter(fightStats.botFighter.name);
                fightStats.botFighter.hp = fightStats.botFighter.hp - Math.floor(fightStats.userFighter.power * 0.25);
                $("#fightArea").html("<h2>Fight</h2>");
                $("#fightArea").append("<br><br><br>You Dodge " + fightStats.botFighter.name + "'s Attack.");
                $("#fightArea").append("<br>" + fightStats.botFighter.name + " stumbles and takes " + Math.floor(fightStats.userFighter.power) * 0.25 + " of damage.");
            }
            fightActions.updateHealth();
        }else if(botMode === "defend"){
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br><br>You try to anticipate an attack but " + fightStats.botFighter.name + " stays in a defensive stance.");
        }else if(botMode === "dodge"){
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br><br>You both move way for each other.");
        }
        fightActions.checkForWinner();
    }
});

