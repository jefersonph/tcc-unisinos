var csj = {
	/*
		data.username = nome do usuario na live
		data.email = email do usuario
	*/
	login: function(data) {
		$.ajax({
			type: "POST",
			url: csj.getServerAPI() + "users.json",
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
		var storage = JSON.parse(localStorage.getItem(key));

		if(storage.responseText){
			return JSON.parse(storage.responseText);
		}else{
			return storage;	
		}		
	},
	getUsername: function(){
		var user = csj.getItemStorage("user");
		return user.gamertag;
	},
	getuserId: function(){
		var user = csj.getItemStorage("user");
		return user.id;	
	},
	getuserEmail: function(){
		var user = csj.getItemStorage("user");
		return user.email;	
	},
	/*
		data.username = username na live
	*/
	loadFriends: function(data) {
		var tpl = "";

		$.get( csj.getServerXBOX() + "friends/"+ data.username.replace(" ", "%20"), function( data ) {
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

		$.get( csj.getServerXBOX() + "games/"+ data.username.replace(" ", "%20"), function( data ) {
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
		$.get( csj.getServerXBOX() + "profile/"+ data.username.replace(" ", "%20"), function( data ) {

			tpl = "<div class='info-profile pull-left'><strong class='profile-name'>"+ data.Player.Gamertag +"</strong><br><span class='profile-score'>Gamerscore: </span><span>"+ data.Player.Gamerscore +"</span><br><span class='profile-reputation'>Reputation: </span><span>"+ data.Player.Reputation +"</span><br><div class='profile-recents'><strong>Atividades Recentes</strong><ul><li>"+data.RecentGames[0].Name +"</li><li>"+ data.RecentGames[1].Name +"</li><li>"+ data.RecentGames[2].Name +"</li></ul>	</div>	</div><div class='img-profile pull-right'><img src='"+ data.Player.Avatar.Body +"'></div>";

			$('#data-result').html(tpl);
		});		

	},
	getServerAPI: function(){
		//return "http://10.225.20.161:3000/";
		return "http://pos-unisinos-ws.herokuapp.com/";
	},
	getServerXBOX: function(){
		//return "http://php-jph.trans-prev.terra.com/";
		return "https://xboxapi.com/v1/"
	},
	requestGame: function(data){
		$.get( csj.getServerXBOX() + "friends/"+ data.username.replace(" ", "%20"), function( data ) {
			friends = data.Friends;
			for(var i=0; i<friends.length; i++ ){
				$('#requestGameUser').append(new Option(friends[i].GamerTag,  friends[i].GamerTag));
			}	
		});		

		csj.requestGameChange({
    		username: data.username
    	});


		$('select').on('change', function (e) {
    		csj.requestGameChange({
    			username: this.value
    		});
		});
		
	},
	requestGameChange: function(data){
		$.get( csj.getServerXBOX() + "games/"+ data.username.replace(" ", "%20"), function( data ) {
			games = data.Games;
			$('#requestGame option').remove();

			for(var i=0; i<games.length; i++ ){
				$('#requestGame').append(new Option(games[i].Name, games[i].Name));
			}	
			
		});		
	},
	loan: function(data){
		$.get( csj.getServerXBOX() + "games/"+ data.username.replace(" ", "%20"), function( data ) {
			games = data.Games;

			for(var i=0; i<games.length; i++ ){
				$('#loanGame').append(new Option(games[i].Name, games[i].Name));
			}	
			
		});		

		$.get( csj.getServerXBOX() + "friends/"+ data.username.replace(" ", "%20"), function( data ) {
			friends = data.Friends;

			for(var i=0; i<friends.length; i++ ){
				$('#loanGameUser').append(new Option(friends[i].GamerTag, friends[i].GamerTag));
			}	
			
		});	


	},
	yourLoans: function(data){
		var tpl = "";

		$.get( csj.getServerAPI() + "users/"+ data.id +"/lends.json", function( data ) {
			
			for(var i=0; i<data.length; i++ ){
				tpl += "<a class='list-group-item' style='height: 80px; '><div> <button id='" +data[i].id+"' onclick='csj.cancelLoan(" +data[i].id+ ");' type='button' class='btn btn-danger'>Cancelar</button>  <strong class='name-friend' style='margin-top: 35px;'>"+ data[i].game_id +"</strong> <span class='points-friend'>Para: "+ data[i].to +"</span></div><div class='clearfix'></div></a>";
			}

			$('#data-result').html(tpl);
		});		

	},
	cancelLoan: function(id){		
		$.ajax({
			type: "POST",
			url: csj.getServerAPI() + "users/"+ csj.getuserId() +"/lends/"+id+"/delete.json",
			success: function(data){
				$('#' + id).parent().parent().remove();
				$('#msgAlert').removeClass('hide');
			},
			error: function(data){
				console.log("ERRO cancelLoan");
			}
		});
		
	},
	makeLoan: function(data){
		$.ajax({
			type: "POST",
			url: csj.getServerAPI() + "users/"+ csj.getuserId() +"/lends.json",
			data: "lend[to]="+data.to+"&lend[game_id]="+data.id+"",
			success: function(data){
				$('#msgAlert').removeClass('hide');
			},
			error: function(data){
				console.log("ERRO makeLoan");
			}
		});
	},
	getParameterByName: function (name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	sendEmail: function(data){
		console.log(data);
		$('#msgAlert').removeClass('hide');
	}
}		
