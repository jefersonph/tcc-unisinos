var tcc = {
	//["ac", "al", "ap", "am", "ba", "ce", "df", "es", "go", "ma", "mt", "ms", "mg", "pa", "pb", "pr", "pe", "pi", "rj", "rn", "rs", "ro", "rr", "sc", "sp", "se", "to"]
	//["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]
	//$.inArray( 5 + 5, [ "8", "9", "10", 10 + "" ] );
	listaEstados: function(){
		return ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
	},
	estados: function(i){
		var tpl = "";
		$.get( "javascripts/estados.json", function( data ) {
			var tpl = "";

			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Nome</a><span class='list-group-item'>" + data[i].Nome + "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Capital</a><span class='list-group-item'>" + data[i].Capital + "</span></div>";
			tpl +=  "<div class='list-group'><a  class='list-group-item active'>Regiao</a><span class='list-group-item'>" + data[i].Regiao+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Sigla</a><span class='list-group-item'>" + data[i].Sigla+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Gentílico</a><span class='list-group-item'>" + data[i].Gentilico+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>População</a><span class='list-group-item'>" + data[i].Populacao+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Área</a><span class='list-group-item'>" + data[i].Area + "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Densidade demografica</a><span class='list-group-item'>" + data[i].Densidade_Demografica+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Quantidade de municípios</a><span class='list-group-item'>" + data[i].Quantidade_de_municipios+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>PIB</a><span class='list-group-item'>" + data[i].PIB+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Renda per capita</a><span class='list-group-item'>" + data[i].Renda_Per_Capita+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>IDH</a><span class='list-group-item'>" + data[i].IDH+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Principais atividades economicas</a><span class='list-group-item'>" + data[i].Principais_Atividades_Economicas + "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Mortalidade infantil</a><span class='list-group-item'>" + data[i].Mortalidade_Infantil+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Analfabetismo</a><span class='list-group-item'>" + data[i].Analfabetismo+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Expectativa de vida</a><span class='list-group-item'>" + data[i].Espectativa_de_vida+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Etnias</a><span class='list-group-item'>" + data[i].Etnias+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Rios importantes</a><span class='list-group-item'>" + data[i].Rios_importantes+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Principais cidades</a><span class='list-group-item'>" + data[i].Principais_cidades+ "</span></div>";
			tpl +=	"<div class='list-group'><a  class='list-group-item active'>Clima</a><span class='list-group-item'>" + data[i].Clima+ "</span></div>";
			
			$('.panel-body').html(tpl);
		});		
	
	},
	getParameterByName: function (name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	createUser: function(data){
		var user = localStorage.getItem('user');
		var	url = "";
		var method = "";

		if(user == 1){
			console.log("logado");
			var dt = tcc.getUserData();
			url = tcc.getServerAPI() + "users/"+dt.id+".json";
			method = 'PUT';
		}else{
			console.log("nao logado");
			url = tcc.getServerAPI() + "users.json";
			method = 'POST';
		}
		
		$.ajax({
			type: "POST",
			url: url,
			data: "_method="+method+"&user[email]="+data.email+"&user[sangue]="+data.sangue+"&user[peso]="+data.peso+"&user[altura]="+data.altura+"&user[pressao]="+data.pressao+"",
			success: function(data){
				$("#msg-ok").removeClass("hide");								
				tcc.setUserData(data);
			},
			error: function(data){
				$("#msg-nok").removeClass("hide");				
			}
		});

	},
	getServerAPI: function () {
		return "http://localhost:3000/";
	},
	setUserData: function (data){
		localStorage.setItem("user", 1);
		localStorage.setItem("userData", JSON.stringify(data));
	},
	getUserData: function(){
		var dt = localStorage.getItem('userData')
		return JSON.parse(dt);
	},
	removeDiseases: function(id){
		
		var dt = tcc.getUserData();
		var url = tcc.getServerAPI() + "users/"+dt.id+"/diseases/"+id+"";

		tcc.remvoeInfoGeneric(url);		
	},
	removeAllergy: function(id){
		var dt = tcc.getUserData();
		var url = tcc.getServerAPI() + "users/"+dt.id+"/allergies/"+id+"";

		tcc.remvoeInfoGeneric(url);
	},
	removeRemedy: function(id){
		var dt = tcc.getUserData();
		var url = tcc.getServerAPI() + "users/"+dt.id+"/remedies/"+id+"";

		tcc.remvoeInfoGeneric(url);
	},
	getUserDiseases: function(){
		var dt = tcc.getUserData();
		var tpl = "";
		$.ajax({
			type: "GET",
			url: tcc.getServerAPI() + "users/"+dt.id+"/diseases.json",
			success: function(data){
				for(var i=0; i < data.length; i++){					
					tpl += '<li class="list-group-item"><a href="" onclick="tcc.removeDiseases('+data[i].id+')" class="icon icon-cancel pull-right"></a>'+data[i].name+'</li>';
				}
				
				$("#list").html(tpl); 
			},
			error: function(data){
				console.log("erro");
			}
		});
	},
	createDisease: function(name){
		var dt = tcc.getUserData();
		var url = tcc.getServerAPI() + "users/"+dt.id+"/diseases";

		tcc.setInfoGeneric("disease", name, url);
	},
	getUserAllergies: function(){
		var dt = tcc.getUserData();
		var tpl = "";
		$.ajax({
			type: "GET",
			url: tcc.getServerAPI() + "users/"+dt.id+"/allergies.json",
			success: function(data){
				for(var i=0; i < data.length; i++){					
					tpl += '<li class="list-group-item"><a href="" onclick="tcc.removeAllergy('+data[i].id+')" class="icon icon-cancel pull-right"></a>'+data[i].name+'</li>';
				}
				
				$("#list").html(tpl); 
			},
			error: function(data){
				console.log("erro");
			}
		});
	},
	createAllergy: function(name){
		var dt = tcc.getUserData();
		var url = tcc.getServerAPI() + "users/"+dt.id+"/allergies";

		tcc.setInfoGeneric("allergy", name, url);
	},
	setInfoGeneric: function(resource, info, url){
		var dt = tcc.getUserData();
		
		$.ajax({
			type: "POST",
			url: url,
			data: ""+resource+"[user_id]="+dt.id+"&"+resource+"[name]="+info+"",
			success: function(data){
				$("#msg-ok").removeClass("hide");												
			},
			error: function(data){
				$("#msg-nok").removeClass("hide");				
			}
		});
	},
	createRemedy: function(data){

		var dt = tcc.getUserData();
		var url = tcc.getServerAPI() + "users/"+dt.id+"/remedies";

		$.ajax({
			type: "POST",
			url: url,
			data: "remedy[user_id]="+dt.id+"&remedy[name]="+data.name+"&remedy[quantidade]="+data.quantidade+"",
			success: function(data){
				$("#msg-ok").removeClass("hide");												
			},
			error: function(data){
				$("#msg-nok").removeClass("hide");				
			}
		});

	},
	getUserRemedies: function(){
		var dt = tcc.getUserData();
		var tpl = "";

		$.ajax({
			type: "GET",
			url: tcc.getServerAPI() + "users/"+dt.id+"/remedies.json",
			success: function(data){
				for(var i=0; i < data.length; i++){					
					tpl += '<div class="list-group-item"><h4 class="list-group-item-heading">'+data[i].name+'<a href="" onclick="tcc.removeRemedy('+data[i].id+')" class="icon icon-cancel pull-right"></a></h4><p class="list-group-item-text">Quantidade diaria: '+data[i].quantidade+'</p></div>';
				}
				
				$("#list").html(tpl); 
			},
			error: function(data){
				console.log("erro");
			}
		});
	},
	remvoeInfoGeneric: function(url){
		$.ajax({
			type: "POST",
			url: url,
			data: "_method=delete",
			success: function(data){
				$("#msg-ok").removeClass("hide");												
			},
			error: function(data){
				$("#msg-nok").removeClass("hide");				
			}
		});
	},
	getDiseaseJson: function(data){
		console.log(data);

		switch(data.disease) {
		    case "aids":
		    	console.log("aids");
		        tcc.getTaxaDiseaseJson({
		        	estado: data.estado,
		        	url: "javascripts/taxa_aids.json",
		        	alerta: '<div class="alert alert-danger">Taxa de incidência: casos por 100.000 habitantes</div>'
		        });
		        break;
		    case "dengue":
		        console.log("dengue");		        
		        tcc.getIncidenciaTaxaJson({
		        	estado: data.estado,
		        	urlTaxa: "javascripts/taxa_dengue.json",
		        	urlIncidencia: "javascripts/incidencia_dengue.json"		        	
		        });
		        break;
		    case "tuberculose":
		    	tcc.getTaxaDiseaseJson({
		    		estado: data.estado,
		    		url: "javascripts/taxa_tuberculose.json",
		    		alerta: '<div class="alert alert-danger">Taxa de incidência: casos por 100.000 habitantes</div>'		    		
		    	});
		        console.log("tuberculose");
		        break;
		    case "leptospirose":
		        console.log("leptospirose");
		        tcc.getTaxaDiseaseJson({
		        	estado: data.estado,
		        	url: "javascripts/incidencia_leptospirose.json",
		        	alerta: '<div class="alert alert-danger">Incidência de leptospirose - Casos confirmados.</div>'
		        });
		        break;        
		    default:
		        console.log("Erro getDiseaseJson");
		}
	},	
	getIncidenciaTaxaJson: function(params){

		var estado = params.estado,
			tpl = '<div class="alert alert-danger">Taxa de incidência: casos por 100.000 habitantes</div>';

		$.ajax({
			type: "GET",
			url: params.urlTaxa,
			success: function(data){
				
				tpl += '<div class="list-group"><a  class="list-group-item active">Região</a><span class="list-group-item">'+ data[estado].dados[1].value +'</span></div>'
				tpl += '<div class="list-group"><a  class="list-group-item active">Estado</a><span class="list-group-item">'+ data[estado].dados[0].value +'</span></div>'
				tpl += '<div class="list-group"><a  class="list-group-item active">Capital</a><span class="list-group-item">'+ data[estado].dados[2].value +'</span></div>'
				
				for(var i=0; i < data[estado].Regiao_metropolitana.length; i++){	
					tpl += '<div class="list-group"><a  class="list-group-item active">'+ data[estado].Regiao_metropolitana[i].name +'</a><span class="list-group-item">'+ data[estado].Regiao_metropolitana[i].value +'</span></div>'
				}
				
				$('.panel-body').html(tpl);		
			},
			error: function(data){				
				console.log("erro");
			}
		});

		$.ajax({
			type: "GET",
			url: params.urlIncidencia,
			success: function(data){
				
				tpl = '<div class="alert alert-danger">Incidência da febre hemorrágica da dengue - Casos confirmados.</div>'

				tpl += '<div class="list-group"><a  class="list-group-item active">Região</a><span class="list-group-item">'+ data[estado].dados[1].value +' </span></div>'
				tpl += '<div class="list-group"><a  class="list-group-item active">Estado</a><span class="list-group-item">'+ data[estado].dados[0].value +'</span></div>'
				tpl += '<div class="list-group"><a  class="list-group-item active">Capital</a><span class="list-group-item">'+ data[estado].dados[2].value +'</span></div>'
				
				for(var i=0; i < data[estado].Regiao_metropolitana.length; i++){	
					tpl += '<div class="list-group"><a  class="list-group-item active">'+ data[estado].Regiao_metropolitana[i].name +'</a><span class="list-group-item">'+ data[estado].Regiao_metropolitana[i].value +'</span></div>'
				}
				
				$('.panel-body').append(tpl);		
			},
			error: function(data){				
				console.log("erro");
			}
		});
	},
	getTaxaDiseaseJson: function(param){

		var estado = param.estado,
			tpl = param.alerta;

		$.ajax({
			type: "GET",
			url: param.url,
			success: function(data){
				
				tpl += '<div class="list-group"><a  class="list-group-item active">Região</a><span class="list-group-item">'+ data[estado].dados[1].value +'</span></div>'
				tpl += '<div class="list-group"><a  class="list-group-item active">Estado</a><span class="list-group-item">'+ data[estado].dados[0].value +'</span></div>'
				tpl += '<div class="list-group"><a  class="list-group-item active">Capital</a><span class="list-group-item">'+ data[estado].dados[2].value +'</span></div>'
				
				for(var i=0; i < data[estado].Regiao_metropolitana.length; i++){	
					tpl += '<div class="list-group"><a  class="list-group-item active">'+ data[estado].Regiao_metropolitana[i].name +'</a><span class="list-group-item">'+ data[estado].Regiao_metropolitana[i].value +'</span></div>'
				}
				
				$('.panel-body').html(tpl);		
			},
			error: function(data){				
				console.log("erro");
			}
		});
	}
}		
