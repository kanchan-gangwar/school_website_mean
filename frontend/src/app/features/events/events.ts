import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events implements OnInit{
    events: any[] = [];
    selectedEvent: any = {
      title: "",
      location: "",
      date: "",
      decription: "",
      shortDescription: ""
    }
    constructor(private apiService: Api) {}
    ngOnInit() {
      window.scrollTo(0,0);
      this.getEvents();
    }
    getEvents() {
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
    showEvent(event: any) {
      this.selectedEvent = event;
    }
}
