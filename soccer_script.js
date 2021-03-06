//Script for Soccer page

// var tempLength = 0;
var counter = 0;
var articles = [];
//function to parse url pages and then display them
function addArticles(urls){
      var promises = []; //Needed to know if all requests have been made
    //Loop through all urls for this section
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
                if(e.link.indexOf("chinese") == -1 && e.link.indexOf("china") == -1 
                                            && e.link.indexOf("espanol") == -1){
                    articles.push({"websiteName": data.responseData.feed.title,
                                    "title":e.title, 
                                    "link":e.link, 
                                    "pubDate":e.publishedDate});
                    counter++;
                }
                console.log(articles.length);
              });
              
            
                               
          },
        });
        promises.push(request);
    }  
    //Done so that the articles are displayed only once all requests are made
   $.when.apply(null, promises).done(function(){

       displayArticles();
  })
}

//Parse through the articles, and get relevant information, and display
function displayArticles(){

    //Insertion sort by date here 
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

    //Loop through articles, get information, add to feed
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

        //Get correct time/date
        var months = Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        var pubString = hours + ":" + minutes + " " + months[date.getMonth()] 
                            + " " + date.getDate() + ", " + date.getFullYear();

        //Add article information to list
        $(".list").append('<dt><a href="'  +articles[k].link+  '" target="_blank">'  
            +articles[k].title+  '</a></dt><dd><p style = "font-size:75%"><i>'  
            + articles[k].websiteName+ ' - ' + pubString +  '</i></dd>');
    }
    
}

//Sites for soccer pages (ignore basketball teams -- NEED TO REMOVE --)
var sites = {"soccer" : ["http://www.worldsoccer.com/feed", "http://www.theguardian.com/football/rss", "http://sports.yahoo.com/soccer//rss.xml", "http://grantland.com/tags/soccer/feed/", "http://www.goal.com/en-us/feeds/news?fmt=rss&ICID=HP", "http://www.espnfc.com/rss", "http://feeds.bbci.co.uk/sport/0/football/rss.xml?edition=uk"],
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


//on page load NBA articles are shown
window.onload = addArticles(sites["soccer"]);

//when dropdown changes the articles change
document.getElementById("teams").onchange = function() {
    // tempLength = 0;
    counter = 0;
    articles = [];

    //Clear feed
    $(".list").empty();
    addArticles(sites[this.value]); 
    var logo = this.value + '_logo'; //Change logo
    document.body.style.backgroundImage = 'url(' + this.value + '_logo)';


};

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
