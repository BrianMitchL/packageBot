// name of the JSON file containing an array of package(s)
module.exports.packagesFileName = 'packages.json';
// refresh time in milliseconds
module.exports.refreshTime = 3600000;
// optional hashtag to be appended to a tweet
module.exports.hashtag = '#packageBot';
// title of package
// example: "My", "Brian's", "The"
module.exports.title = 'My';

// Twitter consumer and access token keys and secrets
module.exports.twitter = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
};

// UPS auth info
// Make an account here: https://www.ups.com/upsdeveloperkit
module.exports.ups = {
  licenseNumber: '',
  userId: '',
  password: ''
};