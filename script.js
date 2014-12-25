function addTeam() {
    var myurl = "https://erikberg.com/nba/teams.json";
    $.ajax(({
        url: myurl,
        dataType: 'jsonp',
        success: 
        function (data) {
            console.log(data);
            var teamlist = [];
            for (var elem in data){
                console.log(elem.full_name);
                teamlist.push(elem.full_name);
            }
        }
    }));
}