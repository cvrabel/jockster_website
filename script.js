var urls = ['http://nba.com/rss/nba_rss.xml', 'http://sports.espn.go.com/espn/rss/nba/news', 'https://sports.yahoo.com/nba/rss.xml', 
            'http://dimemag.com/feed/', 'http://www.cbssports.com/partners/feeds/rss/nba_news', 'http://basketball.realgm.com/rss/wiretap/15/0.xml'];

 
var articles = [];

function addTeam(){

    for(var x = 0; x < urls.length; x++){
        $.ajax({  
          url      : 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(urls[x]),
          dataType : 'jsonp',
          success  : function (data) {
              //$("ol").append('<h4>NBA.com</h4>');
              $.each(data.responseData.feed.entries, function (i, e) {
                console.log("------------------------");
                console.log("title      : " + e.title);
                console.log("link     : " + e.link);
                //console.log("description: " + e.description);


                //$("ol").append('<li><a href="'  +e.link+  '" target="_blank">'  +e.title+  '</a></li>');
                var tempDict = {"title":e.title, "link":e.link, "pubDate":e.pubDate};
                articles.push(tempDict);
                console.log(articles.length);
                

              });
                if(articles.length == 59){
                    console.log(articles.length);

                    for(var k = 0; k<articles.length; k++){
                        $("ol").append('<li><a href="'  +articles[k].link+  '" target="_blank">'  +articles[k].title+  '</a></li>');
                    }
                }
          }

        });
    }
    

}

window.onload = addTeam();



