import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Nodo from "./Nodo";

export default class Ast implements Instruccion {

  public lista_instrucciones: Array<Instruccion>;

  constructor(lista_instruciones) {
    this.lista_instrucciones = lista_instruciones;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {

  }

  recorrer(): Nodo {
    let raiz = new Nodo("INICIO", "");

    for (let inst of this.lista_instrucciones) {
      raiz.AddHijo(inst.recorrer());
    }
    return raiz;
  }
}