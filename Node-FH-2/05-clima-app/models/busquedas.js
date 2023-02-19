import fs from "fs";

import fetch from "node-fetch";

export default class Busquedas {
    historial = [];
    pathHistorial = "./db/database.json";

    constructor() {

    }

    get obtenerParametros() {
        const params = new URLSearchParams()
        params.append("limit", "5")
        params.append("language", "es")
        params.append("access_token", process.env.MAPBOX_KEY)
        return params
    }

    async buscarCiudad ( ciudad ) {
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${ ciudad }.json/?${ this.obtenerParametros }`,
            )
            const data = await response.json();

            const lugares = data.features.map((lugar) => ({
                id: lugar.id,
                name: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))

            if (lugares.length !== 0) {
                return lugares
            };

            throw new Error()
        } catch (error) {
            console.log("\n No se ha encontrado...".grey)
        }
    }

    async obtenerClima ( lat, lon ) {
        try {

            const climaResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${process.env.OPENWEATHER_KEY}`
            )
            const data = await climaResponse.json()

            let dataClima = {
                description: data.weather[0].description,
                temp: data.main.temp,
                min: data.main.temp_min,
                max: data.main.temp_max
            }

            return dataClima

        } catch (error) {
            console.log("Ha ocurrido un error.")
        }
    }

    guardarHistorial () {
        fs.writeFileSync(this.pathHistorial, JSON.stringify(this.historial) )
    }

    async leerHistorial () {
        if (fs.existsSync(this.pathHistorial)) {
            const infoHistorial = await fs.readFileSync(this.pathHistorial, { encoding: "utf-8" });
            this.historial = JSON.parse(infoHistorial);
            return this.historial;
        }
        return null;
    }
}