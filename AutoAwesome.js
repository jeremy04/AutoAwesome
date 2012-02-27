//AutoAwesome - listens for event for beginning of song which triggers clicking of Awesome
function awesomeIt() {
  turntable.lastMotionTime = util.now();
  a=[];for(var x in turntable){a.push(x);}var room=turntable[a[0]];
  turntable.whenSocketConnected(function() {
    room.connectRoomSocket('up');
  });
  console.log("UPVOTE!");
  var url = window.location.protocol+"//"+MEDIA_HOST+"/getfile/?roomid="+room.roomId+"&rand="+Math.random()+"&fileid="+room.currentSong._id+"&downloadKey="+$.sha1(room.roomId+room.currentSong._id)+"&userid="+turntable.user.id+"&client=web";
  var mp3 = room.currentSong.metadata.artist + " - " + room.currentSong.metadata.song;
  var room_name = window.location.href;
  var request = $.ajax({
    url: "http://localhost:3000/download",
      type: "POST",
      data: {mp3:mp3, room_name:room_name, url:url},
      dataType: "jsonp",
  });

}

turntable.addEventListener("message", function(m){ if (m["command"] == "newsong") { awesomeIt(); } });
awesomeIt();
