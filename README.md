# Sra Santos — Protótipo de e-commerce de joias

[![CI/CD](https://github.com/BigodeMarine/Prototipo-E-comerce/actions/workflows/ci.yml/badge.svg)](https://github.com/BigodeMarine/Prototipo-E-comerce/actions/workflows/ci.yml)

Protótipo navegável para apresentar uma proposta de loja de joias. Possui identidade em tons de rosa, catálogo ilustrativo e uma experiência completa de compra simulada.

**Acesse o site:** [prototipo-e-comerce.vercel.app](https://prototipo-e-comerce.vercel.app)

## Funcionalidades

- Página inicial com anel prateado em 3D, pedra azul oval e pedras laterais.
- Rotação contínua de 14 segundos, com pausa fora da tela e respeito à preferência de movimento reduzido.
- Ilustração alternativa quando WebGL não estiver disponível.
- Catálogo com 10 peças fictícias, dividido em anéis, brincos, colares e pulseiras.
- Busca, filtros por categoria e ordenação por preço ou nome.
- Favoritos e sacola persistidos no navegador com `localStorage`.
- Seleção de tamanhos e variações, alteração de quantidades e remoção de itens.
- Simulação de frete e checkout com opções demonstrativas de Pix e cartão.
- Layout responsivo, cards e botões arredondados.
- Navegação por teclado, diálogos acessíveis e indicação explícita de conteúdo demonstrativo.

## Executar localmente

Não há dependências JavaScript para instalar, nem etapa de build. É necessário apenas um navegador moderno. Para iniciar um servidor local, use Python 3:

```bash
git clone https://github.com/BigodeMarine/Prototipo-E-comerce.git
cd Prototipo-E-comerce
python3 -m http.server 8000 --directory dist
```

No Windows, se `python3` não estiver disponível, use `py -m http.server 8000 --directory dist`.

Abra **http://localhost:8000**. Para encerrar o servidor, pressione `Ctrl+C`.

Também é possível servir a pasta `dist/` com outra ferramenta de servidor estático. As fontes são locais; a interface não depende de Google Fonts ou bibliotecas de terceiros carregadas pela rede.

## Estrutura do projeto

```text
.
├── README.md
├── .gitignore
└── dist/
    ├── index.html                 # Estrutura da página e estilos responsivos
    ├── app.js                     # Catálogo, SVGs e interações da loja
    ├── hero-3d.js                 # Modelo do anel e animação em WebGL
    └── assets/
        ├── Rajdhani-Regular.ttf
        ├── Rajdhani-SemiBold.ttf
        ├── ShareTechMono-Regular.ttf
        ├── OFL.txt                # Licença da Rajdhani
        └── ShareTechMono-OFL.txt  # Licença da Share Tech Mono
```

## Tecnologias

Interface estática em **HTML, CSS e JavaScript**, com renderização 3D nativa no navegador.

### Interface e experiência

![HTML5](https://img.shields.io/badge/HTML5-AD1C5C?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-ED1268?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-AD1C5C?style=for-the-badge&logo=javascript&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL-ED1268?style=for-the-badge&logo=webgl&logoColor=white)
![SVG](https://img.shields.io/badge/SVG-AD1C5C?style=for-the-badge&logo=svg&logoColor=white)

| Tecnologia | Papel no projeto |
| --- | --- |
| **HTML5** | Estrutura das páginas, formulários e diálogos acessíveis. |
| **CSS3** | Identidade visual rosa, layout responsivo e cards e botões arredondados. |
| **JavaScript** | Busca, filtros, favoritos, sacola e checkout demonstrativo. |
| **WebGL · GLSL** | Geometria, materiais, iluminação e rotação do anel 3D com shaders próprios. |
| **SVG** | Ilustrações das peças, cenário do destaque e ícones da interface. |
| **Web Storage · localStorage** | Persistência de favoritos e sacola no navegador. |

### Testes e entrega

![Node.js](https://img.shields.io/badge/Node.js_22-AD1C5C?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-ED1268?style=for-the-badge)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-AD1C5C?style=for-the-badge&logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-ED1268?style=for-the-badge&logo=vercel&logoColor=white)

| Ferramenta | Papel no projeto |
| --- | --- |
| **Node.js 22 · npm** | Servidor estático de desenvolvimento, verificação de sintaxe e execução dos testes. |
| **Playwright · Chromium** | Testes de navegação, compra simulada, responsividade e animação 3D. |
| **GitHub Actions** | Automação da CI e do deploy após a aprovação dos testes. |
| **Vercel CLI** | Publicação de produção na Vercel, quando os secrets estiverem configurados. |

O site funciona sem framework, etapa de build ou bibliotecas 3D externas. As dependências de desenvolvimento são usadas nos testes; as fontes ficam hospedadas junto ao projeto.

## Identidade visual

A tipografia usa **Rajdhani** em títulos e textos e **Share Tech Mono** nos rótulos e detalhes, seguindo a referência do [portfólio de BigodeMarine](https://github.com/BigodeMarine/Portfolio). A organização da vitrine foi inspirada na [Berzerk](https://berzerk.com.br).

| Aplicação | Cor |
| --- | --- |
| Rosa escuro — textos, botões e rodapé | `#ad1c5c` |
| Pink — destaques | `#ed1268` |
| Rosa intenso | `#ed3379` |
| Rosa intermediário | `#ef5b91` |
| Rosa suave | `#f28eaf` |
| Rosa claro — coleções | `#f7bdd2` |
| Rosa pastel — cards | `#f8d5e3` |
| Rosa muito claro — fundo | `#fbe5ed` |

O anel em destaque é uma reconstrução visual aproximada da referência fotográfica fornecida: aro fino prateado, pedra azul oval e pedras laterais. Não é um modelo técnico do produto real.

## Personalizar

- **Produtos:** edite o array `products` em `dist/app.js`.
- **Cores, tipografia e arredondamento:** edite os estilos em `dist/index.html`.
- **Textos e seções:** edite `dist/index.html`.
- **Geometria, materiais e velocidade do anel:** edite `dist/hero-3d.js`.

## Roteiro de apresentação

1. Explore as coleções e filtre por Anéis.
2. Abra Anel Órbita e selecione Aro 16.
3. Adicione à sacola e altere a quantidade.
4. Simule o frete com o CEP `01001-000`.
5. Continue usando os dados fictícios já preenchidos.
6. Experimente Pix ou cartão e conclua a simulação.

## Integração contínua (CI)

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) executa em pushes e pull requests para `main`, e também pode ser iniciado manualmente pela aba **Actions**.

A CI usa Node.js 22 e Chromium para:

1. Instalar as dependências de teste com `npm ci`, usando o lockfile.
2. Verificar a sintaxe dos scripts JavaScript.
3. Testar catálogo, busca, ordenação, favoritos, persistência da sacola, totais, frete e checkout.
4. Verificar o layout em cinco larguras de tela e o menu móvel.
5. Verificar a renderização e rotação do anel 3D e o modo de movimento reduzido.

O relatório HTML fica disponível como artifact `playwright-report` por 7 dias. Falhas também incluem screenshots e traces para diagnóstico. Após a CI passar, o job de CD publica a branch `main` na Vercel, quando os secrets estiverem configurados. Pull requests executam somente os testes.

Para executar os mesmos checks localmente, com Node.js 22 ou superior:

```bash
npm ci
npx playwright install chromium
npm run ci
```

Para abrir a interface interativa dos testes, execute `npm run test:ui`. O servidor estático dos testes é iniciado automaticamente pelo Playwright.

## Deploy contínuo (CD) na Vercel

O mesmo workflow publica o site em produção **somente depois que o job de CI passar**, em pushes para `main` ou execução manual do workflow nessa branch. A URL publicada aparece no resumo da execução e no ambiente `production` do GitHub.

### Configuração inicial

1. Crie ou selecione o projeto **Sra Santos** na Vercel.
2. No seu computador, dentro deste repositório, execute:

   ```bash
   npx vercel@63.1.2 link
   ```

   Faça login, escolha a conta ou equipe correta e selecione o projeto. Esse comando gera `.vercel/project.json`, que não deve ser commitado.
3. Em [Vercel → Account Settings → Tokens](https://vercel.com/account/tokens), crie um token com acesso à conta ou equipe do projeto.
4. No GitHub, abra **Settings → Secrets and variables → Actions → New repository secret** e cadastre:

   | Secret | Valor |
   | --- | --- |
   | `VERCEL_TOKEN` | Token criado na Vercel |
   | `VERCEL_ORG_ID` | Campo `orgId` de `.vercel/project.json` |
   | `VERCEL_PROJECT_ID` | Campo `projectId` de `.vercel/project.json` |

5. Na aba **Actions**, abra **CI/CD → Run workflow**, selecione `main` e execute. Novos pushes para `main` também acionam o fluxo.

Enquanto os secrets não estiverem cadastrados, o job informa quais nomes faltam e **não executa a publicação**. Nenhum token deve ser colocado no código ou no README.

### Configuração do projeto estático

[`vercel.json`](vercel.json) define `dist` como diretório de saída e dispensa build e instalação de dependências de produção. A Vercel CLI está fixada na versão `63.1.2` no workflow.

A opção `git.deploymentEnabled: false` desativa os deployments automáticos da integração Git da Vercel, para que a publicação seja feita pelo workflow após a CI. Com essa configuração, os deploys e previews automáticos do Git ficam desativados; o CD deste projeto publica somente produção.

O arquivo [`.vercelignore`](.vercelignore) exclui testes, relatórios e dependências locais do envio. A configuração `.vercel/` fica ignorada pelo Git. O workflow não cancela deploys de produção em andamento quando chega outro push; pull requests podem cancelar checks anteriores.

## Verificações realizadas

O protótipo foi verificado no Chromium com busca, filtros, ordenação, favoritos, variações, persistência da sacola, quantidades, frete e checkout. O layout foi verificado em diferentes larguras de tela; a rotação 3D e o modo de movimento reduzido também foram verificados.

## Limites do protótipo

A marca apresentada, o catálogo, as ilustrações, os materiais, os preços, as medidas e os prazos são demonstrativos. Não existem estoque, pedidos reais, atendimento ou integração de pagamento. Nenhum pagamento é realizado e nenhuma peça é enviada.

Somente favoritos e sacola são salvos localmente no navegador. Os campos de entrega não são armazenados nem transmitidos. Use apenas dados fictícios e não informe dados bancários ou de cartão.

## Próximos passos para uma loja real

Validar identidade da marca, classificação dos produtos, composição, fotos, preços e políticas comerciais. Integrar uma plataforma de comércio com gestão de estoque, pedidos, pagamentos, frete e atendimento antes de aceitar compras reais.

---

feito com café e muito javascript
