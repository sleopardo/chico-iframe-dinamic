/*
 * iframeMessenger: Componente encargado de:
 	* Obtener url parent
 	* Enviar postMessage
*/
var iframeMessenger = (function(){

	/*
	 * @private
	 * Obtener url parent
	*/
	var parentUrl = (function(){

		var regex = /parent_url=([^&]*)/g
			result = regex.exec(document.location.search),
			parentUrl = null;

		if(result != null && result.length == 2){
			parentUrl = decodeURIComponent(result[1]);
		}

		return parentUrl;

	})(),

	/*
	 * @public
	 * Enviar mensaje al parent
	 * Params:
	 	* message: string
	*/
	post = function(message){

		if(parentUrl != null){

			window.parent.postMessage(message,parentUrl);

		}

	};

	return {
		post: post
	}

})();