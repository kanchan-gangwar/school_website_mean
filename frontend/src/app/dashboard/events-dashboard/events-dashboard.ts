import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './events-dashboard.html',
  styleUrl: './events-dashboard.scss'
})
export class EventsDashboard {
  events: any;
  selectedEvent: any;
  _id: string = "";
  isEdit: boolean = false;
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.selectedEvent = fb.group({
      title: ["", Validators.required],
      date: ["", Validators.required],
      time: ["", Validators.required],
      location: ["", Validators.required],
      description: ["", Validators.required],
      shortDescription: ""
    })
  }
  ngOnInit() {
    this.onLoad();
  }

  clearEvent() {
    this.selectedEvent.reset();
    this.isEdit = false;
    this._id = "";
  }
  onLoad() {
    this.apiService.getEvents().subscribe({
      next: (res: any) => {
        if (res && res['status'] == "Y") {
          this.events = res.data;
        }
      },
      error: (err: any) => {
        console.log("error: " + err);
      }
    })
  }
  onSubmit() {
    if (this.isEdit) {
      this.apiService.updateEvent(this._id, this.selectedEvent.value).subscribe({
        next: (res: any) => {
          if (res && res['status'] == "Y") {
            alert(res.message);
            this.onLoad();
          }
        },
        error: (err: any) => {
          console.log("error: " + err);
        }
      })
    }
    else {
      this.apiService.addEvent(this.selectedEvent.value).subscribe({
        next: (res: any) => {
          if (res && res['status'] == "Y") {
            alert(res.message);
            this.onLoad();
          }
        },
        error: (err: any) => {
          console.log("error: " + err);
        }
      })
    }
    this.clearEvent();
  }

  editEvent(event: any) {
    this.isEdit = true;
    const dt = new Date(event.date);
    this.selectedEvent.patchValue({
      date: this.formatDate(dt),
      time: this.formatTime(dt),
      title: event.title,
      location: event.location,
      description: event.description,
      shortDescription: event.shortDescription
    })
    this._id = event._id;
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatTime(date: Date) {
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hour}:${minutes}`;
  }

  addEvent() {
    this.clearEvent();
  }

  onDelete(event: any){
    this.apiService.deleteEvent(event._id).subscribe({
      next: (res: any) => {
        if (res && res['status'] == "Y") {
          alert(res.message);
          this.onLoad();
        }
      },
      error: (err: any) => {
        console.log("error: " + err);
      }
    })
  }
}
