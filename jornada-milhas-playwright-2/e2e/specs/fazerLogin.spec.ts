import { gerarPerfil } from 'e2e/operacoes/gerarPerfil';
import { test } from '../setup/fixtures';
import PaginaCadastro from 'e2e/page-objects/PaginaCadastro';

test.describe("Página de Login", () => {
  test("Deve conseguir fazer login com email e senha válidos", async ({ paginaLogin, paginaCadastro }) => {
    const novoUsuario = gerarPerfil();

    await paginaCadastro.visitar();
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();

    await paginaLogin.visitar();
    await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha);
    await paginaLogin.loginFeitoComSucesso();
  });

  test("Não deve conseguir fazer login com email inválido", async ({ paginaLogin }) => {
    await paginaLogin.fazerLogin('marcionavarro.errado@alura.com', 'admin');
    await paginaLogin.estaMostrandoMensagemDeErro('Você não está autorizado a acessar este recurso');
  });
});
