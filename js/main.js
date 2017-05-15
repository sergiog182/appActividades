var url = "https://jsonplaceholder.typicode.com";
var errorServer = "Ocurrio un error consultando los datos del servidor";

$(document).ready(function(){
	$(".logo_carga").addClass("active");

	$.ajax({
		url: url + "/users",
		method: 'GET',
		success: function(data){
			var datos = JSON.parse(JSON.stringify(data));
			var i = 0;
			var html = "";
			while (datos[i]) {
				html += '<li class="list_element"> ' + datos[i].name +  ': ' + datos[i].username + ' <hr class="vertical red"/></li>';
				i++;
			}
			$("#tareas_pendientes").html(html);
			$(".logo_carga").removeClass("active");
			
		},
		error: function(){
			alert(errorServer);
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

	$("#crear_actividad").click(function(){
		if ($('#descripcion_actividad').val() == "") {
			alert("Debe ingresar la descripcion de la tarea para continuar");
		} else {
			var html = '<li class="list_element"> ' + $('#descripcion_actividad').val() + ' <hr class="vertical red"/></li>';
			$("#tareas_pendientes").append(html);
			$('#descripcion_actividad').val("");
			$(".modal_background").removeClass("active");
			$(".modal_box").removeClass("active");
		}
	});
});