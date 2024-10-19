import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.css'
})
export class TutorialComponent {

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router, private bookService: BookService) { }

  scrapeForBooks() {
    this.successMessage = null;
    this.errorMessage = null;
    this.bookService.scrapeBooks().subscribe(
      {
        next: (response) => {
          console.log('Fetched books:', response.message);
          this.successMessage = 'Scraping completed successfully!';
        },
        error: (error) => {
          console.error('Error fetching books:', error);
          this.errorMessage = 'Error during scraping: ' + error.message;
        }
      }
    );
  }

  goToNextStep() {
    this.router.navigate(['/step2']);
  }
}
