import { test } from '../setup/fixtures';

test.describe("Página de Login", () => {
  test("Deve conseguir fazer login com email e senha válidos", async ({ paginaLogin }) => {
    await paginaLogin.fazerLogin('marcionavarro@email.com', 'admin123');
    await paginaLogin.loginFeitoComSucesso();
  });

  test("Não deve conseguir fazer login com email inválido", async ({ paginaLogin }) => {
    await paginaLogin.fazerLogin('marcionavarro.errado@alura.com', 'admin123');
    await paginaLogin.estaMostrandoMensagemDeErro('Você não está autorizado a acessar este recurso');
  });
});
