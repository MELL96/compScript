import Nodo from "src/clases/Ast/Nodo";
import Controlador from "src/clases/Controlador";
import { Instruccion } from "src/clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/clases/TablaSimbolos/TablaSimbolos";

export default class Switch implements Instruccion {

  public 

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    throw new Error("Method not implemented.");
  }
  recorrer(): Nodo {
    throw new Error("Method not implemented.");
  }

}