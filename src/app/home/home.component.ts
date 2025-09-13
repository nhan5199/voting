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
      name: '1',
      option: 1,
    },
    {
      name: '2',
      option: 2,
    },
    {
      name: '3',
      option: 3,
    },
    {
      name: '4',
      option: 4,
    },
    {
      name: '5',
      option: 5,
    },
    {
      name: '6',
      option: 6,
    },
    {
      name: '7',
      option: 7,
    },
    {
      name: '8',
      option: 8,
    },
    {
      name: '9',
      option: 9,
    },
    {
      name: '10',
      option: 10,
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
      itemId: this.votedItem.name
    }, 'items');

    this.votedOption = option;
    this.isVoted = true;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
  }
}
