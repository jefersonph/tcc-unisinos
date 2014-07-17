var tcc = {
	//http://localhost:4000/javascripts/estados.json
	estados: function(i){
		var tpl = "";
		$.get( "http://localhost:4000/javascripts/estados.json", function( data ) {
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
			
			console.log(data[i].Nome);
			console.log(tpl);

			$('.panel-body').html( tpl );
		});		
	
	},
	getParameterByName: function (name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}		
