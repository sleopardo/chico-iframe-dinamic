/*
 * iframeMessageCallback: Componente encargado de:
 	* Escuchar los mensajes por defecto
 	* Ejecutar la accion
 	* Ampliar el mapa de mensajes/funciones que viene por defecto
*/
var iframeMessageCallback = (function() {

	var
		/*
		 * @private
		 * variable para almacenar localmente al modal creado en el componente "iframeModal"
		*/
		_modal,

	    /*
		 * @private
		 * Mapa de mensajes por default
		 	* resize
		 	* close
		 	* add
		 	* remove
		*/
		map = {

			/*
			 * Funcion para resizear el modal
			 * Params:
				* width: number
				* height: number
				* animate: boolean
				* speed: number
			*/
			resize: function (width,height,animate,speed) {

				var speed = parseInt(speed) || "normal";

				if(animate == "true"){

					$(".ch-modal").animate({
						"width": width,
						"height": height
					},{
						duration: speed,
						step: function(){
							_modal.position("refresh");
						}
					});

				}else{

					_modal.width(width).height(height).position("refresh");

				}

			},

			/*
			 * Funcion para cerrar el modal
			*/
			close: function (){

				_modal.hide();

			},

			/*
			* Funcion para remover el "Loading" o el "link de cerrar"
			 * Params:
				* element: string ("loading" | "close")
			*/
			remove: function(element){

				switch(element){

					case "loading":
						$(".ch-modal iframe").attr("style",'');
						break;

					case "close":
						$(".ch-modal .ch-close").hide();
						break;

				}

			},

			/*
			 * Funcion para agregar el Loading al modal
			 * Params:
				* element: string ("loading")
			*/
			add: function(element){

				var styles = $(".ch-modal iframe").attr("data-css");

				$(".ch-modal iframe").attr("style",styles);

			}

		};

    /*
	 * @private
	 * Funcion para decodificar mensajes y llamar a la funcion correspondiente dentro de "map"
	 * Params:
		* message: string
	*/
	function messageHandler(message){

		message = message.data.split("=");

		var method = map[message[0]];

		var arguments = [];

		if( typeof method != 'undefined' ){

			if(message[1]){

				var messageArray = message[1].split("&");
				var i;

				for( i = 0; messageArray.length > i; i++){

					arguments.push(messageArray[i]);

				}

			}

			method.apply(this, arguments);
		}

	}

	/*
	 * @public
	 * Funcion para agregar mensajes personalizados dentro del mapa de funciones
	 * Params:
		* message: string (nombre del mensaje que se recibirá)
		* f: Funcion que se ejecutará
	 * Eg: iframeMessageCallback.bind('logged',function() { alert("user was logged"); })
	*/
	function bind(message,f){

		map[message] = f ;

	}

	/*
	 * @public
	 * Funcion para empezar a escuchar los mensajes
	*/
	function init(){

		if (window.postMessage){


			if(typeof window.addEventListener != 'undefined'){

			    window.addEventListener('message', messageHandler, false);

			}
			else if(typeof window.attachEvent != 'undefined'){

			    window.attachEvent('onmessage', messageHandler);

			}

		}

		return this;

	}

	/*
	 * @public
	 * Funcion para pisar la variable modal definida anteriormente.
	 * Params:
	 	* modal: Referencia al modal que se quiere modificar
	*/
	function setModal(modal){

		_modal = modal;

	}

    return{
    	bind:bind,
    	init:init,
    	setModal:setModal
    }

})();

/*
 * Fin iframeMessageCallback
*/




