import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './shared/services/firebase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  item: any;
  items: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getData().subscribe((data) => (this.items = data));
  }

  addItem() {
    if (this.item.trim()) {
      this.firebaseService
        .addData({ name: this.item, lastName: this.item, test: this.item })
        .then(() => (this.item = ''));
    }
  }

  deleteItem(id: string) {
    // this.firebaseService.deleteData(id);
  }
}
