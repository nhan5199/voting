import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VotingResultComponent } from './voting-result/voting-result.component';
import { HomeComponent } from './home/home.component';
import { VoteCommitComponent } from './vote-commit/vote-commit.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'result', component: VotingResultComponent },
  { path: 'commit', component: VoteCommitComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