/*
 * iframeModal: Componente encargado de:
 	* Crear un unico modal
 	* Cargar el iframe correspondiente cada vez que se muestra
 	* Agregar la URL parent al iframe si es necesario
*/
var iframeModal = (function() {

	var
		/*
		 * @private
		 * Crea el modal
		*/
		_modal = $("<a>").modal({
			closable: "button",
			onShow: function(){
				$(".ch-modal .ch-close").show();
				$(".ch-dimmer").one("click",function(){
					_modal.hide();
				})

			},
			onHide: function(){
				$("#modal-iframe").attr("src","about:blank");
			}
		}),

		/*
		 * @private
		 * Variable para guardar localmente el componente "iframeMessageCallback"
		*/
		_iframeMessageCallback,

		/*
		 * @private
		 * Estilos del loading para el iframe
		*/
		_iframeStyles = "background-image: url(data:image/gif;base64,R0lGODlhLAAsAPECAMXe/zNmzAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwACACwAAAAALAAsAAACkpSPmcGhD2NsTdq7qMPcgA8g2uaBnQKaxnik34m44UHFLtzeloyX6cXrCX4YovB4MiJzL5RuOXwyVdCgTYm0TptV6RR6nYHH5LIZezZpy7I1ue19w6npH5pNN+v3/F1+eecm5CbYQxg3GFeII3h35NjH+AcBCYSYsOhX6TNZJKWUKWE1eunJFQXamVVap6q3GVEAACH5BAUHAAIALBMAAAAPAAkAAAIbFA6iy4gM3YFNsoCDsSrnPS0eRolj2Z2o4AkFACH5BAUHAAIALBwAAwANAA0AAAIbFA6iq4i83IFNUmOvu7zDAAZcGF4kaJ4pOZYFACH5BAUHAAIALCMACgAJAA8AAAIcFA6ihrftFEwSLhav3ryvAAZXGH6kqJyooI5lAQAh+QQFBwACACwjABMACQAPAAACG5QFCYea556Ja0bmmN6chx8wIHiMX2mio0geBQAh+QQFBwACACwcABwADQANAAACHJRvoIC429JjcdJmo1S6hx944KeNZGSGqCmeUQEAIfkEBQcAAgAsEwAjAA8ACQAAAhqUj6CALbvcgUqEGxLFeG6eeRUYSqR0cKhRAAAh+QQFBwACACwKACMADwAJAAACG1QeosuIDN2BTTKAgbEq5z0tHkaJY9mdqOAJBQAh+QQFBwACACwDABwADQANAAACG1QeoquIvNyBTVJjr7u8QwACXBheJGieKTmWBQAh+QQFBwACACwAABMACQAPAAACHFQeooa37RRMEi4Wr968LwACVxh+pKicqKCOZQEAIfkEBQcAAgAsAAAKAAkADwAAAhuUFRmHmueeiWtG5pjenIMPMCB4jF9poqNIHgUAIfkEBQcAAgAsAwADAA0ADQAAAhyUb6GBuNvSY3HSZqNUuoMPeOCnjWRkhqgpnlEBADs=); background-position:50% 50%; background-repeat:no-repeat;";



	/*
	 * @private
	 * Recupera los atributos data del link clickeado y abre el modal con esos valores y mata el evento.
	*/
	function open(event){

	    // Recupero los datos del link
	    var that = $(this),
	        dinamic = that.attr("data-modal:dinamic") == "true",
	        width = that.attr("data-modal:width"),
	        height = that.attr("data-modal:height"),
	        url = that.attr("data-modal:url");
	
	
	    if (!dinamic || (window.postMessage && dinamic)){
	
	        // Seteo tamaños, contenido y muestro el modal
	        
	        _modal.content(buildIframe(url,dinamic,width,height));
	        _modal.show();
	        _modal.width(width + "px");
	        _modal.height(height + "px");
	
	        // Inicializo iframeModalMessage solo si es necesario
	        if( iframeMessageCallback != null ){
	
	            iframeMessageCallback.setModal(_modal);
	        }
	
	        event.preventDefault();
	
	    }
	
	}   

	/*
	 * @public
	 * Crea y devuelve un iframe para ser usado en la construccion del modal
	 * Params:
	 	* url: string
	 	* dinamic: boolean
	 * Return:
	 	* string
	*/
	function buildIframe(url,dinamic){

		if(dinamic == undefined){
			dinamic = false;
		};

		// Si el link clickeado tiene data-modal:dinamic="true" agrego la url parent al final de la url del iframe para poder enviar mensajes
    	if( dinamic ){
    		if ( url.indexOf('?') == -1){
    			url += "?";
    		}
    		url += "&parent_url=" + encodeURIComponent(window.location);
    	}

		return "<iframe id=\"modal-iframe\" src=\"" + url + "\" width=\"100%\" height=\"100%\" data-css=\"" + _iframeStyles + "\" scrolling=\"auto\" frameborder=\"0\" style=\"" + _iframeStyles + "\"></iframe>";

	}

	/*
	 * @public
	 * Recibe el componente iframeMessageCallback y lo guarda en la variable ya creada anteriormente.
	 * Bindea el evento click a todos los elementos con class="iframe-modal"
	 * Params:
	 	* iframeMessageCallback
	*/
	function init(iframeMessageCallback) {

		_iframeMessageCallback = iframeMessageCallback;

		// Bindeo evento en links que levantaran el modal
		$(".iframe-modal").bind("click",open);
	}

	return {
		init:init,
		buildIframe:buildIframe
	}

}());

/*
 * Fin iframeModal
*/
