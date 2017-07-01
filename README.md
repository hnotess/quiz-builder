# Quiz Builder #

Quiz Builder is a simple JavaScript quiz app.

Take the [sample quiz](http://hnotess.github.io/quiz-builder) to see how it works.

### About Quiz Builder ###

* The goal of this project was to create a JavaScript quiz that is flexible enough in design to be reused for other quizzes. The quiz accomplishes this by taking in a JSON file that can be modified for any number of questions with any possible number of answers.
* The quiz supports text-based and image-based answers, as well as answers with a combination of text and image.

### How do I get set up? ###

#### Configuration
* Store your quiz data in the quizdata.json file.
* Store any images that will be used in your quiz questions in the quizImages file.
* Store any images that will be used in the general UI in the siteImages file, update HTML accordingly.
* Customize your CSS
* In `src/js/script.js`, update the following jQuery function with a link to your json file.
```
$.getJSON( "https://yourdomain/yourfile.json", function( data ) {
  quizSetupv2(data);
});
```
* In `shareresult.js`, You will need to update the `appId` in the `FB.init` call with your app ID generated from Facebook (see below).
* Also in `shareresult.js`, You will need to customize your custom Tweet text in this function. See the sample function:
```
$("#twitterbtn").click(function() {
  //create dynamic tweet text
  var tweet = $(".result").text(); // returns quiz result text string
  tweet = tweet.replace("You", "I"); // alters quiz result text string with String.prototype method
  var tweetURL = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweet + " Try it for yourself! https://yourdomain.example.com"); // this is the string where you will update your custom tweet text
  $("#twitterbtn").attr("href", tweetURL);
});
```

#### Dependencies ####
External libraries are loaded from CDN in the sample quiz and include:
* jQuery
* Bootstrap
* Font Awesome Icon library

#### Social sharing
To enable social sharing via Facebook and Twitter with big, pretty pictures, you will need to update meta tags in the HTML and make use of the following:
* [Twitter Card - large image](https://dev.twitter.com/cards/types/summary-large-image)
* [Facebook JavaScript SDK](https://developers.facebook.com/docs/javascript/quickstart) - you will need to create a new app in the app dashboard

### Credits ###

* This project was created by [Hannah Notess](https://github.com/hnotess) and [Seth McOmber](https://github.com/smcomber) for JavaScript 200 in the University of Washington Professional and Continuing Education Certificate program.
