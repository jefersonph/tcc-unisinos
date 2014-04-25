var csj = {
	/*
		data.username = nome do usuario na live
		data.email = email do usuario
	*/
	login: function(data) {
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/users.json",
			data: "user[email]="+data.email+"&user[gamertag]="+data.username+"",
			success: function(data){
				csj.setItemStorage("user", data);
				window.location.href = window.location.protocol + "//" + window.location.host + "/friends";
			},
			error: function(data){
				csj.setItemStorage("user", data);
				window.location.href = window.location.protocol + "//" + window.location.host + "/friends";
			}
		});
	},
	setItemStorage: function(key, data){
		localStorage.setItem(key, JSON.stringify(data));
	},
	getItemStorage: function(key){
		return localStorage.getItem(JSON.parse(key));
	},
	getUsername: function(){
		var user = csj.getItemStorage("user");
		return user.gamertag;
	},
	getuserId: function(){
		var user = csj.getItemStorage("user");
		return user.id;	
	},
	/*
		data.username = username na live
	*/
	loadFriends: function(data) {
		var tpl = "";

		$.get("http://php-jph.trans-prev.terra.com/unisinos/friends/"+ data.username +".json", function( data ) {
			friends = data.Friends;

			for(var i=0; i<friends.length; i++ ){
				tpl += "<a  class='list-group-item'><div><img class='friend-img' src='" + friends[i].LargeGamerTileUrl + "'>  <strong class='name-friend'>"+ friends[i].GamerTag +"</strong> <span class='points-friend'>GamerScore: "+ friends[i].GamerScore +"</span></div><div class='clearfix'></div></a>";
			}

			$('#data-result').html(tpl);
		});		
	},
	/*
		data.username = nome do usuario na live
	*/
	loadGames: function(data) {
		var tpl = "";

		$.get("http://php-jph.trans-prev.terra.com/unisinos/games/"+ data.username +".json", function( data ) {
			games = data.Games;

			for(var i=0; i<games.length; i++ ){
				tpl += "<a class='list-group-item'><div><img class='friend-img' style='width:85px; height: 120px;'src='" + games[i].BoxArt.Small + "'>  <strong class='name-friend' style='margin-top: 35px;'>"+ games[i].Name +"</strong> <span class='points-friend'>Achievements: "+ games[i].Progress.Achievements +"</span></div><div class='clearfix'></div></a>";
			}

			$('#data-result').html(tpl);
		});		
	},
	/*
		data.username = nome do usuario na live
	*/
	loadProfile: function(data){
		var tpl = "";
		$.get("http://php-jph.trans-prev.terra.com/unisinos/profile/"+ data.username +".json", function( data ) {

			tpl = "<div class='info-profile pull-left'><strong class='profile-name'>"+ data.Player.Gamertag +"</strong><br><span class='profile-score'>Gamerscore: </span><span>"+ data.Player.Gamerscore +"</span><br><span class='profile-reputation'>Reputation: </span><span>"+ data.Player.Reputation +"</span><br><div class='profile-recents'><strong>Atividades Recentes</strong><ul><li>"+data.RecentGames[0].Name +"</li><li>"+ data.RecentGames[1].Name +"</li><li>"+ data.RecentGames[2].Name +"</li></ul>	</div>	</div><div class='img-profile pull-right'><img src='"+ data.Player.Avatar.Body +"'></div>";

			$('#data-result').html(tpl);
		});		

	}
}		
