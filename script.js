var main = function() {
	
}        
var list = document.getElementById('teams');
function addTeam() {
	var team = document.getElementById('team').value;
	var spaceLocation = team.indexOf(" ");
	if(spaceLocation == -1){
		alert("Please enter City and Nickname.");
	}
	else
	{
	var team_id = team.substring(0,spaceLocation) + "_" + team.substring(spaceLocation+1, team.length);
	//document.getElementById("team").innerHTML = team_id;
	var entry = document.createElement('li');
	entry.appendChild(document.createTextNode(team_id));
	list.appendChild(entry);
    }
    
	var url = "https://erikberg.com/nba/roster/" + team_id;
	$.getJSON("https://graph.facebook.com/btaylor", function(items){
		$.each(items, function(key, value){
			document.getElementById("json").innerHTML = key+": "+value+"<br />";
		});
	});
    
}
$(document).ready(main);
