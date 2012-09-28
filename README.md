<h1>Como usarlo..</h1>
<h2>En el iframe</h2>
<ul>
	<li>Incluir iframe.js (NO requiere Jquery)
	<pre style="word-wrap: break-word; white-space: pre-wrap;">
	&lt;script type="text/javascript" src="iframe.js" &gt;&lt;/script&gt;</pre>
	</li>
</ul>

<h4>Enviando mensajes</h4>
<ul>
	<li>
	   	<p>Cerrar el modal</p>
	<pre style="word-wrap: break-word; white-space: pre-wrap;">
	&lt;script&gt;
		iframeMessenger.post("close");
	&lt;/script&gt;</pre>
	</li>
	<li>
		<p>Remover boton cerrar (cruz)</p>
		<pre style="word-wrap: break-word; white-space: pre-wrap;">
	&lt;script&gt;
		iframeMessenger.post("remove=close");
	&lt;/script&gt;</pre>
	</li>
	<li>
		<p>Remover Loading</p>
		<pre style="word-wrap: break-word; white-space: pre-wrap;">
	&lt;script&gt;
		iframeMessenger.post("remove=loading");
	&lt;/script&gt;</pre>
	</li>
	<li>
		<p>Agregar Loading</p>
		<pre style="word-wrap: break-word; white-space: pre-wrap;">
	&lt;script&gt;
		iframeMessenger.post("add=loading");
	&lt;/script&gt;</pre>
		
	</li>
	<li>
		<p>Resizear con animacion (ancho, alto, animacion,velocidad)</p>
		<pre style="word-wrap: break-word; white-space: pre-wrap;">
	&lt;script&gt;
		iframeMessenger.post("resize=330&250&true&1400");
	&lt;/script&gt;</pre>
	</li>
	<li>
		<p>Resizear sin animacion (ancho,alto)</p>
		<pre style="word-wrap: break-word; white-space: pre-wrap;">
	&lt;script&gt;
		iframeMessenger.post("resize=400&300");
	&lt;/script&gt;</pre>
	</li>
</ul>

<h2>En el parent</h2>

<h4>Links parar abrir el modal:</h4>
<p>Deben tener los siguientes atributos:</p>
<dl>
	<dt>class="iframe-modal"</dt>
	<dd>Selector para identificar si tiene que abrir modal.</dd>

	<dt>data-modal:width="number"</dt>
	<dd>Define el ancho del modal</dd>

	<dt>data-modal:height="number"</dt>
	<dd>Define el alto del modal</dd>

	<dt>data-modal:url="string"</dt>
	<dd>Es la URL que se mostrará en el iframe</dd>

	<dt>data-modal:dinamic="boolean"</dt>
	<dd>Determina si ese modal recibira mensajes. Valores: true || false</dd>
</dl>

<h5>Ejemplo:</h5>
<pre>
&lt;a href="http://mercadolibre.com.ar" target="_blank" class="iframe-modal" data-modal:width="300" data-modal:height="400" data-modal:url="http://www.mercadolibre.com.ar" data-modal:dinamic="true"&gt;Link&lt;/a&gt;
</pre>

<h4>En el JS:</h4>
<ul>
	<li>Incluir parent.js (requiere Jquery)
		<pre style="word-wrap: break-word; white-space: pre-wrap;">
&lt;script type="text/javascript" src="parent.js" &gt;&lt;/script&gt;</pre>
	</li>
	<li>Instanciar los componentes:
	
	<pre style="word-wrap: break-word; white-space: pre-wrap;">
&lt;script&gt;
	iframeMessageCallback.init();
	iframeModal.init(iframeMessageCallback);
&lt;/script&gt;</pre>
	</li>
</ul>

<hr>



<p>Por default se reconocen los 6 mensajes ya explicados. Para escuchar mas mensajes, pueden crearlos con el método "bind" del componente iframeMessageCallback</p>

<h5>Ejemplo:</h5>
<pre>
&lt;script&gt;
	iframeMessageCallback.bind('seLogueo',function() { alert("se logueo"); })
&lt;/script&gt;
</pre>



