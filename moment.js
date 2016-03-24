var moment = require('moment');
var now = moment();

console.log(now.format());

console.log(now.format('X'));
console.log(now.format('x'));
// This one brings it in as a number not a string
console.log(now.valueOf());

var timestamp = 1444247486704;
var timestampMoment = moment.utc(timestamp);

console.log(timestamp);
console.log(timestampMoment.local().format('h:mm a'));
// now.subtract(1, 'year');

// console.log(now.format());
// console.log(now.format('MMM Do YYYY, h:mma'));