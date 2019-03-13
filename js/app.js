document.onkeypress = oprimir_tecla;
document.onkeyup = soltar_tecla;
var imagenes;
var imagenes = document.getElementsByTagName('img');// Obtenemos las imágenes
var display = document.getElementById('display');// Obtenemos el display lo guardamos en una variable
var dis = document.getElementById('display').innerText;//Obtenemos el contenido thead-default display

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
  dis = document.getElementById('display').innerText;
  arreglo = Array.from(dis);
  if((seleccion>=0 && seleccion<10) || seleccion=="punto"){


    if(seleccion == "punto"){
      verdadero = true;
    }else{
        //Convierte en flotante el exponencial extraido del display
          console.log(dis);
          dis = parseFloat(dis);
        numero = dis+seleccion;


        if(dis=="0"){
          //Elimina el primer cero convirtiendo a número el texto extraido del display
          numero = Number(numero);
        }
    }

    display.innerHTML =   numero;
  }
}

//Funcion se le asigna a los botones para cuando se suelta la imagen
function mouseUp(event){
  var seleccion = event.currentTarget.id;
  document.getElementById(seleccion).style = "filter: blur(0px); -webkit-filter:blur(0px)"
  //document.getElementById(seleccion).style = "width: 22%;"
}

//Funcion le hace un blur a la imagen cuando se teclea
function oprimir_tecla(event){
    var tecla = event.which || event.keyCode;
    seleccion = String.fromCharCode(tecla);
      console.log(seleccion);
      seleccion = entradaTeclado(seleccion);
    document.getElementById(seleccion).style = "filter: blur(5px); -webkit-filter:blur(5px)"
}
//Funcion le quita el blur a la imagen cuando se suelta
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
