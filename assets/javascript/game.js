//Create opject fighters that contains 4 sub object, 1 for each fighter
//create construct object for user fighter and defender
//create construct object for the fight stats

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
        $("#fighterBench").append("<div id='" + fighterName + "' class='fighter rounded-lg m-2'></div>");
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

    "moveFighterToUser" : function(fighter){
        $("#" + fighter).fadeOut(1000, function(){
            $("#" + fighter).prependTo("#playerArea").fadeIn(1000);
        });
        
        fightStats.userFighter = fighters[fighter];
        $("#" + fighter).css("disabled", "true");
        $("#fightArea h2").text("Choose Your Opponent");
        $.extend(fightStats.userFighter, {"multiplyer" : 1});
    },

    "moveFighterToBot" : function(fighter){
        $("#" + fighter).fadeOut(1000, function(){
            $("#" + fighter).prependTo("#botArea").fadeIn(1000);
        });
        fightStats.botFighter = fighters[fighter];
        $("#" + fighter).css("disabled", "true");
        fightStats.fightActive = true;
        $("#fightArea h2").text("Fight");
    }
}

var fightActions = {
    "fightModes" : ["fight", "defend", "dodge"],

    "selectBotFightMode" : function(){
        return this.fightModes[Math.floor((Math.random() * 3))];
    },

    "updateHealth" : function(){
        (fightStats.userFighter.hp < 0)?(fightStats.userFighter.hp = 0):"";
        (fightStats.botFighter.hp < 0)?(fightStats.botFighter.hp = 0):"";
        $("#" + fightStats.userFighter.name + " .fighterInfo #fighterHealth").text(fightStats.userFighter.hp);        
        $("#" + fightStats.botFighter.name + " .fighterInfo #fighterHealth").text(fightStats.botFighter.hp);
    },

    "checkForWinner" : function(){
        //Player Won
        if(fightStats.userFighter.hp > 0 && fightStats.botFighter.hp === 0){
            fightStats.fightActive = false;      
            $("#" + fightStats.botFighter.name).fadeOut(1000, function(){
                $("#" + fightStats.botFighter.name).prependTo("#fighterBench").fadeIn(1000);           
                $("#" + fightStats.botFighter.name + " #deathX").css("display", "block");
                fightStats.deadFighters.push(fightStats.botFighter.name);
                fightStats.botFighter = {};
                ++fightStats.userFighter.multiplyer;
                ++fightStats.userFighter.multiplyer;
                $("#fightArea").html("<h2>Fight</h2>");
                $("#fightArea").append("<br><br><br>You are VICTORIOUS.<br>Choose you next opponent.");
            });  
            
            
            
        //Player Lost
        }else if(fightStats.userFighter.hp === 0 && fightStats.botFighter.hp > 0){
            fightStats.fightActive = false;
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br><br>" + fightStats.botFighter.name + " has defeated you.");
        //Both Lost
        }else if(fightStats.userFighter.hp === 0 && fightStats.botFighter.hp === 0){
            fightStats.fightActive = false;
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br><br>You and " + fightStats.botFighter.name + " have slain each other.");
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

$("#Luke").on("click", function(){
    console.log(fightStats.deadFighters.indexOf("Luke"));
    if(fightStats.deadFighters.indexOf("Luke") === -1){
        if(Object.entries(fightStats.userFighter).length === 0){
            fightBench.moveFighterToUser("Luke");
        }else if(Object.entries(fightStats.botFighter).length === 0){
            fightBench.moveFighterToBot("Luke");
        }
    }else{
        $("#fightArea").html("<h2>Fight</h2>");
        $("#fightArea").append("<br><br><br>This Chapion has already been defeated");
    } 
});

$("#Obi-Wan").on("click", function(){
    if(fightStats.deadFighters.indexOf("Obi-Wan") === -1){
        if(Object.entries(fightStats.userFighter).length === 0){
            fightBench.moveFighterToUser("Obi-Wan");
        }else if(Object.entries(fightStats.botFighter).length === 0){
            fightBench.moveFighterToBot("Obi-Wan");
        }
    }else{
        $("#fightArea").html("<h2>Fight</h2>");
        $("#fightArea").append("<br><br><br>This Chapion has already been defeated");
    }    
});

$("#Darth-Maul").on("click", function(){
    if(fightStats.deadFighters.indexOf("Darth-Maul") === -1){
        if(Object.entries(fightStats.userFighter).length === 0){
            fightBench.moveFighterToUser("Darth-Maul");
        }else if(Object.entries(fightStats.botFighter).length === 0){
            fightBench.moveFighterToBot("Darth-Maul");
        }   
    }else{
        $("#fightArea").html("<h2>Fight</h2>");
        $("#fightArea").append("<br><br><br>This Chapion has already been defeated");
    } 
});

$("#Boba-Fett").on("click", function(){
    if(fightStats.deadFighters.indexOf("Boba-Fett") === -1){
        if(Object.entries(fightStats.userFighter).length === 0){
            fightBench.moveFighterToUser("Boba-Fett");
        }else if(Object.entries(fightStats.botFighter).length === 0){
            fightBench.moveFighterToBot("Boba-Fett");
        }    
    }else{
        $("#fightArea").html("<h2>Fight</h2>");
        $("#fightArea").append("<br><br><br>This Chapion has already been defeated");
    }
});

//console.log(fightStats);

console.log(fightStats);

//User Fights
$("#fightBtn").on("click", function(){
    if(fightStats.fightActive === true){
        var botMode = fightActions.selectBotFightMode();
        console.log(botMode);

        //Bot Fights
        if(botMode === "fight"){        
            fightStats.userFighter.hp = fightStats.userFighter.hp - fightStats.botFighter.power;
            fightStats.botFighter.hp = fightStats.botFighter.hp - (fightStats.userFighter.power * fightStats.userFighter.multiplyer);
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br>You Attack each other.<br>You take " + fightStats.botFighter.power + " damage.");
            $("#fightArea").append("<br>" + fightStats.botFighter.name + " takes " + fightStats.userFighter.power * fightStats.userFighter.multiplyer + " damage.");
            fightActions.updateHealth();
        //Bot Blocks
        }else if(botMode === "defend"){
            var damage = fightStats.userFighter.power - Math.floor(((Math.random() * fightStats.botFighter.defense) / 10) * fightStats.userFighter.power);
            $("#fightArea").html("<h2>Fight</h2>");
            $("#fightArea").append("<br><br><br>" + fightStats.botFighter.name + " defends the attack.<br>Takes " + damage + " damage.");
            fightStats.botFighter.hp = fightStats.botFighter.hp - damage;
            fightActions.updateHealth();
        //Bot Dodges
        }else if(botMode === "dodge"){
            if(Math.floor((Math.random() * 100) + 1) < 50){
                fightStats.botFighter.hp = fightStats.botFighter.hp - Math.floor(fightStats.userFighter.power * 0.5);
                $("#fightArea").html("<h2>Fight</h2>");
                $("#fightArea").append("<br><br><br>" + fightStats.botFighter.name + " tries to dodge but Fails.<br>Takes " + Math.floor(fightStats.userFighter.power * 0.5) + " damage.");
            }else{
                $("#fightArea").html("<h2>Fight</h2>");
                $("#fightArea").append("<br><br><br>" + fightStats.botFighter.name + " Dodges the Attack");
            }
            fightActions.updateHealth();
        }
        fightActions.checkForWinner();
        console.log(fightStats);
    }
});

$("#defendBtn").on("click", function(){
    if(fightStats.fightActive === true){
        var botMode = fightActions.selectBotFightMode();
        console.log(botMode);

        if(botMode === "fight"){
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

$("#dodgeBtn").on("click", function(){
    if(fightStats.fightActive === true){
        var botMode = fightActions.selectBotFightMode();
        console.log(botMode);

        if(botMode === "fight"){
            if(Math.floor((Math.random() * 100) + 1) < 50){
                fightStats.userFighter.hp = fightStats.userFighter.hp - Math.floor(fightStats.botFighter.power * 0.5);
                $("#fightArea").html("<h2>Fight</h2>");
                $("#fightArea").append("<br><br><br>You try to dodge but you are not quick enough.<br>You take " + Math.floor(fightStats.botFighter.power * 0.5) + " damage.");
            }else{
                $("#fightArea").html("<h2>Fight</h2>");
                $("#fightArea").append("<br><br><br>You Dodge " + fightStats.botFighter.name + "'s Attack");
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

