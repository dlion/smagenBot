# smagenBot
A simple personal Telegram bot plugins based.

## How can I create a personal bot ?
Follow these steps: https://core.telegram.org/bots#3-how-do-i-create-a-bot

## Configure smagenBot
Edit config.json
```
token: "YOUR BOT TOKEN",
interval: "HOW MUCH TIME 
quiet: true if you want to know when it send a message, false if not
username: false allows your bot to send messages to everyone othervise put it your username and it will send messages only to you
```

## List of Plugins
To see a list of plugins send `/help` to your bot or list files in bin/plugins directory

Currently I have made these plugins:
* /os - Send to me my OS information
* /weather <city> - Send to me my city's weather informations
* /pokemon <name> - Send to me informations about <name> pokémon

## Add a Plugin
* To add a simple plugin you have to add `name.js` file to a `bin/plugins` directory.
* Follow the examples to make your own plugin.
* Add your plugin command and description to a `list.json` file

That's all.

## Author
* Domenico Luciani aka DLion
* http://dlion.it

## LICENSE
MIT 2015 Domenico Luciani domenicoleoneluciani@gmail.com
