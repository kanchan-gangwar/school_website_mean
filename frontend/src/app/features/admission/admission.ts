import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-admission',
  imports: [ReactiveFormsModule],
  templateUrl: './admission.html',
  styleUrl: './admission.scss'
})
export class Admission {
  admissionForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.admissionForm = fb.group({
      studentDetails: fb.group({
        studentName: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(3), Validators.max(18)]],
        bloodGroup: [''],
        religion: ['', Validators.required],
        casteCategory: ['', Validators.required],
        nationality: ['', Validators.required],
        motherTongue: ['', Validators.required],
        aadhaar: ['', Validators.required]
      }),
      admissionDetails: fb.group({
        admissionClass: ['', Validators.required],
        academicYear: ['', Validators.required],
        prevSchool: [''],
        reasonLeaving: ['']
      }),
      fatherDetails: fb.group({
        name: ['', Validators.required],
        qualification: ['', Validators.required],
        occupation: ['', Validators.required],
        office: [''],
        contact: ['', Validators.required],
        email: [''],
        aadhaar: ['', Validators.required]
      }),
      motherDetails: fb.group({
        name: ['', Validators.required],
        qualification: ['', Validators.required],
        occupation: ['', Validators.required],
        office: [''],
        contact: ['', Validators.required],
        email: [''],
        aadhaar: ['', Validators.required]
      }),
      guardianDetails: fb.group({
        name: [''],
        relation: [''],
        contact: [''],
        address: ['']
      }),
      addressDetails: fb.group({
        presentAddress: ['', Validators.required],
        permanentAddress: ['', Validators.required],
        emergencyContact: ['', Validators.required],
        altContact: ['', Validators.required]
      }),
      documents: fb.group({
        studentPhoto: [null, Validators.required]
      }),
      declaration: fb.group({
        agree: [false, Validators.requiredTrue],
        declarationDate: ['', Validators.required]
      })
    })
  }

  copyAddress(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const present = this.admissionForm.get('addressDetails.presentAddress');
    const permanent = this.admissionForm.get('addressDetails.permanentAddress');
    if (isChecked && present && permanent) {
      permanent.setValue(present.valid);
      permanent.disable();
    }
    else {
      permanent?.enable();
    }
  }
  generatePDF() {
    let content = document.getElementById("pdf");
    console.log("invalid: " + content);
    if (content) {
      // content.style.display = "block";
      html2canvas(content).then(canvas => {
        const img = canvas.toDataURL("image/png");
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("admission-form.pdf");
      })
      // content.style.display = "none"
    }
  }
  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.admissionForm.get("documents.studentPhoto")?.setValue(reader.result)
      }
      reader.readAsDataURL(file);
    }
  }
}
