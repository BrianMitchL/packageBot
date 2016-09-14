# packageBot

A Twitter bot for tracking a package with UPS.
Make an account here: https://www.ups.com/upsdeveloperkit

## Install

Install node 6 or higher, then run

```sh
npm install
```

## Configure

All configuration takes place in `config.js` and a JSON file.

1. Add your packages to a JSON file. An example can be found in `sample.packages.json`
  * This file is used as a cache during operation. The bot will write additional data about each package as the location changes.
  * New packages may be added without stopping the bot.
  * Any package with the `delivered` set to `true` can be removed as it will no longer be Tweeted.
2. Add your Twitter consumer and access token keys and secrets to the `twitter` object
3. Add your UPS `licenseNumber`, `userId`, and `password` to the `ups` object
4. Edit the minor options as you desire
   * `packagesFileName = 'packages.json'` the filename where you store your packages
   * `refreshTime = 3600000` refresh time in milliseconds
   * `hashtag = '#packageBot'` optional hashtag to be appended to a tweet. Set it to be an empty string if you don't want a hashtag
   * `title = 'My'` The ownership title of the package. This prefixes the package name. If you run this bot on its own account, it might make sense to say, for example, 'Brian's magic eraser has arrived...', where if you're running the bot on your own account, it might make more sense to use the first person, for example, 'My magic eraser has arrived...'


## Run

```shell
npm start
```

## Deploy With Docker
Build the container with:

```sh
docker build -t packagebot .
```

Run the container with:

```sh
docker run --name packageBot -d packagebot
```
