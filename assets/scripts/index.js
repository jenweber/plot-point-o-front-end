'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

require('../styles/index.scss');

$(document).ready(() => {
  console.log('JavaScript is running');
});

// Enable bootstrap tabs
$('#home a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$('#spoiler-free a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$('#plot-analysis a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$('#login').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
