$(document).ready(function(){
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
			alert("NO");
		} else {
			alert("SI");
		}
	});
});