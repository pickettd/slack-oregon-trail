/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/
            

This is a sample Slack bot built with Botkit.

This bot demonstrates a multi-stage conversation

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node demo_bot.js

# USE THE BOT:

  Find your bot inside Slack

  Say: "pizzatime"

  The bot will reply "What flavor of pizza do you want?"

  Say what flavor you want.
  
  The bot will reply "Awesome" "What size do you want?"

  Say what size you want.

  The bot will reply "Ok." "So where do you want it delivered?"
  
  Say where you want it delivered.
  
  The bot will reply "Ok! Goodbye."
  
  ...and will refrain from billing your card because this is just a demo :P

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
  convo.ask("SO HOW GOOD A SHOT ARE YOU WITH YOUR RIFLE (1-5)?", [{
    pattern: '[1-5]',
    callback: function(response, convo) {
      convo.say("TIME TO DECIDE WHAT TO BUY, YOU ONLY HAVE 300 AVAIABLE FOR ALL PURCHASES");
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
  convo.ask("HOW MUCH DO YOU WANT TO SPEND ON YOUR OXEN TEAM (minimum 201, maximum 299)?", [{
    pattern: '[2][1-9][0-9]|[2][0][1-9]',
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
  convo.ask("HOW MUCH DO YOU WANT TO SPEND ON FOOD (must be more than 0)?", [{
    pattern: '[1-9]\d*',
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
    thisGameObject.totalMileage = Math.round(200+(thisGameObject.animalsValue-220)/5+10*Math.random());
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
    convo.say('You will starve next round if you don\t get more food');
  }

  convo.ask("You see a box of fruit near the path abandoned by a previous caravan. Do you want to eat it?", [{
      default: true,
      callback: function(response,convo) {
        var yesNoHere = response.text.toUpperCase();
        if(yesNoHere[0] == "Y") {
          convo.say('All of you get dysentery and are unable to complete the trail. GAME OVER');
        }
        else {
          thisGameObject.foodValue=thisGameObject.foodValue-food_each_round_const;
          thisGameObject.totalMileage = Math.round(200+(thisGameObject.animalsValue-220)/5+10*Math.random());
          if (thisGameObject.totalMileage > 300) {
            convo.say('You\'ve finished the journey! CONGRATULATIONS');
          }
          else if (thisGameObject.foodValue <= food_each_round_const) {
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

askWhereDeliver = function(response, convo, thisGameObject) {
  convo.ask("So where do you want pizza delivered?", function(response, convo) {
    convo.say("Ok! Goodbye.");
    convo.next();
  });
};

postInstructions = function(convo) {
    convo.say("THIS PROGRAM SIMULATES A TRIP OVER THE OREGON TRAIL FROM");
    convo.say("INDEPENDENCE MISSOURI TO OREGON CITY, OREGON IN 1847.");
    convo.say("YOUR FAMILY OF FIVE WILL COVER THE 2040 MILE OREGONTRAIL");
    convo.say("IN 5-6 MONTHS --- IF YOU MAKE IT ALIVE.");
    convo.say("YOU HAD SAVED $500 TO SPEND FOR THE TRIP, AND YOU'VE JUST");
    convo.say("   PAID $200 FOR A WAGON.");
    convo.say("YOU WILL NEED TO SPEND THE REST OF YOUR MONEY ($200) ON THE");
    convo.say("   FOLLOWING ITEMS:");
    convo.say("     OXEN *** YOU CAN SPEND $201-$299 ON YOUR TEAM");
    convo.say("            THE MORE YOU SPEND, THE FASTER YOU'LL GO");
    convo.say("               BECAUSE YOU'LL HAVE BETTER ANIMALS");
    convo.say("     FOOD *** THE MORE YOU HAVE, THE LESS CHANCE THERE");
    convo.say("               IS OF GETTING SICK");
    convo.say("     AMMUNITION *** $1 BUYS A BELT OF 50 BULLETS");
    convo.say("            YOU WILL NEED BULLETS FOR ATTACKS BY ANIMALS");
    convo.say("               AND BANDITS, AND FOR HUNTING FOOD");
    convo.say("     CLOTHING *** THIS IS ESPECIALLY IMPORTANT FOR THE COLD");
    convo.say("               WEATHER YOU WILL ENCOUNTER WHEN CROSSING");
    convo.say("               THE MOUNTAINS");
    convo.say("     MISCELLANEOUS SUPPLIES *** THIS INCLUDES MEDICINE AND");
    convo.say("               OTHER THINGS YOU WILL NEED FOR SICKNESS");
    convo.say("               AND EMERGENCY REPAIRS");
    convo.say("YOU CAN SPEND ALL YOUR MONEY BEFORE YOU START YOUR TRIP -");
    convo.say("OR YOU CAN SAVE SOME OF YOUR CASH TO SPEND AT FORTS ALONG");
    convo.say("THE WAY WHEN YOU RUN LOW. HOWEVER, ITEMS COST MORE AT");
    convo.say("THE FORTS. YOU CAN ALSO GO HUNTING ALONG THE WAY TO GET");
    convo.say("MORE FOOD.");
    convo.say("WHENEVER YOU HAVE TO USE YOUR TRUSTY RIFLE ALONG THE WAY,");
    convo.say("YOU WILL BE TOLD TO TYPE IN A WORD (ONE THAT SOUNDS LIKE A");
    convo.say("GUN SHOT). THE FASTER YOU TYPE IN THAT WORD AND HIT THE");
    convo.say("**ENTER** KEY, THE BETTER LUCK YOU'LL HAVE WITH YOUR GUN.");
    convo.say("AT EACH TURN, ALL ITEMS ARE SHOWN IN DOLLAR AMOUNTS");
    convo.say("EXCEPT BULLETS");
    convo.say("WHEN ASKED TO ENTER MONEY AMOUNTS, DON'T USE A **$**.");
    convo.say("GOOD LUCK!!!");
};
postRifle = function(convo) {
  convo.say("CHOOSE YOUR RIFLE SKILL:");
  convo.say("(1) ACE MARKSMAN,  (2) GOOD SHOT,  (3) FAIR TO MIDDLIN'");
  convo.say("(4) NEED MORE PRACTICE,  (5) SHAKY KNEES");
  convo.say("ENTER ONE OF THE ABOVE,THE BETTER YOU CLAIM YOU ARE, THE");
  convo.say("FASTER YOU'LL HAVE TO BE WITH YOUR GUN TO BE SUCCESSFUL.");
};
