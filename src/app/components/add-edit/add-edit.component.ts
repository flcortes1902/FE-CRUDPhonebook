import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { PhoneService } from 'src/app/services/phone.service';

enum Operation {
  EDIT = 0,
  ADD = 1
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  form: FormGroup
  id: number;
  operation: Operation = Operation.ADD;

constructor(private fb: FormBuilder,
  private _phoneService: PhoneService,
  private _snackBar: MatSnackBar,
  private aRoute: ActivatedRoute) {
  this.form = this.fb.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    PhoneNumber: ['', Validators.required],
    TextComments: [''],
  
  });
  
  this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
}

ngOnInit(): void { 
  if(this.id != 0) {
    this.operation = Operation.EDIT;
    this.setContact(this.id)
  }
}

addContact() {

  const contact: Contact = {
    FirstName: this.form.value.FirstName,
    LastName: this.form.value.LastName,
    PhoneNumber: this.form.value.PhoneNumber,
    TextComments: this.form.value.TextComments
  }

  // Sent the object to the Backend
  this._phoneService.addContact(contact).subscribe(data => {
    this.successMessage();
  })
}

 setContact(id: number) {
   this._phoneService.getOneContact(id).subscribe((result) => {

    this.form.setValue({FirstName: result.FirstName, LastName: result.LastName, PhoneNumber: result.PhoneNumber, 
      TextComments: result.TextComments});
   
   });
}

successMessage() {
  this._snackBar.open('The record was successfully added', '', {
    duration: 4000,
    horizontalPosition: 'right',
  });
}

}