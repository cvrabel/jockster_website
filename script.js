var sites = {"nba" : ["http://nba.com/rss/nba_rss.xml", "http://www.si.com/rss/si_nba.rss", "http://sports.espn.go.com/espn/rss/nba/news", "https://sports.yahoo.com/nba/rss.xml", "http://dimemag.com/feed/", "http://www.cbssports.com/partners/feeds/rss/nba_news", "http://basketball.realgm.com/rss/wiretap/0/0.xml"],
             "hawks" : ["http://www.nba.com/hawks/rss.xml"],
            "celtics" : ["http://www.nba.com/celtics/rss.xml"],
            "nets" : ["http://www.nba.com/nets/rss.xml"],
            "hornets" : ["http://www.nba.com/hornets/rss.xml"],
            "bulls" : ["http://www.nba.com/bulls/rss.xml"],
            "cavs" : ["http://www.nba.com/cavaliers/rss.xml"],
            "mavs" : ["http://www.mavs.com/feed/"],
            "nuggets" : ["http://www.nba.com/nuggets/rss.xml"],
            "pistons" : ["http://www.nba.com/pistons/rss.xml"],
            "warriors" : ["http://www.nba.com/warriors/rss.xml"],
            "rockets" : ["http://www.nba.com/rockets/rss.xml"],
            "pacers" : ["http://www.nba.com/pacers/rss.xml"],
            "clippers" : ["http://www.nba.com/clippers/rss.xml"],
            "lakers" : ["http://www.nba.com/lakers/rss.xml"],
            "grizzlies" : ["http://www.nba.com/grizzlies/rss.xml"],
            "heat" : ["http://www.nba.com/heat/rss.xml"],
            "bucks" : ["http://www.nba.com/bucks/rss.xml"],
            "wolves" : ["http://www.nba.com/timberwolves/rss.xml"],
            "pelicans" : ["http://www.nba.com/pelicans/rss.xml"],
            "knicks" : ["http://www.nba.com/knicks/rss.xml"],
            "thunder" : ["http://www.nba.com/thunder/rss.xml"],
            "magic" : ["http://www.nba.com/magic/rss.xml"],
            "sixers" : ["http://www.nba.com/sixers/rss.xml"],
            "suns" : ["http://www.nba.com/suns/rss.xml"],
            "blazers" : ["http://www.nba.com/blazers/rss.xml"],
            "kings" : ["http://www.nba.com/kings/rss.xml"],
            "spurs" : ["http://www.nba.com/spurs/rss.xml"],
            "raptors" : ["http://www.nba.com/raptors/rss.xml"],
            "jazz" : ["http://www.nba.com/jazz/rss.xml"],
            "wizards" : ["http://www.nba.com/wizards/rss.xml"]
            };

var articles = [];
var tempLength = 0;
var counter = 0;

//function to parse url pages and then display them
function addArticles(urls){
        for(var x = 0; x < urls.length; x++){
            counter = 0;
            $.ajax({  
              url      : 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(urls[x]),
              dataType : 'jsonp',
              async    : false,
              success  : function (data) {
                  //$("ol").append('<h4>NBA.com</h4>');
                  counter = 0;
                  $.each(data.responseData.feed.entries, function (i, e) {
                    
                    console.log("------------------------");
                    console.log("title      : " + e.title);
                    console.log("link       : " + e.link);
                    console.log("pubDate    : " + Date.parse(e.publishedDate));
                    console.log("description: " + e.contentSnippet);
                    if(e.link.indexOf("chinese") == -1 && e.link.indexOf("china") == -1 && e.link.indexOf("espanol") == -1){
                        articles.push({"title":e.title, "link":e.link, "pubDate":Date.parse(e.publishedDate)});
                        counter++;
                    }
                    console.log(articles.length);
                    
                  });
                  //displaying the articles
                  if(x == urls.length && counter == data.responseData.feed.entries.length){
                  for(var k = 0; k<articles.length; k++){
                        $(".list").append('<dt><a href="'  +articles[k].link+  '" target="_blank">'  +articles[k].title+  '</a></dt><dd><p style = "font-size:75%"><i>'  +articles[k].pubDate+  '</i></dd>');
                        }
                    }
                  tempLength = counter;                  
              }
            });
            
        }

}




//on page load NBA articles are shown
window.onload = addArticles(sites["nba"]);




//when dropdown changes the articles change
document.getElementById("teams").onchange = function() {
    tempLength = 0;
    counter = 0;
    articles = [];
    $(".list").empty();
    addArticles(sites[this.value]);
};

