import dotenv from "dotenv";
import "colors"
import { inquirerMenu, listarHistorial, listarLugares, obtenerInfo, pausa } from './helpers/inquirer.js';
import Busquedas from './models/busquedas.js';

dotenv.config()

const main = async () => {
    
    let opt = "";
    const misBusquedas = new Busquedas();
    const historial = await misBusquedas.leerHistorial()

    console.log(historial)

    do {

        opt = await inquirerMenu();

        if (opt !== 0) {
            switch (opt) {
                case 1:
                    // Mostrar mensaje
                    const lugar = await obtenerInfo("Ciudad: ");
    
                    // Buscar lugares
                    const lugares = await misBusquedas.buscarCiudad(lugar);
    
                    // Seleccionar el lugar
                    if( lugares ) {
                        const id = await listarLugares(lugares);

                        const lugarSel = lugares.find((l) => l.id === id);
                        
                        // Clima
                        const clima = await misBusquedas.obtenerClima(lugarSel.lat, lugarSel.lng);

                        // Mostrar Resultados
                        if (id !== "0") {
                            // Almacenamos la búsqueda;
                            misBusquedas.historial.push(lugarSel.name)
                            misBusquedas.guardarHistorial();

                            console.log('\nInformación de la ciudad\n'.cyan);
                            console.log(`Ciudad: ${ String(lugarSel.name).italic.cyan }`);
                            console.log(`Lat: ${ String(lugarSel.lat).italic.cyan }`);
                            console.log(`Lng: ${ String(lugarSel.lng).italic.cyan }`);
                            console.log(`Estado: ${ clima.description }`);
                            console.log(`Temperatura: ${ clima.temp } ºC`);
                            console.log(`Mínima: ${ clima.min } ºC`);
                            console.log(`Máxima: ${ clima.max } ºC`);
                        }
                    }
                    break;
                case 2:
                    await listarHistorial(misBusquedas.historial);

                    break;
            }
        }

        if (opt === 0) return console.clear();

        await pausa()

    } while (opt !== 0);

};

main();
