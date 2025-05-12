import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-voting-result',
  standalone: true,
  imports: [],
  templateUrl: './voting-result.component.html',
  styleUrl: './voting-result.component.scss',
})
export class VotingResultComponent implements OnInit {
  items: any[] = [];
  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    // const data = await firstValueFrom(this.firebaseService.getData());
    const data = [
      {
        ip: '203.205.26.20',
        option: 3,
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        name: 'CENTRAL',
        id: 'azPxWWYLMDywA7YyfRvr',
      },

      {
        ip: '203.205.26.20',
        option: 3,
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        name: 'CENTRAL',
        id: 'azPxWWYLMDywA7YyfRvr',
      },

      {
        ip: '203.205.26.20',
        option: 3,
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        name: 'CENTRAL',
        id: 'azPxWWYLMDywA7YyfRvr',
      },

      {
        ip: '203.205.26.20',
        option: 3,
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        name: 'CENTRAL',
        id: 'azPxWWYLMDywA7YyfRvr',
      },
      {
        ip: '203.205.26.20',
        option: 1,
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        name: 'CENTRAL',
        id: 'azPxWWYLMDywA7YyfRvr',
      },
      {
        ip: '203.205.26.20',
        option: 1,
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        name: 'CENTRAL',
        id: 'azPxWWYLMDywA7YyfRvr',
      },
      {
        ip: '203.205.26.20',
        option: 1,
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        name: 'CENTRAL',
        id: 'azPxWWYLMDywA7YyfRvr',
      },
      {
        ip: '203.205.26.20',
        option: 2,
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        name: 'CENTRAL',
        id: 'azPxWWYLMDywA7YyfRvr',
      },
      {
        ip: '203.205.26.20',
        option: 2,
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        name: 'CENTRAL',
        id: 'azPxWWYLMDywA7YyfRvr',
      },
      {
        ip: '203.205.26.20',
        option: 4,
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        name: 'CENTRAL',
        id: 'azPxWWYLMDywA7YyfRvr',
      },
      {
        ip: '203.205.26.20',
        option: 5,
        detail: 'BAND ANH TRAI CENTRAL SAY HI',
        name: 'CENTRAL',
        id: 'azPxWWYLMDywA7YyfRvr',
      },
    ];
    this.items = this.aggregateVotes(data);
  }

  aggregateVotes(data: any[]): any[] {
    const map = new Map<string, any>();

    data.forEach(({ name, detail, option }) => {
      const key = `${name}|${detail}|${option}`;
      if (map.has(key)) {
        const item = map.get(key)!;
        item.count++;
      } else {
        map.set(key, { name, detail, option, count: 1 });
      }
    });

    return Array.from(map.values()).sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.name.localeCompare(b.name);
    });
  }
}
