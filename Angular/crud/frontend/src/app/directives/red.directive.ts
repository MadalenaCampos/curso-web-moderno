import { Directive, ElementRef } from "@angular/core";

// Essa é uma  diretiva de atributo, que é capaz de mexer tanto no comportamento como no estilo do componente.

@Directive({
  selector: "[appRed]", // E assim que será chamado, pode mudar se quiser.
})
export class RedDirective {
  constructor(private el: ElementRef) {
    // Aqui eu quero que ele injete uma referência para o elemento, para que eu possa trabalhar com ele e aplicar a cor, usando o principio da injeção de dependencia eu declaro um atributo chamado el que será do tipo ElementRef, ou seja, uma referência d eum elemento.
    el.nativeElement.style.color = "#e35e6b";
    // Aqui pego o el, usando o elemento nativo e aplico o style.color e informo qual a cor.
  }
}
