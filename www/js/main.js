var url = "http://25.8.54.211/WsActividades/";
var errorServer = "Ocurrió un error consultando los datos del servidor";
var appName = "Programador";
var btnAceptar = "Aceptar";
var debug = true;

$(document).ready(function(){
	$('#nombreApp').innerHtml = appName;

	function getActividades() {
		$(".logo_carga").addClass("active");
		$.ajax({
			url: url + "Actividades/lista/" + localStorage['usuario'],
			method: 'GET',
			dataType: 'JSON',
			success: function(data) {
				var datos = JSON.parse(JSON.stringify(data));
				var i = 0;
				var html = "";
				var color = "";
				while (datos[i]) {
					console.log(datos[i]);
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
					html += '<li class="list_element" id="actividad_' + datos[i].IdActividad + '" data-actividad="' + datos[i].IdActividad + '" data-clasificacion="' + datos[i].IdClasificacion + '" data-fecha="' + datos[i].FechaEjecucion + '"> ' + datos[i].Descripcion + ' <hr id="vertical_' + datos[i].IdActividad + '" class="vertical ' + color + '"/></li>';
					i++;
				}
				$("#tareas_pendientes").html(html);
				$(".logo_carga").removeClass("active");
				
			},
			error: function(error){
				if (debug) {
					alert(errorServer);
				} else {
					navigator.notification.alert(errorServer, null, appName, btnAceptar);	
				}
				$(".logo_carga").removeClass("active");
			}
		});
	}

	if (localStorage['usuario'] != undefined && localStorage['usuario'] != null && localStorage['usuario'] != "") {
		$("#contenedor_principal").addClass('active');
		getActividades();
	} else {
		$("#contenedor_login").addClass('active');
	}

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

	// Crear actividad
	$("#crear_actividad").click(function(){
		var textoDescripcion = $('#descripcion_actividad').val();
		if (textoDescripcion == "") {
			if (debug) {
				alert("Debe ingresar la descripción de la tarea para continuar");
			} else {
				navigator.notification.alert("Debe ingresar la descripción de la tarea para continuar", null, appName, btnAceptar);
			}
		} else {
			$(".logo_carga").addClass("active");

			var data = '{"Descripcion": "' + textoDescripcion + '", "FechaEjecucion": "", "IdActividad": "", "IdClasificacion": "", "IdEstado": "1", "IdUsuario": "' + localStorage['usuario'] + '"}';
	        
	        $.ajax({
				url: url + "Actividades",
				method: 'POST',
				data: { objActividad: data },
				success: function(data){
					var datos = JSON.parse(data);
					var html = '<li class="list_element" id="actividad_' + datos.IdActividad + '" data-actividad="' + datos.IdActividad + '" data-clasificacion="0" data-fecha=""> ' + $('#descripcion_actividad').val() + ' <hr id="vertical_' + datos.IdActividad + '" class="vertical white"/></li>';
					$("#tareas_pendientes").append(html);
					$('#descripcion_actividad').val("");
					$(".logo_carga").removeClass("active");
					$(".modal_background").removeClass("active");
					$(".modal_box").removeClass("active");
				},
				error: function(){
					if (debug) {
						alert(errorServer);
					} else {
						navigator.notification.alert(errorServer, null, appName, btnAceptar);	
					}
					$(".logo_carga").removeClass("active");
				}
			});
		}
	});

	$(document).on("click", ".list_element", function(){
		var actividad = $(this).attr("data-actividad");
		var clasificacion = $(this).attr("data-clasificacion") | 0;
		var fechaEjecucion = $(this).attr("data-fecha");
		var fechaFinal = "";
		var descripcionActividad = $(this).html();

		if (fechaEjecucion != "") {
			var partesFecha = fechaEjecucion.split('/');
			fechaFinal = partesFecha[2] + "-" + partesFecha[1] + "-" + partesFecha[0];
			
			$('#finalizar_actividad').show();
			$('#descartar_actividad').hide();
		} else {
			$('#descartar_actividad').show();
			$('#finalizar_actividad').hide();
		}

		$('#div_descripcion').html(descripcionActividad);
		$('#idActividadGestionar').val(actividad);
		$('#cmbCalificacion').val(clasificacion);
		$('#fecha_ejecucion').val(fechaFinal);

		$("#gestionar_tarea").addClass("active");
		$(".modal_background").addClass("active");
	});

	// Gestionar actividad
	$("#actualizar_actividad").click(function(){
		var descripcion = $('#div_descripcion').html();
		var actividad = $('#idActividadGestionar').val();
		var calificacion = $('#cmbCalificacion').val();
		var fechaEjecucion = $('#fecha_ejecucion').val();

		var partesFecha = fechaEjecucion.split('-');
		var fechaFinal = partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0]; 

		var data = '{"Descripcion": "", "FechaEjecucion": "' + fechaFinal + '", "IdActividad": "' + actividad + '", "IdClasificacion": "' + calificacion + '", "IdEstado": "3", "IdUsuario": "' + localStorage['usuario'] + '"}';
        
        $(".logo_carga").addClass("active");
        $.ajax({
            url: url + "Actividades/actualizar",
            type: "POST",
            data: { objActividad: data },
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
				$("#actividad_" + actividad).attr("data-clasificacion", calificacion);
				$("#actividad_" + actividad).attr("data-fecha", fechaFinal);
				$(".logo_carga").removeClass("active");
				$(".modal_background").removeClass("active");
				$(".modal_box").removeClass("active");
			},
			error: function(){
				if (debug) {
					alert(errorServer);
				} else {
					navigator.notification.alert(errorServer, null, appName, btnAceptar);
				}
				$(".logo_carga").removeClass("active");
			}
        });
	});

	// Descartar actividad
	$("#descartar_actividad").click(function(){
		var actividad = $('#idActividadGestionar').val();
		
		var data = '{"Descripcion": "", "FechaEjecucion": "", "IdActividad": "' + actividad + '", "IdClasificacion": "", "IdEstado": "4", "IdUsuario": "' + localStorage['usuario'] + '"}';
        
        $(".logo_carga").addClass("active");
        $.ajax({
            url: url + "Actividades/actualizar",
            type: "POST",
            data: { objActividad: data },
            success: function(data){
				$("#actividad_" + actividad).remove();
				$(".logo_carga").removeClass("active");
				$(".modal_background").removeClass("active");
				$(".modal_box").removeClass("active");
			},
			error: function(){
				if (debug) {
					alert(errorServer);
				} else {
					navigator.notification.alert(errorServer, null, appName, btnAceptar);
				}
				$(".logo_carga").removeClass("active");
			}
        });
	});

	// Marcar como realizada actividad
	$("#finalizar_actividad").click(function(){
		var descripcion = $('#div_descripcion').html();
		var actividad = $('#idActividadGestionar').val();
		var calificacion = $('#cmbCalificacion').val();
		var fechaEjecucion = $('#fecha_ejecucion').val();

		var partesFecha = fechaEjecucion.split('-');
		var fechaFinal = partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0]; 
		
		var data = '{"Descripcion": "", "FechaEjecucion": "' + fechaFinal + '", "IdActividad": "' + actividad + '", "IdClasificacion": "' + calificacion + '", "IdEstado": "2", "IdUsuario": "' + localStorage['usuario'] + '"}';
        
        $(".logo_carga").addClass("active");
        $.ajax({
            url: url + "Actividades/actualizar",
            type: "POST",
            data: { objActividad: data },
            success: function(data){
				$("#actividad_" + actividad).remove();
				$(".logo_carga").removeClass("active");
				$(".modal_background").removeClass("active");
				$(".modal_box").removeClass("active");
			},
			error: function(){
				if (debug) {
					alert(errorServer);
				} else {
					navigator.notification.alert(errorServer, null, appName, btnAceptar);
				}
				$(".logo_carga").removeClass("active");
			}
        });
	});

	$("#btn_registro").click(function(){
		$("#registro").addClass("active");
		$(".modal_background").addClass("active");
	});

	// Crear nuevo usuario
	$("#registrar_usuario").click(function(){
		var usuarioNuevo = $('#txtUsuarioNuevo').val();
		var passwrodUno = $('#txtPassword').val();
		var passwrodDos = $('#txtConfirmarPassword').val();
		var emailUsuarionuevo = $('#txtEmailUsuarioNuevo').val();

		if (usuarioNuevo != "" && passwrodUno != "" && passwrodDos != "" && emailUsuarionuevo != "") {
			if (passwrodUno == passwrodDos) {
				$(".logo_carga").addClass("active");
		        $.ajax({
		            url: url + "Actividades/actualizar",
		            type: "POST",
		            data: { objActividad: '{"usuario": "' + usuarioNuevo + '", "clave": "' + passwrodUno + '", "email": "' + emailUsuarionuevo + '"}' },
		            success: function(data){
						$(".logo_carga").removeClass("active");
						var datos = JSON.parse(data);
						if (datos.autorizado == 1) {
							localStorage['usuario'] = datos.idUsuario;
							$("#contenedor_principal").addClass('active');
							$("#contenedor_login").removeClass('active');
						} else {
							if (debug) {
								alert(errorServer);
							} else {
								navigator.notification.alert(errorServer, null, appName, btnAceptar);
							}
						}
					},
					error: function(){
						if (debug) {
							alert(errorServer);
						} else {
							navigator.notification.alert(errorServer, null, appName, btnAceptar);
						}
						$(".logo_carga").removeClass("active");
					}
		        });
			} else {
				if (debug) {
					alert("Las contraseñas no coinciden, por favor validar");
				} else {
					navigator.notification.alert("Las contraseñas no coinciden, por favor validar", null, appName, btnAceptar);	
				}
			}
		} else {
			if (debug) {
				alert("Ningún campo debe estar vacío, por favor validar");
			} else {
				navigator.notification.alert("Ningún campo debe estar vacío, por favor validar", null, appName, btnAceptar);	
			}
		}
	});

	// Funcion ingreso app
	$("#btn_login").click(function(){
		var userText = $('#user').val();
		var passwrodText = $('#password').val();

		if (userText != "" && passwrodText != "") {
			$(".logo_carga").addClass("active");
	        $.ajax({
	            url: url + "Actividades/actualizar",
	            type: "POST",
	            data: { objActividad: '{"usuario": "' + userText + '", "clave": "' + passwrodText + '"}' },
	            success: function(data){
					$(".logo_carga").removeClass("active");
					var datos = JSON.parse(data);
					if (datos.autorizado == 1) {
						localStorage['usuario'] = datos.idUsuario;
						$("#contenedor_principal").addClass('active');
						$("#contenedor_login").removeClass('active');
						getActividades();
					} else {
						if (debug) {
							alert("Usuario o contraseña incorrectos");
						} else {
							navigator.notification.alert("Usuario o contraseña incorrectos", null, appName, btnAceptar);
						}
					}
				},
				error: function(){
					if (debug) {
						alert(errorServer);
					} else {
						navigator.notification.alert(errorServer, null, appName, btnAceptar);
					}
					$(".logo_carga").removeClass("active");
				}
	        });
		} else {
			if (debug) {
				alert("Valida tus datos de ingreso");
			} else {
				navigator.notification.alert("Valida tus datos de ingreso", null, appName, btnAceptar);	
			}
		}
	});

});