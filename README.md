# Uber Email Service - Desafio Técnico Back-End

Este projeto resolve o desafio técnico de back-end proposto pela Uber, disponível em: [coding-challenge.md](https://github.com/uber-archive/coding-challenge-tools/blob/master/coding_challenge.md)

## Descrição Geral

O serviço implementa uma API robusta para envio de e-mails, com arquitetura escalável, modular e tolerante a falhas, utilizando NestJS e TypeScript. O sistema é capaz de alternar automaticamente entre múltiplos provedores de e-mail (SendGrid e AWS SES), garantindo alta disponibilidade e resiliência.

## Funcionalidades

- **Envio de e-mails**: Endpoint único para envio de e-mails, recebendo destinatário, assunto e corpo da mensagem.
- **Fallback automático**: Caso o envio falhe em um provedor, o sistema tenta automaticamente o próximo disponível.
- **Validação de dados**: Todos os campos do e-mail são validados (e-mail, assunto, corpo).
- **Tratamento de erros**: Respostas claras para falhas de validação, falha total de provedores ou erros internos.
- **Arquitetura limpa**: Separação em camadas (apresentação, aplicação, domínio, infraestrutura), facilitando manutenção e testes.

## Arquitetura

- **Camada de Apresentação**: Controller expõe o endpoint `/email-service` para envio de e-mails via POST.
- **Camada de Aplicação**: Serviço orquestra o envio, delegando para o mecanismo de fallback.
- **Domínio**: Entidades, casos de uso e regras de negócio do envio de e-mail.
- **Infraestrutura**: Integração com provedores externos (SendGrid, SES) e mecanismo de fallback.

## Endpoint

### POST `/email-service`

Envia um e-mail utilizando o(s) provedor(es) configurado(s).

#### Exemplo de requisição:

```json
{
  "to": "destinatario@exemplo.com",
  "subject": "Assunto do e-mail",
  "body": "Conteúdo do e-mail"
}
```

#### Respostas possíveis:

- **201**: E-mail enviado com sucesso
- **400**: Erro de validação dos dados
- **500**: Falha total ao enviar o e-mail (todos os provedores falharam)

## Provedores de E-mail

- **SendGrid**: Integração via SDK oficial, envio de e-mails e tratamento de erros.
- **AWS SES**: Integração via AWS SDK, envio de e-mails e tratamento de erros.
- **Fallback**: Se um provedor falhar, o próximo é tentado automaticamente.

## Validação

O DTO `EmailSenderDto` garante que:

- `to`: e-mail válido e não vazio
- `subject`: string não vazia, até 255 caracteres
- `body`: string não vazia

## Testes Unitários

O projeto possui testes unitários cobrindo:

- Serviço de envio de e-mails (`EmailSenderService`): garante que o fallback é chamado corretamente.
- Entidade de e-mail: valida construção e serialização.
- Erros de domínio: valida construção e propriedades dos erros customizados.

Os testes podem ser executados com:

```bash
npm run test
```

## Como rodar o projeto

```bash
npm install
npm run start:dev
```

## Observações

- É necessário configurar as variáveis de ambiente para os provedores de e-mail (SendGrid, SES).
- O projeto segue princípios de Clean Architecture e SOLID.

---

Projeto desenvolvido para fins de avaliação técnica.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
