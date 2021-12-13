import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
// import { ProductRead2DataSource, ProductRead2Item } from "./product-read2-datasource";
import { ProductRead2DataSource } from "./product-read2-datasource"; // Removido o ProductRead2Item, poque agora estou usando o Product, criado por mim, por isso, o mesmo está sendo importado abaixo.
import { Product } from "./../product.model"; // Com isso o que era ProductRead2Item será susbstituido por Product, apenas.

@Component({
  selector: "app-product-read2",
  templateUrl: "./product-read2.component.html",
  styleUrls: ["./product-read2.component.css"],
})
export class ProductRead2Component implements AfterViewInit {
  // Aqui é como os componentes: MatPaginator, MatSort e MatTable são colocados no dataSource
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: ProductRead2DataSource; // 4° atributo, está sendo criado para que, depois que a tela é inicializada e tudo é instanciado ele irá setar o que ele encontrou apartir dos decorators acima.

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["id", "name", "price"]; // Colunas exibidas na tabela, tem que bater com o matColumnDef

  constructor() {
    this.dataSource = new ProductRead2DataSource(); // Isso faz referência a classe criada no dataSource, com arquivos mockados.
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource; // Ao inves de iniciado aqui, ele também pode ser iniciado através de um property binding lá no .html, porém com isso a paginação e ordenação não iriam funcionar. Mas é importante ressaltar que, sem uma dessas coisas os dados não seriam mostrados.
  }
}
