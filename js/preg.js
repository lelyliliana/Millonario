class preg {
    constructor(p, resp, op1, op2, op3) {
        this.p = p;
        this.resp = resp;
        this.op1 = op1;
        this.op2 = op2;
        this.op3 = op3;
    }

    op() {
        return [this.resp, this.op1, this.op2, this.op3].sort(() => Math.random() - 0.5);
    }
}

const uno = new preg("¿Qué es la elicitation de requisitos?", "Proceso de descubrimiento y recopilación de requisitos.", "Técnica de creatividad grupal.", "Identificación de riesgos en un proyecto.", "Validación de la calidad del software.");

const dos = new preg("¿Cuál de las siguientes NO es una técnica de recolección de información?", "Prototipado", "Entrevistas", "Observación", "Cuestionarios");

const tres = new preg("¿Qué es Design Thinking?", "Metodología centrada en el usuario para resolver problemas.", "Técnica para programación.", "Análisis de requisitos basado en matemáticas.", "Técnica para diseño gráfico.");

const cuatro = new preg("¿Qué significa 'gamificación' en educación?", "Uso de elementos de juego para motivar.", "Desarrollo de juegos educativos.", "Creación de videojuegos.", "Uso de simuladores.");

const cinco = new preg("¿Qué caracteriza a una metodología ágil?", "Entrega rápida y continua de mejoras.", "Enfoque estructurado y secuencial.", "Documentación extensa antes de implementar.", "Proceso inflexible.");

const seis = new preg("¿Cuál de los siguientes roles NO está en la elicitation de requisitos?", "Diseñador gráfico", "Cliente líder", "Dueño del producto", "Equipo de desarrollo");

const siete = new preg("¿Qué técnica reúne a personas para discutir un tema?", "Focus Group", "Entrevistas", "Observación", "Cuestionarios");

const ocho = new preg("¿Cuál de las siguientes NO es una característica de requisitos de software?", "Ambiguos", "Medibles", "Verificables", "Trazables");

const nueve = new preg("¿Qué metodología usa la matriz de conocimiento del cliente?", "Design Thinking", "Metodologías tradicionales", "Prototipado rápido", "Desarrollo en cascada");

const diez = new preg("¿Qué es el análisis de requisitos?", "Proceso de definición de necesidades para un producto.", "Evaluación de eficiencia de software.", "Proceso de desarrollo.", "Técnica de marketing.");

const once = new preg("¿Qué técnica es ideal para obtener datos cuantitativos?", "Cuestionarios", "Entrevistas", "Observación", "Prototipos");

const doce = new preg("¿Qué hace un 'cliente líder' en un proyecto?", "Asegura que los requisitos sean comprendidos.", "Diseña la interfaz gráfica.", "Desarrolla el código.", "Administra el presupuesto.");

const trece = new preg("¿Qué técnica genera muchas ideas para solucionar problemas?", "Brainstorming", "Observación", "Entrevistas", "Análisis de documentos");

const catorce = new preg("¿Qué técnica centrada en el usuario resuelve problemas complejos?", "Design Thinking", "Prototipado rápido", "Desarrollo en cascada", "Scrum");

const quince = new preg("¿Qué se evalúa en la rúbrica de desempeño en la entrevista?", "Efectividad de las técnicas de elicitación.", "Cantidad de preguntas.", "Duración de la entrevista.", "Calidad del software.");


const preguntas = [uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce, trece, catorce, quince].sort(() => Math.random() - 0.5);

// Funciones necesarias para el juego
function aparecer_ventana() { // ventana de comodines y mensajes
    ventana.style.transform = "scale(1)";
    document.getElementById(identificacion).style.display = "block";
    clearInterval(intrv);
}

btn_comodin.onclick = () => {
    ventana.style.transform = "scale(0)";
    document.getElementById(identificacion).style.display = "none";

    if (identificacion == "resp_correcta") {
        cambiar_pregunta(preguntas[nivel].p, preguntas[nivel].op());
    }
    temporizador();
}

function cambiar_pregunta(p, r) { // función para cambiar la pregunta p = pregunta r = array con las respuestas
    pregunta.innerText = p;

    for (var i = 0; i < 4; i++) {
        respuestas[i].innerText = r[i];
    }

    cont_tiempo = 60;
}

function felicidades() { // Mensaje Ganador
    ventana2.style.transform = "scale(1)";
    victoria.style.display = "inline-block";
    ganado.innerText = ganado.innerText + " " + dinero_ganado;
}

// Ajuste para evitar terminar el juego
function perder() {
    mostrarRendirse();
}

// Cambio y corrección de las preguntas del juego
// Además, por cada pregunta correcta se acumula una recompensa
cambiar_pregunta(preguntas[nivel].p, preguntas[nivel].op());

for (let i = 0; i < respuestas.length; i++) {
    respuestas[i].onclick = verificarRespuesta;
}

// Comodines de ayuda a la resolución de las preguntas
cont_comodin.addEventListener("click", (e) => {
    if (e.target.classList.contains("comodines")) {
        e.target.style.backgroundColor = "gray";
    }

    if (amigo == false && e.target.classList.contains("icon-phone")) {
        amigo = true;
        identificacion = "llamar";
        aparecer_ventana();
        document.getElementById("correcto").innerText = preguntas[nivel].resp;
    } else if (publico == false && e.target.classList.contains("icon-users")) {
        publico = true;
        identificacion = "audiencia";
        aparecer_ventana();
        for (var i = 0; i < 4; i++) {
            if (respuestas[i].innerText == preguntas[nivel].resp) barra[i].value = "70";
        }
    } else if (mitad == false && e.target.classList.contains("mitad")) {
        mitad = true;
        let aux1 = 0;
        for (var i = 0; i < 4 && aux1 < 2; i++) {
            if (respuestas[i].innerText != preguntas[nivel].resp) {
                aux1++;
                respuestas[i].innerText = "";
            }
        }
    }
});

// Botones para rendirse o terminar el juego
rendirse.onclick = () => {
    mostrarRendirse();
}

terminar.onclick = () => { // Una vez termina el juego se recarga la página y vuelve al inicio
    location.reload();
}

