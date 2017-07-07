// set numbers on quiz questions
function quizSetup(){
  var quizBox;
  var quizBody = $('.quizBody');
  for (i=0; i < quizBody.length; i++){
    // set question number in sequence
    $(quizBody[i]).addClass('question' + (i+1));
  }
  quizActions();
};

// events
function quizActions(){
  var questAll = $('.quizBody');
  var questEnd = questAll.length;
  var questNow;
  var classNow;
  var questNum;
  var questNext;
  var questBack;
  var thisResult;
  var missingAnswerArray = [];
  var finalResult = [];
  
  $('#getStarted').click(function(){
    $('.intro').removeAttr('id');
    $(questAll[0]).attr('id', 'questionNow')
  });
  // select quiz answer
  $('.quizBox').click(function(){
    // ui to indicate selection
    questNow = $('#questionNow');
    $(questNow).find('.quizBox').removeClass('boxSelect');
    $(this).addClass('boxSelect');
    
    // identify selection
    thisResult = $(this).attr('id');
    // mark this question as answered
    $(questNow).addClass('answered');
    if ($(questNow).hasClass('unAnswered')){
      $(questNow).removeClass('unAnswered');
    }
    // get and return the correct question number
    getThisQuest('answer');
    // put ths result into the proper index of the array
    finalResult[questNum] = thisResult;
    // take user to nav buttons at bottom of page
    $('html,body').animate({ scrollTop: 2000 }, 'slow');
    // remove alert text (if required) 
    var isAlert = $(this).parents('.quizBody').find('.quizAlert');
    if ($(isAlert).hasClass('visible')){
      // hide alert
      $(isAlert).removeClass('visible');
      // jump to next unanswered
      questAll = $('.quizBody');
      for (i=0; i < questAll.length; i++){
        if(($(questAll[i]).hasClass('answered'))){
        }
        else {
          ($(questAll[i]).addClass('unAnswered'));
        }
      }
    }
  });

  // get the current question class (called by back/next buttons)
  function getThisQuest(direction){
    questNow = $('#questionNow');
    classNow = $(questNow).attr('class');
    questNum = classNow.split('question');
    questNum = parseInt(questNum[1]);
    // split off  - track question # for results
    if (direction === 'answer'){
      return (questNum);
      }
    // split off  - track question # for pagination
    else {
      questNext = $('.quizBody.question' + (questNum + 1));
      questBack = $('.quizBody.question' + (questNum - 1));
      quizMove(direction);
      }
    };

    // next and back buttons
    $('.btnNext').click(function(){
      // change behavior in error correction state
      if ($(this).hasClass('errFix')){
        getThisQuest('cleanup');
      }
      // normal behavior
      else {
        getThisQuest('next');
        // change button text for first/last question
        if (questEnd === (questNum + 1)){
          $('.btnNext').html('Finish <i class="fa fa-check" aria-hidden="true"></i>')
        }
        if (questEnd != (questNum + 1)){
          $('.btnNext').html('Next <i class="fa fa-chevron-right" aria-hidden="true"></i>')
        }
        if (questNum != 2){
          $('.btnBack').removeClass('inactive')
        }
      }
    });
    $('.btnBack').click(function(){
      getThisQuest('back');
      // change button text for first/last question
      if (questNum === 2){
        $('.btnBack').addClass('inactive')
      }
      if (questEnd != (questNum + 1)){
        $('.btnNext').html('Next <i class="fa fa-chevron-right" aria-hidden="true"></i>')
      }
    });

  // navigating between questions
  function quizMove(direction){
    $(questNow).removeAttr('id');
    if (direction === 'next'){
      if (questEnd > questNum){
        $(questNext).attr('id' , 'questionNow')
      }
      else {
        $(questNow).attr('id' , 'questionNow')
        // check to make sure every question has an answer
        checkAns();
      }
    }
    else if (direction === 'back'){
      if (questNum > 1){
        $(questBack).attr('id' , 'questionNow')
      }
      else {
        alert('You can\'t back up any more, silly!'); // user is already on first question
        $(questNow).attr('id' , 'questionNow')
      }
    }
    else if (direction === 'cleanup'){
      // highlight unanswered questions until all are answered
      var stillUnAnswered = $('.quizBody.unAnswered');
      $(stillUnAnswered[0]).attr('id' , 'questionNow');
      if (stillUnAnswered.length < 2) {
        $('.btnNext').html('Finish <i class="fa fa-check" aria-hidden="true"></i>');
      }
      if (stillUnAnswered.length < 1) {
        checkAns();
      }
    }
  };
  
  // called when all questions have answers and the finish button is selected
  function sendResult(){
    // put result into local storage for access by success page
    localStorage.setItem('userAnswers', finalResult);
    // open success page
     window.location.href = "success.html";
  };
  
  //make sure every question has been answered 
  function checkAns(){
    var checked = $('.quizBody');
    var hasAnswer = true;
    var needsAnswer = [];
    var markErrBtn;
    for (i=0; i < checked.length; i++){
      if ($(checked[i]).hasClass('answered')){
      }
      else {
        hasAnswer = false;
        needsAnswer.push(i+1);
      }
    }
    if (hasAnswer === false){
      showAlert(needsAnswer);
    }
    else {
      sendResult();
    }
    // nested function to display alert for missing answer
    function showAlert(missing){
      for (i=0; i < missing.length; i++){
        missingAnswer = missing[i];
        // find and display hidden alert element
        missingAnswer = $('.quizBody.question' + missingAnswer + ' .quizAlert');
        $(missingAnswer).addClass('visible');
        // mark Next buttons on ananswered questions
        markErrBtn = $(missingAnswer).parent('.quizBody');
        $(markErrBtn).find('.btnNext').addClass('errFix');
      }
      // jump to first unanswered question
      $('.quizBody').removeAttr('id');
      $('.quizBody.question' + missing[0]).attr('id', 'questionNow');
    }; // end showAlert
  }; // end checkAns
}; // end quizActions

