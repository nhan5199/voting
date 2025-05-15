import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-voting-result',
  standalone: true,
  imports: [],
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
        name: 'CENTRAL',
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        option: 3,
        count: 0,
      },

      {
        name: 'HCMG',
        detail: 'LIÊN KHÚC',
        option: 4,
        count: 0,
      },

      {
        name: 'SOUTH',
        detail: 'LIÊN KHÚC',
        option: 5,
        count: 0,
      },
      {
        name: 'NORTH',
        detail: '',
        option: 1,
        count: 0,
      },
      {
        name: 'CENTRAL',
        detail: 'HÁT & MÚA',
        option: 2,
        count: 0,
      },
    ];
    this.getData();
    this.intervalId = setInterval(() => {
      this.getData();
    }, 30000); // 30 seconds
  }

  async getData() {
    const data = await firstValueFrom(this.firebaseService.getData());
    // const data = [
    //   {
    //     ip: '203.205.26.20',
    //     option: 3,
    //     detail: 'BAND ANH TRAI CENTRAL SAY HI',
    //     name: 'CENTRAL',
    //     id: 'azPxWWYLMDywA7YyfRvr',
    //   },

    //   {
    //     ip: '203.205.26.20',
    //     option: 3,
    //     detail: 'BAND ANH TRAI CENTRAL SAY HI',
    //     name: 'CENTRAL',
    //     id: 'azPxWWYLMDywA7YyfRvr',
    //   },

    //   {
    //     ip: '203.205.26.20',
    //     option: 3,
    //     detail: 'BAND ANH TRAI CENTRAL SAY HI',
    //     name: 'CENTRAL',
    //     id: 'azPxWWYLMDywA7YyfRvr',
    //   },

    //   {
    //     ip: '203.205.26.20',
    //     option: 3,
    //     detail: 'BAND ANH TRAI CENTRAL SAY HI',
    //     name: 'CENTRAL',
    //     id: 'azPxWWYLMDywA7YyfRvr',
    //   },
    //   {
    //     ip: '203.205.26.20',
    //     option: 1,
    //     name: 'NORTH',
    //     detail: '',
    //     id: 'azPxWWYLMDywA7YyfRvr',
    //   },
    //   {
    //     ip: '203.205.26.20',
    //     option: 1,
    //     name: 'NORTH',
    //     detail: '',
    //     id: 'azPxWWYLMDywA7YyfRvr',
    //   },
    //   {
    //     ip: '203.205.26.20',
    //     option: 1,
    //     name: 'NORTH',
    //     detail: '',
    //     id: 'azPxWWYLMDywA7YyfRvr',
    //   },
    //   {
    //     ip: '203.205.26.20',
    //     option: 2,
    //     name: 'CENTRAL',
    //     detail: 'HÁT & MÚA',
    //     id: 'azPxWWYLMDywA7YyfRvr',
    //   },
    //   {
    //     ip: '203.205.26.20',
    //     option: 2,
    //     name: 'CENTRAL',
    //     detail: 'HÁT & MÚA',
    //     id: 'azPxWWYLMDywA7YyfRvr',
    //   },
    //   {
    //     ip: '203.205.26.20',
    //     option: 4,
    //     name: 'HCMG',
    //     detail: 'LIÊN KHÚC',
    //     id: 'azPxWWYLMDywA7YyfRvr',
    //   },
    //   {
    //     ip: '203.205.26.20',
    //     option: 5,
    //     name: 'SOUTH',
    //     detail: 'LIÊN KHÚC',
    //     id: 'azPxWWYLMDywA7YyfRvr',
    //   },
    // ];
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
