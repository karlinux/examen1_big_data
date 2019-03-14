document.onkeypress = oprimir_tecla;
var imagenes = document.getElementsByTagName('img');// Obtenemos las imágenes
var display = document.getElementById('display');// Obtenemos el display lo guardamos en una variable
var ContenidoDisplay = document.getElementById('display').innerText;//Obtenemos el contenido thead-default display
var guardarPunto = false;
var signo = false;
var numero = 0;

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
  ContenidoDisplay = document.getElementById('display').innerText;
  //Convierte los numeros en el display a un array
  arregloDisplay = Array.from(ContenidoDisplay);
  //alert(seleccion + "  " + dis.indexOf("."));
  if(guardarPunto){
    seleccion = "." + seleccion;
    guardarPunto = false;
  }
  // Esta parte es para evitar que se pongan mas de un punto enla calculadora
  if(ContenidoDisplay.indexOf(".") != -1 && seleccion == "punto"){
    seleccion = "nada";
  }
console.log(seleccion);
//Esta parte coloca los numeros en el display solo numeros y el punto
  if((seleccion>=0 && seleccion<10) || seleccion=="punto"){
    display.innerHTML =   displays(seleccion);
  }else if(seleccion == "on"){
    display.innerHTML = "0";
  }else if(seleccion=="sign" && ContenidoDisplay!="0"){
    display.innerHTML =   signos(seleccion);
  }else if(seleccion == "por"){
    display.innerHTML =   calcular("*");
  }else if(seleccion == "dividido"){
    display.innerHTML =   calcular("/");
  }else if(seleccion == "menos"){
    display.innerHTML =   calcular("-");
  }else if(seleccion == "mas"){
    display.innerHTML =   calcular("+");
  }else if(seleccion == "igual"){

    display.innerHTML = igual();
  }
}

//Esta funcion guarda el primer resultado y el signo de operaciones que se va a ejecutaar
function calcular(operacion){
  var calcular = {
    numero: ContenidoDisplay,
    operacion: operacion
  }
  localStorage.setItem('calcular', JSON.stringify(calcular));
  return 0;

}

function igual(){
  var calcular = JSON.parse(localStorage.getItem('calcular'));
  switch(calcular.operacion){
    case "*":
    numero = Number(calcular.numero) * Number(ContenidoDisplay);
    break;
    case "/":
    numero = Number(calcular.numero) / Number(ContenidoDisplay);
    break;
    case "-":
    numero = Number(calcular.numero) - Number(ContenidoDisplay);
    break;
    case "+":
    numero = Number(calcular.numero) + Number(ContenidoDisplay);
    break;
  }


  if(arregloDisplay.length>8){
    numero = parseFloat(numero);
    numero = numero.toExponential(4);
  }
  return numero;
  }
//Funcion para los numeros y punto mostrados en el display ----------
function displays(seleccion){
  //Guarda un punto para que se le asigne antes al siguiente número
  if(seleccion == "punto"){
    guardarPunto = true;
  }else{
      //Convierte en flotante el exponencial extraido del display
      if(arregloDisplay.length>7){
        ContenidoDisplay = parseFloat(ContenidoDisplay);
      }
      //Concatena la cadena que ya existia con el numero presionado

      numero = ContenidoDisplay+seleccion;


      if(ContenidoDisplay=="0"){
        //Elimina el primer cero convirtiendo a número el texto extraido del display
        numero = parseFloat(numero);
      }
  }
  //Muestra el múmero en el display
  if(arregloDisplay.length>7){
    numero = parseFloat(numero);
    numero = numero.toExponential(4);
  }

  return numero
}

//Funcion que agrega o quita el signo cuando se presiona la tecla
function signos(){
  if(signo){
    // Elimina el signo -
    numero = remplazar(ContenidoDisplay);
    signo = false
    console.log(ContenidoDisplay);
  }else{
    //Convierte el número en negativo o agrega el signo
    numero = "-" + ContenidoDisplay;
    signo = true
  }
  return numero;
}
//Función para eliminar el signo -
function remplazar(str){
  var str = str.replace("-", "")
  return str;
}

//Funcion guarda el primer numero que se encuentra en el display y el operador con el que se hara la operacion
function calcular(operacion){
  var calcular = {
    numero: ContenidoDisplay,
    operacion: operacion
  }
  //Guarda en un local storage el primer numero que se encuentra en el display y el operador
  localStorage.setItem('calcular', JSON.stringify(calcular));
  
  return "0";
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
    ContenidoDisplay = document.getElementById('display').innerText;
    seleccion = String.fromCharCode(tecla);

      seleccion = entradaTeclado(seleccion);
    document.getElementById(seleccion).style = "filter: blur(5px); -webkit-filter:blur(5px)"
    timeout(seleccion);
}
/*Funcion le quita el blur a la imagen ya que al poner division es una función
de buscra del firefox y me la deja oprimida y me abre el buscador por eso le puse mejor un temporizador */
function timeout(seleccion){
  setTimeout(function(){
      document.getElementById(seleccion).style="filter: blur(0px); -webkit-filter:blur(0px)";
  },500,"JavaScript");
}


//Convierte el caractér del teclado en el id de la imagen
function entradaTeclado(seleccion){
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