// get data after page load so there are elements to fill
function init(){
  getData();
};

window.onload = init;

// get the quiz data from the external JSON file
function getData(){
  $.getJSON( "https://hnotess.github.io/quiz-builder/quizdata.json", function( data ) {
    quizSetupv2(data);
  });
}

// build quiz
// question level - loop through each question object
function quizSetupv2(quizData){
  var qID;
  var qText;
  var qAnswers;
  var qLength;
  var qCorrectAnswers = []
  // loop through JSON objects
  for(i=0; i < quizData.length; i++){
    qID = (quizData[i].question_id + 1);
    qText = quizData[i].question;
    qAnswers = quizData[i].answers;
    qLength = quizData.length;
    qLength = qLength.toString();
    qCorrectAnswers.push(quizData[i].correct);
    // send each object to build function
    buildQuiz(qID, qText, qAnswers, qLength, qCorrectAnswers);
  }
  quizSetup();
}

// answer level - this function is executed at each cycle of the above question loop 
function buildQuiz(qID, qText, qAnswers, qLength, qCorrectAnswers){
  // store array for correct answers
  localStorage.setItem('correctAnswers', qCorrectAnswers);
  // array for answers
  var midCode = [];
  var midCodeFull;
  // loop through and build answers - flexible/adjusts to amount of answers in each question
  for(n=0; n < qAnswers.length; n++){
    // when answers are text-only
    if ((qAnswers[n].text) && (!qAnswers[n].image)) {
      midCode.push('<div class="col-xs-6"><div class="quizBox" id="' + qAnswers[n].id + '">' + '<div class="ansText">' + qAnswers[n].text + '</div></div></div>');
    }
    // when answers are image-only
    else if ((qAnswers[n].image) && (!qAnswers[n].text)) {
      midCode.push('<div class="col-xs-6"><div class="quizBox" id="' + qAnswers[n].id + '">' + '<div class="ansImage"><img src="' + qAnswers[n].image + '"/></div></div></div>');
    }
    // when answers are text and image
    else if ((qAnswers[n].image) && (qAnswers[n].text)) {
      midCode.push('<div class="col-xs-6"><div class="quizBox" id="' + qAnswers[n].id + '">' + '<div class="ansImage"><img src="' + qAnswers[n].image + '"/>></div><div class="ansText">' + qAnswers[n].text + '</div></div></div>');
    }
  };
  midCodeFull = midCode.join(' ');
  // build HTML in parts
  var quizTop = '<section class="quizBody"><h2 class="quizQuestion"><span class="questionNum">' + qID + '/' + qLength + '</span> ' + qText + '</h2><span class="quizAlert">This question requires an answer</span><div class="row">';
  var quizBottom = '</div><footer><div class="row"><div class="col-sm-offset-3 col-sm-3 col-xs-6"><button class="btn btn-lg btn-default btnBack inactive"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back</button></div><div class="col-sm-3 col-xs-6"><button class="btn btn-lg btn-default btnNext">Next <i class="fa fa-chevron-right" aria-hidden="true"></i></button></div></div></footer></section>';
  // assemble HTML parts
  var quizPiece = quizTop + midCodeFull + quizBottom;
  // inject each question/answer HTML into doc
  $(quizPiece).appendTo($('.questionContainer'));
  return;
}
