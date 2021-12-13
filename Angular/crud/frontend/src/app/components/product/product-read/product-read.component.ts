import { Component, OnInit } from "@angular/core";
import { Product } from "./../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent implements OnInit {
  products: Product[] = [];

  displayedColumns = ["id", "name", "price", "action"];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.read().subscribe((products) => {
      this.products = products; // Sobreescrevendo terei os produtos e como resposta da minha requisição eu terei, também os produtos atribuidos ao o que foi definidoi acima como: products: Product[] = [];.
    }); // Esses produtos são acessados apartir do momento que acesso /products
  }
}
