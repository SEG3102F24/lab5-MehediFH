import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore: Firestore = inject(Firestore);
  employees$: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  constructor() {
    this.fetchEmployees();  
  }

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }

  addEmployee(employee: Employee): Promise<void> {
    const employeeRef = collection(this.firestore, 'employees');
    
    const employeeData = {
      name: employee.name,
      dateOfBirth: employee.dateOfBirth instanceof Date ? employee.dateOfBirth : new Date(employee.dateOfBirth),  
      city: employee.city,
      salary: employee.salary,
      gender: employee.gender,
      email: employee.email
    };
  
    return addDoc(employeeRef, employeeData).then(() => {
      console.log('Employee added to Firestore successfully');
      this.fetchEmployees();  
    }).catch((error) => {
      console.error('Error adding employee: ', error);
    });
  }

  fetchEmployees(): void {
    const employeeRef = collection(this.firestore, 'employees');
    collectionData(employeeRef, { idField: 'id' }).subscribe((data) => {
      const employees = (data as Employee[]).map(employee => ({
        ...employee,
        dateOfBirth: (employee.dateOfBirth as any).toDate()  
      }));
      this.employees$.next(employees);  
    });
  }

}
