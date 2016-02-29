'use strict';

// require('./ajax');

require('./example');

require('../styles/index.scss');

//
//
// $(document).ready(() => {
//   console.log('JavaScript is running');
// });




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

let displayGameList = function(response){
  let games = response.games;
  let gameListTemplate = require('./radio-button-games.handlebars');
  $('.list-of-games').append(gameListTemplate({
    games
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

let getGames = function(){
  $.ajax({
    url: "http://localhost:3000/games",
    method: 'GET',
    dataType: 'json'
  }).done(function(posts){
    displayGameList(posts);
    console.log(posts);
  });
};

$(document).ready(function(){
  getSpoileryPosts();
  getNoSpoilersPosts();
  getGames();

});
$('.test-buttons').on('click', '.test-buttons', function(){console.log(value)})

// ajax

const myApp = {
  baseUrl: 'http://localhost:3000',
};

let adminStatus = false;

$(document).ready(() => {
console.log("forms are active");
// sign in
  $('#sign-in').on('submit', function(e) {
    console.log("clicked");
    e.preventDefault();
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-in',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.user = data.user;
      console.log(data);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
      alert('Invalid email and password combination');
    });
  });
//change pw
  $('#change-password').on('submit', function(e) {
    e.preventDefault();
    console.log("begin change password");
    if (!myApp.user) {
      console.error('wrong');
    }
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/change-password/' + myApp.user.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      console.log('successfully changed password');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
      alert('Please log in before changing your password.');
    });
  });
//sign out
  $('#sign-out').on('submit', function(e) {
    e.preventDefault();
    if (!myApp.user) {
      console.error('wrong');
    }
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-out/' + myApp.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      console.log('signed out');
      alert('You are now logged out.');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
//create resources
  $('#new-game').on('submit', function(e) {
    console.log("new game submit clicked");
    e.preventDefault();
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/games/',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.user = data.user;
      console.log(data);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
      alert('something broke');
    });
  });

  $('#new-spoilery-post').on('submit', function(e) {
    console.log("new spoilery post submit clicked");
    e.preventDefault();
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/spoilery_posts/',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      console.log(data.spoilery_post.id);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
      alert('something broke');
    });
  });

  $('#new-no-spoilers-post').on('submit', function(e) {
    console.log("new no spoilers post submit clicked");
    e.preventDefault();
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/no_spoilers_posts/',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
      alert('something broke');
    });
  });
//delete resources



});

$('.test-buttons').on('click', function(){console.log($(this).val())})

$('#form-test').on('submit', function(e) {
  console.log("new no spoilers post submit clicked");
});

$(document).on('click','.sp-delete-buttons',function(){
  console.log($(this).val());
  let deleteid = $(this).val();
  $.ajax({
    url: myApp.baseUrl + '/spoilery_posts/' + deleteid,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: {id: deleteid},
  }).done(function(data) {
    console.log(data);
    console.log('you deleted a spoilery post');
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

$(document).on('click','.ns-delete-buttons',function(){
  console.log($(this).val());
  let deleteid = $(this).val();
  $.ajax({
    url: myApp.baseUrl + '/no_spoilers_posts/' + deleteid,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: {id: deleteid},
  }).done(function(data) {
    console.log(data);
    console.log('you deleted a no spoilers post');
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

// template for handlebars button click handler
// $(document).on('click','.test-buttons',function(){
//
// });

// module.exports = indexJS;
