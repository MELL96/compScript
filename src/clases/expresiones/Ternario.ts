import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Errores from "./../Ast/Errores";

export default class Ternario implements Expresion {

  public condicion: Expresion;
  public verdadero: Expresion;
  public falso: Expresion;
  public linea: number;
  public columna: number;

  constructor(condicion, verdadero, falso, linea, columna) {
    this.condicion = condicion;
    this.verdadero = verdadero;
    this.falso = falso;
    this.linea = linea;
    this.columna = columna;
  }

  getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
    let valor_condicion = this.condicion.getValor(controlador, ts);
    if (typeof valor_condicion === 'boolean') {
      return valor_condicion ? this.verdadero.getTipo(controlador, ts) : this.falso.getTipo(controlador, ts);
    }
    else {
      let error = new Errores('Semantico', 'Condiciones no booleanas', this.linea, this.columna);
      controlador.errores.push(error);
      controlador.append('Ternario.ts - Error Semantico: Condiciones no booleanas');
    }
  }

  getValor(controlador: Controlador, ts: TablaSimbolos) {
    let valor_condicion = this.condicion.getValor(controlador, ts);

    if (typeof valor_condicion == 'boolean') {
      return valor_condicion ? this.verdadero.getValor(controlador, ts) : this.falso.getValor(controlador, ts);
    }
    else {
      let error = new Errores('Semantico', 'Condiciones no booleanas', this.linea, this.columna);
      controlador.errores.push(error);
      controlador.append('Ternario.ts - Error Semantico: Condicion no booleana');
    }
  }

  recorrer(): Nodo {
    throw new Error("Method not implemented.");
  }

}