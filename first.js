function dothis(){
	alert("sup babe!")
}

var a = document.getElementById('supers').style.display="none";

function parseMillisecondsIntoReadableTime(milliseconds){
  // Get hours from milliseconds
  var hours = milliseconds / (1000*60*60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  // Get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

  // Get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.floor(seconds);
  var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


  return h + ':' + m + ':' + s;
}



var d1 = new Date("09/16/2017");
var d2 = new Date();
 






TweenLite.defaultEase = Expo.easeOut;

// console.log(parseMillisecondsIntoReadableTime(d1.getTime()-d2.getTime()));

initTimer(parseMillisecondsIntoReadableTime(d1.getTime()-d2.getTime())); // other
																			// ways
																			// -->
																			// "0:15"
																			// "03:5"
																			// "5:2"

var reloadBtn = document.querySelector('.reload');
var timerEl = document.querySelector('.timer');

function initTimer (t) {
   
   var self = this,
       timerEl = document.querySelector('.timer'),
       hoursGroupEl = timerEl.querySelector('.hours-group'),
       minutesGroupEl = timerEl.querySelector('.minutes-group'),
       secondsGroupEl = timerEl.querySelector('.seconds-group'),

       hourGroup = {
	   firstNum: hoursGroupEl.querySelector('.first'),
       secondNum: hoursGroupEl.querySelector('.second')
   }
       
       minutesGroup = {
          firstNum: minutesGroupEl.querySelector('.first'),
          secondNum: minutesGroupEl.querySelector('.second')
       },

       secondsGroup = {
          firstNum: secondsGroupEl.querySelector('.first'),
          secondNum: secondsGroupEl.querySelector('.second')
       };

   var time = {
		   hour: t.split(':')[0],
		   min: t.split(':')[1],
		   sec: t.split(':')[2],
   };

   var timeNumbers;

   function updateTimer() {

	   var d1 = new Date("09/15/2017 11:21");
	   var d2 = new Date();
	   
	    
	   if(d1.getTime()-d2.getTime() < 0)
		   {
		   var a = document.getElementById('timers').style.display="none";
		   var a = document.getElementById('supers').style.display="";
		   }
		   
      var timestr;
      var date = new Date();

      date.setHours(time.hour);
      date.setMinutes(time.min);
      date.setSeconds(time.sec);

      var newDate = new Date(date.valueOf() - 1000);
      var temp = newDate.toTimeString().split(" ");
      var tempsplit = temp[0].split(':');

      time.hour= tempsplit[0];
      time.min = tempsplit[1];
      time.sec = tempsplit[2];

      timestr =time.hour+ time.min + time.sec;
      timeNumbers = timestr.split('');
      updateTimerDisplay(timeNumbers);

      if(timestr === '0000')
         countdownFinished();

      if(timestr != '0000')
         setTimeout(updateTimer, 1000);

   }

   function updateTimerDisplay(arr) {

	   animateNum(hourGroup.firstNum, arr[0]);
	      animateNum(hourGroup.secondNum, arr[1]);
      animateNum(minutesGroup.firstNum, arr[2]);
      animateNum(minutesGroup.secondNum, arr[3]);
      animateNum(secondsGroup.firstNum, arr[4]);
      animateNum(secondsGroup.secondNum, arr[5]);

   }

   function animateNum (group, arrayValue) {

      TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
      TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
         y: - group.querySelector('.num-' + arrayValue).offsetTop
      });

   }
   
   setTimeout(updateTimer, 1000);

}

function countdownFinished() {
   setTimeout(function () {
      TweenMax.set(reloadBtn, { scale: 0.8, display: 'block' });
      TweenMax.to(timerEl, 1, { opacity: 0.2 });
      TweenMax.to(reloadBtn, 0.5, { scale: 1, opacity: 1 }); 
   }, 1000);
}

reloadBtn.addEventListener('click', function () {
   TweenMax.to(this, 0.5, { opacity: 0, onComplete:
      function () { 
         reloadBtn.style.display= "none";
      } 
   });
   TweenMax.to(timerEl, 1, { opacity: 1 });
   initTimer("12:35");
});


(()=>{
	let $ = c.getContext("2d"),
			h = c.height = window.innerHeight,
			w = c.width = window.innerWidth,
			random = (n)=>Math.random()*n,
			stars = new Array(1000).fill().map(()=>{
				return {r: random(w),	s: random(0.01), a: random(Math.PI*2)};
			});
	function loop(){
		$.fillStyle="rgba(0,0,0,.1)";
		$.fillRect(0,0,w,h);
		stars.forEach(e=>{
			e.a+=e.s;
			$.save();
			$.beginPath();
			$.translate(w/2, h/2);
			$.rotate(e.a);
			$.arc(e.r,e.r,1,0,Math.PI*2);
			// $.arc(Math.cos(e.a)*e.r + w/2, Math.sin(e.a)*e.r +
			// h/2,1,0,Math.PI*2);
			$.closePath();
			$.fillStyle = "white";
			$.fill();
			$.restore()
		})
		requestAnimationFrame(loop)
	}
	loop();
	window.addEventListener("resize", (e)=>{
		w=c.width=window.innerWidth;
		h=c.height=window.innerHeight;
	});
})()