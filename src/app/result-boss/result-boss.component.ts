import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voting-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-boss.component.html',
  styleUrl: './result-boss.component.scss',
})
export class ResultBossComponent implements OnInit, OnDestroy {
  items: any[] = [];
  constructor(private firebaseService: FirebaseService) {}

  intervalId: any;
  async ngOnInit() {
    this.items = [
    {
      name: 'Tiết mục 1',
      option: 1,
      count: 0,
      imgUrl1:"/images/boss/voting/1.jpg",
      imgUrl2:"/images/boss/voting/1.jpg"
    },
    {
      name: 'Tiết mục 2',
      option: 2,
      count: 0,
      imgUrl1:"",
      imgUrl2:""
    },
    {
      name: 'Tiết mục 3',
      option: 3,
      count: 0,
      imgUrl1:"",
      imgUrl2:""
    },
    {
      name: 'Tiết mục 4',
      option: 4,
      count: 0,
      imgUrl1:"",
      imgUrl2:""
    },
    {
      name: 'Tiết mục 5',
      option: 5,
      count: 0,
      imgUrl1:"",
      imgUrl2:""
    }
  ];
    this.getData();
    this.intervalId = setInterval(() => {
      this.getData();
    }, 5000000); // 15 seconds
  }

  async getData() {
    const data = await firstValueFrom(this.firebaseService.getData('items-boss'));
    
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
