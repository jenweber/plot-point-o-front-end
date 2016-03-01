'use strict';

require('./example');
require('../styles/index.scss');

//define home url used in all ajax
const myApp = {
  baseUrl: 'http://localhost:3000',
};

// hide all admin elements. Shown after admin login
let adminLoggedIn = false;

// shows/hides admin console. Triggered on clicks and sign in/out
const hideAdminConsole = function() {
  if (adminLoggedIn === false) {
    $('.admin-console').hide();
  } else { $('.admin-console').show(); }
};

$('.bootstrap-tab-container').on('click', function(){
  if (adminLoggedIn === false) {
    $('.admin-console').hide();
  } else { $('.admin-console').show(); }
});

// Enable bootstrap tabs - uses .click because it's in current documentation
$('#home a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#no-spoilers-tab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#spoilery-tab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

// Within-page navigation links created by handlebars
let displaySpoileryAnchors = function(response){
  $('#spoilery-posts-anchors').text('');
  let posts = response.spoilery_posts;
  let anchorTemplate = require('./anchor.handlebars');
  $('#spoilery-posts-anchors').append(anchorTemplate({
    posts
  }));
};

let displayNoSpoilerAnchors = function(response){
  $('#no-spoilers-posts-anchors').text('');
  let posts = response.no_spoilers_posts;
  let anchorTemplate = require('./anchor.handlebars');
  $('#no-spoilers-posts-anchors').append(anchorTemplate({
    posts
  }));
};

//
let displaySpoileryPosts = function(response){
  let saveAnchors = $('#spoilery-posts-anchors')
  $('#spoilery-posts').text('');
  $('#spoilery-posts').append(saveAnchors);
  let posts = response.spoilery_posts;
  let spoileryPostTemplate = require('./spoilery-post.handlebars');
  $('#spoilery-posts').append(spoileryPostTemplate({
    posts
  }));

};

let displayNoSpoilersPosts = function(response){
  let saveAnchors = $('#no-spoilers-posts-anchors')
  $('#no-spoilers-posts').text('');
  $('#no-spoilers-posts').append(saveAnchors);
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

// declare variable to record the id of the record clicked
let editid = 0;

// Ajax to get no spoilers post SINGULAR
$(document).on('click','.ns-modal-trigger',function(){
  editid = $(this).val();
  console.log(editid);
  $.ajax({
    url: myApp.baseUrl + '/no_spoilers_posts/' + editid,
    method: 'GET',
    dataType: 'json'
  }).done(function(post){
    console.log(post);
    fillNsEditForm(post);
  });
});

// JQuery to populate no spoilers modal
const fillNsEditForm = function(response) {
  let post = response.no_spoilers_post;
  console.log(post);
  $('#edit-ns-post-title').val(post.title);
  $('#edit-ns-post-content').text(post.content);
  $('#edit-ns-post-game').val(post.game_id);
};

// ajax to send PATCH for no spoilers
$(document).on('click','.save-ns-changes',function(e){
  console.log("edit no spoilers post submit clicked");
  console.log($('#edit-ns-post-content').text());
  e.preventDefault();
  $.ajax({
    url: myApp.baseUrl + '/no_spoilers_posts/' + editid,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {
      no_spoilers_post: {
        title: $('#edit-ns-post-title').val(),
        content: $('#edit-ns-post-content').val(),
        game_id: $('#edit-ns-post-game').val(),
      }
    },
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

// Ajax to get spoilery post SINGULAR
$(document).on('click','.sp-modal-trigger',function(){
  editid = $(this).val();
  $.ajax({
    url: myApp.baseUrl + '/spoilery_posts/' + editid,
    method: 'GET',
    dataType: 'json'
  }).done(function(post){
    console.log(post);
    fillSpEditForm(post);
  });
});

// JQuery to populate spoilery post modal
const fillSpEditForm = function(response) {
  let post = response.spoilery_post;
  $('#edit-sp-post-title').val(post.title);
  $('#edit-sp-post-content').text(post.content);
  $('#edit-sp-post-game').val(post.game_id);
};

// ajax to send PATCH for spoilery posts
$(document).on('click','.save-sp-changes',function(e){
  console.log("edit spoilery post submit clicked");
  console.log($('#edit-sp-post-title').val());
  console.log($('#edit-sp-post-content').val());
  console.log($('#edit-sp-post-game').val());
  console.log(editid);
  e.preventDefault();
  $.ajax({
    url: myApp.baseUrl + '/spoilery_posts/' + editid,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {
      spoilery_post: {
        title: $('#edit-sp-post-title').val(),
        content: $('#edit-sp-post-content').val(),
        game_id: $('#edit-sp-post-game').val(),
      }
    },
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

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
      adminLoggedIn = true;
      hideAdminConsole();
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
      adminLoggedIn = false;
      hideAdminConsole();
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
