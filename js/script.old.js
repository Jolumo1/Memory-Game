let arrayCartasGiradas = [];

function crearCartas() {
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
            let carta = document.createElement("div");
            carta.classList.add("carta");
            carta.setAttribute("pais", arrayImagenes[j]);

            let caraFrontal = document.createElement("div");
            caraFrontal.classList.add("caraFrontal");
            caraFrontal.innerHTML =
                "<img src='img/" + arrayImagenes[j] + ".png'>";

            let caraTrasera = document.createElement("div");
            caraTrasera.classList.add("caraTrasera");
            caraTrasera.innerHTML = "<img src='img/trasera2.png'>";

            carta.appendChild(caraFrontal);
            carta.appendChild(caraTrasera);

            arrayCartas.push(carta);
        }
    }

    arrayCartas.sort(function () {
        return Math.random() - 0.5;
    });

    arrayCartas.forEach(function (carta) {
        contenedorJuego.appendChild(carta);

        carta.addEventListener("click", function () {
            
            carta.classList.toggle("girada");
            arrayCartasGiradas.push(carta);

            if (arrayCartasGiradas.length === 2) {
                const carta1 = arrayCartasGiradas[0];
                const carta2 = arrayCartasGiradas[1];

                if (
                    carta1.getAttribute("pais") === carta2.getAttribute("pais")
                ) {
                    carta1.classList.add("bloqueada");
                    carta2.classList.add("bloqueada");
                } else {
                    setTimeout(function () {
                        carta1.classList.toggle("girada");
                        carta2.classList.toggle("girada");
                    }, 1000);
                }

                arrayCartasGiradas = [];
            }
        });
    });
}

const botonInicio = document.getElementById("botonInicio");
botonInicio.addEventListener("click", crearCartas);
