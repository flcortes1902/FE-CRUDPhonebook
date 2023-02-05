import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  operationType: string = "Add";
  selectedId: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _PhonebookService:PhoneService, private _modalService: NgbModal) {}

  ngOnInit(): void{
    this.getPhoneBook();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPhoneBook() {
    this._PhonebookService.getPhoneBook().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    })
  }

  onDeleteContact(id: number, content: any) {
    this.selectedId = id;
    this.open(content);
  }

  deleteRecord() {
    if (this.selectedId) {
      this._PhonebookService.deleteContact(this.selectedId).subscribe(() => {
        this.successMessage();
        this.getPhoneBook();
        this.selectedId = undefined;
      });
    }
    this._modalService.dismissAll();
  }

  onEditContact(content: any, id: number) {
    this.selectedId = id;
    this.open(content);
  }

  successMessage() {
    this._snackBar.open('The record was successfully deleted', '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

  resetForm(){
    this.selectedId = undefined;
  }

  open(content: any) {
		this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(

		);
  }
  onOperationTypeEVChange(operationType: string) {
    this.operationType = operationType;
  }

  onSaveForm(trigger: Boolean) {
    if(trigger) {
      this._modalService.dismissAll();
      this.getPhoneBook();
      this.selectedId = undefined;
    }
  }

}
