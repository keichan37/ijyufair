// SPブラウザのメニュー分高さを引いたheight
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// ハンバーガーメニューが押されたらスクロールさせない
document.getElementById('drawer__check').addEventListener('click',function(){
  var target = document.getElementById('body');
  target.classList.toggle('overflow');
}, false);

// aタグの親labelのforを有効に
document.querySelector('label[for]>a').addEventListener('click', function(event) {
  document.getElementById(event.currentTarget.parentNode.htmlFor).click();
}, false);

// 日時指定で内容変更
var now = new Date();
var end1 = new Date('2021/2/13 14:00:00');
var end2 = new Date('2021/2/14 13:45:00');
var day1 = document.getElementById('home__section__day1')
var day2 = document.getElementById('home__section__day2')
if ( end1 < now ) {
  day1.textContent="アーカイブ視聴";
  day1.href = "https://youtu.be/unWU_6uNffs"
}
if ( end2 < now ) {
  day2.textContent="アーカイブ視聴";
  day2.href = "https://youtu.be/KvLHv7ptpKI"
}

// ページ内リンクをアニメーションさせる
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
