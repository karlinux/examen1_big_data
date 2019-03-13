document.onkeypress = oprimir_tecla;
document.onkeyup = soltar_tecla;
var imagenes;
imagenes = document.getElementsByTagName('img');// Obtenemos las imágenes

//El ciclo for les activa la función a las imagenes de on mousedown and onmouseup
for(var i=0; imagenes.length; i++){
imagenes[i].onmousedown = mouseDown;
imagenes[i].onmouseup = mouseUp;
}

//Funcion se le asigna a los botones para cuando se presiona la imagen
function mouseDown(event){
  var seleccion = event.currentTarget.id;
  //document.getElementById(seleccion).style = "width: 21%;"
  document.getElementById(seleccion).style = "filter: blur(5px); -webkit-filter:blur(5px)"
}

//Funcion se le asigna a los botones para cuando se suelta la imagen
function mouseUp(event){
  var seleccion = event.currentTarget.id;
  document.getElementById(seleccion).style = "filter: blur(0px); -webkit-filter:blur(0px)"
  //document.getElementById(seleccion).style = "width: 22%;"
}

function oprimir_tecla(event){
    var tecla = event.which || event.keyCode;
    seleccion = String.fromCharCode(tecla);
      console.log(seleccion);
      seleccion = entradaTeclado(seleccion);
    document.getElementById(seleccion).style = "filter: blur(5px); -webkit-filter:blur(5px)"
}

function soltar_tecla(event){
    seleccion = entradaTeclado(seleccion);
    //Al dejar de presionar le quita el blur a la tecla la tecla / dividir no funciona en firefox me sale buscar en chrome funciona bien
    document.getElementById(seleccion).style = "filter: blur(0px); -webkit-filter:blur(0px)"
}

//Convierte el caractér del teclado en el id de la imagen
function entradaTeclado(seleccion){
  console.log(seleccion);
  switch(seleccion){
    case "*":
    seleccion = "por";
    break;
    case "+":
    seleccion = "mas";
    break;
    case "-":
    seleccion = "menos";
    break;
    case "/":
    seleccion = "dividido";
    break;
    case "=":
    seleccion = "igual";
    break;
    case "o":
    seleccion = "on";
    break;
    case "s":
    seleccion = "sign";
    break;
    case ".":
    seleccion = "punto";
    break;
    default:
    seleccion
  }
  return seleccion;
}
