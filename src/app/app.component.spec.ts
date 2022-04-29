import { Component, PLATFORM_INITIALIZER } from '@angular/core';
import * as analizador from '../Clases/Analizar';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = '.typesty';
  tabsim = true
  taberr = true
  declare require : any;
  entrada: string = '';
  consola: string = "";

  recorrer(): void {
    let ana = new analizador.Analizador();

    if (this.entrada != "") {
      let nodo_ast = ana.recorrer(this.entrada);
      let grafo = nodo_ast.GraficarSintactico();  //Aqui tenemos la cadena de graphviz para graficar
    }
  }

  ejecutar(): void {
    let ana = new analizador.Analizador();
    this.consola = "";

    if (this.entrada != "") {
      let ejecutar = ana.ejecutar(this.entrada);

      this.consola = ejecutar.consola;
      document.getElementById("tablaS").innerHTML = ejecutar.ts;      
    }
  }

  mostrarGuardar(){    
    let display = document.getElementById('hideSection').style.display = 'block';
  }

  guardarArchivo() {    
    var inputValue = (<HTMLInputElement>document.getElementById('namets')).value;
    var FileSaver = require('file-saver')
    var blob = new Blob([this.entrada],{type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, `${inputValue}.ty`);   
    document.getElementById('hideSection').style.display = 'none';
  }


  mostrarTabla(){
    this.taberr = true;
    this.tabsim = false;
  }

}