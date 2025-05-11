import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-vote-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vote-card.component.html',
  styleUrl: './vote-card.component.scss',
})
export class VoteCardComponent {
  @Input() item: any;
  @Input() isVoted: boolean = false;
  @Output() onVote: EventEmitter<number> = new EventEmitter<number>();

  onVotePerfomance() {
    if (!this.isVoted) {
      this.onVote.emit(this.item.option);
      console.log('data1: ', this.item.option);
    }
  }
}
