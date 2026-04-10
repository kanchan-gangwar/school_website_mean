import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  contactForm!: FormGroup;
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.contactForm = fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      subject: ["", Validators.required],
      message: ["", Validators.required]
    })
  }
  onSubmit() {
    this.apiService.postContact(this.contactForm.value).subscribe({
      next: (res: any) => {
        if (res && res['status'] == "Y") {
          alert(res.message);
          this.contactForm.reset();
        }
      },
      error: (err: any) => {
        console.log("error: " + err);
      }
    })
  }
}
