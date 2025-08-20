import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VotingResultComponent } from './voting-result/voting-result.component';
import { HomeComponent } from './home/home.component';
import { VoteCommitComponent } from './vote-commit/vote-commit.component';
import { VotingBossComponent } from './voting-boss/voting-boss.component';
import { ResultBossComponent } from './result-boss/result-boss.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'result', component: VotingResultComponent },
  { path: 'result-boss', component: ResultBossComponent },
  { path: 'voting-boss', component: VotingBossComponent },
  { path: 'commit', component: VoteCommitComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
