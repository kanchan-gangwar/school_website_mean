import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notice-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notice-dashboard.html',
  styleUrl: './notice-dashboard.scss'
})
export class NoticeDashboard {
  notices: any;
  selectedNotice: any;
  _id: string = "";
  isEdit: boolean = false;
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.selectedNotice = fb.group({
      title: ["", Validators.required],
      date: ["", Validators.required],
      category: ["", Validators.required],
      description: ["", Validators.required]
    })
  }
  ngOnInit() {
    this.onLoad();
  }

  clearNotice() {
    this.selectedNotice.reset();
    this.isEdit = false;
    this._id = "";
  }
  onLoad() {
    this.apiService.getNotices().subscribe({
      next: (res: any) => {
        if (res && res['status'] == "Y") {
          this.notices = res.data;
        }
      },
      error: (err: any) => {
        console.log("error: " + err);
      }
    })
  }
  onSubmit() {
    if (this.isEdit) {
      this.apiService.updateNotice(this._id, this.selectedNotice.value).subscribe({
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
      this.apiService.addNotice(this.selectedNotice.value).subscribe({
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
    this.clearNotice();
  }

  editNotice(notice: any) {
    this.isEdit = true;
    const dt = new Date(notice.date);
    this.selectedNotice.patchValue({
      date: this.formatDate(dt),
      title: notice.title,
      description: notice.description,
      category: notice.category
    })
    this._id = notice._id;
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addNotice() {
    this.clearNotice();
  }

  onDelete(notice: any){
    this.apiService.deleteNotice(notice._id).subscribe({
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
