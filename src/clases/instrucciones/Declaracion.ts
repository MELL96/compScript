import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";

export default class Declaracion implements Instruccion {

  public type: Tipo;
  public stype: string;
  public lista_simbolos: Array<Simbolos>;

  public linea: number;
  public columna: number;

  constructor(type, lista_simbolos, linea, columna) {
    this.type = type;
    this.lista_simbolos = lista_simbolos;
    this.linea = linea;
    this.columna = columna;
  }

  ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    for (let simbolo of this.lista_simbolos) {
      let variable = simbolo as Simbolos;
      if (ts.existeEnActual(variable.identificador)) {
        let error = new Errores('Semantico', `Variable ${variable.identificador} existente.`, this.linea, this.columna);
        controlador.errores.push(error);
        controlador.append(`Declaracion.ts - Error Semantico: variable *${variable.identificador}* existente. L: ${this.linea}, C: ${this.columna}`, "\n");
        continue;
      }

      if (variable.valor != null) {
        let valor = variable.valor.getValor(controlador, ts);
        let tipo_valor = variable.valor.getTipo(controlador, ts);

        if (tipo_valor == this.type.type || (tipo_valor == tipo.DOBLE && this.type.type == tipo.ENTERO || tipo.CHAR && this.type.type == tipo.CHAR)) {
          let nuevo_simb = new Simbolos(variable.simbolo, this.type, variable.identificador, valor);
          ts.agregar(variable.identificador, nuevo_simb);
        }
        else {
          let error = new Errores('Semantico', `Variable ${variable.identificador} no es del mismo tipo`, this.linea, this.columna);
          controlador.errores.push(error);
          controlador.append(`Declaracion.ts - Error Semantico: variable *${variable.identificador}* no es del mismo tipo. L: ${this.linea}, C: ${this.columna}`, "\n");
          continue;
        }

      } else {
        let nuevo_simb = new Simbolos(variable.simbolo, this.type, variable.identificador, null);
        ts.agregar(variable.identificador, nuevo_simb);
      }
    }
  }

  recorrer(): Nodo {
    throw new Error("Method not implemented.");
  }
}
