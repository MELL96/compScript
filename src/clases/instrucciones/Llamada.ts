import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Funcion from "./Funcion";
import Errores from '../Ast/Errores'

export default class Llamada implements Instruccion {

  public identificador: string;
  public parametros: Array<Expresion>;
  public linea: number;
  public columna: number;

  constructor(id, param, linea, col) {
    this.identificador = id;
    this.parametros = param;
    this.columna = col;
    this.linea = linea;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    if (ts.existe(this.identificador)) {
      let ts_local = new TablaSimbolos(ts);
      let simbolo_funcion = ts.getSimbolo(this.identificador) as Funcion;


      //TODO: Hacer un metodo para validar si los parametros de la llamada son del mismo tipo que el de la funcion


      let r = simbolo_funcion.ejecutar(controlador, ts_local);

      if (r != null) {
        return r;
      }

    }
    else {
      let error = new Errores('Semantico', `${this.identificador} ya declarada`, this.linea, this.columna);
      controlador.errores.push(error);
      controlador.append(`Funcion.ts - *${this.identificador}* ya declarada. L: ${this.linea}, C: ${this.columna}`);
    }
  }

  recorrer(): Nodo {
    let padre = new Nodo("Llamada", "");
    padre.AddHijo(new Nodo(this.identificador, ""));
    padre.AddHijo(new Nodo("(", ""));


    //TODO: AGREGAR NODOS HIJOS DE PARAMETROS


    padre.AddHijo(new Nodo(")", ""));

    return padre;
  }

}