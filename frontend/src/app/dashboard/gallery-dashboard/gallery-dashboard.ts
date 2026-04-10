import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-gallery-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-dashboard.html',
  styleUrl: './gallery-dashboard.scss'
})
export class GalleryDashboard {
  gallery: any;
  selectedGallery: any;
  _id: string = "";
  isEdit: boolean = false;
  constructor(private apiService: Api, private sanitize: DomSanitizer, private fb: FormBuilder) {
    this.selectedGallery = fb.group({
      title: ["", Validators.required],
      date: ["", Validators.required],
      imagesUrl: ["", Validators.required]
    })
  }
  ngOnInit() {
    this.onLoad();
  }

  clearGallery() {
    this.selectedGallery.reset();
  }

  sanitizeUrl(url: string) {
    return this.sanitize.bypassSecurityTrustResourceUrl(url);
  }
  onLoad() {
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
  onSubmit() {
    if (this.isEdit) {
      this.apiService.updateGallery(this._id, this.selectedGallery.value).subscribe({
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
      this.apiService.addGallery(this.selectedGallery.value).subscribe({
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
    this.clearGallery();
  }

  editGallery(gallery: any) {
    this.isEdit = true;
    this.selectedGallery.patchValue({
      date: this.formatDate(gallery.date),
      title: gallery.title,
      imagesUrl: gallery.imagesUrl
    })
    this._id = gallery._id;
  }

  formatDate(date: any) {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    return year + "-" + month + "-" + day;
  }

  onDelete(gallery: any){
    this.apiService.deleteGallery(gallery._id).subscribe({
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
