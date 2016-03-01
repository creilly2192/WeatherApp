$(document).ready( function(){

  $('#loader-wrapper').show();
  //set global variables
  var lat;
  var lon;
  var url;
  var F;
  var C;
  var currentDataForHour;
  var currentDataIcon;
  var currentTemp;
  var tomorrowData;
  var thirdDayData;
  var fourthDayData;
  var dailySummary;
  var degreeF;


  //get coordinates of user's location
  function getCoords() {
    //user has location - run showPosition function
    //else run showError function
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
  }

  //show error when getCoords failed
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied geolocation.')
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Could not find your location. Weird.');
      case error.UNKNOWN_ERROR:
        alert('Something went wrong.');
    }
  }

  //show postion of user if geolocation is successful
  function showPosition(position) {
    //set lat and lon to current coordinates
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    //forecast.io url
    url = 'https://api.forecast.io/forecast/653a30e61b844cdf25cda03940a85ca1'

    //get current city
    getCurrentCity();
    //after getting info - load weather data from forecast.io
    loadWeatherData();
  }

  //get current city/state based on IP location
  function getCurrentCity() {
    $.getJSON("http://ip-api.com/json", function(data) {
      var city = data.city
      var region = data.region

      $('#location').html(city + "," + ' ' + region);
      console.log(city + "," + '' + region);
  });
  }

  //get weather info from forecast.io based on lat and longitude from showPosition function
  function loadWeatherData() {
    $.getJSON(url + '/' + lat + ',' + lon + "?callback=?",
      function(data) {
        //set today data
        currentTemp = data.currently.temperature;
        currentDataIcon = data.currently.icon;
        currentDataForHour = data.currently.summary;

        //set daily data
        tomorrowData = data.daily.data[1].icon;
        thirdDayData = data.daily.data[2].icon;
        fourthDayData = data.daily.data[3].icon;


        $('.descrip').html(currentDataForHour);
          getCurrentTemp();
      });
  }

  function getCurrentTemp() {
    F = Math.round(currentTemp);
    //convert farh to celsius
    C = Math.round((F - 32) / 1.8000);

    //show current temperature
    function showCurrentTemp() {

      //default to farh
      $('.temp').html(F);
      $('.wi').addClass('wi-fahrenheit');
      degreeF = true;

    }

    showCurrentTemp();
    getWeatherIcon();
    //hide loader screen
    $('#loader-wrapper').hide();
  }

  //get current weather icon based on currentDataIcon
  function getWeatherIcon() {
    switch (currentDataIcon) {
      case "rain":
          $('.weather').addClass('wi wi-forecast-io-rain weather');
          $('body').css('background-image', 'url("images/rainy.jpg")');
        break;
        case "partly-cloudy-day":
          $('.weather').addClass('wi wi-forecast-io-partly-cloudy-day weather');
          $('body').css('background-image', 'url("images/cloud.jpg")');
          break;
        case "partly-cloudy-night":
          $('.weather').addClass('wi wi-forecast-io-partly-cloudy-night weather');
          $('body').css('background-image', 'url("images/night.jpg")');
          break;
        case "snow":
          $('.weather').addClass('wi wi-forecast-io-snow weather');
          $('body').css('background-image', 'url("images/snow.jpg")');
          break;
        case "clear-day":
          $('.weather').addClass('wi wi-forecast-io-clear-day weather');
          $('body').css('background-image', 'url("images/clear-hot.jpg")');
          break;
        case "clear-night":
          $('.weather').addClass('wi wi-forecast-io-clear-night weather');
          $('body').css('background-image', 'url("images/stars.jpg")');
          break;
        case "fog":
          $('.weather').addClass('wi wi-forecast-io-fog weather');
          $('body').css('background-image', 'url("images/fog.jpg")');
          break;
        case "cloudy":
          $('.weather').addClass('wi wi-forecast-io-cloudy weather');
          $('body').css('background-image', 'url("images/fog.jpg")');
          break;
    }
  }




  getCoords();
  //refresh
  var refresh = setInterval(getCoords, 300000);

  //toggle between F and C on button click
  $('button').click(function() {

    if(degreeF !== true) {
      $('.temp').html(F);
      //add f logo
      $('.wi').removeClass('wi-celsius');
      $('.wi').addClass('wi-fahrenheit');
      degreeF = true;
    } else {
      $('.temp').html(C);
      //add C logo
      $('.wi').removeClass('wi-fahrenheit');
      $('.wi').addClass('wi-celsius');
      degreeF = false;
    }
  });



});


/** todo **/
  //add next three day forecast icon
  //add moonphase option
  //add sunrise & sunset
