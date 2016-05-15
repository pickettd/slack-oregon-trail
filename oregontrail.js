//var root = js.exec_dir;
//var server_file = new File(file_cfgname(root, "server.ini"));
//server_file.open('r',true);
//var autoUpdate=server_file.iniGetValue(null,"autoUpdate");
//var serverAddr=server_file.iniGetValue(null,"host","localhost");
//var serverPort=server_file.iniGetValue(null,"port",10088);
//server_file.close();

//The official and most updated version of this game can be found at
//https://github.com/chairmanmow/synchro_trail

//load("sbbsdefs.js");
//somewhat faithfully version adapted by "larry lagomorph" from 1977 basic code @ http://deserthat.files.wordpress.com/2010/11/oregon1.doc (you can find traces of the BASIC left in this document)
//contact grudgemirror@gmail.com re:oregontrail with any bug reports (there probably are some i haven't found)
var version = "0.2.1b";
console.log("                    OREGON TRAIL version no " + version + "\r\n Larry Lagomorph of Futureland BBS visit us @ futureland.grudgemirror.com\r\n");
console.log("\r\n\r\n                       updated August 2014\r\n");
//console.pause();
//console.clear();
function getRandomInt(min,max){
return Math.floor(Math.random() * (max - min +1))+ min;  //keep
}
//load("json-client.js");

//var db = new JSONClient(serverAddr,serverPort);

//var highScores = db.read("TRAIL","TRAIL.SCORES",1);
var highScores = [];
//db.cycle();

if(highScores == undefined){
    console.log("Creating High Score File");
    var blankArray = [];
//    db.write("TRAIL","TRAIL.SCORES",blankArray,2);
//    db.cycle();
}
//highScores = db.read("TRAIL","TRAIL.SCORES",1);
//db.cycle;
console.log("        THESE SAVVY ADVENTURERS HAVE SAFELY ARRIVED IN OREGON CITY! \r\n\r\n");
function displayScores(){
if(highScores.length == 0) {
console.log("    No one has conquered the trail yet!  Be the first name on the list!!! \r\n\r\n");
//console.pause();
//console.clear();
return;
} else {
var ct = 0;
for(i = 0; i < highScores.length; i++){
var highScore = highScores[i];
console.log("" + highScore["date"] + " --- " + highScore["name"] + " traveled from " + highScore["bbs"] + " scoring " + highScore["score"] + " points!\r\n");
ct += 2;
}
//console.pause();
//console.clear();
return;  // do not erase

}
}
displayScores();

//var tombStones = db.read("TRAIL","TRAIL.GRAVES",1);
var tombStones = [];
//db.cycle();
if(tombStones == undefined){
    console.log("Creating Grave File");
    var blankArray = [];
    //db.write("TRAIL","TRAIL.GRAVES",blankArray,2);
    //db.cycle();
}

//tombStones = db.read("TRAIL","TRAIL.GRAVES",1);
tombStones = [];
//db.cycle();

tombStones = tombStones.reverse();

console.log("       THESE ARE THE MOST RECENT TRAVELERS TO PERISH ON THE TRAIL \r\n                            ***[\R.I.P.]***\r\n");
function displayGraves(){
var rowsMinusOne = console.screen_rows - 4;
var ct = 0;

for(i = 0; i < tombStones.length && ct < rowsMinusOne; i++){
var tombStone = tombStones[i];
console.log("\1b" +tombStone["date"] + "**" + tombStone["name"] + " " + tombStone["cause"] + ", " + tombStone["score"] + " miles from " + tombStone["bbs"] + "\r\n");
console.log("-" + tombStone["engraving"] + "\r\n");
ct += 2;
}
return;  // do not erase

}
displayGraves();
//console.pause();
//console.clear();


// game start

