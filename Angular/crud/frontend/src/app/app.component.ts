import { Component } from "@angular/core";

@Component({
  selector: "app-root", // Seletor, como será referenciado no .html
  // A seguir, ficaria o template que estaria presente no .html, pois com o uso do --minimal, ele vem para o .ts.
  // template: ``,
  // Para não colocar o temlate aqui, é possivel "importar" o .html aqui, para que fique mais organizado.
  templateUrl: 'app.component.html',
  // styles: [], Aqui ficaria o estivo, mas não é necessario usar nessa aplicação.
})
export class AppComponent { }
