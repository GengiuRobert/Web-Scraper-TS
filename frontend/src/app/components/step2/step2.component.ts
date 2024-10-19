import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2Component {

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router, private bookService: BookService) { }

  populateDataBase() {
    this.bookService.populateDatabaseFromJSON().subscribe({
      next: (response) => {
        console.log('Database populated:', response);
        this.successMessage = 'Database populated successfully!';
      },
      error: (error) => {
        console.error('Error populating database:', error);
        this.errorMessage = 'Error populating database: ' + error.message;
      }
    });
  }

  goToNextStep() {
    this.router.navigate(['/step3']);
  }

  goToPreviousStep() {
    this.router.navigate(['/tutorial']);
  }

}
