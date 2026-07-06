# Auditoria de Estilização

Data da auditoria: 2026-07-06

## Resumo executivo

A interface perdeu a estilização porque o projeto está usando Tailwind CSS 4, mas o arquivo global ainda usa a sintaxe de entrada do Tailwind 3:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Com a versão instalada (`tailwindcss 4.3.2` e `@tailwindcss/postcss 4.3.2`), essa configuração está gerando apenas uma parte pequena das utilities. As classes que dependem do tema padrão do Tailwind, como espaçamentos, cores, bordas, fontes e sombras, não estão sendo emitidas no CSS final.

Isso faz com que o JSX ainda tenha `className`, mas a maior parte dessas classes não exista no CSS compilado.

## Evidências encontradas

### Versões instaladas

O projeto usa Tailwind 4:

- `tailwindcss`: `4.3.2`
- `@tailwindcss/postcss`: `4.3.2`

Arquivos relacionados:

- `package.json`
- `package-lock.json`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `src/app/globals.css`

### Entrada CSS incompatível com Tailwind 4

Arquivo auditado:

```txt
src/app/globals.css
```

Conteúdo atual:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

No Tailwind 4, a entrada recomendada é baseada em:

```css
@import "tailwindcss";
```

Como o projeto está em Tailwind 4, a entrada atual não carrega corretamente o conjunto completo de theme/utilities esperado.

### CSS compilado não contém classes usadas pelo app

O CSS gerado em `.next/static/chunks/...css` existe, mas não contém várias classes usadas em praticamente todos os componentes.

Classes presentes no JSX, mas ausentes no CSS compilado:

```txt
p-5
px-4
py-3
rounded-lg
bg-white
text-white
text-slate-950
shadow-soft
shadow-premium
h-10
h-11
gap-3
border-slate-200
bg-blue-600
dark:bg-slate-950
```

Isso explica por que a interface parece HTML sem estilização: os elementos renderizam, mas as classes principais não possuem regras CSS correspondentes.

## Checklist solicitado

### Tailwind está sendo aplicado corretamente?

Não completamente.

O PostCSS está chamando `@tailwindcss/postcss`, mas a entrada CSS está no padrão antigo. O resultado é um CSS parcial, com algumas utilities simples/arbitrárias, mas sem grande parte das classes essenciais.

### Todas as classes `className` ainda existem?

As classes continuam no JSX, mas muitas não existem no CSS final.

O problema não é remoção de `className`; é falha na geração das utilities.

### Algum componente perdeu as classes?

Não foi identificado um componente específico que tenha perdido classes.

Os componentes ainda possuem muitas classes Tailwind, por exemplo:

- `src/components/layout/app-shell.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/order-table.tsx`
- `src/app/login/page.tsx`
- `src/app/dashboard/page.tsx`

### Algum componente foi sobrescrito?

Não há evidência de sobrescrita de componente por duplicidade.

Existe apenas um conjunto de componentes em `src/components/ui`.

### Algum CSS foi removido?

O arquivo `src/app/globals.css` existe e é importado em `src/app/layout.tsx`.

Não parece ser um problema de CSS removido. O problema é a forma como o Tailwind 4 está processando esse CSS.

### Existe algum erro na configuração do Next.js?

Não foi identificado erro direto em `next.config.mjs`.

O arquivo contém:

```js
turbopack: {
  root: __dirname
}
```

Isso não explica a perda da estilização.

### Existem arquivos duplicados?

Não foram encontrados arquivos duplicados relevantes de configuração ou CSS.

Arquivos únicos encontrados:

- `src/app/globals.css`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `next.config.mjs`

O agrupamento por nome mostra múltiplos `page.tsx`, mas isso é normal no App Router do Next.js.

### Existe mistura de Tailwind v3 e v4?

Sim.

Este é o principal problema encontrado.

O projeto instalou Tailwind 4, mas mantém padrões de Tailwind 3:

- `@tailwind base`
- `@tailwind components`
- `@tailwind utilities`
- `tailwind.config.ts` com `content`
- tema estendido em `tailwind.config.ts`

No Tailwind 4, a configuração pode continuar existindo em alguns cenários, mas a entrada CSS precisa estar alinhada ao novo modelo. Hoje o CSS compilado comprova que o tema padrão não está sendo disponibilizado corretamente para gerar classes como `p-5`, `bg-white`, `rounded-lg`, etc.

### Os componentes do shadcn continuam funcionando?

O projeto não usa o pacote oficial `shadcn/ui` diretamente. Ele possui componentes locais no estilo shadcn:

- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/badge.tsx`

Esses componentes renderizam corretamente, mas dependem de classes Tailwind. Como as utilities não são geradas, eles parecem sem estilo.

### Existem componentes renderizando HTML puro?

Sim, mas isso não é a causa principal.

Há uso intencional de HTML nativo em alguns pontos:

- tabelas em `order-table.tsx`, `usuarios/page.tsx`, `permissoes/page.tsx`
- `input`, `select` e `button` diretos no `AppShell`
- wrappers locais em `src/components/ui/input.tsx`, `button.tsx`, `card.tsx`

Isso é normal para este projeto. O problema é que as classes Tailwind aplicadas a esses elementos não estão sendo geradas.

## Causa raiz

A causa raiz é incompatibilidade entre:

1. Tailwind CSS instalado na versão 4.
2. Entrada CSS e parte da configuração ainda no padrão Tailwind 3.

O sintoma técnico é:

```txt
className existe no JSX
CSS global é importado
PostCSS roda
mas o CSS final não contém utilities essenciais
```

## Correção proposta

Escolher um dos caminhos abaixo.

### Opção recomendada: alinhar o projeto ao Tailwind 4

Atualizar `src/app/globals.css` para usar a entrada do Tailwind 4:

```css
@import "tailwindcss";
```

Depois, migrar tokens customizados como `shadow-soft`, `shadow-premium`, cores semânticas e dark mode para o modelo compatível com Tailwind 4.

Também revisar o `postcss.config.mjs` para manter apenas o plugin correto:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {}
  }
};

export default config;
```

### Opção alternativa: voltar para Tailwind 3

Fixar versões compatíveis com Tailwind 3:

```txt
tailwindcss@3
postcss
autoprefixer
```

E trocar o PostCSS para:

```js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};

export default config;
```

Essa opção preserva melhor o uso atual de `tailwind.config.ts`, `content`, `theme.extend` e `@tailwind base/components/utilities`.

## Correção mais segura para este projeto

Como o projeto já está escrito no padrão Tailwind 3 e usa `tailwind.config.ts` com `theme.extend`, a correção com menor risco é voltar para Tailwind 3 ou migrar cuidadosamente todos os tokens para Tailwind 4.

Se a prioridade for recuperar a interface rapidamente sem alterar layout:

1. Fixar Tailwind em versão 3.
2. Ajustar `postcss.config.mjs` para o plugin `tailwindcss`.
3. Manter `src/app/globals.css` com `@tailwind base/components/utilities`.
4. Rodar build e verificar se classes como `p-5`, `bg-white`, `rounded-lg`, `shadow-soft` e `bg-blue-600` aparecem no CSS compilado.

## Observação final

Não foi encontrado problema principal nos componentes, no App Router, no import do `globals.css`, nem no `next.config.mjs`.

A perda visual vem da geração incompleta do CSS pelo Tailwind.
