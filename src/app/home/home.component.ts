import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  obj = {
    name: '',
    phone: '',
    address: ''
  };

  title = '';
  isEditing : boolean = false;
  successMessage = '';
  errorMessage = '';

  userList: any[] = [];

  constructor(private rest: RestService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  clearErrorMessage(message: string) {
    if (this.errorMessage === message) {
      this.errorMessage = '';
    }
  }

  clearInputs() {
    this.obj = {
      name: '',
      phone: '',
      address: ''
    };
  }

  goSave() {
    this.rest.post('user', this.obj).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.getUsers();
        this.clearInputs();
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      },
      (error) => {
        console.error('Error creating user', error);
        this.errorMessage = error.error.error;
      }
    );
  }

  getUsers() {
    this.rest.get('user').subscribe(
      (data) => {
        this.userList = data.data;
        this.title = data.message;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  getEditUser(user: any) {
    this.rest.getEdit(`user/${user.id}`).subscribe(
      (response) => {
        const data = response.data;
        this.obj = data;
        this.title = response.message;
        this.obj.name = data.name; 
        this.obj.phone = data.phone;
        this.obj.address = data.address;
        this.isEditing = true;
      },
      (error) => {
        console.error('Error fetching user data for edit', error);
      }
    );
  }
  

  editUser(user: any) {
    if (!user || !user.id) {
      console.error('Invalid user object or user ID is missing');
      return; 
    }
  
    this.rest.put(`user/${user.id}`, user).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.getUsers();
        this.clearInputs();
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
        this.isEditing = false;
      },
      (error) => {
        console.error('Error updating user', error);
        this.errorMessage = error.message;
      }
    );
  }
  

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.rest.delete(`user/${userId}`).subscribe(
        (response) => {
          this.successMessage = response.message;
          this.getUsers();
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        },
        (error) => {
          console.error('Error deleting user', error);
          this.errorMessage = error.error.error;
        }
      );
    }
  }

}
