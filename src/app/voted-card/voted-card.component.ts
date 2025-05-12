import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-voted-card',
  standalone: true,
  imports: [],
  templateUrl: './voted-card.component.html',
  styleUrl: './voted-card.component.scss',
})
export class VotedCardComponent {
  @Input() item: any;
}
