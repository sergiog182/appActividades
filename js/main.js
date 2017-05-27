//var url = "http://25.8.54.211/WsActividades/";
//var url = "https://jsonplaceholder.typicode.com";
var url = "http://localhost/WsActividades/";
var errorServer = "Ocurrio un error consultando los datos del servidor";

function test(data)
{
	alert(data);
}

$(document).ready(function(){
	$(".logo_carga").addClass("active");

	$.ajax({
		url: url + "Actividades/lista/1",
		//url: url + "/users",
		method: 'GET',
		dataType: 'JSON',
		success: function(data){
			alert("Aqui");
			var datos = JSON.parse(data);
			//var datos = JSON.parse(JSON.stringify(data));
			var i = 0;
			var html = "";
			var color = "";
			while (datos[i]) {
				switch(datos[i].IdClasificacion) {
					case "1": color = "red";
							break;
					case "2": color = "green";
							break;
					case "3": color = "yellow";
							break;
					case "4": color = "blue";
							break;
					default: color = "white";
							break;
				}
				html += '<li class="list_element" data-actividad="' + datos[i].IdActividad + '"> ' + datos[i].Descripcion + ' <hr class="vertical ' + color + '"/></li>';
				i++;
			}
			$("#tareas_pendientes").html(html);
			$(".logo_carga").removeClass("active");
			
		},
		error: function(error){
			alert(errorServer);
			console.log(error);
			$(".logo_carga").removeClass("active");
		}
	});

	$(".close_dialog").click(function(){
		$(".modal_background").removeClass("active");
		$(".modal_box").removeClass("active");
	});

	$("#nueva_actividad_button").click(function(){
		$("#nueva_actividad").addClass("active");
		$(".modal_background").addClass("active");
	});

	$("#nueva_info_aplicacion").click(function(){
		$("#nosotros").addClass("active");
		$(".modal_background").addClass("active");
	});

	$("#crear_actividad").click(function(){
		if ($('#descripcion_actividad').val() == "") {
			alert("Debe ingresar la descripcion de la tarea para continuar");
		} else {
			/*$.ajax({
				url: url + "/AgregarActividad",
				method: 'POST',
				data: {"Descripcion": "Tarea de Prueba", "FechaEjecucion": "", "IdActividad": "1", "IdClasificacion": "1", "IdEstado": "1", "IdUsuario": "1"},
				success: function(data){
					var datos = JSON.parse('');
					var i = 0;
					var html = "";
					var color = "";
					while (datos[i]) {
						switch(datos[i].IdClasificacion) {
							case "1": color = "red";
									break;
							case "2": color = "green";
									break;
							case "3": color = "yellow";
									break;
							case "4": color = "blue";
									break;
							default: color = "white";
									break;
						}
						html += '<li class="list_element"> ' + datos[i].Descripcion + ' <hr class="vertical ' + color + '"/></li>';
						i++;
					}
					$("#tareas_pendientes").html(html);
					$(".logo_carga").removeClass("active");
					
				},
				error: function(){
					alert(errorServer);
					$(".logo_carga").removeClass("active");
				}
			});*/
			var html = '<li class="list_element"> ' + $('#descripcion_actividad').val() + ' <hr class="vertical white"/></li>';
			$("#tareas_pendientes").append(html);
			$('#descripcion_actividad').val("");
			$(".modal_background").removeClass("active");
			$(".modal_box").removeClass("active");
		}
	});

	$(document).on("click", ".list_element", function(){
		var actividad = $(this).data("actividad");
		$("#gestionar_tarea").addClass("active");
		$(".modal_background").addClass("active");
	});

});