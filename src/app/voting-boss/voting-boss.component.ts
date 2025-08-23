import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from '../shared/services/firebase.service';
import { VoteBossCardComponent } from '../vote-boss-card/vote-boss-card.component';
import { VotedCardComponent } from '../voted-card/voted-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    VoteBossCardComponent,
    VotedCardComponent,
  ],
  templateUrl: './voting-boss.component.html',
  styleUrl: './voting-boss.component.scss',
})
export class VotingBossComponent implements OnInit {
  private userId: string | null = null;
  isVoted = false;
  votedItem: any;
  votedOption: number = -1;

  items = [
    {
      name: 'Tiết mục 1',
      option: 1,
      id: 'voting-boss/boss-1',
    },
    {
      name: 'Tiết mục 2',
      option: 2,
      id: 'voting-boss/boss-2',
    },
    {
      name: 'Tiết mục 3',
      option: 3,
      id: 'voting-boss/boss-3',
    },
    {
      name: 'Tiết mục 4',
      option: 4,
      id: 'voting-boss/boss-4',
    }
  ];

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    // Check localStorage for existing id
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.userId = this.generateId();
      localStorage.setItem('userId', this.userId);
    }

    console.log("data: ", this.userId)

    // Get firebase data
    const data = await firstValueFrom(this.firebaseService.getData('items-boss'));

    // Check if user has already voted
    const existingVote = data.find((item: any) => item.userId === this.userId);
    if (existingVote) {
      this.votedItem = this.items.find((x) => x.option == +existingVote.option);
      this.votedOption = existingVote.option;
      this.isVoted = true;
    }
  }

  async onVote(option: number) {
    if (this.isVoted) return;

    this.votedItem = this.items.find((x) => x.option == option);
    if (!this.votedItem) return;

    // Save vote to Firebase
    await this.firebaseService.addData({
      userId: this.userId, // unique id for user
      option: option,
      name: this.votedItem.name,
      itemId: this.votedItem.id
    }, 'items-boss');

    this.votedOption = option;
    this.isVoted = true;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
  }
}
