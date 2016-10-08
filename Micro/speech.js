var $element = $('.speech-control-container');

$element.on('click', function(){
 $element.addClass('listen').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $element.removeClass('listen');    $element.addClass('loading').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $element.removeClass('loading');
    });
  });
});