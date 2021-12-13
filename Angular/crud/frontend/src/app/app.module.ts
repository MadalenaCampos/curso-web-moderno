import { NgModule, LOCALE_ID } from "@angular/core";
// O LOCALE_ID é para que ao usar o currency no pipe, eu possa personalizar os separadores.
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

// Aqui está sendo importado o HttpClientModule, é atráves dele que a requisição para o back-end, nesse caso para nossa API(já pronta), é possivel, ele precisa ser injetado lá no service.
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms"; // É necessario esse import para usar formulários

// Está importando os componentes, isso é feito de forma automática
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/template/header/header.component";
import { FooterComponent } from "./components/template/footer/footer.component";
import { NavComponent } from "./components/template/nav/nav.component";
import { HomeComponent } from "./views/home/home.component";
import { ProductCrudComponent } from "./views/product-crud/product-crud.component";
import { ProductCreateComponent } from "./components/product/product-create/product-create.component";
import { ProductReadComponent } from "./components/product/product-read/product-read.component";
import { ProductRead2Component } from "./components/product/product-read2/product-read2.component";

// Impotações de modulos do Material, tudo que foi importado aqui, deve ser referenciado em imports.
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
// As importações a seguir, foram feitas automaticamente pelo uso do Schematic do angular.
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

// Importação das diretivas criadas
import { RedDirective } from "./directives/red.directive"; // Essa diretiva muda a cor de um elemento para a cor vermelha
import { ForDirective } from "./directives/for.directive"; // Essa diretiva é para criar um laço for, sera usado no footer, apenas por questões práticas

// Tudo isso é só pra usar o LOCALE_ID
import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    // Componentes, Diretivas e Pipes
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    ProductCrudComponent,
    ProductCreateComponent,
    ProductReadComponent,
    ProductRead2Component,
    RedDirective,
    ForDirective,
    ProductUpdateComponent,
    ProductDeleteComponent,
  ],
  // Está importando os componentes e diretivas, isso é feito de forma automática
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    // As importações a seguir, foram feitas automaticamente pelo uso do Schematic do angular.
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    {
      // Tudo isso é só pra usar o LOCALE_ID
      provide: LOCALE_ID,
      useValue: "pt-BR",
    },
  ],
  bootstrap: [AppComponent], // Componente que irá inicializar a aplicação
})
export class AppModule {}