function OregonTrail(){
function Score(){
    return totalMileage + animalsAMT + foodAMT + clothingAMT + supplyAMT;  //do not erase
}




var yesNo = new String;
var choiceShootingExptLvl = new Number;
var animalsAMT = new Number;
var foodAMT = new Number;
var ammoAMT = new Number;
var clothingAMT = new Number;
var supplyAMT = new Number;
var flagForFortOption = new Number;
var cashInitialPurchase = new Number; 
var totalMileage = new Number;
var turnNumber = new Number;
var woundedFlag = new Number;
var southPassFlag = 0;
var blueMountainPassFlag = 0;
var mileSouthPassFlag = new Number;
var actionChoice = new Number;
var choiceEat = new Number;
var bangResponse = new Number;
var blizzardFlag = new Number;
var notEnoughClothes = new Number;
var fortAMT = new Number;
var eventNo = 0;
var blizzardFlag = 0;
var notEnoughClothes = 0;
var tacticChoice = 0;
var riderHostilityFactor = 0;
var deadFlag = 0;
var illnessFlag = 0;
var causeOfDeath = "";
var outOfAmmoToggle = new Boolean;


firstPrompt();  // finds out what your shooting level is 
initialPurchase();
firstTurn();
//log(eventNo.toSource());
function firstPrompt() {
console.log("DO YOU NEED INSTRUCTIONS (YES/NO)");

yesNo = console.getstr();
yesNo = yesNo.toUpperCase();
if(result.yesNo[0] == "Y") {
    instructions();
}
rifleSkills();
}

function instructions() {
//console.crlf();
//console.crlf();
// ***INSTRUCTIONS***
console.log("THIS PROGRAM SIMULATES A TRIP OVER THE OREGON TRAIL FROM");
console.log("INDEPENDENCE MISSOURI TO OREGON CITY, OREGON IN 1847.");
console.log("YOUR FAMILY OF FIVE WILL COVER THE 2040 MILE OREGONTRAIL");
console.log("IN 5-6 MONTHS --- IF YOU MAKE IT ALIVE.");
console.log("YOU HAD SAVED $900 TO SPEND FOR THE TRIP, AND YOU'VE JUST");
console.log("   PAID $200 FOR A WAGON.");
console.log("YOU WILL NEED TO SPEND THE REST OF YOUR MONEY ($700) ON THE");
console.log("   FOLLOWING ITEMS:");
//console.crlf();
 console.log("     OXEN *** YOU CAN SPEND $200-$300 ON YOUR TEAM");
 console.log("            THE MORE YOU SPEND, THE FASTER YOU'LL GO");
console.log("               BECAUSE YOU'LL HAVE BETTER ANIMALS");
 //console.crlf();
 console.log("     FOOD *** THE MORE YOU HAVE, THE LESS CHANCE THERE");
console.log("               IS OF GETTING SICK");
//console.crlf();
console.log("     AMMUNITION *** $1 BUYS A BELT OF 50 BULLETS");
console.log("            YOU WILL NEED BULLETS FOR ATTACKS BY ANIMALS");
console.log("               AND BANDITS, AND FOR HUNTING FOOD");
 //console.crlf();
 console.log("     CLOTHING *** THIS IS ESPECIALLY IMPORTANT FOR THE COLD");
 console.log("               WEATHER YOU WILL ENCOUNTER WHEN CROSSING");
 console.log("               THE MOUNTAINS");
//console.crlf();
console.log("     MISCELLANEOUS SUPPLIES *** THIS INCLUDES MEDICINE AND");
console.log("               OTHER THINGS YOU WILL NEED FOR SICKNESS");
 console.log("               AND EMERGENCY REPAIRS");
//console.crlf();
 //console.crlf();
 console.log("YOU CAN SPEND ALL YOUR MONEY BEFORE YOU START YOUR TRIP -");
console.log("OR YOU CAN SAVE SOME OF YOUR CASH TO SPEND AT FORTS ALONG");
console.log("THE WAY WHEN YOU RUN LOW. HOWEVER, ITEMS COST MORE AT");
console.log("THE FORTS. YOU CAN ALSO GO HUNTING ALONG THE WAY TO GET");
console.log("MORE FOOD.");
 //console.crlf();
console.log("WHENEVER YOU HAVE TO USE YOUR TRUSTY RIFLE ALONG THE WAY,");
 console.log("YOU WILL BE TOLD TO TYPE IN A WORD (ONE THAT SOUNDS LIKE A");
console.log("GUN SHOT). THE FASTER YOU TYPE IN THAT WORD AND HIT THE");
console.log("**ENTER** KEY, THE BETTER LUCK YOU'LL HAVE WITH YOUR GUN.");
//console.crlf();
 console.log("AT EACH TURN, ALL ITEMS ARE SHOWN IN DOLLAR AMOUNTS");
console.log("EXCEPT BULLETS");
console.log("WHEN ASKED TO ENTER MONEY AMOUNTS, DON'T USE A **$**.");
//console.crlf();
console.log("GOOD LUCK!!!");
}
function rifleSkills() {
	//console.crlf();
	 //console.crlf();
	 console.log("HOW GOOD A SHOT ARE YOU WITH YOUR RIFLE?\r\n");
	 console.log("(1) ACE MARKSMAN,  (2) GOOD SHOT,  (3) FAIR TO MIDDLIN'");
	 console.log("(4) NEED MORE PRACTICE,  (5) SHAKY KNEES");
	 //console.crlf();
	 console.log("ENTER ONE OF THE ABOVE,THE BETTER YOU CLAIM YOU ARE, THE\r\n");
	 console.log("FASTER YOU'LL HAVE TO BE WITH YOUR GUN TO BE SUCCESSFUL.");
	  choiceShootingExptLvl = console.getnum();
	  //if(choiceShootingExptLvl != 5) { // unsure about this expression taken from basic
	//choiceShootingExptLvl = 0;
	if(1 > choiceShootingExptLvl || choiceShootingExptLvl > 5) {
	console.log("\r\n[Invalid Selection]");
	rifleSkills();
	}
} 
function getAnimals() {
console.log("HOW MUCH DO YOU WANT TO SPEND ON YOUR OXEN TEAM\r\n  minimum : 201 \r\n");
animalsAMT = console.getnum();
while(300 <= animalsAMT || animalsAMT <= 200) 
{
	if(animalsAMT <= 200){
	console.log("NOT ENOUGH");
	}
	if(animalsAMT >= 300) {
	console.log("TOO MUCH");
	}
animalsAMT = console.getnum();
}
}
function getFood() {
	console.log("HOW MUCH DO YOU WANT TO SPEND ON FOOD");
	 foodAMT = console.getnum();
	 while(foodAMT <= 0) { 
	console.log("IMPOSSIBLE");
	 foodAMT = console.getnum();
}
}
function getAmmo() {
	console.log("HOW MUCH DO YOU WANT TO SPEND ON AMMUNITION");
	ammoAMT = console.getnum();
	while(ammoAMT <= 0) {
	console.log("IMPOSSIBLE");
	ammoAMT = console.getnum();
}
}
function getClothing(){
	console.log("\1bHOW MUCH DO YOU WANT TO SPEND ON CLOTHING");
	clothingAMT = console.getnum();
	while(clothingAMT <= 0){
	console.log("IMPOSSIBLE");
	clothingAMT = console.getnum();
}
}
function getSupplies() {
	console.log("HOW MUCH DO YOU WANT TO SPEND ON MISCELLANEOUS SUPPLIES");
	supplyAMT = console.getnum();
	while(supplyAMT <= 0) {
	console.log("IMPOSSIBLE");
	supplyAMT = console.getnum();
}
}
function initialPurchase() {

	flagForFortOption = flagForFortOption*-1;  // WTF IS THIS? -- switch from true to false whether or not you have to go to the fort
	//woundedFlag*illnessFlag*southPassFlag*blueMountainPassFlag*M*mileSouthPassFlag*turnNumber=0;  // WTF IS THISg removed as its probably some legacy basic code for clearing memory in old cpus
	anotherPurchase();

}
function anotherPurchase() {
	//console.crlf();
	getAnimals();
	getFood();
	getAmmo();
	getClothing();
	getSupplies(); 
	calculateCosts();
	}
function calculateCosts() {
	cashInitialPurchase = 700 - animalsAMT - foodAMT - ammoAMT - clothingAMT - supplyAMT;
	if(cashInitialPurchase <= 0) {
		console.log("YOU OVERSPENT! \r\nYOU ONLY HAD $700 TO SPEND. BUY AGAIN");
		initialPurchase();
	}
	else {
	ammoAMT *= 50;
	console.log("AFTER ALL YOUR PURCHASES, YOU NOW HAVE " + cashInitialPurchase + "  DOLLARS LEFT");
	}
}
function inventoryCheck() {
	 if(foodAMT <= 0) { 
		foodAMT=0;
		}
	if(ammoAMT <= 0) {
		ammoAMT=0;
		} 
	//clearIllness();
	if(clothingAMT <= 0) {  // if there is no clothing then there is no clothing
			clothingAMT = 0;} 	
	if(supplyAMT <= 0) {
			supplyAMT=0;
	} 
	if(foodAMT <= 13) {
		console.log("YOU'D BETTER DO SOME HUNTING OR BUY FOOD AND SOON!!!!\r\n\r\n");
		console.beep();
		//console.pause();
	}
	foodAMT = parseInt(foodAMT);
	ammoAMT = parseInt(ammoAMT);
	clothingAMT = parseInt(clothingAMT);
	supplyAMT = parseInt(supplyAMT);
	cashInitialPurchase = parseInt(cashInitialPurchase);
	totalMileage = parseInt(totalMileage);
	prevMileage=totalMileage; // WTF IS THIS} decemberSixth();
	//console.log("end inventory check");
}
function doctorVisit() {
	cashInitialPurchase = cashInitialPurchase - 20;
	if(cashInitialPurchase>0) {
		console.log("\r\n'Let's get you stitched up.'DOCTOR'S BILL IS $20\r\n");
		clearIllness();
	}
	else {
	cantAffordDoctor();
	}
	}
function turnStart(){
	inventoryCheck();
	//console.log("\r\nTurn " + turnNumber + " Start.\r\nIllness Flag = " + illnessFlag + "\r\nWounded Flag = " + woundedFlag + "\r\n\1bActual Mileage = " + totalMileage + "\r\nSouth Pass Flag normal[mile] = " + southPassFlag + "/" + mileSouthPassFlag + "\r\n");
		if(illnessFlag == 1 || woundedFlag == 1) {  //are you sick?
				doctorVisit();

}
					//console.log("b4 southpass flagcheck");
	southPassFlagCheck();
}
function firstTurn() {
turnNumber = 0;
//console.crlf();
console.log("MONDAY MARCH 29 1847");
//console.crlf();
turnStart();
}
function turnCheck() {

		 if(totalMileage <= 2040) { 
	 // ***SETTING DATE****
	turnNumber++;  //advances turn
	 //console.crlf();
	 console.log("MONDAY ");
	if(turnNumber == 1) {

		 console.log("APRIL 12");
}
if(turnNumber == 2) {
		 console.log("APRIL 26 ");
}
if(turnNumber == 3) {
		console.log("MAY 10");
}
if(turnNumber == 4) {
		console.log("MAY 24 ");
		}
if(turnNumber == 5) {
		console.log("JUNE 7 ");
}
if(turnNumber == 6) {
		console.log("JUNE 21 ");
}
if(turnNumber == 7) {
		console.log("JULY 5 ");
}
if(turnNumber == 8) {
		console.log("JULY 19 ");
}
if(turnNumber == 9) {
		console.log("AUGUST 2 ");
}
if(turnNumber == 10) {
		console.log("AUGUST 16 ");
}
if(turnNumber == 11) {
		console.log("AUGUST 31 ");
}
if(turnNumber == 12) {
		console.log("SEPTEMBER 13");
}
if(turnNumber == 13) {
		console.log("SEPTEMBER 27 ");
}
if(turnNumber == 14) {
		 console.log("OCTOBER 11 ");
}
if(turnNumber == 15) {
		 console.log("OCTOBER 25");
}
if(turnNumber == 16) {
	console.log("NOVEMBER 8 ");
}
if(turnNumber == 17) {
		console.log("NOVEMBER 22 ");
	}
if(turnNumber == 18) {
		console.log("DECEMBER 6 ");
}
if(turnNumber == 19) {
		 console.log("DECEMBER 20 ");
		 }
		 if(turnNumber == 20) {
		console.log("YOU HAVE BEEN ON THE TRAIL TOO LONG  ------ \r\n");
		console.log("YOUR FAMILY DIES IN THE FIRST BLIZZARD OF WINTER");
		causeOfDeath = "got too tired";
		formalities();
		return; //this might be okay since it should exit the function after the end of the game, maybe take out
		////console.crlf();
		}
		console.log(" 1847\r\n");
		turnStart();
}
else {
finalTurn();
}
}
function cantAffordDoctor() {
 cashInitialPurchase=0
 console.log("YOU CAN'T AFFORD A DOCTOR");
 youDiedOf();
 }				
function clearIllness() {
	woundedFlag = 0;
	illnessFlag = 0;
}
function turnChoice() {
	console.log("*FOOD*" + "BULLETS " + "\1bCLOTHING" + "MISC. SUPP." + "CASH");
	//console.crlf();
	console.log("--" + foodAMT + "-- --" + ammoAMT + "--\1b-- " + clothingAMT + "----" + supplyAMT + " ----" + cashInitialPurchase);
	if(flagForFortOption != -1) {
	flagForFortOption = flagForFortOption * -1; 
	fortHuntContinue();
}
}
function southPassFlagCheck(){
	//console.log("south pass flag check");
	if(mileSouthPassFlag != 1) {
	console.log("TOTAL MILEAGE IS : " + totalMileage + "\r\n");
	turnChoice();
	}
	else
	{
	console.log("TOTAL MILEAGE IS 950\r\nYou are traveling through mountains");
	mileSouthPassFlag = 0;
	turnChoice();
} 
}
function fortHuntContinue(){
	console.log("\r\nDO YOU WANT TO (1) STOP AT THE NEXT FORT, (2) HUNT, ");
	console.log("OR (3) CONTINUE ?");
	actionChoice = console.getnum();
		if(actionChoice == 1) {
				fortBuy();
				}	
		else if(actionChoice == 2) {
			if(ammoAMT<39){
			console.log("TOUGH---YOU NEED MORE BULLETS TO GO HUNTING");
			fortHuntContinue();
			}
			else {
			goHunting();
			}
			}
		else if(actionChoice == 3){
		checkFoodAMT();
		} 
		else
		{
		console.log("[Invalid Selection]");
		fortHuntContinue();
		//return;
}
}
function fortBuy(){
console.log("ENTER WHAT YOU WISH TO SPEND ON THE FOLLOWING\r\n");

//setFortAmtSubroutine();
foodFortCycle();
ammoFortCycle();
clothingFortCycle();
supplyFortCycle();
totalMileage = totalMileage-45;
checkFoodAMT();
}
function goHunting() {
if(ammoAMT<39) {
	console.log("TOUGH---YOU NEED MORE BULLETS TO GO HUNTING");
	fortHuntContinue();
	} 
	else {
totalMileage=totalMileage-45;
shootingSub();
//console.log("bangResponse time " + bangResponse);
if(bangResponse >= 1) {
var randomMeasure =  1000 * Math.random();
//console.log("" + randomMeasure + " : random " + 5*bangResponse + " adj bang response");
if(randomMeasure > 5*bangResponse) {
console.log("NICE SHOT!!!  RIGHT ON TARGET \r\nGOOD EATIN' TONIGHT!!\r\n");
console.log("RIGHT BETWEEN THE EYES \1b---YOU GOT A BIG ONE!!!!");
console.log("\r\nFULL BELLIES TONIGHT!\r\n");
foodAMT=foodAMT+52+Math.random() *6;
ammoAMT=ammoAMT-10-3*bangResponse;
//checkFoodAMT();
}
else {
console.log("YOU MISSED..........AND YOUR DINNER GOT AWAY.....");
ammoAMT=ammoAMT-10-Math.random()*4;
}

}
checkFoodAMT();
}
}
//the following function is my own helper function for returning a random integer for selecting a bang word

function shootingSub() {
var variationsOfShootingWord = new Array;
variationsOfShootingWord[0]="BANG"
variationsOfShootingWord[1]="BLAM"
 variationsOfShootingWord[2]="POW"
variationsOfShootingWord[3]="WHAM"
var shootingWordSelector=parseInt(getRandomInt(0,3));

console.log("\r\nTYPE " + variationsOfShootingWord[shootingWordSelector]);
//console.crlf();
console.beep();
bangClockStart = system.timer;
//console.log("bangClockStart time " + bangClockStart);
userBangWord = console.getstr();
bangResponse = system.timer;
userBangWord = userBangWord.toUpperCase();
//console.log("bangResponse time " + bangResponse);
bangResponseCheck();
function bangResponseCheck() {
 bangResponse=((bangResponse-bangClockStart)*36)-(choiceShootingExptLvl-1)
//console.crlf();
/*if(bangResponse<0) {
 bangResponse=0;
} */
if(userBangWord != variationsOfShootingWord[shootingWordSelector]) {
bangResponse = 0;
misfire();
}
}
}
function checkFoodAMT(){
	//console.log("checkFoodAMT function");
	 if(foodAMT <= 13) {
		 starve();
		 return;  //this should be okay 
		} 
		else
	
	 eatChoice();
	 
	}	
function eatChoice(){
	console.log("\r\nDO YOU WANT TO EAT (1) POORLY  (2) MODERATELY");
	console.log(" OR (3) WELL ?");
	choiceEat = console.getnum();
	if(foodAMT-8-5 < 0) {
starve();
}
else if(choiceEat > 3 || choiceEat < 1) {
	//console.crlf();
	console.log("YOU CAN'T EAT THAT WELL");
	eatChoice();
	//return;  this may need to be put back in
	
}	
else
{
choiceEat = parseInt(choiceEat);  
foodAMT=foodAMT-8-5*choiceEat;
totalMileage = totalMileage+200+(animalsAMT-220)/5+10*Math.random();
blizzardFlag = 0;
notEnoughClothes = 0;
riders();
}
}
function actionEvaluate()  {
	console.log("\r\nDO YOU WANT TO (1) HUNT, OR (2) CONTINUE");
	actionChoice = console.getnum();
		if(actionChoice == 1) {
				goHunting();
		}
		if(actionChoice == 2){
			checkFoodAMT();
			fortBuy();
		} 
}
function riders() {
//console.log("riders function beginning");
if(Math.random() * 10 < ((Math.pow(totalMileage/100-4),27)+72)/(((Math.pow(totalMileage/100-4),2)+12)-1) ){
//console.log("math selected event selector");
eventSelector();
}
else {
console.log("\r\nRIDERS AHEAD.  THEY ");
riderHostilityFactor = 0;
if(Math.random() <.8) {
console.log("DON'T ");
riderHostilityFactor=1;
}
console.log("LOOK HOSTILE\r\n");

if(Math.random() >.2) {
riderHostilityFactor=1-riderHostilityFactor;
}

tacticChoice = 0;

while(tacticChoice < 1 || tacticChoice > 4) {
console.log("TACTICS\r\n");
console.log("(1) RUN  (2) ATTACK  (3) CONTINUE  (4) CIRCLE WAGONS?");
tacticChoice = console.getnum();
tacticChoice = parseInt(tacticChoice);
}

if(riderHostilityFactor == 1) {
	milesAfterRiders();
}
else {
	if(tacticChoice == 1) { // 3110
		totalMileage=totalMileage+20;
		supplyAMT=supplyAMT-15;
		ammoAMT=ammoAMT-150;
		animalsAMT=animalsAMT-40;
		riderHostilityCheck();
	}
	if(tacticChoice == 2) { // attackCycle();
		shootingSub();
		//console.log(bangResponse + " : BANG RESPONSE (multiply times 4 subtract 40 ammo amt)");
	
		ammoAMT=ammoAMT-bangResponse*4-40;
		attackRiders();
		
		}
	if(tacticChoice == 3) {
	fortAMT = 0;
	milesAfterRiders();
	}
	if(tacticChoice == 4) {
	if(Math.random() >.8) { 
	ridersNoAttack();
	}
else {
 ammoAMT=ammoAMT-150;
supplyAMT=supplyAMT-15;
 riderHostilityCheck(); }
 
shootingSub();
ammoAMT=ammoAMT-bangResponse*30-80
totalMileage=totalMileage-25
attackRiders();
}
}
}
}

function milesAfterRiders() {
 if(tacticChoice == 1) { //RUN milesMinusFive(); 
totalMileage=totalMileage+15;
 animalsAMT=animalsAMT-10;
riderHostilityCheck();
}
 if(tacticChoice == 2) { //checkMoney();
totalMileage=totalMileage-5;
ammoAMT=ammoAMT-100;
 riderHostilityCheck();
 }
if(tacticChoice == 3) { // milesMinusTwenty();
 riderHostilityCheck();
 } 
if(tacticChoice == 4) {
totalMileage=totalMileage-20;
riderHostilityCheck();
}
}
function ridersNoAttack() {
 console.log("THEY DID NOT ATTACK");
 eventSelector();
 }
//was friendly.Riders()
function riderHostilityCheck() { 
if(riderHostilityFactor != 0) {
console.log("\r\nRIDERS WERE FRIENDLY, BUT CHECK FOR POSSIBLE LOSSES");
eventSelector();
}
else {
console.log("RIDERS WERE HOSTILE\r\n--CHECK FOR LOSSES\r\n");
console.beep();
 if(ammoAMT <= 0) {
console.log("YOU RAN OUT OF BULLETS AND GOT MASSACRED BY THE RIDERS");
//nsole.putmsg("ammoAMT var :   " + ammoAMT);
causeOfDeath = "got massacred";
formalities();
//return;  //another one that might not be necessary but comes after death
}
else {
eventSelector();
}
}
}
//southPassFlagCheck();
function attackRiders() {
	//console.log("\r\nYour BANG RESPONSE was " + bangResponse + "\r\n");
	if(bangResponse <= 40 && bangResponse >= 1) {
 	console.log("NICE SHOOTING---YOU DROVE THEM OFF");
	 riderHostilityCheck();
	 }
else { 
	if(bangResponse <= 60 && bangResponse >= 1) {
	console.log("KINDA SLOW WITH YOUR COLT .45");
	riderHostilityCheck();
	}
	else {
	 console.log("LOUSY SHOT---YOU GOT KNIFED\r\n");
	 console.beep();
	woundedFlag = 1;
	console.log("YOU HAVE TO SEE OL' DOC BLANCHARD\r\n");
	riderHostilityCheck();
	}
	}
}	
function showSupplies() {
console.log("*FOOD*" + "BULLETS " + "\1bCLOTHING" + "MISC. SUPP." + "CASH");
	//console.crlf();
	console.log("--" + foodAMT + "-- --" + ammoAMT + "--\1b-- " + clothingAMT + "----" + supplyAMT + " ----" + cashInitialPurchase + "\r\n");
	}	
function setFortAmtSubroutine() {
	fortAMT = console.getnum();
	if(cashInitialPurchase > 0) {  
	console.log(" ***  You have $" + cashInitialPurchase + " remaining\r\n");
	//showSupplies();
		fortAMT = console.getnum();
		if(fortAMT > cashInitialPurchase) {
		console.log("YOU DON'T HAVE THAT MUCH--KEEP YOUR SPENDING DOWN\r\n");
		setFortAmtSubroutine();
		}
		else 
		{
		cashInitialPurchase = cashInitialPurchase - fortAMT;	
		//showSupplies();
		}

	 } 
else 
		{
		console.log("You don't have any money left");
}
}		
function foodFortCycle(){
	fortAMT = 0;
	console.log("FOOD\r\n");

	if(cashInitialPurchase > 0) {  
	console.log("You have $" + cashInitialPurchase + " remaining\r\n");
	//showSupplies();
		fortAMT = console.getnum();
		if(fortAMT > cashInitialPurchase) {
		console.log("YOU DON'T HAVE THAT MUCH--KEEP YOUR SPENDING DOWN\r\n");
		foodFortCycle();
		}
		else 
		{
		cashInitialPurchase = cashInitialPurchase - fortAMT;
		foodAMT = parseInt(foodAMT +.667 * fortAMT);
	    fortAMT = 0;
		//showSupplies();
		}
	 } 
	else 
	{
	console.log("You don't have any money left");
	}
}
function ammoFortCycle(){
	console.log("AMMUNITION");
fortAMT = 0;
		if(cashInitialPurchase > 0) {  
			console.log("You have $" + cashInitialPurchase + " remaining\r\n");
			//showSupplies();
			fortAMT = console.getnum();
					if(fortAMT > cashInitialPurchase) {
				console.log("YOU DON'T HAVE THAT MUCH--KEEP YOUR SPENDING DOWN\r\n");
				ammoFortCycle();
					}
					else 
					{
				cashInitialPurchase = cashInitialPurchase - fortAMT;
				ammoAMT=parseInt(ammoAMT + 2/3 + fortAMT * 50);
				fortAMT = 0;	//this equation looks shaky
				//showSupplies();
		}
} 
		else 
		{
		console.log("You don't have any money left");
}
}
function clothingFortCycle(){
	console.log("\1bCLOTHING");
	fortAMT = 0;
		if(cashInitialPurchase > 0) {  
	console.log("You have $" + cashInitialPurchase + " remaining\r\n");
	//showSupplies();
		fortAMT = console.getnum();
		if(fortAMT > cashInitialPurchase) {
		console.log("YOU DON'T HAVE THAT MUCH--KEEP YOUR SPENDING DOWN\r\n");
		clothingFortCycle();
		}
		else 
		{
		cashInitialPurchase = cashInitialPurchase - fortAMT;
		clothingAMT = parseInt(clothingAMT + 2/3 * fortAMT);
	     fortAMT = 0;
		//showSupplies();
		}

	 } 
else 
		{
		console.log("You don't have any money left");
}	
}
function supplyFortCycle(){
 console.log("MISCELLANEOUS SUPPLIES");
fortAMT = 0;
	if(cashInitialPurchase > 0) {  
	console.log("You have $" + cashInitialPurchase + " remaining\r\n");
	//showSupplies();
		fortAMT = console.getnum();
		if(fortAMT > cashInitialPurchase) {
		console.log("YOU DON'T HAVE THAT MUCH--KEEP YOUR SPENDING DOWN\r\n");
		supplyFortCycle();
		}
		else 
		{
		cashInitialPurchase = cashInitialPurchase - fortAMT;
		supplyAMT = parseInt(supplyAMT + (.667 * fortAMT)); 
	    fortAMT = 0;
		//showSupplies();
		}
	 } 
	else 
	{
	console.log("You don't have any money left");
	}
}
function shotInLeg() { 
	if(bangResponse <= 35 && ammoAMT > 1  && outOfAmmoToggle != true) { 
	quickestDraw();
	}
	else {
	console.log("YOU GOT SHOT IN THE LEG AND THEY TOOK ONE OF YOUR OXEN");
	woundedFlag = 1;
	console.log("\r\nBETTER HAVE A DOC LOOK AT YOUR WOUND");
	supplyAMT=supplyAMT-5;
	animalsAMT=animalsAMT-20;
	outOfAmmoToggle = false;
	mountains();
	 }
	 }
function eventSelector() {
//console.log("event slector function beginning");
advanceEventCounter();
//console.crlf();

secondSwitch();
//console.log("event switch passed");
}
function advanceEventCounter() {
//console.log("event prior ")
//log(eventNo.toSource());
//console.log(eventNo);
eventNo++;
//log(eventNo.toSource());
//console.log("event advanced "); 
//console.log(eventNo);
}
function secondSwitch() {
//console.pause();
//console.clear();
//ON eventNo-10 continue: 4220,4290,4340,4650,4610,indianFood();
if(eventNo == 1) {
	console.log("WAGON BREAKS DOWN --\r\nLOSE TIME AND SUPPLIES FIXING IT\r\n");
	totalMileage = totalMileage-15-5*Math.random();
	supplyAMT=supplyAMT-8;
	 mountains();
}
		 
if(eventNo == 2) {
	console.log("OX INJURES LEG\r\n---\r\nSLOWS YOU DOWN REST OF TRIP\r\n");
	totalMileage=totalMileage-25;
	animalsAMT=animalsAMT-20;
	mountains();
}	 
if(eventNo == 3) {
	console.log("BAD LUCK\1b---YOUR DAUGHTER BROKE HER ARM\r\n");
	console.log("YOU HAD TO STOP AND USE SUPPLIES TO MAKE A SLING\r\n");
	totalMileage=totalMileage-5-4*Math.random();
	supplyAMT=supplyAMT-2-3*Math.random();
	mountains();
}	
if(eventNo == 4) {
	console.log("\1bOX WANDERS OFF\--- SPEND TIME LOOKING FOR IT\r\n");
	totalMileage=totalMileage-17;
	mountains();
}
if(eventNo == 5) {
	console.log("\1bYOUR SON GETS LOST\r\n---\r\nSPEND HALF THE DAY LOOKING FOR HIM");
	totalMileage=totalMileage-10
	mountains();
}	 
if(eventNo == 6) {
	console.log("UNSAFE \1bWATER\r\n--\r\nLOSE TIME LOOKING FOR CLEAN SPRING");
	totalMileage=totalMileage-10*Math.random()*-2
	 mountains();
}
	  
if(eventNo == 7) {
	if(totalMileage>950) {
	 coldWeather();
	 }
	 else {
	console.log("\1bHEAVY RAINS---TIME AND SUPPLIES LOST");
	 foodAMT=foodAMT-10;
	ammoAMT=ammoAMT-500;
	supplyAMT=supplyAMT-15;
	totalMileage=totalMileage-10*Math.random()-5;
     mountains();
	}
}
if(eventNo == 8) {
	 console.log("BANDITS ATTACKDraw Your Weapon\r\n");
	 console.beep();
	 //console.pause();
	shootingSub();
	ammoAMT=ammoAMT-20*bangResponse;
	//console.log("BANG RESPONSE = " + bangResponse + "\r\n"); 
	 if(bangResponse <= 50  && bangResponse >= 1) { 
	shotInLeg();
	}
	else {
	console.log("YOU RAN OUT OF BULLETS---THEY GET LOTS OF CASH");
	 cashInitialPurchase=cashInitialPurchase/3;
	outOfAmmoToggle = true;
	shotInLeg();
	}
}
	
if(eventNo == 9) {
	 console.log("THERE WAS A FIRE IN YOUR WAGON\r\n--\r\n FOOD AND SUPPLIES DAMAGED!\r\n");
	 foodAMT=foodAMT-40;
	 ammoAMT=ammoAMT-400;
	 supplyAMT=supplyAMT-Math.random() *68-3;
	totalMileage=totalMileage-15;
	mountains();
}
if(eventNo == 10) {
	 console.log("LOSE YOUR WAY IN HEAVY FOG\r\n---TIME IS LOST\r\n"); 
	totalMileage=totalMileage-10-5*Math.random();
	 mountains();
}
 
if(eventNo == 11) {
	 console.log("YOU KILLED A POISONOUS SNAKE AFTER IT BIT YOU");
	ammoAMT=ammoAMT-10;
	supplyAMT=supplyAMT-5;
	if(supplyAMT <= 0) {
	console.log("\r\n YOU DIE OF SNAKEBITE SINCE YOU HAVE NO MEDICINE");
	causeOfDeath = "got bit by a snake";
	formalities();
	return;  // comes after formalities
	}
	else {
	 mountains();
	 }
	}
if(eventNo == 12) {
	console.log("YOUR WAGON GETS SWAMPED FORDING \1bRIVER--LOSE FOOD AND \1bCLOTHES");
	foodAMT=foodAMT-30;
	clothingAMT=clothingAMT-20;
	totalMileage=totalMileage-20-20*Math.random();
	mountains();
}	 
if(eventNo == 13) {
	console.log("WILD ANIMALS ATTACK!");
	shootingSub();
	if(ammoAMT>39) { 
	wildBangResponse();
	}
	else {
	console.log("YOU WERE TOO LOW ON BULLETS--");
	 console.log("THE WOLVES OVERPOWERED YOU");
	 woundedFlag=1;
	youDiedOf();
	}
	 ammoAMT=ammoAMT-20*bangResponse
	clothingAMT=clothingAMT-bangResponse*4
	 foodAMT=foodAMT-bangResponse*8
	mountains();
}	
// this one looks like it needs fixing;	
if(eventNo == 14) {
	if(choiceEat==1) {
	illnessSubroutine();
	} 
	if(choiceEat==2) {
	if(Math.random() <.25) {
		illnessSubroutine();
		}
	
		mountains();
		
		}
	if(choiceEat == 3){
		 if(Math.random() >.5) {
			 illnessSubroutine();
			 mountains();
			 }
			 else {
				mountains();
			
			 }
			 }
}
if(eventNo == 15) {
	console.log("HELPFUL INDIANS SHOW YOU WHERE TO FIND MORE FOOD");
	foodAMT=foodAMT+14;
	mountains();
}

}
// ***MOUNTAINS***
function mountains()  {
	//console.pause();
	if(totalMileage <= 950) {
	turnCheck();
	return;//this is the sketchiest one it seems to leave in.
	}
	if(Math.random() * 10< 9-((Math.pow(totalMileage/100-15,2)+72)/(Math.pow(totalMileage/100-15),2)+12)) {
	hailStorm();
	}
console.log("\r\nRUGGED MOUNTAINS /\n^.~/^.~/^.~\r\n");
//console.pause();
if(Math.random() <.1) {

totalMileage=totalMileage-60;
} //4780
if(Math.random() <.11) {
slowGoing();
}
else {
console.log("YOU GOT LOST\r\n---LOSE VALUABLE TIME TRYING TO FIND TRAIL!");
console.beep();
totalMileage=totalMileage-60;
hailStorm();
console.log("\r\nWAGON DAMAGED!---\r\nLOSE TIME AND SUPPLIES\r\n");
supplyAMT=supplyAMT-5;
ammoAMT=ammoAMT-200;
totalMileage=totalMileage-20-30*Math.random();
checkSouthPass();
}
}
function checkSouthPass() {
	 if(southPassFlag == 1) { 
	 checkMileage17hundred();
	 }
		 else {
	southPassFlag = 1;
	if(Math.random()<.8) {
	blizzard(); 
	} 
	else {
	console.log("YOU MADE IT SAFELY THROUGH SOUTH PASS--NO SNOW\r\n");
	checkMileage17hundred();
}
}
}
function slowGoing() {
console.log("THE GOING GETS SLOW\r\n");
 totalMileage= totalMileage-45-Math.random() /.02;
checkSouthPass();
}
//this needs to be fixed big time  ALERT ALERT 
function checkMileage17hundred() { 
if(totalMileage<1700) {
 checkMileageNine50();
 }
if(blueMountainPassFlag != 1) { 
checkMileageNine50();
}
else
{
blueMountainPassFlag = 1;
}
if(Math.random() <.7) {
blizzard();
}
else {
turnCheck();
}
}

function checkMileageNine50() {
if(totalMileage < 950) {
turnCheck();
}
else {
mileSouthPassFlag=1;
turnCheck();
}
}
function blizzard() {
console.log("BLIZZARD IN MOUNTAIN PASS--TIME AND SUPPLIES LOST");
blizzardFlag=1;
foodAMT=foodAMT-25;
supplyAMT=supplyAMT-10;
 ammoAMT=ammoAMT-300;
totalMileage=totalMileage-30-40*Math.random();
if(clothingAMT<18+2*Math.random()) {
illnessSubroutine();
}
else {
checkMileageNine50();
}
}
// ***DYING***
function starve() {
console.log("\r\nYOU RAN OUT OF FOOD AND STARVED TO DEATH");
causeOfDeath = "starved to death";
formalities();
return;  //after formalities
}
function outOfMedicalSupplies() {
console.log("YOU RAN OUT OF MEDICAL SUPPLIES");
youDiedOf();
}
function youDiedOf() {
console.log("\r\nYOU DIED OF ");
if(woundedFlag == 1) {
 injuries();
 }
 else {
console.log("PNEUMONIA");
causeOfDeath = "got pneumonia";
formalities();
return;  //after formalities
}
}
function injuries() {
console.log("INJURIES");
causeOfDeath = "was injured badly";
formalities();
return;  //after formalities
}
function formalities() {
//console.crlf();
console.log("DUE TO YOUR UNFORTUNATE SITUATION, THERE ARE A FEW");
console.log(" FORMALITIES WE MUST GO THROUGH");
//console.crlf();
console.log("WOULD YOU LIKE A MINISTER?");
yesNo = console.getstr(); 
console.log("WOULD YOU LIKE A FANCY FUNERAL?");
yesNo = console.getstr(); 
console.log("\1bWOULD YOU LIKE US TO INFORM YOUR NEXT OF KIN?");
yesNo = console.getstr(); 
if(yesNo="YES") {
telegraph();
} 
else {
 console.log("BUT YOUR AUNT SADIE IN ST. LOUIS IS REALLY WORRIED ABOUT YOU");
 //console.crlf();
telegraph();
}
}

function digGrave(){
    console.log("What would you like on your tombstone? (79 chars)\r\n>");
    this.engraving = console.getstr();
	this.fromBBS = system.name;
    this.engraving = this.engraving.substring(0,78);
    this.score = parseInt(totalMileage);
    this.corpseName = user.alias;
	this.deathDate = system.datestr();
	this.deathCause = causeOfDeath;
	//console.clear();
    console.log("\r\nHere lies the rotten corpse of " + this.corpseName);
    console.log("\r\n ... \r\n" + this.engraving);
	console.log("\r\nTraveled " + this.score + " miles from " + this.fromBBS + " before they " + this.deathCause + " and died.\r\n\r\n\r\n");
    graveObj = {"name":this.corpseName,"engraving":this.engraving,"score":this.score,"bbs":this.fromBBS,"date":this.deathDate,"cause":this.deathCause};
    //db.push("TRAIL","TRAIL.GRAVES",graveObj,2);
    //db.cycle();
}
function telegraph() {
console.log("THAT WILL BE $4.50 FOR THE TELEGRAPH CHARGE.\r\n");
 //console.crlf();
 console.log("WE THANK YOU FOR THIS INFORMATION AND WE ARE SORRY YOU ");
console.log("DIDN'T MAKE IT TO THE GREAT TERRITORY OF OREGON ");
console.log("BETTER LUCK NEXT TIME");
 //console.crlf();
//console.crlf();
console.log("SINCERELY");
//console.crlf();
console.log("THE OREGONCITY CHAMBER OF COMMERCE\r\n\r\n");
digGrave();
throw "gameOver";
console.log("GAME OVER");
}


// ***FINAL TURN***
function finalTurn() {
 twoWeekFraction=(2040-prevMileage)/(totalMileage-prevMileage);
foodAMT=foodAMT+(1-twoWeekFraction)*(8+5*choiceEat);
//console.crlf();
// **BELLS IN LINES 5470,5480**
console.beep();
console.beep();
console.beep();
console.log("YOU FINALLY ARRIVED AT OREGONCITY");
console.log("AFTER 2040 LONG MILES---HOORAY!!!!!");
console.log("A REAL PIONEER!");
 //console.crlf();
twoWeekFraction=parseInt(twoWeekFraction*14);
turnNumber=turnNumber*14+twoWeekFraction;
twoWeekFraction=twoWeekFraction+1;

switch(twoWeekFraction%7) { 
//twoWeekFraction=twoWeekFraction-7
// ON twoWeekFraction continue: 5570,5590,5610,5630,5650,5670,5690
 case 1 :
console.log("MONDAY ");
break;
case 2 :
 console.log("TUESDAY ");
break;
case 3 :
console.log("WEDNESDAY ");
break;
case 4 :
 console.log("THURSDAY ");
break;
case 5 :
console.log("FRIDAY ");
break;
case 6 :
console.log("SATURDAY ");
break;
case 0 :
 console.log("SUNDAY ");
break;
}
finalMonth();
//console.crlf();
console.log("FOOD","BULLETS","CLOTHING","MISC. SUPP.","CASH");
if(ammoAmt<0) {
 ammoAMT=0;
 }
if(clothingAmount<0) {
clothingAMT=0;
}
if(supplyAMT<0) {
supplyAMT=0;
}
if(cashInitialPurchase<0) {
 cashInitialPurchase=0;
 }
if(foodAMT<0) {
foodAMT=0;
}
console.log(parseInt(foodAMT) + parseInt(ammoAMT) + parseInt(clothingAMT) + parseInt(supplyAMT) + parseInt(cashAfterInitialPurchase));
 //console.crlf();
 console.log("PRESIDENT JAMES K. POLK SENDS YOU HIS");
console.log("HEARTIEST CONGRATULATIONS");
 //console.crlf();
console.log("AND WISHES YOU A PROSERPOUS LIFE AHEAD");
//console.crlf();
console.log("AT YOUR NEW HOME");
newHighScore();
}
function newHighScore(){
    console.log("YOUR NAME HAS BEEN ADDED TO THE HIGH SCORE LIST!!!");
	this.fromBBS = system.name;
    this.score = Score();
	this.score = this.score * (22 - turnNumber) * (6 - choiceShootingExptLvl);
	console.log("Your score was " + this.score + "\r\n");
    this.corpseName = user.alias;
	this.deathDate = system.datestr();
    scoreObj = {"name":this.corpseName,"score":this.score,"bbs":this.fromBBS,"date":this.deathDate};
    //db.push("TRAIL","TRAIL.SCORES",scoreObj,2);
    //db.cycle();
	throw err;
}

// ***ILLNESS SUB-ROUTINE***
function illnessSubroutine() {
if(100*Math.random() < 10+(choiceEat-1) * 35) {
console.log("MILD ILLNESS\r\n---\r\nMEDICINE USED\r\n");
totalMileage=totalMileage-5;
 supplyAMT=supplyAMT-2;
}
else { 
if(100*Math.random() <100-(40/Math.pow(4,(choiceEat-1)))) {
console.log("\r\nBAD ILLNESS\r\n---MEDICINE USED");
 totalMileage=totalMileage-5;
supplyAMT=supplyAMT-5;
checkSupplies();
}else {
console.log("SERIOUS ILLNESS\r\n---");
console.log("YOU MUST STOP FOR MEDICAL ATTENTION");
supplyAMT=supplyAMT-10;
illnessFlag = 1;
 checkSupplies();
}
}

 if(supplyAMT<0) {
 outOfMedicalSupplies();
 }
 else {
 if(blizzardFlag == 1) {
 checkMileageNine50();
}
else {
mountains();
}
}
}



/* 6470 // ***IDENTIFICATION OF VARIABLES IN THE PROGRAM***
6480 // A = AMOUNT SPENT ON ANIMALS
6490 // B = AMOUNT SPENT ON AMMUNITION
6500 // B1 = ACTUAL RESPONSE TIME FOR console.inkey(TING "BANG"
6510 // B3 = CLOCK TIME START OF console.inkey(TING "BANG"
6520 // C = AMOUNT SPENT ON CLOTHING
6530 // C1 = FLAG FOR INSUFFICIENT CLOTHING IN COLD WEATHER
6540 // C$ = YES/NO RESPONSE TO QUESTIONS
6550 // D1 = COUNTER IN GENERATING EVENTS
6560 // D3 = TURN NUMBER FOR SETTING DATE
6570 // D4 = CURRENT DATE
6580 // D9 = CHOICE OF SHOOTING EXPERTISE LEVEL
6590 // E = CHOICE OF EATING
6600 // F = AMOUNT SPENT ON FOOD
6610 // F1 = FLAG FOR CLEARING SOUTH PASS
6620 // F2 = FLAG FOR CLEARING BLUE MOUNTAINS
6630 // F9 = FRACTION OF 2 WEEKS TRAVELED ON FINAL TURN
6640 // X5 = FLAG FOR INJURY
6650 // L1 = FLAG FOR BLIZZARD
6660 // M = TOTAL MILEAGE WHOLE TRIP
6670 // M1 = AMOUNT SPENT ON MISCELLANEOUS SUPPLIES
6680 // M2 = MILEAGE UP THROUGH PREVIOUS TURN
6690 // M9 = FLAG FOR CLEARING SOUTH PASS IN SETTING MILEAGE
6700 // P = AMOUNT SPENT ON ITEMS AT FORT
6710 // R1 = RANDOM NUMBER IN CHOOSING EVENTS
6720 // S4 = FLAG FOR ILLNESS
6730 // S5 = ""HOSTILITY OF RIDERS"" FACTOR
6740 // S6 = SHOOTING WORD SELECTOR
6750 // S$ = VARIATIONS OF SHOOTING WORD
6760 // T = CASH LEFT OVER AFTER INITIAL PURCHASES
6770 // T1 = CHOICE OF TACTICS WHEN ATTACKED
6780 // X = CHOICE OF ACTION FOR EACH TURN
6790 // X1 = FLAG FOR FORT OPTION
6800 END */

	function hailStorm() { 
	console.log("\r\nHAIL STORM\r\n---SUPPLIES DAMAGED\r\n");
	console.beep();
	//console.pause();
	 totalMileage = totalMileage-5-Math.random() *10;
	ammoAMT=ammoAMT-200;
	supplyAMT=supplyAMT-4-Math.random() * 3;
	// mountains();
	}
	
function warmEnough() {	
		if(notEnoughClothes !=1) {
				 mountains();
			}
			else {
				illnessSubroutine();
				}
}
	
	function coldWeather() {
	 console.log("COLD \1bWEATHER ---BRRRRRRR!---YOU ");
	if(clothingAMT < 22+4*Math.random()) {
	notEnoughClothes = 0;

	}
	else {
	 console.log("DON'T ");
	 notEnoughClothes = 1;
	 
	 }
	 console.log("HAVE ENOUGH CLOTHING TO KEEP WARM\r\n");
	 warmEnough();
	 //console.pause();
	 }
	 
function wildBangResponse() {
		if(bangResponse < 45 ||bangResponse == 0){
			 slowDraw();
			 }
			else {
			console.log("NICE SHOOTIN' PARDNER---THEY DIDN'T GET MUCH");
			}
			}

			function slowDraw() {
				console.log("SLOW ON THE DRAW---THEY GOT AT YOUR FOOD AND CLOTHES");
				}
		/*		
						function wildBangResponse {
			 if(bangResponse<2) { slowDraw();
			 }
			 else {
			 console.log("NICE SHOOTIN' PARDNER---THEY DIDN'T GET MUCH");
			}
			function slowDraw(); {
				console.log("SLOW ON THE DRAW---THEY GOT AT YOUR FOOD AND CLOTHES");
				}
		**/		

	 
	function quickestDraw() {
	console.log("QUICKEST DRAW OUTSIDE OF DODGE CITY!!!");
	console.log("YOU GOT 'EM!");
	mountains();
	}
	
function finalMonth() {
if(turnNumber<93) {
console.log("JULY " + turnNumber + " 1847");
turnNumber=turnNumber-93;
}
if(93<turnNumber <124) {
 turnNumber=turnNumber-124;
console.log("AUGUST " + turnNumber + " 1847");
}
if(123<turnNumber<155) {
 turnNumber=turnNumber-155;
 console.log("SEPTEMBER " + turnNumber + " 1847");
}

if(154<turnNumber<185) {
turnNumber=turnNumber-185;
console.log("OCTOBER " + turnNumber + " 1847");
}

 if(184 < turnNumber < 216) {
 turnNumber=turnNumber-216;
 console.log("NOVEMBER " + turnNumber + " 1847");
}
if(215 < turnNumber246) {
turnNumber=turnNumber-246;
 console.log("DECEMBER " + turnNumber + "1847");
 }
 }
 
 function checkSupplies() {
 if(supplyAMT < 0) {
 outOfMedicalSupplies();
 return;
 }
if(blizzardFlag == 1) {
 checkMileageNine50();
 return;;
 }
 mountains();
 }
 
 
 function misfire(){
 var misfirePhrase = new Array;
misfirePhrase[0]="You hit a rock"
misfirePhrase[1]="You completely miss your target, but almost kill your favorite sheep."
 misfirePhrase[2]="Looks like you forgot to take the safety off"
misfirePhrase[3]="Who taught you to shoot? Plaxico Burress?"
var misfirePhraseSelector=parseInt(getRandomInt(0,misfirePhrase.length - 1));
console.log("" + misfirePhrase[misfirePhraseSelector] + "\r\n");
}
}

try {
OregonTrail(); 
}
catch(err) {
console.log("GAME OVER");
}
 
 
