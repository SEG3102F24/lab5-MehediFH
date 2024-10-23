import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from "../service/employee.service";
import { Employee } from "../model/employee";  
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    standalone: true,
    imports: [RouterLink, NgFor, AsyncPipe, DatePipe, NgIf]
})
export class EmployeesComponent implements OnInit {
  employeeList: Employee[] = [];  
  private employeeService: EmployeeService = inject(EmployeeService);  

  

  ngOnInit(): void {
    this.employeeService.employees$.subscribe((employees: Employee[]) => {
      this.employeeList = employees;  
    });
  }

}
