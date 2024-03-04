import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Booking: any[] = [];
  bookingId!: number;
  showBookingIdInput: boolean = false; 

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings(): void {
    this.httpClient.get('http://localhost:5042/api/Booking')
      .subscribe({
        next: (data) => {
          this.Booking = data as any[];
        },
        error: (e) => {
          console.log(e);
        }
      });
  }

  getById(): void {
    this.httpClient.get(`http://localhost:5042/api/Booking/${this.bookingId}`)
      .subscribe({
        next: (data) => {
          this.Booking = [data as any];
          this.showBookingIdInput = false;
        },
        error: (e) => {
          console.log(e);
        }
      });
  }

  resetList(): void {
    this.getAllBookings();
    this.bookingId = 0;
    this.showBookingIdInput = false;
  }
  
  showAllBookings(): void {
    this.getAllBookings();
    this.showBookingIdInput = false;
  }

  toggleBookingIdInput(): void {
    this.showBookingIdInput = !this.showBookingIdInput;
  }
}
