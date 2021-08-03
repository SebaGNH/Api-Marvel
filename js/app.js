"use strict"

        // Variables y conección
const conexion_api = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=eaa98daf4d86236acb4de698f6808297&hash=c0819d4ad93eb938110b0d68f54532f0';
const contenedor_div = document.getElementById("contenedor_div");     
let contenidoHTML = '';
let contenedor_botones = document.getElementById("contenedor-botones");
const paginacion_div = document.getElementById("paginacion_div");


let txtBuscar = document.getElementById('txtBuscar');
txtBuscar.value = "";

const btn_prev = document.getElementById("btn-prev");
const btn_next = document.getElementById("btn-next");

/* Inicio <-- ApiJson Api ------------------------------------*/
fetch(conexion_api)
.then(res => res.json()) // res = respuesta
.then((ApiJson) => {

    //console.log(ApiJson); //Este contiene todos los datos de la API
    //console.log(ApiJson.data.results); //


    //Variables
    const ApiResultados = ApiJson.data.results;
    //Este clg estoy usando para ver la info completa
    //console.log(ApiResultados); // muestra arreglo de data "objeto Json "> data > results


    let paginaActual = 1;
    let cantidadResultadosPorPagina = 8;


    //Funciones llamadas
    personajesCompleto(ApiResultados,paginaActual,cantidadResultadosPorPagina); 
    configurarPaginacion(ApiResultados,cantidadResultadosPorPagina,paginaActual);



    //Evento Buscador
    txtBuscar.addEventListener('keyup', (e)=> {  
        const nombreBuscado = e.target.value; 
        if (nombreBuscado.length >= 0) {
            buscador(nombreBuscado,ApiResultados);
        } else {
            personajesCompleto(ApiResultados,paginaActual,cantidadResultadosPorPagina); 
        }
    }); 


    function configurarPaginacion(ApiResultados,cantidadResultadosPorPagina,paginaActual){
        paginacion_div.innerHTML ="";
    
        let cantidadPaginas = Math.ceil(ApiResultados.length / cantidadResultadosPorPagina);
        for (let i = 1; i < cantidadPaginas +1; i++) {
            let btn = botonesPaginacion(i,ApiResultados,paginaActual);
            paginacion_div.appendChild(btn);
        }
    
    }
    
    
    function botonesPaginacion(indexArr,ApiResultados,paginaActual){
        let boton = document.createElement('button');
        boton.innerText = indexArr;
        if (paginaActual == indexArr) {
            boton.className = "active";
        }
        boton.addEventListener("click",function(){
            paginaActual = indexArr;
            personajesCompleto(ApiResultados,paginaActual,cantidadResultadosPorPagina); 
    
            let btnAtual = document.querySelector(".active");
            btnAtual.className = "";
            boton.className = "active";
        });
        return boton;
    }
    
    



}); /* Fin <-- ApiJson Api ------------------------------------*/   




//  Funciones

// Listado de personajes
function personajesCompleto(ApiResultados,paginaActual,cantidadResultadosPorPagina){
    contenidoHTML = "";    
    paginaActual--; // se resta uno para que arranque de 0
    let inicio = cantidadResultadosPorPagina * paginaActual;
    let fin = inicio + cantidadResultadosPorPagina;
    let resultadosAMostrar = ApiResultados.slice(inicio,fin); // muestra personajes del N al N

    for (let i = 0; i < resultadosAMostrar.length; i++) {
        const enlace_Link_Heroe = resultadosAMostrar[i].urls[1].url;         
                contenidoHTML += `  
                <div class="contenedor-lista-heroes">                          
                    <div class="contenedor-imagen">
                        <a href="${enlace_Link_Heroe}" target="_blank">
                        <img src="${resultadosAMostrar[i].thumbnail.path}.${resultadosAMostrar[i].thumbnail.extension}" alt="${resultadosAMostrar[i].name}">
                        </a>
                    </div>
                    <div class="contendor-descripcion">
                        <a href="${enlace_Link_Heroe}" target="_blank">
                            <p class="parrafo-nombre">${resultadosAMostrar[i].name}</p>
                        </a>
                    </div>
                </div>
            `;
        }
        return contenedor_div.innerHTML = contenidoHTML; 
}








function personajesCompletoRespaldo(ApiResultados,resultadosPorPagina,paginaActual){
    //var pagination = paginate(conexion_api,pageSize,pageNumber);
    contenidoHTML = "";    
    paginaActual--;
    for (let i = 0; i < ApiResultados.length; i++) {
        
    }            
    for (const superHero of ApiResultados) {
        const enlace_Link_Heroe = superHero.urls[1].url;                      
                contenidoHTML += `  
                <div class="contenedor-lista-heroes">                          
                    <div class="contenedor-imagen">
                        <a href="${enlace_Link_Heroe}" target="_blank">
                            <img src="${superHero.thumbnail.path}.${superHero.thumbnail.extension}" alt="${superHero.name}">
                        </a>
                    </div>
                    <div class="contendor-descripcion">
                        <a href="${enlace_Link_Heroe}" target="_blank">
                            <p class="parrafo-nombre">${superHero.name}</p>
                        </a>
                    </div>
                </div>
            `;
        }
        return contenedor_div.innerHTML = contenidoHTML; 
}










// Funcion buscador
function buscador(nombreBuscado,ApiResultados){
    contenidoHTML = "";
    for (const superHero of ApiResultados) {
        const enlace_Link_Heroe = superHero.urls[1].url; 
        const nombreAPI = superHero.name.toLowerCase();
        const nombreRecibido = nombreBuscado.toLowerCase();
        if(nombreAPI.includes(nombreRecibido)){
            contenidoHTML += `  
                <div class="contenedor-lista-heroes">                          
                    <div class="contenedor-imagen">
                        <a href="${enlace_Link_Heroe}" target="_blank">
                            <img src="${superHero.thumbnail.path}.${superHero.thumbnail.extension}" alt="${superHero.name}">
                        </a>
                    </div>
                    <div class="contendor-descripcion">
                        <a href="${enlace_Link_Heroe}" target="_blank">
                            <p class="parrafo-nombre">${superHero.name}</p>
                        </a>
                    </div>
                </div>
            `;
        }
    }
    return contenedor_div.innerHTML = contenidoHTML;
}
























/* function contenedorBotones(){ // contenedor_botones <-- id div
    const contenedor = `
    <div class="botones">
        <div class="contenedor-atras">
            <button  class="btn-siguiente-anterior" type="button" onclick="consolaPrueba()">Atrás</button>
        </div>
        <div class="contenedor-siguiente">
            <button  class="btn-siguiente-anterior" type="button" onclick="consolaPrueba()">Siguiente</button>
        </div>
    </div>
    `;

    return contenedor_botones.innerHTML = contenedor;

}

function consolaPrueba(){
    console.log("Consola de pruebas");
}
 */


