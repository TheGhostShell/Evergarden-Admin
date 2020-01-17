import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TablesComponent} from './tables.component';
import {SmartTableComponent} from './smart-table/smart-table.component';
import {TreeGridComponent} from './tree-grid/tree-grid.component';
import {ArticleListComponent} from './article-list/article-list.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
    {
      path: 'article-list',
      component: ArticleListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule {
}

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  TreeGridComponent,
  ArticleListComponent,
];
