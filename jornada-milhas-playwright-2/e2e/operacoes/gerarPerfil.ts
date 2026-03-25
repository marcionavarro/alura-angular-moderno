import { faker } from '@faker-js/faker/locale/pt_BR'

export enum Genero {
    MASCULINO = 'MASCULINO',
    FEMININO = 'FEMININO',
    OUTRO = 'OUTRO'
}

export type Perfil = {
    nome: string;
    dataNascimento: string;
    genero: Genero;
    cpf: string;
    telefone: string;
    cidade: string;
    estado: string;
    email: string;
    senha: string
}

function gerarNomePorGenero(genero: Genero) {
    const primeiroNome = genero === Genero.MASCULINO
        ? faker.person.firstName('male')
        : faker.person.firstName('female');

    return `${primeiroNome} ${faker.person.lastName()}`;
}

export function gerarPerfil() {
    const generoSelecionado = faker.helpers.enumValue(Genero);
    const generoFinal = generoSelecionado === Genero.OUTRO
        ? faker.helpers.arrayElement([Genero.MASCULINO, Genero.FEMININO])
        : generoSelecionado;

    return {
        nome: gerarNomePorGenero(generoFinal),
        dataNascimento: faker.date.birthdate(),
        genero: generoFinal,
        cpf: faker.string.numeric(11),
        telefone: faker.string.numeric(11),
        cidade: faker.location.city(),
        estado: faker.location.state(),
        email: faker.internet.email(),
        senha: faker.internet.password()
    }
}