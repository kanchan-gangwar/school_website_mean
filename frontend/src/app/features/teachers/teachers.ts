import { Component } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-teachers',
  imports: [],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss'
})
export class Teachers {
  teachers: any[] = [];
  constructor(private apiService: Api) {}
  ngOnInit() {
    this.getTeachers();
  }
  getTeachers() {
    this.apiService.getTeacher().subscribe({
      next: (res: any) => {
        if (res && res['status'] == "Y") {
          this.teachers = res.data;
        }
      },
      error: (err: any) => {
        console.log("error: " + err);
      }
    })
  }
}
