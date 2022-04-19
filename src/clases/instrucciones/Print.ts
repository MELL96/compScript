import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Errores from '../Ast/Errores'

export default class Print implements Instruccion {

  public expresion: Expresion;
  public linea: number;
  public columna: number;

  constructor(expresion, linea, columna) {
    this.expresion = expresion;
    this.linea = linea;
    this.columna = columna;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    let valor = this.expresion.getValor(controlador, ts);
    if (typeof valor === 'string' || typeof valor === 'number' || typeof valor === 'boolean') {
      controlador.append(valor.toString());
      return null;
    }
    else {
      controlador.append(`Print.ts - Error Lexico: No es de tipo primitivo. L: ${this.linea}, C: ${this.columna}`)
      let error = new Errores('Semantico', `No es de tipo primitivo.`, this.linea, this.columna);
      controlador.errores.push(error);
    }
  }

  recorrer(): Nodo {
    let padre = new Nodo("Print", "");
    padre.AddHijo(new Nodo("print", ""));
    padre.AddHijo(new Nodo("(", ""));
    let hijo = new Nodo("exp", "");
    hijo.AddHijo(this.expresion.recorrer());
    padre.AddHijo(hijo);
    padre.AddHijo(new Nodo(")", ""));
    return padre;
  }
}
