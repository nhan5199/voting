import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './shared/services/firebase.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  item: any;
  items: any[] = [];
  intervalId: any;

  formsInfo: FormGroup<any>;

  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder
  ) {
    this.formsInfo = this.formBuilder.group({
      name: ['', Validators.required],
      option: [0, Validators.required],
    });
  }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.firebaseService.getData().subscribe((data) => (this.items = data));
    }, 60000);
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  addItem() {
    if (this.formsInfo.valid) {
      this.firebaseService
        .addData({
          name: this.formsInfo.value?.name,
          option: this.formsInfo.value?.option,
        })
        .then(() => console.log('data: ', this.formsInfo.value));
    }
  }

  // deleteItem(id: string) {
  //   this.firebaseService.deleteData(id);
  // }
}
