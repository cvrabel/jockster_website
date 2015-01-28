var sites = {"nba" : ["http://grantland.com/tags/nba/feed/", "http://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU&tag=nba", "http://probasketballtalk.nbcsports.com/feed/", "http://nba.com/rss/nba_rss.xml", "http://www.si.com/rss/si_nba.rss", "http://sports.espn.go.com/espn/rss/nba/news", "https://sports.yahoo.com/nba/rss.xml", "http://dimemag.com/feed/", "http://www.cbssports.com/partners/feeds/rss/nba_news", "http://basketball.realgm.com/rss/wiretap/0/0.xml"],
             "hawks" : ["http://www.nba.com/hawks/rss.xml", "http://www.peachtreehoops.com/rss/current"],
            "celtics" : ["http://www.nba.com/celtics/rss.xml", "http://www.celticsblog.com/rss/current"],
            "nets" : ["http://www.nba.com/nets/rss.xml", "http://www.netsdaily.com/rss/current"],
            "hornets" : ["http://www.nba.com/hornets/rss.xml", "http://www.atthehive.com/rss/current"],
            "bulls" : ["http://www.nba.com/bulls/rss.xml", "http://www.blogabull.com/rss/current"],
            "cavs" : ["http://www.nba.com/cavaliers/rss.xml", "http://www.fearthesword.com/rss/current"],
            "mavs" : ["http://www.mavs.com/feed/", "http://www.mavsmoneyball.com/rss/current"],
            "nuggets" : ["http://www.nba.com/nuggets/rss.xml", "http://www.denverstiffs.com/rss/current"],
            "pistons" : ["http://www.nba.com/pistons/rss.xml", "http://www.detroitbadboys.com/rss/current"],
            "warriors" : ["http://www.nba.com/warriors/rss.xml", "http://www.goldenstateofmind.com/rss/current"],
            "rockets" : ["http://www.nba.com/rockets/rss.xml", "http://www.thedreamshake.com/rss/current"],
            "pacers" : ["http://www.nba.com/pacers/rss.xml", "http://www.indycornrows.com/rss/current"],
            "clippers" : ["http://www.nba.com/clippers/rss.xml", "http://www.clipsnation.com/rss/current"],
            "lakers" : ["http://www.nba.com/lakers/rss.xml", "http://www.silverscreenandroll.com/rss/current"],
            "grizzlies" : ["http://www.nba.com/grizzlies/rss.xml", "http://www.grizzlybearblues.com/rss/current"],
            "heat" : ["http://www.nba.com/heat/rss.xml", "http://www.hothothoops.com/rss/current"],
            "bucks" : ["http://www.nba.com/bucks/rss.xml", "http://www.brewhoop.com/rss/current"],
            "wolves" : ["http://www.nba.com/timberwolves/rss.xml", "http://www.canishoopus.com/rss/current"],
            "pelicans" : ["http://www.nba.com/pelicans/rss.xml", "http://www.thebirdwrites.com/rss/current"],
            "knicks" : ["http://www.nba.com/knicks/rss.xml", "http://www.postingandtoasting.com/rss/current"],
            "thunder" : ["http://www.nba.com/thunder/rss.xml", "http://www.welcometoloudcity.com/rss/current"],
            "magic" : ["http://www.nba.com/magic/rss.xml", "http://www.orlandopinstripedpost.com/rss/current"],
            "sixers" : ["http://www.nba.com/sixers/rss.xml", "http://www.libertyballers.com/rss/current"],
            "suns" : ["http://www.nba.com/suns/rss.xml", "http://www.brightsideofthesun.com/rss/current"],
            "blazers" : ["http://www.nba.com/blazers/rss.xml", "http://www.blazersedge.com/rss/current"],
            "kings" : ["http://www.nba.com/kings/rss.xml", "http://www.sactownroyalty.com/rss/current"],
            "spurs" : ["http://www.nba.com/spurs/rss.xml", "http://www.poundingtherock.com/rss/current"],
            "raptors" : ["http://www.nba.com/raptors/rss.xml", "http://www.raptorshq.com/rss/current"],
            "jazz" : ["http://www.nba.com/jazz/rss.xml", "http://www.slcdunk.com/rss/current"],
            "wizards" : ["http://www.nba.com/wizards/rss.xml", "http://www.bulletsforever.com/rss/current"]
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
                
                console.log("------------------------");
                console.log("title      : " + e.title);
                console.log("link       : " + e.link);
                console.log("pubDate    : " + Date.parse(e.publishedDate));
                console.log("description: " + e.contentSnippet);
                if(e.link.indexOf("chinese") == -1 && e.link.indexOf("china") == -1 && e.link.indexOf("espanol") == -1){
                    articles.push({"title":e.title, "link":e.link, "pubDate":e.publishedDate});
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
    console.log("THIS IS THE NUMBER OF ARTICLES : " + articles.length);
    for(var k = 0; k<articles.length; k++){
        $(".list").append('<dt><a href="'  +articles[k].link+  '" target="_blank">'  +articles[k].title+  '</a></dt><dd><p style = "font-size:75%"><i>'  +articles[k].pubDate+  '</i></dd>');
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