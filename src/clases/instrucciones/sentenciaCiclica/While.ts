import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/clases/TablaSimbolos/Tipo";
import Break from "../SentenciaTransferencia/Break";
import Continue from "../sentenciaTransferencia/Continue";

export default class While implements Instruccion {

  public condicion: Expresion;
  public lista_instrucciones: Array<Instruccion>;
  public linea: number;
  public columna: number;

  constructor(condicion, lista_instrucciones, linea, columna) {
    this.condicion = condicion;
    this.lista_instrucciones = lista_instrucciones;
    this.linea = linea;
    this.columna = columna;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    let temp = controlador.sent_ciclica;
    controlador.sent_ciclica = true;

    if (this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO) {
      siguiente:
      while (this.condicion.getValor(controlador, ts)) {
        let ts_local = new TablaSimbolos(ts);
        for (let inst of this.lista_instrucciones) {
          let ret = inst.ejecutar(controlador, ts_local);
          if (ret instanceof Break) {
            controlador.sent_ciclica = temp;
            return ret;
          }
          if (ret instanceof Continue) {
            continue siguiente;
          }
        }
      }
    } else {
      //reportamos error semantico de que la condicion no es booleana\

    }


    controlador.sent_ciclica = temp;
    return null;
  }
  recorrer(): Nodo {
    throw new Error("Method not implemented.");
  }
}