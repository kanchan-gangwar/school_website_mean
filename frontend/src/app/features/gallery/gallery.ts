import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit{
  gallery: any[] = [];
  constructor(private apiService: Api, private sanitize: DomSanitizer) {}
  ngOnInit() {
    window.scrollTo(0,0);
    this.getGallery();
  }
  sanitizeUrl(url: string) {
    return this.sanitize.bypassSecurityTrustResourceUrl(url);
  }
  getGallery() {
    this.apiService.getGallery().subscribe({
      next: (res: any) => {
        if (res && res['status'] == "Y") {
          res.data.map((obj: any) => {
            obj["images"] = obj.imagesUrl.split(","); 
          })
          this.gallery = res.data;
        }
      },
      error: (err: any) => {
        console.log("error: " + err);
      }
    })
  }
}
