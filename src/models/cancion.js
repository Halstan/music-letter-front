export default class Cancion {
  constructor(
    idCancion,
    nombre,
    fechaLanzamiento,
    idioma,
    letra,
    urlVideo,
    estadoCancion,
    album,
    usuario
  ) {
    this.idCancion = idCancion;
    this.nombre = nombre;
    this.fechaLanzamiento = fechaLanzamiento;
    this.idioma = idioma;
    this.letra = letra;
    this.urlVideo = urlVideo;
    this.estadoCancion = estadoCancion;
    this.album = album;
    this.usuario = usuario;
  }
}
