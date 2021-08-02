"use strict"
/* "use strict"
const RenderDOM = {
    render: () => { */
        // Variables y conección
        const conexion_api = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=eaa98daf4d86236acb4de698f6808297&hash=c0819d4ad93eb938110b0d68f54532f0';
        const contenedor_div = document.getElementById("contenedor_div");     
        let contenidoHTML = '';
        let contenedor_botones = document.getElementById("contenedor-botones");
        const paginacion_div = document.getElementById("paginacion_div");
        //const noImg = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";


        let txtBuscar = document.getElementById('txtBuscar');
        txtBuscar.value = "";

        const btn_prev = document.getElementById("btn-prev");
        const btn_next = document.getElementById("btn-next");
        //btn_prev.disabled = false;
        //btn_next.disabled = false;


        
        
        /* Inicio <-- Paginación ------------------------------------*/
        let pageNumber = 1;
        let pageSize = 5;
        let pagination;
        let pageCont = Math.ceil(conexion_api.length/pageSize);
        /*-- Fin  <-- Paginación ------------------------------------*/
        

        /* Inicio <-- ApiJson Api ------------------------------------*/
        fetch(conexion_api)
        .then(res => res.json()) // res = respuesta
        .then((ApiJson) => {

            //console.log(ApiJson); //Este contiene todos los datos de la API
            //console.log(ApiJson.data.results); //


            //Variables
            const ApiResultados = ApiJson.data.results;
            console.log(ApiResultados); // muestra arreglo de data "objeto Json "> data > results


            //Funciones llamadas
            personajesCompleto(ApiResultados); 




            //Eventos
            txtBuscar.addEventListener('keyup', (e)=> {  
                const nombreBuscado = e.target.value; 
                if (nombreBuscado.length >= 0) {
                    buscador(nombreBuscado,ApiResultados);
                } else {
                    personajesCompleto(ApiResultados); 
                }
            }); 

            contenedorBotones();


            function paginate(array, page_size, page_number) {
                return array.slice((page_number - 1) * page_size, page_number * page_size);
            }
            function nextPage(){
                pageNumber ++;
                console.log("next page");
                //showNoticias(pagination)
            }
            function previusPage(){
                console.log("Prev Page");
                pageNumber --;
                //showNoticias(pagination)
            }

            /* Inicio <-- Contenedor Botones ------------------------------------*/
                
            /*-- Fin  <-- Contenedor Botones ------------------------------------*/





        })     /* Fin <-- ApiJson Api ------------------------------------*/   
  /*  }
 };
RenderDOM.render();  */



//  Funciones

// Listado de personajes
function personajesCompleto(ApiResultados){
    //var pagination = paginate(conexion_api,pageSize,pageNumber);
    contenidoHTML = "";                
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
























function contenedorBotones(){ // contenedor_botones <-- id div
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



