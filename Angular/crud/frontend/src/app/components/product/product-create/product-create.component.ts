import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service"; // Aqui eu consigo trazer o service product.service.ts importando-o para usa-lo no constructor
import { Product } from "./../product.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  // Aqui é um modelo vazio de product que o form irá preencher para usar no método createProduct
  product: Product = {
    name: "",
    price: null,
  };

  // Aqui no constructor eu consigo trazer o service product.service.ts usando: private productService: ProductService
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Aqui eu posso chamar o service, e acessar os métodos dentro dele:
    // this.productService.showOnConsole('teste...')
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      // O método subscribe, me notificará quando a resposta chegar
      this.productService.showMenssage("Produto criado"); // Essa menssagem só será mostrada quando eu apertar no botão que usa essa função
      this.router.navigate(["/products"]); // Só irá para essa rota quando eu apertar no botão que usa essa função função
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]); // Só irá para essa rota quando eu apertar no botão que usa essa função
  }

  // Atributo
  // propLegal = "qualquer"
  // A intenção é fazer um biding desse atributo.

  // Toda vez que o evento que o chama acontecer ele irá dar o console.
  // fazerAlgo(): void {
  //   console.log('Fazendo algo')
  // }
}
