import Errores from "./Ast/Errores";
import Simbolos from "./TablaSimbolos/Simbolos";
import { TablaSimbolos } from "./TablaSimbolos/TablaSimbolos";

/*
 * @class Clase que nos permitira llevar el control de todo el programa. 
 */

export default class Controlador {
  public errores: Array<Errores>;
  public consola: string;
  public sent_ciclica: boolean;

  constructor() {
    this.errores = new Array<Errores>();
    this.consola = "";
    this.sent_ciclica = false;
  }

  public append(consola: string, salto: string="") {
    this.consola += consola + salto;
  }

  /*
   * @function graficar_ts funcion para graficar la tabla de simbolos
   * @param controlador lleva el control del programa
   * @param ts accede a la tabla de simbolos
   * @returns retorna el cuerpo de la tabla de simbolos de html
   */

  graficar_ts(controlador: Controlador, ts: TablaSimbolos): string {
    var cuerpohtml = "<thead><tr><th>No.</th><th>Rol</th><th>Nombre</th><th>Tipo</th><th>Ambito</th><th>Valor</th><th>Parametros</th></tr></thead>";
    let contador = 0;

    while (ts != null) {
      for (let sim of ts.tabla.values()) {
        contador++;
        cuerpohtml += "<tr><th>" + contador + "</th><th>" + this.getRol(sim) + "</th><td>" + sim.identificador +
          "</td><td>" + this.getTipo(sim) + "</td>" +
          "</td><td>" + this.getAmbito() +
          "</td><td>" + this.getValor(sim) +
          "</td><td>" + this.parametros(sim) + "</td>" + "</tr>";
      }
      ts = ts.ant;
    }
    this.graficar_te();
    return cuerpohtml;
  }

  graficar_te() {
    for (let err in this.errores) {
      console.log(this.errores[err])
    }
  }

  /*
   * @function getValor obtiene el valor del simbolo de la tabla
   * @param sim simbolo de la tabla
   * @returns retorna el valor del simbolo
   */

  getValor(sim: Simbolos): string {
    if (sim.valor != null) {
      return sim.valor.toString();
    }
    else {
      return '---';
    }
  }

  /*
   * @function getTipo obtiene el tipo del simbolo de la tabla
   * @param sim  simbolo de la tabla
   * @returns retorna el tipo del simbolo
   */

  getTipo(sim): string {
    return sim.tipo.stype.toLowerCase();
  }

  /*
   * @function getTipo obtiene el rol del simbolo de la tabla
   * @param sim  simbolo de la tabla
   * @returns retorna el rol del simbolo
   */

  getRol(sim: Simbolos): string {
    let rol: string = '';
    switch (sim.simbolo) {
      case 1:
        rol = "variable"
        break
      case 2:
        rol = "funcion";
        break;
      case 3:
        rol = "metodo";
        break;
      case 4:
        rol = "vector";
        break
      case 5:
        rol = "lista";
        break;
      case 6:
        rol = "parametro"
        break;
    }
    return rol;
  }

  /*
  * @function getTipo Le indicamos el ambito del simbolo 
  * @returns retorna el ambito del simbolo
  */

  getAmbito(): string {
    return 'global'
  }

  /*
  * @function getTipo obtiene la cantidad de parametros del simbolo de la tabla
  * @param sim  simbolo de la tabla
  * @returns retorna la cantidad de parametros del simbolo si es que tiene
  */

  parametros(sim) {
    if (sim.lista_params != undefined) {
      return sim.lista_params.length
    }
    else {
      return "---";
    }
  }

}