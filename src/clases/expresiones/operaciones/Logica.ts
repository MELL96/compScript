import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";
import Errores from '../../Ast/Errores';

export default class Logica extends Operacion implements Expresion {

  public constructor(exp1: Expresion, op: string, exp2: Expresion, linea: number, columna: number, expU: boolean) {
    super(exp1, op, exp2, linea, columna, expU);
  }

  getTipo(Controlador: Controlador, TablaSimbolos: TablaSimbolos): tipo {
    let valor = this.getValor(Controlador, TablaSimbolos);

    if (typeof valor == 'number') {
      return tipo.DOBLE;
    }
    else if (typeof valor == 'string') {
      return tipo.STRING;
    }
    else if (typeof valor == 'boolean') {
      return tipo.BOOLEANO;
    }
  }

  getValor(Controlador: Controlador, TablaSimbolos: TablaSimbolos) {
    let valor_exp1;
    let valor_exp2;
    let valor_expU;

    if (this.expU == false) {
      valor_exp1 = this.exp1.getValor(Controlador, TablaSimbolos);
      valor_exp2 = this.exp2.getValor(Controlador, TablaSimbolos);
    }
    else {
      valor_expU = this.exp1.getValor(Controlador, TablaSimbolos);
    }

    /**
     * Para las siguientes validaciones nos basamos en la tabla de 
     * de las operaciones Logicas permitidas que soporta el lenguaje descrito en el enunciado.
     */

    switch (this.operador) {
      case Operador.OR:
        if (typeof valor_exp1 == 'boolean') {
          if (typeof valor_exp2 == 'boolean') {
            return valor_exp1 || valor_exp2;
          }
          else {
            //ERROR NO SE PUEDE ANALIZAR BOOLEAN CON OTRO TIPO DE DATO
            this.reportarError(Controlador, '||', 'BOOL', 'STRING/CHAR/NUMBER', this.linea, this.columna);
          }
        }
        else {
          //ERROR AL TRATAR DE OPERAR TIPOS DIFERENTES DE BOOLEANO

        }
        break;
      case Operador.AND:
        if (typeof valor_exp1 == 'boolean') {
          if (typeof valor_exp2 == 'boolean') {
            return valor_exp1 && valor_exp2;
          }
          else {

            //ERROR NO SE PUEDE ANALIZAR BOOLEAN CON OTRO TIPO DE DATO
            Controlador.append(`Logica.ts - Error Semantico: No se puede hacer la operacion *||* con datos distintos de *BOOL*.`);
            let error = new Errores('Semantico', 'No se puede hacer la oparación *||* con datos distintos de *BOOL*', this.linea, this.columna);
            Controlador.errores.push(error);
          }
        }
        else {
          //ERROR AL TRATAR DE OPERAR TIPOS DIFERENTES DE BOOLEANO
          Controlador.append(`Logica.ts - Error Semantico: No se puede hacer la operacion *&&* con datos distintos de *BOOL*.`);
          let error = new Errores('Semantico', 'No se puede hacer la oparación *&&* con datos distintos de *BOOL*', this.linea, this.columna);
          Controlador.errores.push(error);
        }
        break;
      case Operador.NOT:
        if (typeof valor_expU == 'boolean') {
          return !valor_expU;
        }
        else {
          //ERROR NO SE PUEDE CONTRADECIR UN TIPO DE DATO DIFERENTE DE BOOLEANO
          Controlador.append(`Logica.ts - Error Semantico: No se puede hacer la operacion *!* con datos distintos de *BOOL*.`);
          let error = new Errores('Semantico', 'No se puede hacer la oparación *!* con datos distintos de *BOOL*', this.linea, this.columna);
          Controlador.errores.push(error);
        }
      default:
        Controlador.append(`Logica.ts - Error Semantico {default}.`);
        let error = new Errores('Semantico', `Error Semantico {default - Logico}`, this.linea, this.columna);
        Controlador.errores.push(error);
        break;
    }
  }

  reportarError(controlador: Controlador, signo: string, desc1: string, desc2: string, linea: number, columna: number) {
    controlador.append(`Logica.ts - Error Semantico: variable *${desc1}* y *${desc2}* no coinciden en *${signo}*.`);
    let error = new Errores('Semantico', `${desc1} y ${desc2} no coinciden en ${signo}`, this.linea, this.columna);
    controlador.errores.push(error);
  }

  recorrer(): Nodo {
    throw new Error("Method not implemented.");
  }

}