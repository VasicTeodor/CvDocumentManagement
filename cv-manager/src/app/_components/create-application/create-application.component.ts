import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CvManagerService } from 'src/app/_services/cv-manager/cv-manager.service';
import { ValidationService } from 'src/app/_services/validation/validation.service';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.css']
})
export class CreateApplicationComponent implements OnInit {

  educationLevels: any[] =
  [
    {display:'Elementary school', value: 1},
    {display:'High school', value: 2},
    {display:'Bachelors degree', value: 3},
    {display:'Masters degree', value: 4},
    {display:'PhD degree', value: 5}
  ];

  applicationForm = new FormGroup({
    firstname : new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    educationLevel: new FormControl('1', Validators.nullValidator),
    city: new FormControl('', Validators.required),
    cvFile: new FormControl(null, Validators.required),
    coverLetter : new FormControl(null,  Validators.required),
    cvFileSource: new FormControl('', Validators.required),
    letterSource: new FormControl('', Validators.required),
  })
  isLoading:boolean = false;

  constructor(private router: Router, 
    private validationService: ValidationService, 
    private toastr: ToastrService,
    private cvManagerService: CvManagerService) { }

  ngOnInit() {
  }

  get form(){
    return this.applicationForm.controls;
  }

  onCvFileChange(fileEvent: any): void {
  
    if (fileEvent.target.files.length > 0) {
      const file = fileEvent.target.files[0];
      this.applicationForm.patchValue({
        cvFileSource: file
      });
    }
  }

  onLetterFileChange(fileEvent: any): void {
  
    if (fileEvent.target.files.length > 0) {
      const file = fileEvent.target.files[0];
      this.applicationForm.patchValue({
        letterSource: file
      });
    }
  }
     
     
  saveChanges(): void {
    if(!this.applicationForm.valid)
      {
        this.validationService.validateAllFields(this.applicationForm);
        return;
      }
    let name = this.applicationForm.controls['firstname'].value || "";
    let lastName = this.applicationForm.controls['lastname'].value || "";
    let phone = this.applicationForm.controls['phone'].value || "";
    let email = this.applicationForm.controls['email'].value || "";
    let city = this.applicationForm.controls['city'].value || "";
    let educationLevel = Number(this.applicationForm.controls['educationLevel'].value) || 0;
    let cvFile = this.applicationForm.controls['cvFileSource'].value || "";
    let coverLetterFile = this.applicationForm.controls['letterSource'].value || "";
    this.isLoading = true;
    this.cvManagerService.addApplication(name, lastName, phone, email, educationLevel, city, cvFile, coverLetterFile).subscribe(
        data=>{
          this.isLoading = false;
          this.toastr.success("Application is sent!");
          this.router.navigate(['/']);
        },
        error=>{
          this.isLoading = false;
          this.toastr.error("File not uploaded.");
        }
    );

  }

}
