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
      name: '1',
      option: 1,
      count: 0
    },
    {
      name: '2',
      option: 2,
      count: 0
    },
    {
      name: '3',
      option: 3,
      count: 0
    },
    {
      name: '4',
      option: 4,
      count: 0
    },
    {
      name: '5',
      option: 5,
      count: 0
    },
    {
      name: '6',
      option: 6,
      count: 0
    },
    {
      name: '7',
      option: 7,
      count: 0
    },
    {
      name: '8',
      option: 8,
      count: 0
    },
    {
      name: '9',
      option: 9,
      count: 0
    },
    {
      name: '10',
      option: 10,
      count: 0
    },
  ];
    this.getData();
    this.intervalId = setInterval(() => {
      this.getData();
    }, 5000); // 5 seconds
  }

  async getData() {
    const data = await firstValueFrom(this.firebaseService.getData('items'));
    
    this.items = this.aggregateVotes(data);
  }

  aggregateVotes(data: any[]): any[] {
    // Step 1: Count occurrences
    const countMap = new Map<string, number>();

    data.forEach(({ name, detail, option }) => {
      const key = `${name}|${detail}|${option}`;
      countMap.set(key, (countMap.get(key) || 0) + 1);
    });

    // Step 2: Update counts in original items
    const updatedItems = this.items.map((item) => {
      const key = `${item.name}|${item.detail}|${item.option}`;
      return {
        ...item,
        count: countMap.get(key) || 0,
      };
    });

    // Step 3: Sort by count DESC, then name DESC, then detail DESC
    return updatedItems;
  }

  // clearData() {
  //   this.firebaseService.clearAllData();
  // }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
