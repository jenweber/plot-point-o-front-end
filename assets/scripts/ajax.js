'use strict';

const ajax = function() {

console.log("ajax is loaded");

const myApp = {
  baseUrl: 'http://localhost:3000/',
};

$(document).ready(() => {
//create an account
  // $('#sign-up').on('submit', function(e) {
  //   e.preventDefault();
  //   let formData = new FormData(e.target);
  //   $.ajax({
  //     url: myApp.baseUrl + 'sign-up/',
  //     method: 'POST',
  //     contentType: false,
  //     processData: false,
  //     data: formData,
  //   }).done(function(data) {
  //     console.log(data);
  //     alert('Thanks for registering! Please sign in to continue.');
  //     myApp.user = data.user;
  //   }).fail(function(jqxhr) {
  //     console.error(jqxhr);
  //     alert('Passwords do not match. Please try again.');
  //   });
  //
  // });
// sign in
  $('#sign-in').on('submit', function(e) {
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
      console.log("user is signed in");
      $('#options').modal('toggle');
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
      $('#options').modal('toggle');
      alert('You are now logged out.');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

});
};

module.exports = ajax();
