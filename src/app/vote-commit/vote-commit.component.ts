import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-vote-commit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vote-commit.component.html',
  styleUrl: './vote-commit.component.scss',
})
export class VoteCommitComponent {
  isCommit: boolean = false;
  clickButton: boolean = false;

  onCommit() {
    this.clickButton = true;
    console.log("yes")
    setTimeout(() => {
      this.isCommit = true;
    }, 2000); // wait 2 seconds before starting fade
  }
}
