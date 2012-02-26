//AutoAwesome - listens for event for beginning of song which triggers clicking of Awesome
(function(){
    // remove layerX and layerY
    var all = $.event.props,
        len = all.length,
        res = [];
    while (len--) {
      var el = all[len];
      if (el != 'layerX' && el != 'layerY') res.push(el);
    }
    $.event.props = res;
}());


function getAwesomeId() {
	var awesomeId="";
	for (x in document.styleSheets) {
		for (i in document.styleSheets[x].cssRules) 
		{
			var ss = document.styleSheets[x];
			if( typeof ss != "undefined")
			{
				csstext = document.styleSheets[x].cssRules[i];
				if( typeof csstext==="object") 
				{
					if( document.styleSheets[x].cssRules[i].cssText.indexOf("vote") != -1)
					{	
						awesomeId = document.styleSheets[x].cssRules[i].selectorText;
						break;
					}
				}
			}
		}
	}
	return awesomeId;
}

function awesomeHandler(){
	
	var e = jQuery.Event("click");
	e.pageX = 1;							//click handler for awesome button checks that click event has pageX and pageY properties != 0
	e.pageY = 1;							//
	turntable.lastMotionTime = util.now();  //click handler checks idle time - use internal time check - util.now - to set our activity to current time
  var awesomeId = getAwesomeId();
  console.log("Found awesome button " + awesomeId );
  $(awesomeId).trigger(e); //attribute for 'AWESOME' button
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function awesomeIt() {
  sleep(5000);
  turntable.lastMotionTime = util.now(); 
  a=[];for(var x in turntable){a.push(x);}var room=turntable[a[0]];
  room.connectRoomSocket("up");
  console.log("UPVOTE!");
}

turntable.addEventListener("trackstart", awesomeIt);
awesomeIt();