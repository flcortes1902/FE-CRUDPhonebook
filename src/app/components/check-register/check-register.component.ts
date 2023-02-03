import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/interfaces/contact';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-check-register',
  templateUrl: './check-register.component.html',
  styleUrls: ['./check-register.component.css']
})
export class CheckRegisterComponent implements OnInit {
  id: number;
  Contact!: Contact;

  

  constructor(private _phoneService: PhoneService, 
    private aRoute: ActivatedRoute) {
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void {
    this.getContact();
  }

  getContact () {
    this._phoneService.getOneContact(this.id).subscribe({
      next: (data) => {
        this.Contact = data;
      }   
    })
  }
}