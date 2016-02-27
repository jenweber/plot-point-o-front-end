'use strict';

require('./ajax')

require('./example');

require('../styles/index.scss');

let indexJS = function() {

$(document).ready(() => {
  console.log('JavaScript is running');
});

// Enable bootstrap tabs
$('#home a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#spoiler-free a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#plot-analysis a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#login').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

};

module.exports = indexJS;
