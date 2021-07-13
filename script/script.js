"use strict"
const RenderDOM = {
    render: () => {
        /* Inicio <-- Declaración de variables ------------------------------------*/
        const conexion_api = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=eaa98daf4d86236acb4de698f6808297&hash=c0819d4ad93eb938110b0d68f54532f0';
        const container = document.getElementById('id-Contenedor-superHero');        
        let contenidoHTML = '';
        const noImg = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";


        let idBuscar = document.getElementById('idBuscar');
        idBuscar.value = "";

        const btn_prev = document.getElementById("btn-prev");
        const btn_next = document.getElementById("btn-next");
        //btn_prev.disabled = false;
        //btn_next.disabled = false;


        /*-- Fin  <-- Declaración de variables ------------------------------------*/
        
        /* Inicio <-- Paginación ------------------------------------*/
        let pageNumber = 1;
        let pageSize = 5;
        let pagination;
        let pageCont = Math.ceil(conexion_api.length/pageSize);
        /*-- Fin  <-- Paginación ------------------------------------*/
        
        fetch(conexion_api)
        .then(res => res.json())
        .then((json) => {

            console.log(json,"RES.JSON");
            personajesCompleto();

            idBuscar.addEventListener('keyup', (e)=> {  
            
                const nombreBuscado = e.target.value; 
                
                if (nombreBuscado.length <= 0){   
                    personajesCompleto();
                }else{
                    SinpersonajesCompleto(nombreBuscado);
                }
            });


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

/* Inicio <-- Rompiendo Con pajinador ------------------------------------*/
            function personajesCompleto4(_conexion_api){
                var pagination = paginate(conexion_api,pageSize,pageNumber);
                contenidoHTML = "";                
                for (const superHero of json.data.results) {
                    let urlHero = superHero.urls[1].url;
                        if (pageNumber == 1) {
                               //if(noImg!== superHero.thumbnail.path){  
                                //contenidoHTML += `<div class="llamada">`;                          
                                contenidoHTML += ` 
                                <div class="llamada">                           
                                    <div class="thumb">
                                        <a href="${urlHero}" target="_blank">
                                            <img src="${superHero.thumbnail.path}.${superHero.thumbnail.extension}" alt="${superHero.name}">
                                        </a>
                                    </div>
                                    <div class="descripcion">
                                        <a href="${urlHero}" target="_blank">
                                            <p class="nombre">${superHero.name}</p>
                                        </a>
                                    </div>
                                </div>          
                            `;
                          //  }                            
                        }                     
                       // console.log(superHero.name);
                    }
                   /*  contenidoHTML +=`
                    <div class="container-pagination">
                        <button class="btn" id="btn-prev" onclick="previusPage()">Previous</button>
                        <button class="btn" id="btn-next" onclick="nextPage()"}>Next</button>
                    </div>`; */
                    
                    //pageNumber >1  ? btn_prev.disabled = false :"";
                    //pageNumber < pageCont ?(btn_next.disabled = false):"" ;
                    return container.innerHTML = contenidoHTML; 
                    //return container.innerHTML = contenidoHTML;
            }



/*-- Fin  <-- Rompiendo Con pajinador ------------------------------------*/


            function personajesCompleto(){
                var pagination = paginate(conexion_api,pageSize,pageNumber);
                contenidoHTML = "";                
                for (const superHero of json.data.results) {
                    let urlHero = superHero.urls[1].url;
                        //if(noImg!== superHero.thumbnail.path){  
                            contenidoHTML += `<div class="llamada">`;                          
                            contenidoHTML += `                            
                                <div class="thumb">
                                    <a href="${urlHero}" target="_blank">
                                        <img src="${superHero.thumbnail.path}.${superHero.thumbnail.extension}" alt="${superHero.name}">
                                    </a>
                                </div>
                                <div class="descripcion">
                                    <a href="${urlHero}" target="_blank">
                                        <p class="nombre">${superHero.name}</p>
                                    </a>
                                </div>
                            </div>
                        `;
                       // }
                       // console.log(superHero.name);
                    }
                    
                    return container.innerHTML = contenidoHTML; 
                    //return container.innerHTML = contenidoHTML;
            }



            
/* Inicio <--  Buscador ------------------------------------*/   
            function SinpersonajesCompleto(nombreBuscado){
                contenidoHTML = "";                

                for (const superHero of json.data.results) {
                    let urlHero = superHero.urls[1].url;
                    const nombreAPI = superHero.name.toLowerCase();
                    const nombreRecibido = nombreBuscado.toLowerCase();
                    //console.log(nombreRecibido);
                    //console.log(nombreAPI);
                    if(nombreAPI.includes(nombreRecibido)){
                        contenidoHTML += `
                        <div class="llamada">
                            <div class="thumb">
                                <a href="${urlHero}" target="_blank">
                                <img src="${superHero.thumbnail.path}.${superHero.thumbnail.extension}" alt="${superHero.name}">
                                </a>
                            </div>
                            <div class="descripcion">
                                <a href="${urlHero}" target="_blank">
                                    <p class="nombre">${superHero.name}</p>
                                </a>
                            </div>
                        </div>
                    `;
                }
                }
                container.innerHTML = contenidoHTML;
            }
/*-- Fin  <--  Buscador ------------------------------------*/

        })        
    }
};
RenderDOM.render();