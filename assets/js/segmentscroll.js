jQuery(function($) {
  
  var $sections = $('.segment'),
    $animContainer = $('html, body'),
    $document = $(document),
    numSections = $sections.length,
    currSection = 0,
    isAnimating = false;
  
  // Animate to a specific index.
  var gotoSection = function(index) {
    isAnimating = true;
    $animContainer.animate({
      scrollTop: $sections.eq(index).offset().top
    }, 750, function () {
      isAnimating = false;
    });
  };
  
  // Advance to next or previous section.
  var handleAction = function(direction) {
    if (isAnimating) { return false; }
    
    if (direction === 'prev' && currSection > 0) { currSection--; }
    else if (direction === 'next' && currSection < numSections - 1) { currSection++; }
    else { return false; } // This shouldn't happen.
    
    gotoSection(currSection);
  };
  
  // Handle clicks.
  $document.on('click', '.arrow_down', function() {
    handleAction($(this).data('direction'));
  });
  $document.on('click', '.arrow_up', function() {
    handleAction($(this).data('direction'));
  });
  
  // Handle keyboard input.
  $document.keyup(function(e){
    if (e.keyCode === 38) { handleAction('prev'); } // Up arrow.
    if (e.keyCode === 40) { handleAction('next'); } // Down arrow.
  });

        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
        $('body').bind(mousewheelevt, function(e){

            var evt = window.event || e //equalize event object     
            // evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
            var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
            
            event.preventDefault();
            
            if(delta > 0) {
                handleAction('prev');
            }
            else{
                handleAction('next');
            }   
        });
  
});