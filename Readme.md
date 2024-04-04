<h1 align="center">
    <img alt="NLW Unite logo, orange background with black closed HTML tag" title="#NLW-Unite-logo" src="https://github.com/ArthurFakhouri/NLW-Unite-Server/blob/main/.github/logo.svg" width="250px" />
</h1>

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**.

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

## Requisitos

### Requisitos funcionais

- [ ✔ ] O organizador deve poder cadastrar um novo evento;
- [ ✔ ] O organizador deve poder visualizar dados de um evento;
- [ ✔ ] O organizador deve poder visualizar a lista de participantes;
- [ ✔ ] O organizador deve poder se inscrever em um evento;
- [ ✔ ] O organizador deve poder visualizar seu crachá de inscrição;
- [ ✔ ] O organizador deve poder realizar check-in no evento;

### Regras de negócio

- [ ✔ ] O participante só pode se inscrever em um evento uma única vez;
- [ ✔ ] O participante só pode se inscrever em eventos com vagas disponíveis;
- [ ✔ ] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [ ✔ ] O check-in no evento será realizado através de um QRCode;

## Comandos de execução

### Instalar dependências
```bash
npm install
```

### Executar em modo de desenvolvimento
```bash
npm run dev
```

### Executar em modo de produção
01 - (Para gerar a aplicação e converter para Javascript)
```bash
npm run build
```
02 - (Para rodar a aplicação gerada)
```bash
npm start
```

### Executar migrations
```bash
npm run db:migrate
```

### Executar o Prisma Studio
```bash
npm run db:studio
```

![Swagger of project](https://cdn.discordapp.com/attachments/727827658964205599/1225100220959031296/image.png?ex=661fe67d&is=660d717d&hm=5f5e541f624b5668f3034d6553110bfffa266a2b2fefcd4cb2f21498ef9fe230& "Swagger of project")

