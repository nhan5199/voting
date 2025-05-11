import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-vote-result',
  standalone: true,
  imports: [],
  templateUrl: './vote-result.component.html',
  styleUrl: './vote-result.component.scss',
})
export class VoteResultComponent implements OnInit {
  items: any[] = [];
  intervalId: any;
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.firebaseService.getData().subscribe((data) => {
        this.items = data;
      });
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
