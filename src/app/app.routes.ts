import { Routes } from '@angular/router';
import { ListarOrcamentosComponent } from './features/orcamentos/components/listar-orcamentos/listar-orcamentos.component';
import { NovoOrcamentoComponent } from './features/orcamentos/components/novo-orcamento/novo-orcamento.component';
import { OrcamentoComponent } from './features/orcamentos/components/orcamento/orcamento.component';
import { ListarCotacoesComponent } from './features/cotacoes/components/listar-cotacoes/listar-cotacoes.component';
import { CotacaoComponent } from './features/cotacoes/components/cotacao/cotacao.component';
export const routes: Routes = [
  {
    path: 'cotacao/:id',
    component: CotacaoComponent,
    title: 'Cotação',
  },
  {
    path: 'cotacoes',
    component: ListarCotacoesComponent,
    title: 'Cotações',
  },
  {
    path: 'orcamento/:id',
    component: OrcamentoComponent,
    title: 'Orçamento',
  },
  {
    path: 'orcamentos',
    component: ListarOrcamentosComponent,
    title: 'Orçamentos',
  },
  {
    path: 'novo-orcamento',
    component: NovoOrcamentoComponent,
    title: 'Novo Orçamento',
  },
];
