var sites = {"nba" : ["http://grantland.com/tags/nba/feed/", "http://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU&tag=nba", 
                        "http://probasketballtalk.nbcsports.com/feed/", "http://nba.com/rss/nba_rss.xml", "http://www.si.com/rss/si_nba.rss", 
                        "http://sports.espn.go.com/espn/rss/nba/news", "https://sports.yahoo.com/nba/rss.xml", "http://dimemag.com/feed/", 
                        "http://www.cbssports.com/partners/feeds/rss/nba_news", "http://basketball.realgm.com/rss/wiretap/0/0.xml"],
             "nfl" : ["http://grantland.com/tags/nfl/feed/", "http://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU&tag=nfl", 
                        "http://www.si.com/rss/si_nfl.rss", "http://sports.espn.go.com/espn/rss/nfl/news", "https://sports.yahoo.com/nfl/rss.xml", 
                        "http://www.cbssports.com/partners/feeds/rss/nfl_news", "http://www.nfl.com/rss/rsslanding?searchString=home", 
                        "http://www.yardbarker.com/rss/sport/2"],
            "soccer" : ["http://www.worldsoccer.com/feed", "http://www.theguardian.com/football/rss", "http://sports.yahoo.com/soccer//rss.xml", 
                        "http://grantland.com/tags/soccer/feed/", "http://www.goal.com/en-us/feeds/news?fmt=rss&ICID=HP", "http://www.espnfc.com/rss", 
                        "http://feeds.bbci.co.uk/sport/0/football/rss.xml?edition=uk"]
            };


var tempLength = 0;
var counter = 0;
var articles = [];
//function to parse url pages and then display them
function addArticles(urls){
      var promises = [];
    for(var x in urls){
        var request = $.ajax({  
          url      : 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(urls[x]),
          dataType : 'jsonp',
          success  : function (data) {
              //$("ol").append('<h4>NBA.com</h4>');
            
              $.each(data.responseData.feed.entries, function (i, e) {
                /*
                console.log("------------------------");
                console.log("title      : " + e.title);
                console.log("link       : " + e.link);
                console.log("pubDate    : " + Date.parse(e.publishedDate));
                console.log("description: " + e.contentSnippet);*/

                if(e.link.indexOf("chinese") == -1 && e.link.indexOf("china") == -1 && e.link.indexOf("espanol") == -1){
                    articles.push({"websiteName": data.responseData.feed.title, "title":e.title, "link":e.link, "pubDate":e.publishedDate});
                    counter++;
                }
                console.log(articles.length);
              });
              
              //displaying the articles
            
                               
          },
        });
        promises.push(request);
    }  
   $.when.apply(null, promises).done(function(){

       displayArticles();
  })
}

function displayArticles(){

        //sort by date here
          
      for(var x = 0; x <articles.length; x++){
        for(var y = x; y > 0; y--){
            if(Date.parse(articles[y].pubDate) > Date.parse(articles[y-1].pubDate)){
                var temp = articles[y];
                articles[y] = articles[y-1];
                articles[y-1] = temp;
            }
        }
      }
    for(var k = 0; k<articles.length; k++){
        var date = new Date(articles[k].pubDate);
        var minutes = date.getMinutes();
        if(minutes < 10)
            minutes = '0'+minutes;
        var hours = date.getHours();
        if(hours > 12){
            hours = hours-12;
            minutes = minutes + 'pm';
        }
        else{
            minutes = minutes + 'am';
        }
        var months = Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        var pubString = hours + ":" + minutes + " " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();


        $(".list").append('<dt><a href="'  +articles[k].link+  '" target="_blank">'  +articles[k].title+  '</a></dt><dd><p style = "font-size:75%"><i>'  +articles[k].websiteName+ ' - ' + pubString +  '</i></dd>');
    }
    
}


//on page load NBA articles are shown

var finalSites = [].concat(sites["nba"],sites["nfl"],sites["soccer"]);

window.onload = addArticles(finalSites);

//when dropdown changes the articles change
/*
document.getElementById("teams").onchange = function() {
    tempLength = 0;
    counter = 0;
    articles = [];
    $(".list").empty();
    addArticles(sites[this.value]);
    var logo = this.value + '_logo';
    document.body.style.backgroundImage = 'url(' + this.value + '_logo)';


};*/

//fix ribbon at top of screen

var fixmeTop = $('.menu_ribbon').offset().top;
$(window).scroll(function() {
    var currentScroll = $(window).scrollTop();
    if (currentScroll >= fixmeTop) {
        $('.menu_ribbon').css({
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%'
        });
    } else {
        $('.menu_ribbon').css({
            position: 'static'
        });
    }
});
