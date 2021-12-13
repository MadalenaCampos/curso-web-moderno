import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Importação dos componentes para a criação das rotas
import { HomeComponent } from "./views/home/home.component";
import { ProductCrudComponent } from "./views/product-crud/product-crud.component";
import { ProductCreateComponent } from "./components/product/product-create/product-create.component";
import { ProductUpdateComponent } from "./components/product/product-update/product-update.component";
import { ProductDeleteComponent } from "./components/product/product-delete/product-delete.component"

const routes: Routes = [
  { path: "", component: HomeComponent }, // Na raiz, esse componente será exibido
  { path: "products", component: ProductCrudComponent }, // Em products, esse componente será exibido
  { path: "products/create", component: ProductCreateComponent }, // Em criar produto, esse componente será exibido
  { path: "products/update/:id", component: ProductUpdateComponent }, // Esse parâmetro id, vai me permitir a exibição do produto
  { path: "products/delete/:id", component: ProductDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
