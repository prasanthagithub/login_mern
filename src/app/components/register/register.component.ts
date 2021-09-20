
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from './../../services/apiservice.service';
import { environment } from 'src/environments/environment';
import { RegistrationService } from './../../services/registration.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonToasterService } from 'src/app/services/common-toaster.service';
declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public name: FormControl;
  public email: FormControl;
  public gender: FormControl;
  public phone: FormControl;
  public password: FormControl;
  public submitMessage: String;
  public submitted:boolean=false;
  fileToUpload: any[] = [];
  profilePicToBeUploaded: any;
  isFileValid: boolean = false;
  fileTypeToAccept: string[] = ["png", "jpeg", "jpg"];
  progress: number = 0;
  public username: FormControl;

  constructor(
    private authService: AuthService,
    private apiSvc:ApiserviceService,
    private toaster:CommonToasterService,
    private router: Router) {
      if(this.authService.isAuthenticated()) {
        this.router.navigate(['/dashboard']);
      }
    }

  ngOnInit(): void {
    this.buildForm();
  }
buildForm()
{
  this.name = new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]);
  this.email = new FormControl('', [Validators.required,Validators.pattern(environment.emailPattern)]);
  this.gender = new FormControl('', [Validators.required]);
  this.phone = new FormControl('', [Validators.required,Validators.minLength(6),Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'),Validators.maxLength(10)]);
  this.password= new FormControl('', [Validators.required]);
  this.username = new FormControl('', [Validators.required]);
  // this.areaManagerContactFormControl = new FormControl('', [Validators.required]);
  this.registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    gender: this.gender,
    phone: this.phone,
    password:this.password,
    username:this.username
  });
}

  // Register User
  onRegisterSubmit(){
    this.submitted=true;
    this.apiSvc.postFRequest('register',this.registerForm.value).subscribe(data => {
      if (data.status == 'Success') {
        this.submitMessage = "success";
        this.submitted = false;
        this.authService.storeUserData(data.token,data.Data)
        this.registerForm.reset();
        this.router.navigate(['/dashboard']);

      } else {
        this.submitMessage = "error";
        this.router.navigate(['/register']);
      }
    });
  }

  // Navigate to Login
  login() {
    this.router.navigate(['/login']);
  }

  // Upload Profile Pic
  uploadFile(fileToUpload: FileList, file?: any) {
    var isFileValid = this.checkFileFormat(fileToUpload[0]);
    this.isFileValid = isFileValid;
    if (!isFileValid) {
      this.toaster.showWarning('Invalid file format!!!', 'Please select png, jpg formats only');
      return;
    }
    else {
      this.fileToUpload = [];
      this.fileToUpload.push(fileToUpload[0]);
    }
  }

  // Check valid file format
  private checkFileFormat(file: File): boolean {
    let fileFormat: string = file.name.substring(file.name.lastIndexOf(".") + 1);
    return this.fileTypeToAccept.includes(fileFormat) ? true : false;
  }

  // Get file Name len
  getTextLen(name: string): boolean {
    return name && name.length > 28 ? true : false;
  }

  closed() {
    this.removeFile();
    $("#uploadModal").modal('hide');
  }

  removeFile() {
    this.fileToUpload = [];
    this.progress = 0;
  }
}
