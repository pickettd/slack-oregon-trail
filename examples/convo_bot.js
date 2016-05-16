/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/
            

This is an Oregon Trail esque Slack bot built with Botkit.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node demo_bot.js

# USE THE BOT:

  Find your bot inside Slack

  Use Direct Message or a Direct Mention for the bot and say: "oregontime"

  The bot will let you play our game!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var Botkit = require('../lib/Botkit.js');

food_each_round_const = 10;

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

controller.hears(['oregontime'],['direct_message','direct_mention'],function(bot,message) {
  bot.startConversation(message, askInstructions);
});

askInstructions = function(response, convo) {
  convo.ask("We're going to play Oregon Trail! Do you need instructions (Yes/No)?", function(response, convo) {
    var yesNo = response.text.toUpperCase();
    if(yesNo[0] == "Y") {
      postInstructions(convo);
    }
    var thisGameObject = {};
    askRifle(response, convo, thisGameObject);
    convo.next();
  });
};

askRifle = function(response, convo, thisGameObject) {
  postRifle(convo);
  convo.ask("So how good a shot are you with your rifle (1-5)?", [{
    pattern: '^[1-5]$',
    callback: function(response, convo) {
      convo.say("Time to decide what to buy, you only have 300 available for all purchases");
      askAboutAnimals(response, convo, thisGameObject);
      convo.next();
    }
  },{
      default: true,
      callback: function(response,convo) {
        convo.say('Please enter 1, 2, 3, 4, or 5');
        // repeat the question
        convo.repeat();
        convo.next();
      }
  }], {
    key: 'choiceShootingExptLvl'
  });
};

askAboutAnimals = function(response, convo, thisGameObject) {
  convo.ask("How much do you want to spend on your oxen team (minimum 201, maximum 299)?", [{
    pattern: '^[2][1-9][0-9]|[2][0][1-9]$',
    callback: function(response, convo) {
      askAboutFood(response, convo, thisGameObject);
      convo.next();
    }
  },{
      default: true,
      callback: function(response,convo) {
        convo.say('200 or less is too little but 300 or more is too much - please make a choice in the middle');
        // repeat the question
        convo.repeat();
        convo.next();
      }
  }], {
    key: 'animalsAMT'
  });
};

askAboutFood = function(response, convo, thisGameObject) {
  convo.ask("How much do you want to spend on food (must be more than 0)?", [{
    pattern: "^[1-9]|[1-9][0-9]|[1-3][0-9][0-9]$",
    callback: function(response, convo) {
      checkAboutPurchases(response, convo, thisGameObject);
      convo.next();
    }
  },{
      default: true,
      callback: function(response,convo) {
        convo.say('You have to buy more than 0 food, please enter a number bigger than 0');
        // repeat the question
        convo.repeat();
        convo.next();
      }
  }], {
    key: 'foodAMT'
  });
};

checkAboutPurchases = function(response, convo, thisGameObject) {
  var res = convo.extractResponses();
  var animalsValue  = parseInt(convo.extractResponse('animalsAMT'));
  var foodValue  = parseInt(convo.extractResponse('foodAMT'));

  if ((animalsValue + foodValue) < 301) {
    thisGameObject.animalsValue = animalsValue;
    thisGameObject.foodValue=foodValue-food_each_round_const;
    thisGameObject.totalMileage = Math.round(200+(thisGameObject.animalsValue-200)/5+10*Math.random());
    processRoundAskAboutFruit(response, convo, thisGameObject);
  }
  else {
    convo.say('You can\'t afford that much! You can only buy up to 300 total');
    askAboutAnimals(response, convo, thisGameObject);
  }
};

processRoundAskAboutFruit = function(response, convo, thisGameObject) {
  if (thisGameObject.foodValue < 0) {
    thisGameObject.foodValue = 0;
  }
  convo.say("You are making process on your trip and get to an well worn pitstop on the trail");
  convo.say('Right now you have '+thisGameObject.foodValue+' food left.');
  convo.say('And you have progressed '+thisGameObject.totalMileage+' miles so far.');
  if (thisGameObject.foodValue <= food_each_round_const) {
    convo.say('You will starve next round if you don\'t get more food');
  }

  convo.ask("You see a box of fruit near the path abandoned by a previous caravan. Do you want to eat it (Yes/No)?", [{
      default: true,
      callback: function(response,convo) {
        var yesNoHere = response.text.toUpperCase();
        if(yesNoHere[0] == "Y") {
          convo.say('All of you get dysentery and are unable to complete the trail. GAME OVER');
        }
        else {
          thisGameObject.foodValue=thisGameObject.foodValue-food_each_round_const;
          thisGameObject.totalMileage = Math.round(thisGameObject.totalMileage+(thisGameObject.animalsValue-200)/5+10*Math.random());
          if (thisGameObject.totalMileage > 274) {
            convo.say('You\'ve finished the journey! CONGRATULATIONS');
          }
          else if (thisGameObject.foodValue <= 0) {
            convo.say('All of you starve and are unable to complete the trail. GAME OVER');
          }
          else {
            processRoundAskAboutFruit(response, convo, thisGameObject);
          }
        }
        convo.next();
      }
  }]);
}

postInstructions = function(convo) {
    convo.say("THIS PROGRAM SIMULATES A TRIP OVER A PORTION OF THE OREGON TRAIL FROM");
    convo.say("INDEPENDENCE MISSOURI TO OREGON CITY, OREGON IN 1847.");
    convo.say("YOUR FAMILY OF FIVE WILL COVER A 275 MILE SEGMENT OF THE TRAIL --- IF YOU MAKE IT ALIVE.");
    convo.say("YOU HAD SAVED $500 TO SPEND FOR THE TRIP, AND YOU'VE JUST PAID $200 FOR A WAGON.");
    convo.say("YOU WILL NEED TO SPEND THE REST OF YOUR MONEY ($300) ON THE FOLLOWING ITEMS:");
    convo.say("     OXEN *** YOU CAN SPEND $201-$299 ON YOUR TEAM");
    convo.say("            THE MORE YOU SPEND, THE FASTER YOU'LL GO");
    convo.say("               BECAUSE YOU'LL HAVE BETTER ANIMALS");
    convo.say("     FOOD *** THE MORE YOU HAVE, THE LESS CHANCE THERE");
    convo.say("     IS OF GETTING SICK AND THE LONGER YOU CAN TRAVEL WITHOUT GETTING MORE");
    convo.say("YOU CAN SPEND ALL YOUR MONEY BEFORE YOU START YOUR TRIP -");
    convo.say("OR YOU CAN SAVE SOME OF YOUR CASH IN CASE YOU NEED IT ON THE WAY.");
    convo.say("YOU ALSO MIGHT FIND FOOD ALONG THE WAY.");
    convo.say("AT EACH TURN, ALL ITEMS ARE SHOWN IN DOLLAR AMOUNTS.");
    convo.say("WHEN ASKED TO ENTER MONEY AMOUNTS, DON'T USE A **$** SYMBOL.");
    convo.say("GOOD LUCK!!!");
};
postRifle = function(convo) {
  convo.say("CHOOSE YOUR RIFLE SKILL:");
  convo.say("(1) ACE MARKSMAN,  (2) GOOD SHOT,  (3) FAIR TO MIDDLIN' (4) NEED MORE PRACTICE,  (5) SHAKY KNEES");
};
