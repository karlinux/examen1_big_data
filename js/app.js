document.onkeypress = oprimir_tecla;
document.onkeyup = soltar_tecla;
var imagenes;
var imagenes = document.getElementsByTagName('img');// Obtenemos las imágenes
var display = document.getElementById('display');// Obtenemos el display lo guardamos en una variable
var dis = document.getElementById('display').innerText;//Obtenemos el contenido thead-default display
var verdadero = false;

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
  //Convierte los numeros en el display a un array
  arregloDisplay = Array.from(dis);

  //Aquí deja agregar un punto nada más
  if(verdadero){
    seleccion = "." + seleccion;
    verdadero = false;
  }
  if(dis.indexOf(".") != -1 && seleccion == "punto"){
    seleccion = "nada";
  }
  if((seleccion>=0 && seleccion<10) || seleccion=="punto"){
    if(seleccion == "punto"){
      //Aqui lo hace verdadero y se queda guardado el punto para el siguiente numero ingresado ambos se puedan concatenar
      verdadero = true;
    }else{
        //Convierte en flotante el exponencial extraido del display
        if(arregloDisplay.length>7){
          dis = parseFloat(dis);
        }
        //Concatena la cadena que ya existia con el numero presionado
        numero = dis+seleccion;

        if(dis=="0"){
          //Elimina el primer cero convirtiendo a número el texto extraido del display
          numero = parseFloat(numero);
        }
    }
    //Muestra el múmero en el display si es mas de 7 caracteres lo convierte a exponencial
    if(arregloDisplay.length>7){
      numero = parseFloat(numero);
      numero = numero.toExponential(4);
    }
    display.innerHTML =   numero;
  }else if(seleccion == "on"){ //Pone a cero el display de la calculadora
    display.innerHTML = "0";
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
    dis = document.getElementById('display').innerText;
    seleccion = String.fromCharCode(tecla);
      console.log(seleccion);
      seleccion = entradaTeclado(seleccion);
    document.getElementById(seleccion).style = "filter: blur(5px); -webkit-filter:blur(5px)"
    timeout(seleccion);
}
//Funcion le quita el blur a la imagen cuando se suelta

function timeout(seleccion){
  setTimeout(function(){
      document.getElementById(seleccion).style="filter: blur(0px); -webkit-filter:blur(0px)";
  },500,"JavaScript");
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
