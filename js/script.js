window.onload = function () {
    let arrayCartasGiradas = [];
    let contador = 0;
    let tiempoSegundos = 0;
    let intervaloTemporizador;
    let dificultad = 0;
    let temporizadorDiv = document.getElementById("temporizador");
    let mensajeFinalDiv = document.getElementById("mensajeFinal");
    
    // funcion para crear el div de la carta, le entra por parametro el pais.
    function crearCarta(pais) {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.setAttribute("pais", pais);

        const caraFrontal = crearCaraFrontal(pais);
        const caraTrasera = crearCaraTrasera();

        carta.appendChild(caraFrontal);
        carta.appendChild(caraTrasera);

        return carta;
    }

    function crearCaraFrontal(pais) {
        const caraFrontal = document.createElement("div");
        caraFrontal.classList.add("caraFrontal");
        caraFrontal.innerHTML = `<img src='img/${pais}.png'>`;
        return caraFrontal;
    }

    function crearCaraTrasera() {
        const caraTrasera = document.createElement("div");
        caraTrasera.classList.add("caraTrasera");
        caraTrasera.innerHTML = "<img src='img/trasera2.png'>";
        return caraTrasera;
    }

    function mezclarCartas(cartas) {
        return cartas.sort(() => Math.random() - 0.5);
    }
    // funcion para empezar el juego, le entra por parametro la dificultad, para crear las cartas y el tablero correspondiente.
    // Tambien reinicia el temporizador y el contador de intentos.
    // Al final de la funcion se comprueba si se han girado todas las cartas y se muestra un mensaje con el tiempo y los intentos.
    // 
    function empezarJuego(dificultad) {
        // Esto es para que pueda sonar el sonido en al ganar en chrome, son cosas suyas de seguridad.
        let context = new AudioContext();
        context.resume();
        // Reiniciamos la variable del contador de intentos y el numero en el HTML
        contador = 0;
        // Reinicio tambien el mensaje final
        mensajeFinalDiv.style.display = "none";

        // Reiniciamos el temporizador en el HTML, el contador de segundos y el intervalo, luego iniciamos el intervalo con el temporizador de nuevo.
        let divContador = document.getElementById("contador");
        divContador.innerHTML = "Intentos: " + contador;
        temporizadorDiv.innerHTML = "00:00";
        tiempoSegundos = 0;
        clearInterval(intervaloTemporizador);
        intervaloTemporizador = setInterval(actualizarReloj, 1000);

        const contenedorJuego = document.querySelector("#juego");
        contenedorJuego.innerHTML = "";
        const arrayImagenes = [
            "alemania",
            "argentina",
            "brasil",
            "china",
            "eeuu",
            "japon",
            "mexico",
            "spain",
            "canada",
            "checa",
            "francia",
            "irlanda",
            "italia",
            "korea",
            "portugal",
            "suecia",
            "mauritania",
            "egipto"
        ];

        const arrayCartas = [];
        let numParejas;

        if (dificultad === 4) {
            numParejas = 8;
        } else {
            numParejas = 18;
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < numParejas; j++) {
                const carta = crearCarta(arrayImagenes[j]);
                arrayCartas.push(carta);
            }
        }

        const cartasMezcladas = mezclarCartas(arrayCartas);

        cartasMezcladas.forEach(function (carta) {
            contenedorJuego.appendChild(carta);
            controlarClickCarta(carta);
        });

        if (dificultad === 6) {
            contenedorJuego.classList.add("grid-6x6");
        } else {
            contenedorJuego.classList.remove("grid-6x6");
        }
    }

    // funcion para controlar el click en la carta, le entra por parametro la carta. y le aplica la clase girada, bloqueada y bloqueo temporal 
    // para que no se pueda girar mientras se estan comparando las cartas o se quede girada si son iguales.
    function controlarClickCarta(carta) {
        carta.addEventListener("click", function () {
            if (
                arrayCartasGiradas.length < 2 &&
                !carta.classList.contains("bloqueoTemporal") &&
                !carta.classList.contains("bloqueada")
            ) {
                carta.classList.toggle("girada");
                arrayCartasGiradas.push(carta);
                if (arrayCartasGiradas.length === 2) {
                    const carta1 = arrayCartasGiradas[0];
                    const carta2 = arrayCartasGiradas[1];
                    const todasLasCartas = document.querySelectorAll(".carta");
                    todasLasCartas.forEach((carta) =>
                        carta.classList.add("bloqueoTemporal")
                    );
                    if (
                        carta1.getAttribute("pais") ===
                            carta2.getAttribute("pais") &&
                        carta1 !== carta2
                    ) {
                        carta1.classList.add("bloqueada");
                        carta2.classList.add("bloqueada");
                        todasLasCartas.forEach((carta) =>
                            carta.classList.remove("bloqueoTemporal")
                        );
                    } else {
                        setTimeout(function () {
                            carta1.classList.toggle("girada");
                            carta2.classList.toggle("girada");
                            todasLasCartas.forEach((carta) =>
                                carta.classList.remove("bloqueoTemporal")
                            );
                        }, 1000);
                    }
                    contador++;
                    arrayCartasGiradas = [];
                    let divContador = document.getElementById("contador");
                    divContador.innerHTML = "Intentos: " + contador;
                }
            }
            
            let numCartasGiradaBloqueada;
            
            if(dificultad == 4){
                numCartasGiradaBloqueada = 16;
            }else{
                numCartasGiradaBloqueada = 36;
            }

            if (
                document.querySelectorAll(".carta.girada.bloqueada").length ===
                numCartasGiradaBloqueada
            ) {
                // Aqui cuando se acaba la partida se para el temporizador, se reproduce el sonido y se muestra un mensaje con el tiempo y los intentos
                // Tuve que meter el alert en un interval porque si saltaba a la vez que el sonido dejaba de funcionar.

                clearInterval(intervaloTemporizador);
                sonido.play();
                setTimeout(function () {
                                        
                    mensajeFinalDiv.innerHTML =
                        "¡HAS GANADO! TU TIEMPO: " +
                        temporizadorDiv.innerHTML +
                        ", HAS NECESITADO " +
                        contador +
                        " INTENTOS";
                    mensajeFinalDiv.style.display = "block";                   
                }, 1000);
            }
        });
    }

    // crear sonido con la libreria Howler
    var sonido = new Howl({
        src: ["sound/FF_Victoria.mp3"],
    });

    // funcion para actualizar el reloj y aplicarle el formateo para que quede bonito
    function actualizarReloj() {
        let minutos = Math.floor(tiempoSegundos / 60);
        let segundos = tiempoSegundos % 60;
        // Formateamos los minutos y segundos para que siempre tengan dos dígitos, tuve que buscarlo porque si no quedaba feo
        let minutosFormateado = minutos.toString().padStart(2, "0");
        let segundosFormateado = segundos.toString().padStart(2, "0");
        // Actualizamos el contenido del div con el formato "MM:SS"
        temporizadorDiv.innerHTML = `${minutosFormateado}:${segundosFormateado}`;
        // Incrementamos el contador de segundos
        tiempoSegundos++;
    }


    // Localizamos los botones y llama a la funcion empezarJuego con la dificultad correspondiente al boton pulsado
    const botonInicio = document.getElementById("botonInicio");
    botonInicio.addEventListener("click", function () {
        dificultad = 4;
        empezarJuego(dificultad);
    });

    const botonInicio2 = document.getElementById("botonInicio2");
    botonInicio2.addEventListener("click", function () {
        dificultad = 6;
        empezarJuego(dificultad);
    });
};
