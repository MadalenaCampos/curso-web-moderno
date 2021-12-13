import { Injectable } from "@angular/core";

// Aqui está sendo importado o HttpClient, que vem do HttpClientModule, e é atráves dele que a requisição para o back-end, nesse caso para nossa API(já pronta), atráves da injeção dessa dependencia lá no constructor, é possivel.
import { HttpClient } from "@angular/common/http";

// Para usar o metodo Observer, eu preciso importar o Observable, que será utilizado para entrar em contato com o meu backend, através da Url da minha API, nesse caso baseUrl.

// EMPTY, map e catchError é usado para os erros
import { EMPTY, Observable } from "rxjs"; 

import { map, catchError } from "rxjs/operators";


// Aqui etá importando o modelo de interface Product
import { Product } from "./product.model";

// Aqui é um recurso do Material, que será usado para exibir algumas mensagens do tipo toast, lembrando que, para injetalo aqui, de toda dorme é preciso importar o modulo dele lá app.model.ts, ou não irá funcionar.
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  // Essa classe pode ser injetada em outras classes
  providedIn: "root",
  // Esse service é um singleton, tem apenas uma instância, se tiver algum atributo que muda, esse valor serar compartilhado sempre que esse service for usado, ou seja, ele não cria um novo e te dará sempre uma instância nova.
})
export class ProductService {
  baseUrl = "http://localhost:3001/products"; // Chamando de baseUrl, aqui é a Url da minha API, criada lá na pasta backend, é através disso que ela poderá ser usada no meu CRUD para vizualização e manipulação dos dados da minha API.

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    // Dessa forma eu estou injentado o uso do MatSnackBar e do HttpClient nesse service, para que ele possa ser usado quando o service for injetado em alguma class component.
  }

  // Exemplo de uso da injeção
  // showOnConsole(msg: string): void { // Estou passando uma mensagem(msg) do tipo string e o método retorna void
  //   console.log(msg) // O que ue recebi ali em msg, eu vou exibir no console.
  // } // Vou levar esse service lá pro product-create.component.ts

  showMenssage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "x", {
      // Usando o método open no snackBar onde vou passar a msg, a action(local pra fechar, pode ser vazio, mas não tem como fechar, só quando passar o time) e suas configurações
      duration: 3000, // Duarção de 3s
      horizontalPosition: "right", // Posição horizontal do lado direito
      verticalPosition: "top", // Posição vertical no topo
      panelClass: isError ? ["msg-error"] : ["msg-success"],
      // Caso seja um erro, aplica estilo ["msg-error"], caso não, ou seja, caso seja um sucesso, aplicar estilo ["msg-success"]
    });
  }

  // Tratando o erro
  errorHandle(e: any): Observable<any> {
    // Recebe erro(e) do tipo any e retorna um Observable do tipo any.
    this.showMenssage("Ocorreu um erro!", true); // Aqui é pra retorna a mensagem de erro antes de rotornar o Observable vazio
    return EMPTY; // Retorna um Observable do tipo EMPTY, apartir do rxjs, é possivel ter um Observable vazio, vazio pois esse método também retorna um observable, mas como eu tenho um erro não irei retornar aquilo que stou realmente querendo obter.
  }

  create(product: Product): Observable<Product> {
    // Ela recebe como parametro um product, do tipo Product, ou seja, de acordo com a exportação da interface Product, que está em product.model.ts

    // Criar produto
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj), // Método map, que retorna obj retorna o próprio obj, pois o meu objetivo é...
      catchError((e) => this.errorHandle(e)) // ...fazer o catchError que é para tratar o error, caso aconteça algum erro no post, o tratamento pode ser diretamente aqui ou não
    );
    // A requisição http.post é para inserir um novo produto no backend, que recebe como parâmetro o link da API(baseUrl) e o product, que foi recebido como parametro no próprio método, nesse caso o create.
    // O método posto está retornando o Observable Product, que foi mencionado no próprio método como: Observable<Product>, pois o método post retorna por sí um observable de alguma coisa, nesse caso, de produto. Ou seja, eu envio um produto com name e price, e espero receber de volta um produto com id, name e price, o id será fornecido pelo próprio backend.

    // USA-SE O OBSERVABLE PORQUE ELE NÃO TEM A RESPOSTA DE IMEDIATO, ELE RETORNARÁ ALGO QUE É OBSERVAVEL, QUE CONSEGUE SE DETECTAR QUANDO A RESPOSTA ACONTECE, OU SEJA ELE SÓ SERÁ CHAMADO QUANDO UM EVENTO OCORRER, DE FORMA REATIVA !!!!
  } // Essa função permite mandar a requisição HTTP para o backend, para que eu possa inserir um novo produto. Esse método será disparado lá product-create.component.ts no EventBinding createProduct.

  // Ler produtp
  read(): Observable<Product[]> {
    // Ao inves de ler produto ele irá ler um array de produtos, uma lista com os produtos
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj), // Método map, que retorna obj retorna o próprio obj, pois o meu objetivo é...
      catchError((e) => this.errorHandle(e)) // ...fazer o catchError que é para tratar o error, caso aconteça algum erro no post, o tratamento pode ser diretamente aqui ou não
    );
    // http.get ler as requisições do backend, nem um dado é necessário como parâmetro
  }

  // Aqui é pra quando eu entrar no formulario de update, esse for já esteja preenchido com as informações que ue quero atualizar, e pra isso, é preciso fazer uma requisição oa Backend.
  readById(id: string): Observable<Product> {
    // Aqui é para que eu abra um produto através do seu id na URL
    const url = `${this.baseUrl}/${id}`; // Ou seja: http://localhost:3001/products/id
    return this.http.get<Product>(url).pipe(
      map((obj) => obj), // Método map, que retorna obj retorna o próprio obj, pois o meu objetivo é...
      catchError((e) => this.errorHandle(e)) // ...fazer o catchError que é para tratar o error, caso aconteça algum erro no post, o tratamento pode ser diretamente aqui ou não
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj), // Método map, que retorna obj retorna o próprio obj, pois o meu objetivo é...
      catchError((e) => this.errorHandle(e)) // ...fazer o catchError que é para tratar o error, caso aconteça algum erro no post, o tratamento pode ser diretamente aqui ou não
    );
  } // Resumindo, vou pegar um produto atráves da sua url que tem seu id, e irei fazer a edição

  // delete(product: Product): Observable<Product> {
  //   const url = `${this.baseUrl}/${product.id}`;
  //   return this.http.put<Product>(url, product);
  // }

  // Resposta

  delete(id: string | number): Observable<Product> {
    // Para excluir o produto o id já é o suficiente
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj), // Método map, que retorna obj retorna o próprio obj, pois o meu objetivo é...
      catchError((e) => this.errorHandle(e)) // ...fazer o catchError que é para tratar o error, caso aconteça algum erro no post, o tratamento pode ser diretamente aqui ou não
    );
  }
}
