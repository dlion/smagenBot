# smagenBot
A simple personal Telegram bot plugins based.

## How can I create a personal bot ?
Follow these steps: https://core.telegram.org/bots#3-how-do-i-create-a-bot

## Configure smagenBot
Edit config.json
```
token: "YOUR BOT TOKEN",
interval: "everytime it has to check messages"
quiet: true if you want to know when it send a message, false if not
username: false allows your bot to send messages to everyone otherwise put it your username and it will send messages only to you
botname: Your bot nick
```

## List of Plugins
To see a list of plugins send `/help` to your bot or list files in `plugins/` directory

Currently I have made these plugins:
* `/os` - Send to me my OS information
* `/weather <city>` - Send to me my `<city>`'s weather informations
* `/pokemon <name>` - Send to me informations about `<name>` pokémon
* `/expand <url>` - Expand a short `<url>`
* `/btc <currency>` - Show quotation of Bitcoin in `<currency>`
* `/imdb <film>` - Show information about a `<film>`
* `/xkcd <id> or <random>` - Send an image from xkcd

## Add a Plugin
* To add a simple plugin you have to add `name.js` file to a `plugins/` directory.
* Follow the examples to make your own plugin.
* Add your plugin command and description to a `list.json` file

That's all.

To use it send to your bot `/name`.

## How plugins works
Plugins have to put into an `exec` function that have one parameter and returns a callback with 2 parameters:
* The first parameter is an array of objects
* The second parameter is an array of strings. These strings coincide to type of the objects returns.

So if for example: if the first object is a text object the first element of the type's array is `"text"`, if the second is a photo object the second element of the type's array is `"photo"` and so on.

## Screenshot
![screen1](http://i.imgur.com/ZM2MzKa.png)

## TODO
- [ ] Start plugin
- [x] Move plugins directory on the root of the repo
- [ ] More plugins
- [x] if use /command@nickname your bot answer only if nickname is his name
- [x] The bot can send images from an url
- [x] The bot can send chatAction
- [ ] The bot can send audio files
- [x] The bot can send videos from an url
- [x] The bot can send documents from an url
- [x] Plugins can send more messages at once (photo, text, etc.)

## Author
* Domenico Luciani aka DLion
* http://dlion.it

## LICENSE
MIT 2015 Domenico Luciani domenicoleoneluciani@gmail.com
