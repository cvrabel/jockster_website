var nba = ['http://nba.com/rss/nba_rss.xml', 'http://sports.espn.go.com/espn/rss/nba/news', 'https://sports.yahoo.com/nba/rss.xml', 
            'http://dimemag.com/feed/', 'http://www.cbssports.com/partners/feeds/rss/nba_news', 'http://basketball.realgm.com/rss/wiretap/15/0.xml'];

var hawks = ['http://www.nba.com/hawks/rss.xml'];
var celtics = ['http://www.nba.com/celtics/rss.xml'];
var nets = [];
var hornets = [];
var bulls = [];
var cavs =[];
var mavs = [];
var nuggets = [];
var pistons = [];
var warriors = [];
var rockets = [];
var pacers = [];
var clippers = [];
var lakers = [];
var grizzlies = [];
var heat = [];
var bucks = [];
var wolves = [];
var pelicans = [];
var knicks = [];
var thunder = [];
var magic = [];
var sixers = [];
var suns = [];
var blazers = [];
var kings = [];
var spurs = [];
var raptors = [];
var jazz = [];
var wizards = [];
 
var articles = [];
var check;
function addArticles(urls){



    for(var x = 0; x < urls.length; x++){
        $.ajax({  
          url      : 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(urls[x]),
          dataType : 'jsonp',
          success  : function (data) {
              //$("ol").append('<h4>NBA.com</h4>');
              $.each(data.responseData.feed.entries, function (i, e) {
                
                console.log("------------------------");
                console.log("title      : " + e.title);
                console.log("link       : " + e.link);
                console.log("pubDate    : " + e.pubDate);

                articles.push({"title":e.title, "link":e.link, "pubDate":e.pubDate});
                console.log(articles.length);

              });

              if(x == urls.length ){
                    console.log(articles.length);
                    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

                    for(var k = 0; k<articles.length; k++){
                        $("ol").append('<li><a href="'  +articles[k].link+  '" target="_blank">'  +articles[k].title+  '</a><p>'  +articles[k].pubDate+  '</p></li>');
                    }
                }
              
          }

        });
    }
    

}

window.onload = addArticles(nba);

document.getElementById("teams").onchange = function() {
    articles = [];
    $("list").empty();
    addArticles(this.value);
    return false;
};

