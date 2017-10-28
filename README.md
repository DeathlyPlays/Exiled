Dewdrop Server @ Pokémon Showdown
========================================================================

Navigation: [Dewdrop][1] | [PS Server repository][10] | [PS Client repository][2] | [PS Dex repository][3]

  [1]: http://dewdrop.psim.us/
  [2]: https://github.com/Zarel/Pokemon-Showdown-Client
  [3]: https://github.com/Zarel/Pokemon-Showdown-Dex
  [10]: https://github.com/Zarel/Pokemon-Showdown

<<<<<<< HEAD
[![Build Status](https://travis-ci.org/Dewdrop-PS/Dewdrop.svg?branch=master)](https://travis-ci.org/Dewdrop-PS/Dewdrop)
[![dependencies Status](https://david-dm.org/Dewdrop-PS/Dewdrop/status.svg)](https://david-dm.org/Dewdrop-PS/Dewdrop)
[![devDependencies Status](https://david-dm.org/Dewdrop-PS/Dewdrop/dev-status.svg)](https://david-dm.org/Dewdrop-PS/Dewdrop?type=dev)
[![optionalDependencies Status](https://david-dm.org/Dewdrop-PS/Dewdrop/optional-status.svg)](https://david-dm.org/Dewdrop-PS/Dewdrop?type=optional)

=======
[![Build Status](https://travis-ci.org/DeathlyPlays/Exiled.svg?branch=master)](https://travis-ci.org/DeathlyPlays/Exiled)
[![dependencies Status](https://david-dm.org/DeathlyPlays/Exiled/status.svg)](https://david-dm.org/DeathlyPlays/Exiled)
[![devDependencies Status](https://david-dm.org/DeathlyPlays/Exiled/dev-status.svg)](https://david-dm.org/DeathlyPlays/Exiled?type=dev)
>>>>>>> 681f22c85cf2bf0da29563a92bf560aefe961cbe

Introduction
------------------------------------------------------------------------

This is the source code for the Pokémon Showdown server [Dewdrop][4], a website for Pokémon battling. Pokémon Showdown simulates singles, doubles and triples battles in all the games out so far (Generations 1 through 7).

This repository contains the files needed to set up your own Pokémon Showdown server. The Dewdrop server also comes with some custom additions not found on the main repo. This repo will still have all the features from the main server. Note that to set up a server, you'll also need a server computer.

You can use your own computer as a server, but for other people to connect to your computer, you'll need to expose a port (default is 8000 but you can choose a different one) to connect to, which sometimes requires [port forwarding][5] (note that this isn't possible on certain internet connections).

  [4]: http://dewdrop.psim.us/
  [5]: http://en.wikipedia.org/wiki/Port_forwarding


Installing
------------------------------------------------------------------------

    ./pokemon-showdown

(Requires Node.js 8+)


Detailed installation instructions
------------------------------------------------------------------------

Pokémon Showdown requires you to have [Node.js][6] installed, 8.x or later (7.7 or later can work, but you might as well be on the latest stable).

```bash
$ git clone https://github.com/Dewdrop-PS/Dewdrop.git
cd dewdrop && npm install
node app.js
```

Next, obtain a copy of Pokémon Showdown. If you're reading this outside of GitHub, you've probably already done this. If you're reading this in GitHub, there's a "Clone or download" button near the top right (it's green). I recommend the "Open in Desktop" method - you need to install GitHub Desktop which is more work than "Download ZIP", but it makes it much easier to update in the long run (it lets you use the `/updateserver` command).

Pokémon Showdown is installed and run using a command line. In Mac OS X, open `Terminal` (it's in Utilities). In Windows, open `Command Prompt` (type `cmd` into the Start menu and it should be the first result). Type this into the command line:

    cd LOCATION

Replace `LOCATION` with the location Pokémon Showdown is in (ending up with, for instance, `cd "~/Downloads/Pokemon-Showdown"` or `cd "C:\Users\Bob\Downloads\Pokemon-Showdown\"`).

This will set your command line's location to Pokémon Showdown's folder. You'll have to do this each time you open a command line to run commands for Pokémon Showdown.

Copy `config/config-example.js` into `config/config.js`, and edit as you please.

  [6]: https://nodejs.org/

Configuring your server
------------------------------------------------------------------------

You will probably want to configure your servers settings to your liking.
Here's some of the configurations you can change in `config/config.js`

- port - The port to run the server on.

- serverIp - The ip of your server, used to parse custom avatars.

- tellrank - The minimum rank to use /tell for offline messaging.

- serverName - Sets the name for several things to whatever you set it as.

Setting up an Administrator account
------------------------------------------------------------------------

Once your server is up, you probably want to make yourself an Administrator (~) on it.

### config/usergroups.csv

To become an Administrator, create a file named `config/usergroups.csv` containing

    USER,~

Replace `USER` with the username that you would like to become an Administrator. Do not put a space between the comma and the tilde.

This username must be registered. If you do not have a registered account, you can create one using the Register button in the settings menu (it looks like a gear) in the upper-right of Pokémon Showdown.

Once you're an administrator, you can promote/demote others easily with the `/globaladmin`, `/globalleader`, `/globalmod`, etc commands.

License
------------------------------------------------------------------------

Dewdrop's and Pokémon Showdown's server is distributed under the terms of the [MIT License][9].

  [9]: https://github.com/Dewdrop-PS/Dewdrop/blob/master/LICENSE



Maintainers
------------------------------------------------------------------------

This server is brought to you and maintained by the following people:

Owners

- [Insist](https://github.com/DeathlyPlays)
- [Mewth](https://github.com/Mewthy)
- [AlfaStorm](https://github.com/AlphaWind)

Contributors

<<<<<<< HEAD
- [Lycanium Z](https://github.com/Lycanium-Z)

=======
- [AlfaStorm](https://github.com/AlphaWind)
- [Back At My Day](https://github.com/BamdTheClueless)
- [flufi](https://github.com/HiTechFlufi)
- [gyaratoast](https://github.com/gyaratoast)
- [HoeenHero](https://github.com/HoeenCoder)
- [Lycanium Z](https://github.com/Lycanium-Z)
- [megas4ever](https://github.com/Megas4ever)
- [Mewth](https://github.com/Mewthy)
- [Volco](https://github.com/Volco)
>>>>>>> 681f22c85cf2bf0da29563a92bf560aefe961cbe

Special thanks

- See http://pokemonshowdown.com/credits

