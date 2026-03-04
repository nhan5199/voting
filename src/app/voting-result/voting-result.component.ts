import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-voting-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voting-result.component.html',
  styleUrl: './voting-result.component.scss',
})
export class VotingResultComponent implements OnInit, OnDestroy {
  items: any[] = [];
  intervalId: any;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    const option1$ = this.firebaseService.getVote(1);
    const option2$ = this.firebaseService.getVote(2);
    const option3$ = this.firebaseService.getVote(3);

    combineLatest([option1$, option2$, option3$])
      .subscribe(([o1, o2, o3] : any[]) => {

        const MAX_VALUE = 600; // adjust if needed

        this.items = [
          {
            performanceName: o1.performanceName,
            teamName: o1.teamName,
            option: 1,
            count: o1.votes || 0,
            percent: Math.min(((o1.votes || 0) / MAX_VALUE) * 100, 100)
          },
          {
            performanceName: o2.performanceName,
            teamName: o2.teamName,
            option: 2,
            count: o2.votes || 0,
            percent: Math.min(((o2.votes || 0) / MAX_VALUE) * 100, 100)
          },
          {
            performanceName: o3.performanceName,
            teamName: o3.teamName,
            option: 3,
            count: o3.votes || 0,
            percent: Math.min(((o3.votes || 0) / MAX_VALUE) * 100, 100)
          }
        ];
      });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  
  async clearData() {
    await this.firebaseService.clearAllData();
  }
}
