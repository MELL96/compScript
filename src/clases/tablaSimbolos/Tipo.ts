/*
 * @enum de Tipo nos permite enumerar los tipos del lenguaje
 */

export enum tipo {
  ENTERO,
  DOBLE,
  BOOLEANO,
  STRING,
  CHAR,
  VOID
}

/*
* @class clase sirve para llevar el control de los tipos de los simbolos del lenguaje
*/

export default class Tipo {

  public type: tipo;
  public stype: string;

  constructor(stype: string) {
    this.stype = stype;
    this.type = this.getTipo(stype);
  }

  getTipo(stype: string): tipo {
    if (stype == 'DOBLE') {
      return tipo.DOBLE;
    }
    else if (stype == 'ENTERO') {
      return tipo.ENTERO;
    }
    else if (stype == 'STRING') {
      return tipo.STRING;
    }
    else if (stype == 'CHAR') {
      return tipo.CHAR;
    }
    else if (stype == 'BOOLEAN') {
      return tipo.BOOLEANO;
    }
    else if (stype == 'VOID') {
      return tipo.VOID;
    }
  }

  getStype(): string {
    return this.stype;
  }

}