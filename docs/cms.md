# Gestão de conteúdos

Painel: https://amfermino.com/admin/

## Publicações em português e inglês

Em **Publicações**, crie ou abra um artigo. Preencha o título, a data, a imagem,
o texto em português e, se existir, o documento técnico. Para disponibilizar a
tradução, preencha **Título em inglês**, **Resumo em inglês** e **Conteúdo completo
em inglês** no mesmo registo. A pré-visualização apresenta os dois textos e o PDF.

Ao publicar, o site gera as duas páginas e os links entre idiomas. Imagem, data e
PDF são partilhados. Os PDFs técnicos existentes estão em português. Se o texto
em inglês ficar vazio, o artigo continua disponível em português e a listagem
inglesa identifica o link como “Read in Portuguese”. Os endereços das duas
traduções já publicadas foram preservados.

Novas publicações recebem automaticamente o idioma português e o layout de artigo.
O endereço inglês é gerado automaticamente; não precisa de editar ficheiros.
O botão de publicação grava directamente na branch `main`, iniciando o deploy.

## Portfólio

Use **Portfólio do site → Destaques e projectos** para editar as imagens, legendas,
descrições acessíveis e títulos de ampliação em ambos os idiomas. A primeira lista
controla os quatro destaques da página inicial. A segunda controla a página de
portfólio, incluindo a categoria usada pelos filtros. Arraste os itens para mudar
a ordem. Pode acrescentar projectos à segunda lista.

**Arquivo fotográfico** continua a guardar o arquivo histórico; não controla os
destaques do site.

## Serviços

Em **Serviços · PT** ou **Services · EN**, cada serviço tem a sua própria imagem e
descrição acessível. Alterar a ordem ou criar um serviço não muda a imagem dos
outros serviços. Edite as duas línguas nas respectivas colecções.

## Acesso e autenticação

A integração existente usa Decap CMS com Netlify Identity e Git Gateway. O
projecto não muda de fornecedor de autenticação nem cria permissões automaticamente.
O Git Gateway está descontinuado para novas configurações, mas a Netlify mantém
o funcionamento das configurações existentes:
https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/

No painel https://app.netlify.com/projects/amfermino/identity, verifique os
utilizadores autorizados, a preferência de registo e o serviço Git Gateway. Para
um painel editorial, use convites para os editores autorizados. Links de convite,
confirmação e recuperação que chegam à página inicial são encaminhados para
`/admin/`, mantendo o token no fragmento do navegador.

A confirmação de produção exige uma sessão real de editor: entrar no painel,
abrir uma publicação, verificar os dois textos e o PDF e guardar uma alteração
editorial válida. Depois, confirmar o deploy e o resultado no site. O teste local
não comprova o login, as permissões do Git Gateway ou o envio de emails.

## Desenvolvimento e verificação

Com as dependências instaladas e Ruby/Bundler e Node no `PATH`:

```sh
bundle exec jekyll serve
```

Noutro terminal:

```sh
npm run admin
```

Abra http://localhost:4000/admin/. O modo local grava ficheiros no computador;
não faz publicações remotas. Para testes automáticos:

```sh
python3 tests/verify_cms.py
node --test tests/auth-redirect.test.cjs
```

O teste de integração usa uma cópia temporária e verifica uma nova publicação
bilingue sem idioma explícito, os links e PDFs, os endereços existentes, alterações
nos destaques, novos projectos e imagens de serviços após reordenação.
