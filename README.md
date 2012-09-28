<h1>Post-Message</h1>

<h3>Como usarlo:</h3>

<h4>En el HTML:</h4>

<p>Los links que abren los modales deben tener los siguientes atributos:</p>
<dl>
	<dt>class="iframe-modal"</dt>
	<dd>Selector para identificar si tiene que abrir el modal.</dd>

	<dt>data-modal:width="number"</dt>
	<dd>Define el ancho del modal</dd>

	<dt>data-modal:height="number"</dt>
	<dd>Define el alto del modal</dd>

	<dt>data-modal:url="string"</dt>
	<dd>Es la URL que se mostrará en el iframe</dd>

	<dt>data-modal:dinamic="boolean"</dt>
	<dd>Determina si ese modal recibira mensajes</dd>
</dl>

<h4>En el JS:</h4>
<ul>
	<li>Incluir parent.js (requiere Jquery)</li>
	<li>Instanciar los componentes:
		<ul>
			<li>iframeMessageCallback.init();</li>
			<li>iframeModal.init(iframeMessageCallback);</li>
		</ul>
	</li>
</ul>

<h4>En el Iframe:</h4>

<p>Se debe incluir iframe.js (No requiere Jquery)</p>

<h4>Enviando mensajes</h4>
<ul>
	<li>
	    <p>Para cerrar el modal</br>
		iframeMessenger.post("close");</p>
	</li>
	<li>
		<p>Remover boton cerrar (cruz)</br>
		iframeMessenger.post("remove=close");</p>
	</li>
	<li>
		<p>Remover Loading</br>
		iframeMessenger.post("remove=loading");</p>
	</li>
	<li>
		<p>Agregar Loading</br>
		iframeMessenger.post("add=loading");</p>
	</li>
	<li>
		<p>Resizear con animacion (ancho, alto, animacion,velocidad)</br>
		iframeMessenger.post("resize=330&250&true&1400");</p>
	</li>
	<li>
		<p>Resizear sin animacion (ancho,alto)</br>
		iframeMessenger.post("resize=400&300");</p>
	</li>
</ul>