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
      //console.log(`------------ ${ts.getSimbolo(this.identificador).tipo.stype} ---- ${valor} ---- ${tipo_valor}`);
      
      if(ts.getSimbolo(this.identificador).tipo.stype === 'ENTERO' && tipo_valor === 1 || 
      ts.getSimbolo(this.identificador).tipo.stype === 'STRING' && tipo_valor === 3 ||
      ts.getSimbolo(this.identificador).tipo.stype === 'BOOLEAN' && tipo_valor === 2 ||
      ts.getSimbolo(this.identificador).tipo.stype === 'DOBLE' && tipo_valor === 1 ||
      ts.getSimbolo(this.identificador).tipo.stype === 'CHAR' && tipo_valor === 3) {
          ts.getSimbolo(this.identificador).setValor(valor); 
      } else {
        controlador.append(`Asignacion.ts - Variable no coincide con el tipo de dato`, "\n");
        let error = new Errores('Semantico', `Variable ${this.identificador} no coincide con el tipo de dato`, this.linea, this.columna);
      }

    }
    else {
      controlador.append(`Asignacion.ts - Variable *${this.identificador}* no declarada. L: ${this.linea}, C: ${this.columna}`, "\n");
      let error = new Errores('Semantico', `Variable *${this.identificador}* no declarada`, this.linea, this.columna);
      controlador.errores.push(error);
    }
  }

  recorrer(): Nodo {
    throw new Error("Method not implemented.");
  }
}
