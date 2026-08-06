# Página de vendas - Administração Linux Sênior

Site estático pronto para GitHub Pages. Não utiliza framework, build, banco de dados ou dependências externas.

## Antes de publicar

1. Abra `assets/js/config.js`.
2. Substitua `checkoutUrl` pelo link do checkout da Kiwify.
3. Preencha `supportEmail` se desejar mostrar um canal de suporte.
4. Substitua `SEU-USUARIO` nos seguintes arquivos:
   - `assets/js/config.js`
   - `index.html` nos campos canonical e Open Graph
   - `robots.txt`
   - `sitemap.xml`
5. Não envie o PDF do ebook para o repositório público.

## Publicação rápida no GitHub Pages

1. Crie um repositório, por exemplo `administracao-linux-senior`.
2. Envie o conteúdo desta pasta para a raiz do repositório.
3. Abra **Settings > Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde a publicação.

A URL normalmente terá o formato:

`https://SEU-USUARIO.github.io/administracao-linux-senior/`

## Teste local

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080`.

## Arquivos principais

- `index.html`: página de vendas.
- `assets/css/style.css`: design responsivo.
- `assets/js/config.js`: checkout, e-mail e URL canônica.
- `assets/js/app.js`: menu, checkout, UTM e interações.
- `KIWIFY_PRODUTO.md`: textos prontos para cadastro.
- `termos.html` e `privacidade.html`: páginas legais iniciais.
- `assets/img/produto-kiwify-1000x1000.jpg`: imagem quadrada do produto.

## Rastreamento

A página preserva automaticamente `utm_*`, `src`, `sck`, `fbclid`, `gclid` e `ttclid` ao encaminhar para o checkout. Não há pixel ou analytics habilitado por padrão.

## Observação legal

Revise termos, privacidade, dados de contato e política comercial conforme sua operação antes de publicar.
