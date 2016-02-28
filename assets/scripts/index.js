'use strict';

require('./ajax');

require('./example');

require('../styles/index.scss');



$(document).ready(() => {
  console.log('JavaScript is running');
});

// Enable bootstrap tabs
$('#home a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#no-spoilers-posts a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#spoilery-posts a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#login').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

// handlebars

let displaySpoileryAnchors = function(response){
  let posts = response.spoilery_posts;
  let anchorTemplate = require('./anchor.handlebars');
  $('#spoilery-posts').append(anchorTemplate({
    posts
  }));
};

let displayNoSpoilerAnchors = function(response){
  let posts = response.no_spoilers_posts;
  let anchorTemplate = require('./anchor.handlebars');
  $('#no-spoilers-posts').append(anchorTemplate({
    posts
  }));
};

let displaySpoileryPosts = function(response){
  let posts = response.spoilery_posts;
  let spoileryPostTemplate = require('./spoilery-post.handlebars');
  $('#spoilery-posts').append(spoileryPostTemplate({
    posts
  }));

};

let displayNoSpoilersPosts = function(response){
  let posts = response.no_spoilers_posts;
  let noSpoilersPostTemplate = require('./no-spoilers-post.handlebars');
  $('#no-spoilers-posts').append(noSpoilersPostTemplate({
    posts
  }));

};

let getSpoileryPosts = function(){
  $.ajax({
    url: "http://localhost:3000/spoilery_posts",
    method: 'GET',
    dataType: 'json'
  }).done(function(posts){
    displaySpoileryAnchors(posts);
    displaySpoileryPosts(posts);
    console.log(posts);
  });
};

let getNoSpoilersPosts = function(){
  $.ajax({
    url: "http://localhost:3000/no_spoilers_posts",
    method: 'GET',
    dataType: 'json'
  }).done(function(posts){
    displayNoSpoilerAnchors(posts);
    displayNoSpoilersPosts(posts);
    console.log(posts);
  });
};



$(document).ready(function(){
  getSpoileryPosts();
  getNoSpoilersPosts();
});



// module.exports = indexJS;
