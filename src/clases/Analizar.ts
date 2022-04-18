import * as sintactico_interprete from '../interprete/interprete'
import Controlador from './Controlador';
import { TablaSimbolos } from './tablaSimbolos/TablaSimbolos';

/*
 * @class Esta clase manda a analizar la entrada 
 */

export class Analizador {

  public recorrer(input) {
    try {
      let ast = sintactico_interprete.parse(input);
      let nodo_ast = ast.recorrer();
      return nodo_ast;

    }
    catch (error) {

    }
  }

  public ejecutar(input): any {
    try {
      let ast = sintactico_interprete.parse(input);
      let controlado = new Controlador();
      let ts_global = new TablaSimbolos(null);

      ast.ejecutar(controlado, ts_global);

      let ts_html = controlado.graficar_ts(controlado, ts_global);
      let retorno = { "errores": controlado.errores, "ts": ts_html, "consola": controlado.consola }
      return retorno;
    }
    catch (error) {
      console.log("Ocurrio un error al analizar la entrada");
      return "Ocurrio un error al analizar"
    }
  }

  public ejecutarE(input): any {

  }

}