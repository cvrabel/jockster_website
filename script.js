
function addTeam(){
    alert('working');
$.ajax({
  url      : 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://nba.com/rss/nba_rss.xml'),
  dataType : 'jsonp',
  success  : function (data) {
   
      $.each(data.responseData.feed.entries, function (i, e) {
        console.log("------------------------");
        console.log("title      : " + e.title);
        console.log("link     : " + e.link);
        console.log("description: " + e.description);
      });
    
  }
});
}

