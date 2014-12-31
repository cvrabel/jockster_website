
function addTeam(){
   
$.ajax({  
  url      : 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://nba.com/rss/nba_rss.xml'),
  dataType : 'jsonp',
  success  : function (data) {
      $("ol").append('<h4>NBA.com</h4>');
      $.each(data.responseData.feed.entries, function (i, e) {
        console.log("------------------------");
        console.log("title      : " + e.title);
        console.log("link     : " + e.link);
        console.log("description: " + e.description);


        $("ol").append('<li><a href="'  +e.link+  '" target="_blank">'  +e.title+  '</a></li>');

      });
    
  }
});

$.ajax({  
  url      : 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://sports.espn.go.com/espn/rss/nba/news'),
  dataType : 'jsonp',
  success  : function (data) {
      $("ol").append('<h4>ESPN - NBA</h4>');
      $.each(data.responseData.feed.entries, function (i, e) {
        console.log("------------------------");
        console.log("title      : " + e.title);
        console.log("link     : " + e.link);
        console.log("description: " + e.description);


        $("ol").append('<li><a href="'  +e.link+  '" target="_blank">'  +e.title+  '</a></li>');

      });
    
  }
});

$.ajax({  
  url      : 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('https://sports.yahoo.com/nba/rss.xml'),
  dataType : 'jsonp',
  success  : function (data) {
      $("ol").append('<h4>Yahoo - NBA<h4>');
      $.each(data.responseData.feed.entries, function (i, e) {
        console.log("------------------------");
        console.log("title      : " + e.title);
        console.log("link     : " + e.link);
        console.log("description: " + e.description);


        $("ol").append('<li><a href="'  +e.link+  '" target="_blank">'  +e.title+  '</a></li>');

      });
    
  }
});
}

