# packageBot

A Twitter bot for tracking a package with UPS.
Make an account here: https://www.ups.com/upsdeveloperkit



## Install

Install node 6 or higher, then run

```sh
npm install
```

## Configure

All configuration takes place in `config.js`.
1. Add your packages to the `packages` array
2. Add your Twitter consumer and access token keys and secrets to the `twitter` object
3. Add your UPS `licenseNumber`, `userId`, and `password` to the `ups` object
4. Edit the minor options as you desire
   * `refreshTime = 3600000` refresh time in milliseconds
   * `hashtag = '#packageBot'` optional hashtag to be appended to a tweet. Set it to be an empty string if you don't want a hashtag
     // title of package
     // example: "My", "Brian's", "The"
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