import { render, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

// Describe refere se ao componente que está sendo testado
describe("App Component", () => {
  //IT é cada caso de teste do componente, este primeiro validará se a lista foi renderizada
  it("should render list items", () => {
    // na função render vinda do testing-library conseguimos alguns métodos para buscar elemento em tela

    //Métodos get são síncronos e buscam algo na tela no caso getByText busca por um texto
    const { getByText } = render(<App />);

    expect(getByText("Douglas")).toBeInTheDocument();
    expect(getByText("Jéssica")).toBeInTheDocument();
    expect(getByText("Gabriel")).toBeInTheDocument();
  });

  it("should be able to add new item to the list", async () => {
    //Métodos find são assíncronos e aguardam algo aparecer na tela
    const { getByText, getByPlaceholderText, findByText } = render(<App />);

    const inputElement = getByPlaceholderText("Novo Item");
    const addButton = getByText("Adicionar");

    // userEvent são acções do usuário como click, digitação ... é uma altenartiva atual para os fireEvents

    userEvent.type(inputElement, "Novo");

    userEvent.click(addButton);

    expect(await findByText("Novo")).toBeInTheDocument();
  });

  it("should be able to remove item to the list", async () => {
    const { getAllByText, queryByText } = render(<App />);

    const removeButtons = getAllByText("Remover");

    userEvent.click(removeButtons[0]);

    // Método waitFor aguarda até o elemento aparecer/desaparecer em tela
    // Método query faz o inverso do get este método retorna null quando não encontra o elemento
    await waitForElementToBeRemoved(() => {
      return queryByText("Douglas");
    });
  });
});
