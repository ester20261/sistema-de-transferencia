# AGENTS.md

## Objetivo do projeto

Este projeto é um sistema SaaS de gestão operacional de solicitações, agendamentos de veículos, documentação fiscal e controle de permissões por cargo/coluna.

A primeira etapa do projeto é exclusivamente frontend, usando dados mockados.
O backend será integrado futuramente com Supabase.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase futuramente
- Netlify para deploy
- GitHub para versionamento

## Diretrizes gerais

- Não implementar backend real nesta fase.
- Não implementar autenticação real nesta fase.
- Usar dados mockados organizados em arquivos separados.
- Criar componentes reutilizáveis.
- Manter arquitetura preparada para integração futura com Supabase.
- Evitar lógica espalhada diretamente nas páginas.
- Centralizar tipos em `lib/types.ts`.
- Centralizar permissões mockadas em `lib/permissions.ts`.
- Centralizar dados fictícios em `lib/mock-data.ts`.

## Backend futuro

O backend será Supabase e deverá futuramente incluir:

- Supabase Auth
- Postgres
- Row Level Security
- Permissões por usuário
- Permissões por cargo
- Permissões por coluna
- Histórico de alterações
- Notificações
- Auditoria

## Regras de frontend

- Toda permissão nesta fase é apenas visual/mockada.
- Campos bloqueados devem aparecer desabilitados.
- Colunas sem permissão de edição devem mostrar ícone de bloqueio.
- Perfis mockados devem simular a experiência futura.
- O layout deve ser responsivo.
- A interface deve ser profissional, moderna e clara.

## Perfis mockados

- Admin
- Solicitante
- Agendador
- Fiscal / Documentação
- Visualizador

## Fluxo principal

1. Solicitante cria pedido.
2. Pedido aparece na operação.
3. Agendador recebe notificação simulada.
4. Agendador preenche dados de transporte.
5. Fiscal preenche NF, CTE e MDFE.
6. Status operacional é atualizado.
7. Histórico simulado registra as alterações.

## Cuidados

- Não expor chaves reais.
- Não criar dependência obrigatória de Supabase nesta fase.
- Não criar estrutura que dificulte integração futura.
- Não usar dados reais de clientes, motoristas ou documentos.
- Usar apenas dados fictícios.

## Deploy futuro

O projeto será desenvolvido localmente, enviado ao GitHub e publicado no Netlify antes da integração com Supabase.

## Padrão esperado

O sistema deve parecer um produto real desde a primeira versão, mesmo funcionando com dados mockados.
