import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-teachers-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './teachers-dashboard.html',
  styleUrl: './teachers-dashboard.scss'
})
export class TeachersDashboard {
  teachers: any;
  selectedTeacher: any;
  _id: string = "";
  isEdit: boolean = false;
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.selectedTeacher = fb.group({
      name: ["", Validators.required],
      subject: ["", Validators.required],
      bio: ["", Validators.required],
      designation: ["", Validators.required],
      image: ["", Validators.required],
    })
  }
  ngOnInit() {
    this.onLoad();
  }

  clearEvent() {
    this.selectedTeacher.reset();
    this.isEdit = false;
    this._id = "";
  }
  onLoad() {
    this.apiService.getTeacher().subscribe({
      next: (res: any) => {
        if (res && res['status'] == "Y") {
          this.teachers = res.data;
          console.log(this.teachers)
        }
      },
      error: (err: any) => {
        console.log("error: " + err);
      }
    })
  }
  onSubmit() {
    if (this.isEdit) {
      this.apiService.updateTeacher(this._id, this.selectedTeacher.value).subscribe({
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
      this.apiService.addTeacher(this.selectedTeacher.value).subscribe({
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

  editTeacher(teacher: any) {
    this.isEdit = true;
    this.selectedTeacher.patchValue({
      name: teacher.name,
      subject: teacher.subject,
      designation: teacher.designation,
      bio: teacher.bio,
      image: teacher.image
    })
    this._id = teacher._id;
  }

  addTeacher() {
    this.clearEvent();
  }

  onDelete(teacher: any){
    this.apiService.deleteTeacher(teacher._id).subscribe({
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
