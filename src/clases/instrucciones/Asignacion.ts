import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from '../TablaSimbolos/Tipo';
import Errores from '../Ast/Errores';

export default class Asignacion implements Instruccion {

  public identificador: string;
  public valor: Expresion;
  public linea: number;
  public columna: number;

  constructor(identificador, valor, linea, columna) {
    this.identificador = identificador;
    this.valor = valor;
    this.linea = linea;
    this.columna = columna;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    if (ts.existe(this.identificador)) {
      let valor = this.valor.getValor(controlador, ts);
      let tipo_valor = this.valor.getTipo(controlador, ts);
      ts.getSimbolo(this.identificador).setValor(valor);
      /* console.log(`------------ ${ts.getSimbolo(this.identificador).tipo.stype} ---- ${valor} ---- ${tipo_valor}`)     */
    }
    else {
      controlador.append(`Asignacion - Variable *${this.identificador}* no declarada. L: ${this.linea}, C: ${this.columna}`);
      let error = new Errores('Semantico', `Variable *${this.identificador}* no declarada`, this.linea, this.columna);
      controlador.errores.push(error);
    }
  }

  recorrer(): Nodo {
    throw new Error("Method not implemented.");
  }
}
