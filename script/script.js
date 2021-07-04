"use strict"
const RenderDOM = {
    render: () => {
        const conexion_api = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=eaa98daf4d86236acb4de698f6808297&hash=c0819d4ad93eb938110b0d68f54532f0';
        const container = document.getElementById('id-Contenedor-superHero');        
        let contenidoHTML = '';
        const noImg = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";



        let idBuscar = document.getElementById('idBuscar');
        idBuscar.value = "";
        
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




            function personajesCompleto(){
                contenidoHTML = "";                
                for (const superHero of json.data.results) {
                    let urlHero = superHero.urls[1].url;
                        //if(noImg!== superHero.thumbnail.path){                            
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
                       // console.log(superHero.name);
                    }
                    return container.innerHTML = contenidoHTML;
            }

            function SinpersonajesCompleto(nombreBuscado){
                contenidoHTML = "";
                

                for (const superHero of json.data.results) {
                    let urlHero = superHero.urls[1].url;
                    const nombreAPI = superHero.name.toLowerCase();
                    const nombreRecibido = nombreBuscado.toLowerCase();

                    if(nombreRecibido== nombreAPI){
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
        })        
    }
};
RenderDOM.render();