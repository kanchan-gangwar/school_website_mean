import { Component, OnInit } from '@angular/core';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery implements OnInit {
  gallery: any[] = [];
  constructor(private apiService: Api) {}
  ngOnInit() {
    this.getGallery();
  }
  getGallery() {
    this.apiService.getGallery().subscribe({
      next: (res: any) => {
        if (res && res['status'] == "Y") {
          this.gallery = res.data;
        }
      },
      error: (err: any) => {
        console.log("error: " + err);
      }
    })
  }
}
