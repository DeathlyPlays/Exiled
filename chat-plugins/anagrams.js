var path = require('path');
var fs = require('fs');

//functions
function shuffle(string) {
    var parts = string.split('');
    for (var i = parts.length; i > 0;) {
        var random = parseInt(Math.random() * i);
        var temp = parts[--i];
        parts[i] = parts[random];
        parts[random] = temp;
    }
    return parts.join('');
}

function currencyName (amount) {
	var name = " buck";
	return amount === 1 ? name : name + "s";
}

function logMoney (message) {
	if (!message) return;
	var file = path.join(__dirname, '../logs/money.txt');
	var date = "[" + new Date().toUTCString() + "] ";
	var msg = message + "\n";
	fs.appendFile(file, date + msg);
}

//variables
var anagrams = {};
var anagramsPokemonName = {};
var anagramcounter = false;
var anagramscurrentcount = 0;
var anagramsdelayTime;
var anagramscountingdown;
var anagramsinactive;
clearTimeout(anagramsinactive);
clearInterval(anagramscountingdown);
clearTimeout(anagramsdelayTime);

	
exports.commands = {
	
	anagrams:'anagram',
    anagram: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!anagrams[room]){
			anagrams[room] = {
				anagramsgamestart:false,
				anagramsguess:false,
				anagramsinactivity:false
			}
		}
		if (anagrams[room].anagramsgamestart == true){ room.add('|raw|<b> Pokemon: '+anagramsPokemonName[room].anagramsPokemonshuffled+'</b>'); return false; }
		//if(!this.can('declare', null, room)) return false;
		//anagrams = true;
		if (room != "gamecorner"){
		    anagrams[room].anagramsgamestart = true;
		    anagrams[room].anagramsguess = false;
			anagrams[room].anagramsinactivity = setTimeout(function(){
				    anagrams[room].anagramsgamestart = false;
			        anagrams[room].anagramsguess = true;
					room.add("|raw|<div class='broadcast-blue'><center>Anagrams was ended due to inactivity.<br>Nobody guessed the correct pokemon:<b> " + anagramsPokemonName[room].anagramsPokemon + "</b></center>");
			        room.update();
				}.bind(this), 120000);
		}else{
			if (anagramcounter == false){
				anagrams[room].anagramsgamestart = true;
		        anagrams[room].anagramsguess = false;
				anagrams[room].anagramsinactivity = setTimeout(function(){
				    anagrams[room].anagramsgamestart = false;
			        anagrams[room].anagramsguess = true;
					room.add("|raw|<div class='broadcast-blue'><center>Anagrams was ended due to inactivity.<br>Nobody guessed the correct pokemon:<b> " + anagramsPokemonName[room].anagramsPokemon + "</b></center>");
			        room.update();
				}.bind(this), 120000);
			}else{
			   return this.sendReply("Please wait "+(anagramscurrentcount/1000)+" seconds before anagrams is available.");
			}
		}
		
		/*inactive = setTimeout(function(){
				    anagrams[room].anagramsgamestart = false;
			        anagrams[room].anagramsguess = true;
					//this.parse('/endanagram')
					room.add("|raw|<div class='broadcast-blue'><center>Anagrams was ended due to inactivity.<br>Nobody guessed the correct pokemon:<b> " + anagramsPokemonName[room].anagramsPokemon + "</b></center>");
			        room.update();
				}.bind(this), 1000);*/
		
		var a = (Math.round(Math.random()*(720-1)));
        for (var p in Tools.data.Pokedex) {
        var pokemon = Tools.getTemplate(p);
            if (pokemon.num === parseInt(a)) {
				var shufflePoke = toId(shuffle(pokemon.name))
				if (!anagramsPokemonName[room]){
					anagramsPokemonName[room] = {
						anagramsPokemon: pokemon.name,
						anagramsPokemonshuffled: shufflePoke
					}
				}else{
					anagramsPokemonName[room].anagramsPokemon = pokemon.name;
					anagramsPokemonName[room].anagramsPokemonshuffled = shufflePoke;
				}
                /*PokemonName = pokemon.name;
			    Pokemonshuffled = toId(shuffle(PokemonName));
				room.add("|raw|<div class='broadcast-blue'><center>"+user.name + " has started a game of Anagrams. Use /guessanagram or /gan to play.<br><b>Pokemon: "+Pokemonshuffled+"</b></center></div>")
			    //room.add('|raw|<b>'+Pokemonshuffled+'</b>');;*/
				room.add("|raw|<div class='broadcast-blue'><center><b>"+user.name + "</b> has started a game of Anagrams. Use /guessanagram or /gan to play.<br><b>Pokemon: "+anagramsPokemonName[room].anagramsPokemonshuffled+"</b></center></div>")

				
                break;
            }
        }			
	},

	endanagrams:'endanagram',
    endanagram: function (target, room, user) {
	if (!anagrams[room] || anagrams[room].anagramsgamestart == false) return this.sendReply("There are currently no Anagrams playing.");
		if(anagrams[room].anagramsguess == false){
			anagrams[room].anagramsgamestart = false;
			clearTimeout(anagrams[room].anagramsinactivity);
			room.add("|raw|<div class='broadcast-blue'><center>Anagrams was ended by <b>" + user.name + "</b>.<br>Nobody guessed the correct pokemon:<b> " + anagramsPokemonName[room].anagramsPokemon + "</b></center>");
		}else{
			anagrams[room].anagramsgamestart = false;
			clearTimeout(anagrams[room].anagramsinactivity);
			room.add("**Anagrams was ended by "+user+".**");
			room.add("|raw|<div class='broadcast-blue'><center>Anagrams was ended by <b>" + user.name + "</b>.</center>");
		}
	},
	
	gan:'guessanagram', //ga is used for something else in the wifi room.
	guessanagram: function (target, room, user) {
		if (!anagrams[room] || anagrams[room].anagramsgamestart == false) return this.sendReply("There are currently no Anagrams playing.");
		if(toId(target) == toId(anagramsPokemonName[room].anagramsPokemon)){
			if (room != "gamecorner"){
				room.add("|raw|<div class='broadcast-blue'><center>Congratulations <b>" + user.name + "</b> guessed the right pokemon:<b> " + anagramsPokemonName[room].anagramsPokemon + "</b></center>");
			    anagrams[room].anagramsgamestart = false;
			    anagrams[room].anagramsguess = true;
				clearTimeout(anagrams[room].anagramsinactivity);
			}else{
				anagramcounter = true;
				clearTimeout(anagrams[room].anagramsinactivity);
				room.add("|raw|<div class='broadcast-blue'><center>Congratulations <b>" + user.name + "</b> guessed the right pokemon:<b> " + anagramsPokemonName[room].anagramsPokemon + "</b></center>");
				//Testing buck reward
				
				var _this = this;
				var amount = 1;
				currency.read('money', toId(user), function (err, initial) {
					if (err) throw err;
					if (!initial) initial = 0;
						currency.write('money', initial + amount, toId(user), function (err, total) {
						if (err) throw err;
						amount += currencyName(amount);
						total += currencyName(total);
						_this.sendReply(user + " was given " + amount + ". " + user + " now has " + total + ".");
						if (Users.get(user)) Users.get(user).popup(user.name + " has given you " + amount + ". You now have " + total + ".");
						logMoney(user + " has won " + amount + " from anagrams.");
					});
				});
				anagramcounter = true;
			    anagrams[room].anagramsgamestart = false;
			    anagrams[room].anagramsguess = true;
				anagramscurrentcount = 30000;
				
				anagramscountingdown = setInterval(function(){
					anagramscurrentcount -= 1000;
				}.bind(this), 1000);
				
				anagramsdelayTime = setTimeout(function(){
				    anagramcounter = false;
					clearInterval(anagramscountingdown);
			    }.bind(this), 30000);
			}
		}else{
			this.sendReply("Incorrect, guess again!");
		}
		
	}
	
}