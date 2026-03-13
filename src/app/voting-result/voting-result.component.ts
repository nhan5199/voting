import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';


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

    this.loadData(); // first load

  this.intervalId = setInterval(() => {
    this.loadData();
  }, 1000000);
  }

  async loadData() {
  const o1 = await firstValueFrom(this.firebaseService.getVote(1)) as any;
  const o2 = await firstValueFrom(this.firebaseService.getVote(2)) as any;
  const o3 = await firstValueFrom(this.firebaseService.getVote(3)) as any;
  const o4 = await firstValueFrom(this.firebaseService.getVote(4)) as any;

  const MAX_VALUE = 500;

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
    },
    {
      performanceName: o4.performanceName,
      teamName: o4.teamName,
      option: 4,
      count: o4.votes || 0,
      percent: Math.min(((o4.votes || 0) / MAX_VALUE) * 100, 100)
    }
  ];
}

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  
  async clearData() {
    await this.firebaseService.clearAllData();
  }
}
