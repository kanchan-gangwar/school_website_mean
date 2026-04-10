import { Component, OnInit } from '@angular/core';
import { Api } from '../../../services/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notice',
  imports: [RouterModule],
  templateUrl: './notice.html',
  styleUrl: './notice.scss'
})
export class Notice implements OnInit{
  notices = "";
  constructor(private apiService: Api) {}
  ngOnInit() {
    this.getNotices();
  }
  getNotices() {
    this.apiService.getNotices().subscribe({
      next: (res: any) => {
        if (res && res['status'] == "Y") {
          let noticeArr: any[] = [];
          res.data.map((item: any) => {
            noticeArr.push(item.title)
          })
          this.notices = noticeArr.join(", ");
        }
      },
      error: (err: any) => {
        console.log("error: " + err);
      }
    })
  }
}
