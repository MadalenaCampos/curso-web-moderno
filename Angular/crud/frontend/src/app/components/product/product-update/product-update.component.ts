import { Product } from "./../product.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  // (!) Esse é o operador de asserção não nulo. É uma maneira de dizer ao compilador "esta expressão não pode ser null ou undefined aqui, então não reclame sobre a possibilidade de ser null ou undefined." Às vezes, o verificador de tipos é incapaz de fazer essa determinação em si. Como desenvolvedor, eu sei melhor que você que esta variável não pode ser nula agora

  product: Product; // Usso do assert como solução temporario, procurar forma de corrigir isso

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute // Injeção da rota para pegar o parâmetro usando o: router.snapshot.paramMap
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id"); // Esse id é exatamento o que foi defnido lá nas rotas.
    // Com isso, atráves da pegada  dos parametros (router.snapshot.paramMap), eu pego os parametros através da chave do parametro, que é o id, e assim vou conseguir exibi-los lá no form.
    this.productService.readById(id).subscribe((product) => {
      // Com isso eu recebo o id através da navegação
      // Aqui usei o assert mas poderia usar o string | null lá em readById
      this.product = product;
    });
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      // Chamando o service para fazer a edição lá no backend. Como a resposta é um observable eu posso usar um subscribe.
      this.productService.showMenssage("Produto atualizado com sucesso"); // Aqui é para exibir a menssagenzinha no canto da tela, assim que for editado.
      this.router.navigate(["/products"]); // Quanod terminar ele volta para a lista de produtos.
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]); // Volta para a tabela dos produtos
  }
}
