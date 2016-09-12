const shipit = require('shipit');
const Twitter = require('twitter');
const config = require('./config.js');

let T = new Twitter(config.twitter);
let UPS = new shipit.UpsClient(config.ups);
let packages = config.packages;

function tweet(message) {
  let text = message;
  if(config.hashtag.length > 0) {
    text += ' ' + config.hashtag;
  }
  T.post('statuses/update', {status: text},  function(error, tweet, response) {
    if(error) throw error;
    console.info(tweet);  // Tweet body.
    console.info(response);  // Raw response object.
  });
}

function updateLocations(packages) {
  let updatedPackages = packages;

  updatedPackages.forEach(function(item) {
    UPS.requestData(item.tracking_number, function (err, result) {
      console.info(`Retrieving tracking data for ${item.name} at ${new Date()}`);
      if(err) {
        console.error(err);
        item.updated = false;
      } else {
        // no location change
        if(item.location === result.activities[0].location) {
          item.updated = false;
        } else { // location changed
          item.location = result.activities[0].location;
          item.updated = true;
          // this might catch some delivered statuses
          let details = result.activities[0].details.toLowerCase();
          if(details.includes('dropped off') || details.includes('delivered')) {
            item.delivered = true;
          }
        }
      }
    })
  });

  return updatedPackages;
}

function tweetUpdates(packages) {
  packages.forEach(function(item) {
    if(item.delivered === true) {
      const message = `${config.title} ${item.name} has been delivered! \u2764`;
      tweet(message)
    } else if(item.updated === true) {
      const message = `${config.title} ${item.name} has arrived in ${item.location}!`;
      tweet(message)
    }
  });
}

function run(packages) {
  let packagesWithLocation = updateLocations(packages);
  tweetUpdates(packagesWithLocation);

  setInterval(function() {
    try {
      run(packages);
    }
    catch (e) {
      console.error(e);
    }
  }, config.refreshTime);
}

run(packages);