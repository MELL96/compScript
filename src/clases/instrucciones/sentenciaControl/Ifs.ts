import Errores from "../../ast/Errores";
import Nodo from "../../ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Break from "../sentenciaTransferencia/Break";
import Continue from "../sentenciaTransferencia/Continue";
import Retorno from "../sentenciaTransferencia/Return";

export default class Ifs implements Instruccion {

  public condicion: Expresion;
  public lista_instrucciones_ifs: Array<Instruccion>;
  public lista_instrucciones_elses: Array<Instruccion>;
  public linea: number;
  public columna: number;

  /**
   *
   */
  constructor(condicion: Expresion, lista_instrucciones_ifs: Array<Instruccion>, lista_instrucciones_elses: Array<Instruccion>, linea: number, columna: number) {
    this.condicion = condicion;
    this.lista_instrucciones_ifs = lista_instrucciones_ifs;
    this.lista_instrucciones_elses = lista_instrucciones_elses;
    this.columna = columna;
    this.linea = linea;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    let ts_local = new TablaSimbolos(ts);
    let valor_condicion = this.condicion.getValor(controlador, ts); //true | false

    if (this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO) {
      if (valor_condicion) {
        for (let inst of this.lista_instrucciones_ifs) {
          let ret = inst.ejecutar(controlador, ts_local);
          if (ret instanceof Break) {
            if (controlador.sent_ciclica) {
              return ret;
            } else {
              let error = new Errores("Semantico", `No se puede ejecutar la sentencia de transferencia Break dentro de la sentencia de control if.`, this.linea, this.columna);
              controlador.errores.push(error);
              controlador.append(` *** ERROR: Semantico, No se puede ejecutar la sentencia de transferencia Break dentro de la sentencia de control if. En la linea ${this.linea} y columna ${this.columna}`)
            }
          }
          if (ret instanceof Continue) {
            if (controlador.sent_ciclica) {
              return ret;
            } else {
              let error = new Errores("Semantico", `No se puede ejecutar la sentencia de transferencia Continue dentro de la sentencia de control if.`, this.linea, this.columna);
              controlador.errores.push(error);
              controlador.append(` *** ERROR: Semantico, No se puede ejecutar la sentencia de transferencia Continue dentro de la sentencia de control if. En la linea ${this.linea} y columna ${this.columna}`)
            }
          }

          if (ret instanceof Retorno) {
            return ret;
          }

          if (ret != null) {
            return ret;
          }
        }
      } else {
        for (let inst of this.lista_instrucciones_elses) {
          let ret = inst.ejecutar(controlador, ts_local);
          if (ret instanceof Break) {
            if (controlador.sent_ciclica) {
              return ret;
            } else {
              //error semantico, no se puede tener un break dentro de un else 
            }
          }
          if (ret instanceof Retorno) {
            return ret;
          }

          if (ret != null) {
            return ret;
          }
        }
      }
    }
    return null;
  }
  recorrer(): Nodo {
    throw new Error("Method not implemented.");
  }
}