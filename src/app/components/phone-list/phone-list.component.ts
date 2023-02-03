import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from 'src/app/interfaces/contact';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['FirstName', 'LastName', 'PhoneNumber', 'TextComments', 'Search', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<Contact>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _PhonebookService:PhoneService) {}

  ngOnInit(): void{
    this.getRecords();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecords() {
    this._PhonebookService.getPhoneBook().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    })
  }

  deleteRecord(id: number){

    this._PhonebookService.deleteContact(id).subscribe(() => {
      this.successMessage();
      this.getRecords();
    });
  }

  successMessage() {
    this._snackBar.open('The record was successfully deleted', '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
