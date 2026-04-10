import { Component, OnInit } from '@angular/core';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [CommonModule, RouterModule],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events implements OnInit{
  events: any[] = [];
  constructor(private apiService: Api) {}
  ngOnInit() {
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
}
