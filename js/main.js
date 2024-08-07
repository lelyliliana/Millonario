function sonido_boton() {
    if (sonar) {
        boton.play();
    }
}

// Función temporizador regresivo:
function temporizador() {
    clearInterval(intrv); // Asegurar que no haya múltiples intervalos corriendo
    intrv = setInterval(() => {
        if (!stop) {
            cont_tiempo = cont_tiempo - 1;

            if (cont_tiempo >= 0) {
                t.innerText = cont_tiempo;
            } else {
                clearInterval(intrv);
                cont_tiempo = 0;
                t.innerText = cont_tiempo;
                t.style.color = "red";
                mostrarRendirse();
            }
        }
    }, 1000);
}

// Mostrar la respuesta correcta y permitir seguir
function mostrarRendirse() {
    clearInterval(intrv); // Detener el temporizador cuando se muestra la respuesta correcta
    for (let i = 0; i < respuestas.length; i++) {
        if (respuestas[i].innerText === preguntas[nivel].resp) {
            respuestas[i].style.backgroundColor = "green";
            respuestas[i].onclick = siguientePregunta;
        } else {
            respuestas[i].onclick = null;
        }
    }
    const btnSeguir = document.createElement("button");
    btnSeguir.innerText = "Seguir";
    btnSeguir.id = "btnSeguir";
    btnSeguir.onclick = siguientePregunta;
    document.body.appendChild(btnSeguir);
}

// Función para manejar el clic en el botón de "Seguir"
function siguientePregunta() {
    clearInterval(intrv); // Asegurar que el temporizador se detiene
    if (nivel < preguntas.length - 1) {
        nivel++;
        cambiar_pregunta(preguntas[nivel].p, preguntas[nivel].op());
        cont_tiempo = 60; // Reiniciar el temporizador
        t.style.color = "white"; // Cambiar el color a blanco
        for (let i = 0; i < respuestas.length; i++) {
            respuestas[i].style.backgroundColor = ""; // Reiniciar el color de fondo
            respuestas[i].onclick = verificarRespuesta; // Reiniciar el onclick
        }
        const btnSeguir = document.getElementById("btnSeguir");
        if (btnSeguir) {
            document.body.removeChild(btnSeguir);
        }
        temporizador(); // Volver a iniciar el temporizador
    } else {
        felicidades();
    }
}

// Verificar la respuesta seleccionada
function verificarRespuesta() {
    if (this.innerText === preguntas[nivel].resp) {
        identificacion = "resp_correcta";
        if (sonar) m_correcto.play();
        nivel++;
        pasaste.innerText = "Pasaste al nivel:" + nivel;
        aparecer_ventana();
        recompenza = recompenza + 10000 * nivel;

        if (nivel > preguntas.length - 1) {
            dinero_ganado = recompenza;
            felicidades();
        } else {
            if (nivel % 5 === 0) {
                dinero_ganado = recompenza; // cada vez que supera un nivel (5 preguntas)
                dinero.innerText = dinero_ganado;
            }
            siguientePregunta();
        }
    } else {
        mostrarRendirse();
    }
}

// Función para evitar terminar el juego al rendirse
function perder() {
    mostrarRendirse(); // Mostrar la respuesta correcta
}

// Botones
document.onclick = () => {
    intro.play();
    intro.volume = 0.3;
}

jugar.addEventListener("click", () => {
    sonido_boton();
    jugar.classList.add("desaparecer");
    logo.classList.add("animacionLogo");
    jugar.style.display = "none";

    setTimeout(() => {
        logo.style.display = "none";
        bloque_juego.classList.add("comenzar");

        // Temporizador
        stop = false;
        temporizador();
    }, 2000);
})

info.addEventListener("click", () => {
    sonido_boton();
    modal.classList.remove("nomostrar");
})

silencio.addEventListener("click", () => {
    sonido_boton();

    if (sonar == true) {
        intro.muted = true;

    } else intro.muted = false;

    sonar = !sonar;
    silencio.classList.toggle("nosonar");
    silencio.classList.toggle("icon-volume-mute2");

});

cerrar_modal.onclick = function () {
    modal.classList.add("nomostrar");
}

rendirse.onclick = () => {
    mostrarRendirse();
}

