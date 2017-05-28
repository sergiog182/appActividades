var url = "http://25.8.54.211/WsActividades/";
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
		success: function(data) {
			var datos = JSON.parse(JSON.stringify(data));
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
				html += '<li class="list_element" data-actividad="' + datos[i].IdActividad + '" data-clasificacion="' + datos[i].IdClasificacion + '" data-fechaEjecucion="' + datos[i].FechaEjecucion + '"> ' + datos[i].Descripcion + ' <hr id="vertical_' + datos[i].IdActividad + '" class="vertical ' + color + '"/></li>';
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
		var textoDescripcion = $('#descripcion_actividad').val();
		if (textoDescripcion == "") {
			alert("Debe ingresar la descripcion de la tarea para continuar");
		} else {
			$(".logo_carga").addClass("active");
			$.ajax({
				url: url + "Actividades",
				method: 'POST',
				contentType: "application/json; charset=utf-8",
				data: {"Descripcion": textoDescripcion, "FechaEjecucion": "", "IdActividad": 0, "IdClasificacion": "", "IdEstado": "", "IdUsuario": "1"},
				success: function(data){
					var datos = JSON.parse(JSON.stringify(data));
					var html = '<li class="list_element" data-actividad="' + datos.IdActividad + '" data-clasificacion="0" data-fechaEjecucion=""> ' + $('#descripcion_actividad').val() + ' <hr id="vertical_' + datos.IdActividad + '" class="vertical white"/></li>';
					$("#tareas_pendientes").append(html);
					$('#descripcion_actividad').val("");
					$(".logo_carga").removeClass("active");
					$(".modal_background").removeClass("active");
					$(".modal_box").removeClass("active");
				},
				error: function(){
					alert(errorServer);
					$(".logo_carga").removeClass("active");
				}
			});
		}
	});

	$(document).on("click", ".list_element", function(){
		var actividad = $(this).data("actividad");
		var clasificacion = $(this).data("clasificacion") | 0;
		var fechaEjecucion = $(this).data("fechaEjecucion");
		var descripcionActividad = $(this).html();

		console.log(descripcionActividad);

		$('#div_descripcion').html(descripcionActividad);
		$('#idActividadGestionar').val(actividad);
		$('#cmbCalificacion').val(clasificacion);
		$('#fecha_ejecucion').val(fechaEjecucion);

		$("#gestionar_tarea").addClass("active");
		$(".modal_background").addClass("active");
	});

	$("#actualizar_actividad").click(function(){
		var descripcion = $('#div_descripcion').innerHTML;
		var actividad = $('#idActividadGestionar').val();
		var calificacion = $('#cmbCalificacion').val();
		var fechaEjecucion = $('#fecha_ejecucion').val();

		switch(calificacion) {
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
		console.log('{"Descripcion": "' + descripcion + '", "FechaEjecucion": "' + fechaEjecucion + '", "IdActividad": "' + actividad + '", "IdClasificacion": "' + calificacion + '", "IdEstado": "1", "IdUsuario": "1"}');
		document.getElementById("vertical_" + actividad).className = "vertical " + color;
		$(".logo_carga").removeClass("active");
		$(".modal_background").removeClass("active");
		$(".modal_box").removeClass("active");
		/*
		$.ajax({
			url: url + "Actividades",
			method: 'PUT',
			data: {"Descripcion": descripcion, "FechaEjecucion": fechaEjecucion, "IdActividad": actividad, "IdClasificacion": calificacion, "IdEstado": "1", "IdUsuario": "1"},
			success: function(data){
				var color = "";
				switch(calificacion) {
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
				document.getElementById("vertical_" + actividad).className = "vertical " + color;
				$(".logo_carga").removeClass("active");
				$(".modal_background").removeClass("active");
				$(".modal_box").removeClass("active");
			},
			error: function(){
				alert(errorServer);
				$(".logo_carga").removeClass("active");
			}
		});*/
	});

});