import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voting-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voting-result.component.html',
  styleUrl: './voting-result.component.scss',
})
export class VotingResultComponent implements OnInit, OnDestroy {
  items: any[] = [];
  constructor(private firebaseService: FirebaseService) {}

  intervalId: any;
  async ngOnInit() {
    this.items = [
    {
      performanceName: 'Tiết mục 1',
      teamName: 'Tiết mục 1',
      option: 1,
      count: 0
    },
    {
      performanceName: 'Tiết mục 2',
      teamName: 'Tiết mục 2',
      option: 2,
      count: 0
    },
    {
      performanceName: 'Tiết mục 3',
      teamName: 'Tiết mục 3',
      option: 3,
      count: 0
    },
  ];
    this.getData();
    this.intervalId = setInterval(() => {
      this.getData();
    }, 2000); // 2 seconds
  }

  async getData() {
    const data = await firstValueFrom(this.firebaseService.getData('items'));
    
    this.items = this.aggregateVotes(data);
  }

  // aggregateVotes(data: any[]): any[] {
  //   const countMap = new Map<string, number>();

  //   data.forEach(({ name, detail, option }) => {
  //     const key = `${name}|${detail}|${option}`;
  //     countMap.set(key, (countMap.get(key) || 0) + 1);
  //   });

  //   const updatedItems = this.items.map((item) => {
  //     const key = `${item.name}|${item.detail}|${item.option}`;
  //     const count = countMap.get(key) || 0;

  //     return {
  //       ...item,
  //       count
  //     };
  //   });

  //   // 👇 Get max vote
  //   const maxVote = Math.max(...updatedItems.map(i => i.count), 1);

  //   // 👇 Add percent field
  //   return updatedItems.map(item => ({
  //     ...item,
  //     percent: (item.count / maxVote) * 100
  //   }));
  // }

  aggregateVotes(data: any[]): any[] {
    const countMap = new Map<string, number>();

    // Count votes
    data.forEach(({ name, detail, option }) => {
      const key = `${name}|${detail}|${option}`;
      countMap.set(key, (countMap.get(key) || 0) + 1);
    });

    const MAX_VALUE = 800;

    return this.items.map((item) => {
      const key = `${item.name}|${item.detail}|${item.option}`;
      const count = countMap.get(key) || 0;

      // Prevent overflow above 100%
      const percent = Math.min((count / MAX_VALUE) * 100, 100);

      return {
        ...item,
        count,
        percent
      };
    });
  }

  clearData() {
    this.firebaseService.clearAllData();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
