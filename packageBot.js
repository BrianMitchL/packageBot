const shipit = require('shipit');
const Twitter = require('twitter');
const fs = require('fs');
const config = require('./config.js');

let T = new Twitter(config.twitter);
let UPS = new shipit.UpsClient(config.ups);

function tweet(message) {
  let text = message;
  if(config.hashtag.length > 0) {
    text += ' ' + config.hashtag;
  }
  T.post('statuses/update', {status: text}, (error, tweet, response) => {
    if(error) {
      console.error(error);
    } else {
      console.info(tweet);  // Tweet body.
      console.log(response);  // Raw response object.
    }
  });
}

function asyncGetUpsData(item, callback) {
  UPS.requestData({trackingNumber: item.tracking_number}, (err, result) => {
    console.info(`Retrieving tracking data for ${item.name} at ${new Date()}`);
    console.log(result);
    if(err) {
      console.error(err);
      item.updated = false;
    } else {
      // no status change
      if(item.location === result.activities[0].location && item.details === result.activities[0].details) {
        item.updated = false;
        console.info(`No change ${item.name}`);
      } else { // location changed
        item.location = result.activities[0].location;
        item.details = result.activities[0].details;
        item.updated = true;
        console.info(`Updated ${item.name}`);
        if(result.statusType === 'D') {
          item.delivered = true;
          console.info(`Delivered ${item.name}`);
        }
      }
    }
    console.log('Item ' + JSON.stringify(item));
    callback(item);
  })
}

function updatePackages(packages, callback) {
  let updatedPackages = packages.map((item) => {
    return new Promise((resolve) => {
      asyncGetUpsData(item, resolve);
    });
  });

  Promise.all(updatedPackages).then(() => {
    callback(updatedPackages);
  });
}

function tweetUpdates(packages) {
  packages.forEach(function(item) {
    if(item.delivered === true) {
      const message = `${config.title} ${item.name} has been delivered! \u2764`;
      tweet(message)
    } else if(item.updated === true) {
      if (item.singular) {
        const message = `${config.title} ${item.name} is in ${item.location}! Status: ${item.details}.`;
      } else {
        const message = `${config.title} ${item.name} are in ${item.location}! Status: ${item.details}.`;
      }
      tweet(message)
    }
  });
}

function run() {
  try {
    let d = fs.readFileSync(config.packagesFileName);
    let packages = JSON.parse(d);
    updatePackages(packages, (items) => {
      console.log('Packages:');
      console.info(packages);
      tweetUpdates(packages);
      fs.writeFileSync(config.packagesFileName, JSON.stringify(packages, null, 2));
    });
  }
  catch (e) {
    console.error(e);
  }
}

run();
setInterval(run, config.refreshTime);
