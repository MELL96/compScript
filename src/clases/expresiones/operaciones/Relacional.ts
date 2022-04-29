import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";
import Errores from '../../Ast/Errores'

export default class Relacional extends Operacion implements Expresion {

  public constructor(exp1: Expresion, op: string, exp2: Expresion, linea: number, columna: number, expU: boolean) {
    super(exp1, op, exp2, linea, columna, expU);
  }

  getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
    let valor = this.getValor(controlador, ts);

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
     * de las operaciones relacionales permitidas que soporta el lenguaje descrito en el enunciado.
     */

    switch (this.operador) {
      case Operador.IGUALIGUAL:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1 == valor_exp2;
          }
          else if (typeof valor_exp2 === 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1 == valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL COMPARAR NUMBER CON STRING
              this.reportarError(Controlador, '==', 'NUMBER', 'STRING', this.linea, this.columna);
            }
          }
          else {
            //ERROR AL COMOPARAR TIPOS DE DATOS DISTINTOS
            this.reportarError(Controlador, '==', 'BOOL', 'STRING/CHAR/NUMBER', this.linea, this.columna);
          }
        }
        else if (typeof valor_exp1 === 'string') {
          if(valor_exp1.length === 1){
            if(typeof valor_exp2 === 'string' && valor_exp2.length === 1){
              return valor_exp1 === valor_exp2;
            } else if(typeof valor_exp2 === 'number'){
              return valor_exp1.charCodeAt(0) === valor_exp2;
            } else {
              this.reportarError(Controlador, '==', 'CHAR', 'STRING', this.linea, this.columna);
            }
          } else {
            if (typeof valor_exp2 === 'string' && valor_exp2.length !== 1) {
                return valor_exp1 === valor_exp2;
            } else {
              this.reportarError(Controlador, '==', 'STRING', 'CHAR', this.linea, this.columna);
            }
          }
          // COMENTARIO
        }
        else if (typeof valor_exp1 === 'boolean') {
          if (typeof valor_exp2 === 'boolean') {
            return valor_exp1 == valor_exp2;
          }
          else {
            //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
            this.reportarError(Controlador, '==', 'BOOL', 'STING/CHAR/NUMBER', this.linea, this.columna);
          }
        }
        break;
      case Operador.NOIGUAL:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1 != valor_exp2;
          }
          else if (typeof valor_exp2 === 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1 != valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
              this.reportarError(Controlador, '!=', 'NUMBER', 'STRING', this.linea, this.columna);
            }
          }
          else {
            //ERROR AL COMOPARAR TIPOS DE DATOS DISTINTOS
            this.reportarError(Controlador, '!=', 'NUMBER', 'STRING/BOOL', this.linea, this.columna);
          }
        }
        else if (typeof valor_exp1 === 'string') {
          if(valor_exp1.length === 1){
            if(typeof valor_exp2 === 'string' && valor_exp2.length === 1){
              return valor_exp1 !== valor_exp2;
            } else if(typeof valor_exp2 === 'number'){
              return valor_exp1.charCodeAt(0) !== valor_exp2;
            } else {
              this.reportarError(Controlador, '!=', 'CHAR', 'STRING', this.linea, this.columna);
            }
          } else {
            if (typeof valor_exp2 === 'string' && valor_exp2.length !== 1) {
                return valor_exp1 !== valor_exp2;
            } else {
              this.reportarError(Controlador, '!=', 'STRING', 'CHAR', this.linea, this.columna);
            }
          }
        }
        else if (typeof valor_exp1 === 'boolean') {
          if (typeof valor_exp2 === 'boolean') {
            return valor_exp1 != valor_exp2;
          }
          else {
            //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
            this.reportarError(Controlador, '!=', 'BOOL', 'STRING/NUMBER', this.linea, this.columna);
          }
        }
        break;
      case Operador.MENORQUE:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1 < valor_exp2;
          }
          else if (typeof valor_exp2 == 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1 < valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
              this.reportarError(Controlador, '<', 'NUMBER', 'STRING', this.linea, this.columna);
            }
          }
        }
        else if (typeof valor_exp1 === 'string') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1.charCodeAt(0) < valor_exp2;
          }
          else if (typeof valor_exp2 == 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1.charCodeAt(0) < valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
              this.reportarError(Controlador, '<', 'STRING', 'STRING', this.linea, this.columna);
            }
          }
        }
        else {
          //ERROR AL COMPARAR OTROS TIPOS DE DATOS
          this.reportarError(Controlador, '<', 'STRING', 'NUMBER/BOOL', this.linea, this.columna);
        }
        break;
      case Operador.MENORIGUAL:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1 <= valor_exp2;
          }
          else if (typeof valor_exp2 == 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1 <= valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
              this.reportarError(Controlador, '<=', 'NUMBER', 'STRING', this.linea, this.columna);
            }
          }
        }
        else if (typeof valor_exp1 === 'string') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1.charCodeAt(0) <= valor_exp2;
          }
          else if (typeof valor_exp2 == 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1.charCodeAt(0) <= valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
              this.reportarError(Controlador, '<=', 'STRING', 'CHAR', this.linea, this.columna);
            }
          }
        }
        else {
          //ERROR AL COMPARAR OTROS TIPOS DE DATOS
          this.reportarError(Controlador, '<=', 'BOOL', 'BOOL', this.linea, this.columna);
        }
        break;
      case Operador.MAYORQUE:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1 > valor_exp2;
          }
          else if (typeof valor_exp2 == 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1 > valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
              this.reportarError(Controlador, '>', 'NUMBER', 'CHAR', this.linea, this.columna);
            }
          }
        }
        else if (typeof valor_exp1 === 'string') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1.charCodeAt(0) > valor_exp2;
          }
          else if (typeof valor_exp2 == 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1.charCodeAt(0) > valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
              this.reportarError(Controlador, '>', 'STRING', 'CHAR', this.linea, this.columna);
            }
          }
        }
        else {
          //ERROR AL COMPARAR OTROS TIPOS DE DATOS
          this.reportarError(Controlador, '>', 'BOOL', 'BOOL', this.linea, this.columna);
        }
        break;
      case Operador.MAYORIGUAL:
        if (typeof valor_exp1 === 'number') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1 >= valor_exp2;
          }
          else if (typeof valor_exp2 == 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1 >= valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
              this.reportarError(Controlador, '>=', 'NUMBER', 'CHAR', this.linea, this.columna);
            }
          }
        }
        else if (typeof valor_exp1 === 'string') {
          if (typeof valor_exp2 === 'number') {
            return valor_exp1.charCodeAt(0) >= valor_exp2;
          }
          else if (typeof valor_exp2 == 'string') {
            if (valor_exp2.length == 1) {
              return valor_exp1.charCodeAt(0) >= valor_exp2.charCodeAt(0);
            }
            else {
              //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
              this.reportarError(Controlador, '>=', 'NUMBER', 'CHAR', this.linea, this.columna);
            }
          }
        }
        else {
          //ERROR AL COMPARAR OTROS TIPOS DE DATOS
          this.reportarError(Controlador, '>=', 'BOOL', 'BOOL', this.linea, this.columna);
        }
        break;
      default:
        Controlador.append(`Relacionals.ts - Error Semantico {default}.`);
        let error = new Errores('Semantico', `Error Semantico {default - Relacional}`, this.linea, this.columna);
        Controlador.errores.push(error);
        break;
    }
  }

  reportarError(controlador: Controlador, signo: string, desc1: string, desc2: string, linea: number, columna: number) {
    controlador.append(`Relacionals.ts - Error Semantico: variable *${desc1}* y *${desc2}* no coinciden en *${signo}*.`, "\n");
    let error = new Errores('Semantico', `${desc1} y ${desc2} no coinciden en ${signo}`, this.linea, this.columna);
    controlador.errores.push(error);
  }

  recorrer(): Nodo {
    throw new Error("Method not implemented.");
  }

}

/**
if (typeof valor_exp2 === 'string') {
if (valor_exp1.length == 1 && valor_exp2.length == 1) {
return valor_exp1 == valor_exp2;
}
else {
//ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
this.reportarError(Controlador, '==', 'STRING', 'STRING', this.linea, this.columna);
}

}
else {
//ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
this.reportarError(Controlador, '==', 'STRING', 'NUMBER/CHAR', this.linea, this.columna);
}
*/


// if (typeof valor_exp2 === 'string') {
//   if (valor_exp1.length == 1 && valor_exp2.length == 1) {
//     return valor_exp1 != valor_exp2;
//   }
//   else {
//     //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
//     this.reportarError(Controlador, '!=', 'CHAR', 'STRING/NUMBER', this.linea, this.columna);
//   }
// }
// else {
//   //ERROR AL COMPARAR TIPOS DE DATOS DISTINTOS
//   this.reportarError(Controlador, '!=', 'STRING', 'STRING/NUMBER/BOOL', this.linea, this.columna);
// }