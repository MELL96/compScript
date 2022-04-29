import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import Break from "../SentenciaTransferencia/Break";

export default class Caso implements Instruccion {

  public valor: Expresion;
  public instrucciones: Array<Instruccion>;

  constructor(valor: Expresion, instrucciones: Array<Instruccion>) {
    this.valor = valor;
    this.instrucciones = instrucciones;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    let ts_local = new TablaSimbolos(ts);
    for (let inst of this.instrucciones) {
      let res: any = inst.ejecutar(controlador, ts_local);
      if (res instanceof Break) {
        return res;
      }
    }
  }

  recorrer(): Nodo {
    throw new Error("Method not implemented.");
  }
}