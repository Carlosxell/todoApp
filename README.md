### OOTZ - Teste

#### Project setup
Em primeiro lugar é necessário que você tenha o '**_yarn_**' instalado e saiba como utilizar o **_terminal_** para rodar os comandos da aplicação. A Aplicação foi desenvolvida para rodar '**_https_**' localmente e abaixo terá uma explicação para isso caso siga essa linha, porém devido a API não ter suporte a '**_https_**', deixei tudo voltado para '**_http_**', caso queira rodar a aplicação em '**_https_**' só seguir os comandos de explicação abaixo.

Em sua máquina e rode o comando abaixo para instalação dos pacotes(**Obs:** é necessário que você já tenha acessado a pasta do projeto pela linha de comando) :
```
yarn install
```

Em Seguida para compilar o projeto, rode o seguinte comando na pasta do projeto

```
yarn serve
```

Caso tenha feito tudo corretamente o projeto estará rodando em **_http://localhost:8080/_**.

#### Project setup para rodar em HTTPS

Vá no arquivo **_vue.config.js_** no projeto e descomente a chave '_devServer_'.

O Próximo passo é instalar o pacote '_mkcert_' para poder trabalhar com o HTTPS de forma local. Siga as intruções para instalação de acordo com o seu sistema operacional no [link do projeto](https://github.com/FiloSottile/mkcert) e depois efetue os seguintes comandos na pasta do projeto:

```
mkcert -install
```

```
mkcert licensed "*.licensed" licensed localhost 127.0.0.1 ::1
```

Em Seguida para compilar o projeto, rode o seguinte comando na pasta do projeto

```
yarn serve
```

Caso tenha feito tudo corretamente o projeto estará rodando em **_https://localhost:8080/_**.
