import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './shared/services/firebase.service';
import { IpService } from './shared/services/ip.service';
import { VoteCardComponent } from './vote-card/vote-card.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    VoteCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private ipService: IpService
  ) {}

  async ngOnInit() {
    const data = await firstValueFrom(this.firebaseService.getData());
    for (const item of data) {
      const user: any = await firstValueFrom(this.ipService.getUserIP());
      if (item.ip === user.ip) {
        this.isVoted = true;
        break;
      }
    }
  }

  addItem(option: any) {
    this.ipService.getUserIP().subscribe((data: any) => {
      this.firebaseService.addData({
        ip: data.ip, //ip address
        option: option,
      });
      this.isVoted = true;
    });
  }

  items = [
    {
      name: 'NORTH',
      detail: '',
      option: 1,
    },
    {
      name: 'CENTRAL',
      detail: 'HÁT & MÚA',
      option: 2,
    },
    {
      name: 'CENTRAL',
      detail: 'BAND ANH TRAI CENTRAL SAY HI',
      option: 3,
    },

    {
      name: 'HCMG',
      detail: 'LIÊN KHÚC',
      option: 4,
    },

    {
      name: 'SOUTH',
      detail: 'LIÊN KHÚC',
      option: 5,
    },
  ];
  currentIndex = 0;
  startX = 0;
  transition = 'transform 0.5s ease';
  isVoted: boolean = false;

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.transition = ''; // disable transition while swiping
  }

  onTouchEnd(event: TouchEvent) {
    const endX = event.changedTouches[0].clientX;
    const diffX = this.startX - endX;

    if (diffX > 50 && this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
    } else if (diffX < -50 && this.currentIndex > 0) {
      this.currentIndex--;
    }

    this.transition = 'transform 0.5s ease';
  }

  getTransform() {
    const offset = this.currentIndex * (90 + 10); // 90vw width + 10px margin
    return `translateX(-${offset}vw)`;
  }

  onVote(option: number) {
    this.addItem(option);
  }
}
