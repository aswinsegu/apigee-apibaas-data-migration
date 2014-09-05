var config = require('./config.js');
var base_url = config.uri + '/' + config.org + '/' + config.app +'/';
var request = require('request');
var fs = require('fs');
var data = {} ;

function getAllCollections (){
	request( base_url , function (err, response , body) {
		if( !err && response.statusCode ==200){
			var b = JSON.parse(body);
			var collections = b.entities[0].metadata.collections;
			for(var c in collections ){
				if(c == 'roles') continue;
				cleanup(c , collections[c].count);	
			}
			
		}
	}) ; 
}


function cleanup (c , count) {
	var url = base_url + c + '?limit=1000';
	request.del( url , function(err, response, body) {
		console.log(response.statusCode) ;
		count = count - 1000 ;
		if ( count > 0 ){
			cleanup (c, count);
		}else{
			console.log( c + ' cleanedup') ;
		}
	});
}

getAllCollections () ;