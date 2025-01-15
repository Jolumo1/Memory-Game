window.onload = function () {
    let arrayCartasGiradas = [];

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

                    arrayCartasGiradas = [];
                }
            }

            console.log(
                document.querySelectorAll(".carta.girada.bloqueada").length
            );

            if (
                document.querySelectorAll(".carta.girada.bloqueada").length ===
                16
            ) {
                alert("¡Has ganado! Eres un máquena");
            }
        });
    }

    function empezarJuego() {
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
        ];

        const arrayCartas = [];

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < arrayImagenes.length; j++) {
                const carta = crearCarta(arrayImagenes[j]);
                arrayCartas.push(carta);
            }
        }

        const cartasMezcladas = mezclarCartas(arrayCartas);

        cartasMezcladas.forEach(function (carta) {
            contenedorJuego.appendChild(carta);
            controlarClickCarta(carta);
        });
    }

 

    const botonInicio = document.getElementById("botonInicio");
    botonInicio.addEventListener("click", empezarJuego);
};
