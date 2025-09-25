# Weather web app

Este es un proyecto web para mostrar el clima de cualquier ciudad del mundo. Usa React para la interactividad, Zustand para la gestión de estados globales, TailwindCSS para el estilado, Vite como empaquetador y Biome como formateador

## Clonar el proyecto

Dado que no es necesario contar con todo el histórico de versiones, clona este proyecto de la siguiente manera

```sh
git clone https://github.com/luisldev/weather-web-app.git --depth=1
```

## ¿Qué necesito para usar este proyecto en local?

### API KEYs

Necesitas crear API KEYs personales para usar las funcionalidades críticas de este proyecto, para ello, crearás una cuenta en [Tomorrow.io](https://www.tomorrow.io/) y generarás una API KEY.
  Harás lo mismo en [WeatherAPI](https://www.weatherapi.com/)

Necesitas crear un archivo .env.local en la raíz del proyecto (junto a index.html) con el siguiente contenido:
``` txt
TOMORROW_IO_API_KEY=TU_API_KEY
WEATHERAPI_API_KEY=TU_API_KEY
```