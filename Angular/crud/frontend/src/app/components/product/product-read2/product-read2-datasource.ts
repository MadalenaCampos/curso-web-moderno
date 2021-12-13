import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { map } from "rxjs/operators";
import { Observable, of as observableOf, merge } from "rxjs";

import { Product } from "./../product.model"; // Importado para uso como exemplo

// TODO: Replace this with your own data model type
// export interface ProductRead2Item {
//   Essa é a interface de como os dados da lista devem ser
//   name: string;
//   id: number;
// }

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: ProductRead2Item[] = [
//   Essa é a lista mockada dos dados, baseda na interface acima ProductRead2Item
//   { id: 1, name: "Hydrogen" },
//   { id: 2, name: "Helium" },
//   { id: 3, name: "Lithium" },
//   { id: 4, name: "Beryllium" },
//   { id: 5, name: "Boron" },
//   { id: 6, name: "Carbon" },
//   { id: 7, name: "Nitrogen" },
//   { id: 8, name: "Oxygen" },
//   { id: 9, name: "Fluorine" },
//   { id: 10, name: "Neon" },
//   { id: 11, name: "Sodium" },
//   { id: 12, name: "Magnesium" },
//   { id: 13, name: "Aluminum" },
//   { id: 14, name: "Silicon" },
//   { id: 15, name: "Phosphorus" },
//   { id: 16, name: "Sulfur" },
//   { id: 17, name: "Chlorine" },
//   { id: 18, name: "Argon" },
//   { id: 19, name: "Potassium" },
//   { id: 20, name: "Calcium" },
// ];

const EXAMPLE_DATA: Product[] = [
  // Aqui estou usando a interface criada por mim em product.model, com isso irei substituir todos os ProductRead2Item por Product, pois a referência para a classe ProductRead2Item não está sento mais usada.
  { id: 1, name: "Camisa azul- P", price: 19.99 },
  { id: 2, name: "Vestido rosa- M", price: 129.99 },
  { id: 3, name: "Bermuda branca- G", price: 59.99 },
];

/**
 * Data source for the ProductRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductRead2DataSource extends DataSource<Product> {
  // Essa é uma classe que extende uma fonte de dados, com 3 atributos
  data: Product[] = EXAMPLE_DATA; // Alista de produtos
  // Mais final como esses componentes são colocados no dataSource? Lá no componente, graças ao uso do decorator @ViewChild, que é um filho da view, onde se passa o tipo de componente e ele percorre a parte visual e procura onde tá o componente e o coloca dentro de uma variavel, ou seja, ele pega a instancia e o coloca dentro da classe TS.
  paginator: MatPaginator | undefined; // Paginador que aponta para MatPaginator, que o componente inferior de paginação
  sort: MatSort | undefined; // Aqui é o que faz a ordenação dos dados, e tambḿe cuida da paginação

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    // Método que faz a conexão entre o dataSource e a tábela, abaixo ele faz uma junçao de tudo aquilo que influencia na tabela e que vai gerar impacto na sua renderização: dados, paginação e ordenação dos dados. Chama o merge do RXJS pra que tudo funcione.
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        "Please set the paginator and sort on the data source before connecting."
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Product[]): Product[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
      // O splice método que pega um subArray dentro de um Array maior, que é para a paginação.
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]): Product[] {
    if (!this.sort || !this.sort.active || this.sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === "asc";
      switch (this.sort?.active) {
        case "name":
          return compare(a.name, b.name, isAsc);
        case "id":
          return compare(Number(a.id), Number(b.id), isAsc);
        // Aqui ao inves de apenas a.id tive que colocar Number(a.id), por conta de uma atualização TS.
        case "price": // Aqui é mais uma questão de lógica para que o preço fique em ordem crescente ou não
          return compare(Number(a.price), Number(b.price), isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
