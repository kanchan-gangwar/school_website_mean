import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-dashboard',
  imports: [CommonModule],
  templateUrl: './contact-dashboard.html',
  styleUrl: './contact-dashboard.scss'
})
export class ContactDashboard {
  contacts: any;
  selectedContact: any = {
    email: "",
    name: "",
    subject: "",
    message: "",
    phone: ""
  }
  constructor(private apiService: Api) {}
  ngOnInit() {
    this.onLoad();
  }
  onLoad() {
    this.apiService.getContacts().subscribe({
      next: (res: any) => {
        if (res && res['status'] == "Y") {
          this.contacts = res.data;
        }
      },
      error: (err: any) => {
        console.log("error: " + err);
      }
    })
  }
  showContact(contact: any) {
    this.selectedContact = contact;
  }

  deleteContact(contact: any){
    this.apiService.deleteContact(contact._id).subscribe({
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
