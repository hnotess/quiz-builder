//twitter share widget

window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));


//facebook share init with facebook sdk
$(document).ready(function() {
  $.ajaxSetup({
    cache: true
  });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function() {
    FB.init({
      appId: '1240279432757927',
      xfbml: true,
      version: 'v2.8'
    });
    FB.getLoginStatus(updateStatusCallback);
  });

});

$("#twitterbtn").click(function() {
  //create dynamic tweet text
  var tweet = $(".result").text();
  tweet = tweet.replace("You", "I");
  var tweetURL = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweet + " Try it for yourself! https://mcbomber.bitbucket.io");
  $("#twitterbtn").attr("href", tweetURL);
});
