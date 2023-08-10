class Tamagotchi {
  constructor() {
    this.nombre = "Kutchipachi";
    this.hambre = 0;
    this.felicidad = 0;
    this.energia = 100;
    this.intervalo = null;
  }

  nacer() {
    this.intervalo = setInterval(() => {
      this.hambre += 5;
      this.felicidad -= 2;
      this.energia -= 1;
      this.revisionEstado();
    }, 1000);
  }

  comer() {
    this.hambre -= 10;
    this.felicidad += 5;
    this.energia += 10;
    this.mostrarAlerta(`Has alimentado a ${this.nombre}.`);
    this.revisionEstado();
  }

  jugar() {
    this.hambre += 5;
    this.felicidad += 10;
    this.energia -= 10;
    this.mostrarAlerta(`Has jugado con ${this.nombre}.`);
    this.revisionEstado();
  }

  dormir() {
    this.hambre += 5;
    this.felicidad -= 5;
    this.energia += 20;
    this.mostrarAlerta(`Has puesto a dormir a ${this.nombre}.`);
    this.revisionEstado();
  }

  revisionEstado() {
    if (this.hambre >= 90) {
      this.mostrarAlerta(`${this.nombre} tiene mucha hambre. ¡Aliméntalo!`);
    }

    if (this.felicidad <= 10) {
      this.mostrarAlerta(
        `${this.nombre} está triste. ¡Juega con él para animarlo!`
      );
    }

    if (this.energia <= 20) {
      this.mostrarAlerta(`${this.nombre} está agotado. ¡Ponlo a dormir!`);
    }
  }

  mostrarAlerta(mensajeAlerta) {
    const alerta = document.getElementById("alerta");
    alerta.innerHTML = mensajeAlerta;
  }

  revivir() {
    if (this.hambre >= 100 || this.felicidad <= 0 || this.energia <= 0) {
      this.mostrarAlerta(`${this.nombre} ha sido revivido.`);
      this.hambre = 0;
      this.felicidad = 0;
      this.energia = 100;
    }
  }
}

const Kutchipachi = new Tamagotchi();

Kutchipachi.nacer();

const $btnComer = document.getElementById("btn-comer"),
  $btnJugar = document.getElementById("btn-jugar"),
  $btnDormir = document.getElementById("btn-dormir");

function cambioEstado(imagen) {
  const $imagen = document.getElementById("tamagotchi");
  $imagen.src = imagen;
}

document.addEventListener("click", (e) => {
  if (e.target === $btnComer) {
    cambioEstado("./assets/comer.png");
    Kutchipachi.comer();
  }
  if (e.target === $btnJugar) {
    cambioEstado("./assets/jugar.png");
    Kutchipachi.jugar();
  }
  if (e.target === $btnDormir) {
    cambioEstado("./assets/dormir.png");
    Kutchipachi.dormir();
  }
});
