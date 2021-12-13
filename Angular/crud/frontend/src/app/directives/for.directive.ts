import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";

// Essa é uma diretiva estrutural, que é criada da mesma forma de uma diretiva de atributo

@Directive({
  selector: "[myFor]", // Aqui eu modifiquie o seletor, antes era appFor
})
export class ForDirective implements OnInit {
  // Implementado um ciclo de vida, nesse caso o de inicialização, mas poderia ser o de mudança, onChange

  @Input("myForEm") numbers: number[] = []; // Ou seja apartir de "em" será um array de numeros, number[1, 2, 3], pode usar mais de um parametro se quiser.

  constructor(
    // Injeções:
    private container: ViewContainerRef, // Injeção
    private template: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    // Método de inicialização
    for (let number of this.numbers) {
      // Pegue o número de números e
      this.container.createEmbeddedView(this.template, { $implicit: number }); // CRie dentro do container um template para cada repetição do laço, nesse caso number(número), e o template é o li, e dentro desse template exista um valor implicito que o que está senod percorrido dentro do laço for
    }
  }
}
