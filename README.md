# KyIDevs-Essentials
## Description
KyIDevs's Essentials Bot for testing and management purposes. This bot will be an excellent template for starting a new bot.<br>
Read through the [wiki](https://kyidevs.github.io/discord-bots/essentials) for more explanations.
## Starting
### Installing with Git
Run the command below to get started with Git.
```
git clone https://github.com/KyIDevs/KyIDevs-Essentials.git
```
Make sure npm is installed and then move into the directory made and install the required modules:
```
cd KyIDevs-Essentials
npm install
```
When you're done, run the command:
```
npm run dev
```
### Installing Manually
Upload the folder into the desired directory
Make sure npm is installed and then move into the directory made and install the required modules:
```
cd KyIDevs-Essentials
npm install
```
When you're done, run the command:
```
npm run dev
```
<hr>
### Post Installation
Now, you need to manually assign the `config.json` and `login.json`. Editing `developers.json` is optional, but you might want to do that as well.<br>
The structure of the `config.json` should look like this, you must change all the REQUIRED values for the bot to work:
```
{
  "debug": {
    "error": "REQUIRED",
    "chatlog": "REQUIRED"
  },
  "client": {
    "supportGuild": {
      "guildId": "OPTIONAL"
    },
    "info": {
      "id": "REQUIRED",
      "name": "KyIDevs Essentials",
      "description": "KyIDevs's Essentials Bot for testing and management purposes"
    },
    "image": {
      "blank": "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png",
      "avatar": "REQUIRED"
    },
    "settings": {
      "footer": "REQUIRED"
    },
    "presence": {
      "activity": {
        "name": "KyIDevs Essentials | )help | Starting System...",
        "type": "PLAYING"
      }
    },
    "oAuth2": {
      "scopes": [],
      "domain": {
        "url": "",
        "port": 8080
      }
    }
  },
  "admin": {
    "owner": {
      "id": "REQUIRED"
    },
    "id": []
  }
}
```
And the same thing goes for the `login.json`:
```
{
  "client": {
    "presence": {
      "activity": {
        "name": "KyIDevs Essentials | )help | Starting System...",
        "type": "PLAYING"
      }
    }
  },
  "mongodb": {
    "username": "REQUIRED",
    "password": "REQUIRED",
    "cluster": {
      "url": "REQUIRED",
      "database": "REQUIRED"
    }
  },
  "dbl": {
    "password": "",
    "port": 7070,
    "auth": ""
  },
  "patreon": {
    "id": "",
    "secret": "",
    "creatorAccessToken": "",
    "creatorRefreshToken": "",
    "port": 6060
  },
  "token": "REQUIRED",
  "secret": "REQUIRED"
}
```
<hr>
If you need further help on setting up the discord bot, you can refer to the wiki down in the [Documentations](https://github.com/KyIDevs/KyIDevs-Essentials#Documentations) section.
## Developers
This project is maintained by [KyIDevs](https://github.com/KyIDevs) with help from:
* Xignoqt
## Documentations
For documentations, read the wiki [here](https://kyidevs.github.io/discord-bots/essentials/documentations).
