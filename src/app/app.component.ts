import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './shared/services/firebase.service';
import { IpService } from './shared/services/ip.service';
import { VoteCardComponent } from './vote-card/vote-card.component';
import { firstValueFrom } from 'rxjs';
import { VotedCardComponent } from './voted-card/voted-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    VoteCardComponent,
    VotedCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  user: any;
  items = [
    {
      name: 'NORTH',
      detail: '',
      option: 1,
      performance: 'phong nữ - bắc bling - cô đôi',
    },
    {
      name: 'CENTRAL',
      detail: 'HÁT & MÚA',
      option: 2,
      performance: 'ngọn lửa cao nguyên',
    },
    {
      name: 'CENTRAL',
      detail: 'BAND ANH TRAI CENTRAL SAY HI',
      option: 3,
      performance: 'đường đến ngày vinh quang & nối vòng tay lớn',
    },

    {
      name: 'HCMG',
      detail: 'LIÊN KHÚC',
      option: 4,
      performance:
        'bắc bling - sài gòn đẹp lắm - áo mới cà mau - giấc mơ chapi - việt nam ơi',
    },

    {
      name: 'SOUTH',
      detail: 'LIÊN KHÚC',
      option: 5,
      performance: 'về miền tây ft rap lý cây bông',
    },
  ];
  currentIndex = 0;
  startX = 0;
  transition = 'transform 0.5s ease';
  isVoted: boolean = false;
  isLoaded: boolean = false;
  votedItem: any;

  constructor(
    private firebaseService: FirebaseService,
    private ipService: IpService
  ) {}

  async ngOnInit() {
    this.user = await firstValueFrom(this.ipService.getUserIP());
    const data = await firstValueFrom(this.firebaseService.getData());

    for (const item of data) {
      if (item.ip === this.user.ip) {
        this.votedItem = this.items.find((x) => x.option == +item.option);
        this.isVoted = true;
        this.isLoaded = true;
        break;
      }
    }
  }

  async addItem(option: any) {
    if (!this.user) {
      this.user = await firstValueFrom(this.ipService.getUserIP());
    }
    if (!this.isVoted) {
      this.firebaseService.addData({
        ip: this.user?.ip, //ip address
        option: option,
      });
      this.isVoted = true;
      this.votedItem = this.items.find((x) => x.option == option);
    }
  }

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
