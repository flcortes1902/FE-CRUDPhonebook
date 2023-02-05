import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { PhoneService } from 'src/app/services/phone.service';

enum Operation {
  EDIT = "Edit",
  ADD = "Add"
}

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  form: FormGroup
  operation: Operation = Operation.ADD;
  @Output() operationTypeEV = new EventEmitter<string>();
  @Output() onSaveForm = new EventEmitter<Boolean>();
  @Input() id : number | undefined;


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
  }

  ngOnInit(): void {
    if (this.id != undefined) {
      this.operation = Operation.EDIT;
      this.setContact(this.id!)
    }
    this.operationTypeEV.emit(this.operation);
  }

  saveContact() {

    const contact: Contact = {
      FirstName: this.form.value.FirstName,
      LastName: this.form.value.LastName,
      PhoneNumber: this.form.value.PhoneNumber,
      TextComments: this.form.value.TextComments,
    }

    if (this.id != undefined) {
      this._phoneService.updateContact(this.id, contact).subscribe(data => {
        this.successMessage();
         this.onSaveForm.emit(true);


      })
    } else {
      // Sent the object to the Backend
      this._phoneService.addContact(contact).subscribe(data => {
        this.successMessage();
    this.onSaveForm.emit(true);

      })
    }
    this.form.reset();

  }



 setContact(id: number) {
   this._phoneService.getOneContact(id).subscribe((result) => {
    this.form.setValue({FirstName: result.FirstName, LastName: result.LastName, PhoneNumber: result.PhoneNumber,
      TextComments: result.TextComments});
   });
 }

onBack() {
  this.form.reset();
  this.operationTypeEV.emit(Operation.ADD);
  this.onSaveForm.emit(true);
}

successMessage() {
  this._snackBar.open('Operation went successfully', '', {
    duration: 4000,
    horizontalPosition: 'right',
  });
}

}
