import { Component, OnInit } from "@angular/core";
import { Product } from "./../product.model";
import { ProductService } from "./../product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    }); // Aqui é pra autocompletar o form através do id de cada produto
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMenssage("Produto deletado com sucesso");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]); // Volta para a tabela dos produtos
  }
}
