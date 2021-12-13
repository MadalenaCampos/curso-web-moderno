import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router"; // Isso é necesario para seja possivel fazer navegação com o botão, etc...

@Component({
  selector: "app-product-crud",
  templateUrl: "./product-crud.component.html",
  styleUrls: ["./product-crud.component.css"],
})
export class ProductCrudComponent implements OnInit {
  constructor(private router: Router, private headerService: HeaderService) {
    // Apartir do momento em que o Angular percebeu que dentro do construtor do componente eu declaro que preciso do router e seu tipo, ele será capaz de fornecer automatcamente um sem que ue precise ir atrás de instanciar ele, pois o responsavel por isso é o Angular.

    headerService.headerData = {
      title: "Produtos",
      icon: "storefront",
      routeUrl: "/products",
    };
  }

  ngOnInit(): void {}

  navigateToProductCreate(): void {
    this.router.navigate(["/products/create"]); 
    // Apartid do: (private router: Router) eu posso usar as rotas, aqui eu quero dizer que quando apertar o botão lá no .html, irei navegar para a rota /products/create, que inclusive, foi criada no arquivo app-routing.module.ts
  }
}
