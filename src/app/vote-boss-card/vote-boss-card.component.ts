import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-vote-boss-card',
  
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vote-boss-card.component.html',
  styleUrl: './vote-boss-card.component.scss'
})
export class VoteBossCardComponent {
@Input() item: any;
  @Output() onVote: EventEmitter<number> = new EventEmitter<number>();

  onVotePerfomance() {
    this.onVote.emit(this.item.option);
  }
}
