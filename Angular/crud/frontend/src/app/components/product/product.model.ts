// Para as interações com o backend, o Angular, espera consumir isso a partir de um modelo que tenha os atributos bem definidos para que seja possivel trabalhar com eles.

export interface Product {
  // Deve-se se informar o atributo e o seu tipo.
  id?: string | number; // O uso da ? após o nome do atributo, o torna opcional.
  name: string;
  price: number | null;
}

// Na clase de modelo, se exporta uma inteface com os atributos, caso você crie um objeto e ele seja desse modelo de interface, esse objeto, obrigatoriamente, terá que ter os atributos que são definifdos nessa classe, podem ser obrigatórios ou não.
