// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

var trigger = document.getElementById('drawer__icon');
if(trigger){
  trigger.addEventListener('click', function(){
    var target = document.getElementById('body');
    target.classList.toggle('overflow');
  }, false);
}

var scrollElm = (function() {
  if('scrollingElement' in document) return document.scrollingElement;
  if(navigator.userAgent.indexOf('WebKit') != -1) return document.body;
  return document.documentElement;
})();
(function() {
  var duration = 800;
  var ignore = '.noscroll';
  var easing = function (t, b, c, d) { return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b; }; //jswing
  var smoothScrollElm = document.querySelectorAll('a[href^="#"]:not(' + ignore +')');
  Array.prototype.forEach.call(smoothScrollElm, function(elm) {
    elm.addEventListener('click', function(e) {
      e.preventDefault();
      var targetElm = document.querySelector(elm.getAttribute('href'));
      if(!targetElm) return;
      var targetPos = targetElm.getBoundingClientRect().top;
      var startTime = Date.now();
      var scrollFrom = scrollElm.scrollTop;
      (function loop() {
        var currentTime = Date.now() - startTime;
        if(currentTime < duration) {
          scrollTo(0, easing(currentTime, scrollFrom, targetPos, duration));
          window.requestAnimationFrame(loop);
        } else {
          scrollTo(0, targetPos + scrollFrom);
        }
      })();
    })
  });
})();
