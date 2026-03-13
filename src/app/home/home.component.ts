import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { VoteCardComponent } from '../vote-card/vote-card.component';
import { VotedCardComponent } from '../voted-card/voted-card.component';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    VoteCardComponent,
    VotedCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private userId: string | null = null;
  isVoted = false;
  votedItem: any;
  votedOption: number = -1;

  items = [
  {
    performanceName: 'Nối lại tình Xưa',
    teamName: 'Tiết mục 1',
    option: 1,
  },
  {
    performanceName: 'Giúp em trả lời những câu hỏi',
    teamName: 'Tiết mục 2',
    option: 2,
  },
  {
    performanceName: 'Đón Bình Minh',
    teamName: 'Tiết mục 3',
    option: 3,
  },
  {
    performanceName: 'Chim trắng mồ côi',
    teamName: 'Tiết mục 4',
    option: 4,
  },
];

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    // Check localStorage for existing id
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.userId = this.generateId();
      localStorage.setItem('userId', this.userId);
    }

    // Get firebase data
    const data = await firstValueFrom(this.firebaseService.getData('items'));
    console.log("data: ", data)

    // Check if user has already voted
    const existingVote = await this.firebaseService.hasUserVoted(this.userId);

    if (existingVote) {
      this.votedOption = existingVote.option;
      this.votedItem = this.items.find(x => x.option == existingVote.option);
      this.isVoted = true;
    }
  }

   async onVote(option: number) {
    if (this.isVoted || !this.userId) return;

    try {
      await this.firebaseService.vote(this.userId, option);
      this.votedOption = option;
      this.isVoted = true;
    } catch (error) {
      this.isVoted = true;
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
  }
}
