//Create opject fighters that contains 4 sub object, 1 for each fighter
//create construct object for user fighter and defender
//create construct object for the fight stats

loadBench("assets/images/luke-img.jpeg", "luke-fighter", "Luke", 160);

function loadBench(imgSrc, imgAlt, fighterName, health) {
    $("#fighterBench").append("<div id='" + fighterName + "' class='fighter rounded-lg m-2'></div>");
    $("#" + fighterName).append("<img class='fighterImg' src='" + imgSrc + "' alt='" + imgAlt + "'>");
    $("#" + fighterName).append("<p class='fighterInfo'><Strong class='fighterName'>" + fighterName + "</Strong>  <small>Health: <span id='fighterHealth'>" + health + "</span>HP</small></p>");
}