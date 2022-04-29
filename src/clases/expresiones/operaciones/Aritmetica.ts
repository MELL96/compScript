import Errores from "../../Ast/Errores";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Operaciones, { Operador } from "./Operaciones";

export default class Aritmetica extends Operaciones implements Expresion {

  public constructor(exp1: Expresion, operador: string, exp2: Expresion, linea: number, columna: number, expU: boolean) {
    super(exp1, operador, exp2, linea, columna, expU);
  }

  getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
    let valor = this.getValor(controlador, ts);

    if (typeof valor === 'number') {
      return tipo.DOBLE;
    }
    else if (typeof valor === 'string') {
      return tipo.STRING;
    }
    else if (typeof valor === 'boolean') {
      return tipo.BOOLEANO;
    }
  }

  getValor(controlador: Controlador, ts: TablaSimbolos) {
    let valor_exp1;
    let valor_exp2;
    let valor_expU;

    if (this.expU == false) {
      valor_exp1 = this.exp1.getValor(controlador, ts);
      valor_exp2 = this.exp2.getValor(controlador, ts);
    }
    else {
      valor_expU = this.exp1.getValor(controlador, ts);
    }

    switch (this.operador) {
      
      case Operador.SUMA:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1 + valor_exp2;
          }
          else if (typeof valor_exp2 === 'boolean') {
            let bool = 1;
            if (valor_exp2 == false) {
              bool = 0;
            }
            return valor_exp1 + bool;
          }
          else if (typeof valor_exp2 === 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1 + valor_exp2.charCodeAt(0);
            }
            else {
              return valor_exp1 + valor_exp2;
            }
          }
        }
        else if (typeof valor_exp1 === 'boolean') {
          if (typeof valor_exp2 === 'number') {
            let bool = 1;
            if (valor_exp1 == false) {
              bool = 0;
            }
            return bool + valor_exp2;
          }
          else if (typeof valor_exp2 === 'string') {
            if (valor_exp2.length > 1) {
              return valor_exp1 + valor_exp2;
            }
            else {
              //ERROR AL CONCATENAR BOOLEAN Y CHAR
              this.reportarError(controlador, '+', 'BOOL', 'CHAR', this.linea, this.columna);
            }
          }
          else if (typeof valor_exp2 === 'boolean') {
            //ERROR AL CONCATENAR BOOLEAN CON BOOLEAN
            this.reportarError(controlador, '+', 'BOOL', 'BOOL', this.linea, this.columna);
          }
        }
        else if (typeof valor_exp1 === 'string') {
          if (valor_exp1.length == 1) {
            if (typeof valor_exp2 === 'number') {
              return valor_exp1.charCodeAt(0) + valor_exp2;
            }
            else if (typeof valor_exp2 === 'string') {
              return valor_exp1 + valor_exp2;
            }
            else if (typeof valor_exp2 === 'boolean') {
              //ERROR AL CONCATENAR CHAR CON BOOLEAN
              this.reportarError(controlador, '+', 'CHAR', 'BOOL', this.linea, this.columna);
            }
          }
          else {
            return valor_exp1 + valor_exp2;
          }
        }
        break;

      case Operador.UNARIO:
        if (typeof valor_expU == 'number') {
          return -valor_expU;
        }
        else {
          //ERROR AL VOLVER UNARIO UN TIPO DISTINTO A NUMERO
          controlador.append(`Aritmetica.ts - Error Semantico: Tipo de dato debe de ser *NUMBER*. L: ${this.linea}, C: ${this.columna}`, "\n");
          let error = new Errores('Semantico', 'BOOLEANO y CHAR no coinciden en +', this.linea, this.columna);
          controlador.errores.push(error);
        }
        break;
      
        case Operador.RESTA:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1 - valor_exp2;
          }
          else if (typeof valor_exp2 === 'boolean') {
            let bool = 1;
            if (valor_exp2 == false) {
              bool = 0;
            }
            return valor_exp1 - bool;
          }
          else if (typeof valor_exp2 === 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1 - valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL RESTAR NUMERO CON CADENA
              this.reportarError(controlador, '-', 'NUMBER', 'STRING', this.linea, this.columna);
            }
          }
        }
        else if (typeof valor_exp1 === 'boolean') {
          if (typeof valor_exp2 === 'number') {
            let bool = 1;
            if (valor_exp1 == false) {
              bool = 0;
            }
            return bool - valor_exp2;
          }
          else if (typeof valor_exp2 === 'boolean') {
            //ERROR AL RESTAR BOOLEAN CON BOOLEAN
            this.reportarError(controlador, '-', 'BOOL', 'BOOL', this.linea, this.columna);
          }
          else if (typeof valor_exp2 === 'string') {
            //ERROR AL RESTAR BOOLEAN CON STRING
            this.reportarError(controlador, '-', 'BOOL', 'STRING/CHAR', this.linea, this.columna);
          }
        }
        break;
      
        case Operador.MULTI:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1 * valor_exp2;
          }
          else if (typeof valor_exp2 === 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1 * valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL MULTIPLICAR NUMERO CON CADENA
              this.reportarError(controlador, '*', 'NUMBER', 'STRING', this.linea, this.columna);
            }
          }
          else if (typeof valor_exp2 === 'boolean') {
            //ERROR AL MULTIPLICAR NUMERO CON BOOLEAN
            this.reportarError(controlador, '*', 'NUMBER', 'BOOL', this.linea, this.columna);
          }
        }
        else if (typeof valor_exp1 === 'boolean') {
          //ERROR AL TENER AL INICIO UN BOOLEANO
          controlador.append(`Aritmetica.ts - Error Semantico: No se puede hacer la operacion * con tipo de dato inicial *BOOL*.`, "\n");
          let error = new Errores('Semantico', 'No se puede hacer la oparación * con tipo de dato inicial *BOOL*', this.linea, this.columna);
          controlador.errores.push(error);
        }
        else if (typeof valor_exp1 === 'string') {
          if (valor_exp1.length == 1) {
            if (typeof valor_exp2 === 'number') {
              return valor_exp1.charCodeAt(0) * valor_exp2;
            }
            else if (typeof valor_exp2 === 'boolean') {
              //ERROR AL MULTIPLICAR STRING CON BOOLEANO
              this.reportarError(controlador, '*', 'STRING', 'BOOL', this.linea, this.columna);
            }
            else if (typeof valor_exp2 === 'string') {
              //ERROR AL MULTIPLICAR CHAR CON STRING/CHAR
              this.reportarError(controlador, '*', 'CHAR', 'STRING/CHAR', this.linea, this.columna);
            }
          }
          else {
            //ERROR AL TENER DE INICIO UNA CADENA
            controlador.append(`Aritmetica.ts - Error Semantico: No se puede hacer la operacion * con tipo de dato inicial *STRING*.`, "\n");
            let error = new Errores('Semantico', 'No se puede hacer la oparación * con tipo de dato inicial *STRING*', this.linea, this.columna);
            controlador.errores.push(error);
          }
        }
        break;
      
      case Operador.DIV:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1 / valor_exp2;
          }
          else if (typeof valor_exp2 === 'boolean') {
            //ERROR AL DIVIDIR NUMERO ENTRE UN BOOLEANO
            this.reportarError(controlador, '/', 'NUMBER', 'BOOL', this.linea, this.columna);
          }
          else if (typeof valor_exp2 === 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1 / valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL DIVIDIR NUMERO ENTRE CADENA
              this.reportarError(controlador, '/', 'NUMBER', 'STRING', this.linea, this.columna);
            }
          }
        }
        else if (typeof valor_exp1 === 'boolean') {
          //ERROR AL TENER DE PRIMERO UN BOOLEANO
          controlador.append(`Aritmetica.ts - Error Semantico: No se puede hacer la operacion / con tipo de dato inicial *BOOL*.`, "\n");
          let error = new Errores('Semantico', 'No se puede hacer la oparación / con tipo de dato inicial *BOOL*', this.linea, this.columna);
          controlador.errores.push(error);
        }
        else if (typeof valor_exp1 === 'string') {
          if (valor_exp1.length == 1) {
            if (typeof valor_exp2 === 'number') {
              return valor_exp1.charCodeAt(0) / valor_exp2;
            }
            else if (typeof valor_exp2 === 'boolean') {
              //ERROR AL DIVIDIR CHAR CON BOOLEANO
              this.reportarError(controlador, '/', 'CHAR', 'BOOL', this.linea, this.columna);
            }
            else if (typeof valor_exp2 === 'string') {
              //ERROR AL DIVIDIR CHAR DENTRO DE CHAR/CADENA
              this.reportarError(controlador, '/', 'CHAR', 'STRING/CHAR', this.linea, this.columna);
            }
          }
          else {
            //ERROR AL TENER DE PRIMERO A UNA CADENA EN UNA DIVISION
            controlador.append(`Aritmetica.ts - Error Semantico: No se puede hacer la operacion / con tipo de dato inicial *STRING*.`, "\n");
            let error = new Errores('Semantico', 'No se puede hacer la oparación / con tipo de dato inicial *STRING*', this.linea, this.columna);
            controlador.errores.push(error);
          }
        }
        break;
      
      case Operador.POTEN:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return Math.pow(valor_exp1, valor_exp2);
          }
          else {
            //ERROR NO SE PUEDE COMBINAR NUMERO CON OTRO TIPO DE DATO
            controlador.append(`Aritmetica.ts - Error Semantico: No se puede hacer la operacion ^ con datos distintos de *NUMBER*.`, "\n");
            let error = new Errores('Semantico', 'No se puede hacer la oparación ^ con datos distintos de *NUMBER*', this.linea, this.columna);
            controlador.errores.push(error);
          }
        }
        else {
          //ERROR NO SE PUEDE USAR POW SI NO ES NUMERO
          controlador.append(`Aritmetica.ts - Error Semantico: No se puede hacer la operacion ^ con datos distintos de *NUMBER*.`, "\n");
          let error = new Errores('Semantico', 'No se puede hacer la oparación ^ con datos distintos de *NUMBER*', this.linea, this.columna);
          controlador.errores.push(error);
        }
        break;
      
      case Operador.MODULO:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1 % valor_exp2;
          }
          else {
            //ERROR NO SE PUEDE COMBINAR NUMERO CON OTRO TIPO DE DATO
            controlador.append(`Aritmetica.ts - Error Semantico: No se puede hacer la operacion % con datos distintos de *NUMBER*.`, "\n");
            let error = new Errores('Semantico', 'No se puede hacer la oparación % con datos distintos de *NUMBER*', this.linea, this.columna);
            controlador.errores.push(error);
          }
        }
        else {
          //ERROR NO SE PUEDE USAR POW SI NO ES NUMERO
          controlador.append(`Aritmetica.ts - Error Semantico: No se puede hacer la operacion % con datos distintos de *NUMBER*.`, "\n");
          let error = new Errores('Semantico', 'No se puede hacer la oparación % con datos distintos de *NUMBER*', this.linea, this.columna);
          controlador.errores.push(error);
        }
        break;
      
      default:
        controlador.append(`Aritmetica.ts - Error Semantico {default}.`, "\n");
        let error = new Errores('Semantico', `Error Semantico {default - Aritmetica}`, this.linea, this.columna);
        controlador.errores.push(error);
        break;
    }
  }

  recorrer(): Nodo {
    let padre = new Nodo("Exp", "");

    if (this.expU) {
      padre.AddHijo(new Nodo(this.op, ""));
      padre.AddHijo(this.exp1.recorrer());
    }
    else {
      padre.AddHijo(this.exp1.recorrer());
      padre.AddHijo(new Nodo(this.op, ""));
      padre.AddHijo(this.exp2.recorrer());
    }
    return padre;
  }

  reportarError(controlador: Controlador, signo: string, desc1: string, desc2: string, linea: number, columna: number) {
    controlador.append(`Aritmetica.ts - Error semantico: dato *${desc1}* y *${desc2}* no coinciden en *${signo}*. L:${linea}, C: ${columna}` , "\n");
    let error = new Errores('Semantico', 'BOOLEANO y CHAR no coinciden en +', this.linea, this.columna);
    controlador.errores.push(error);
  }
}
