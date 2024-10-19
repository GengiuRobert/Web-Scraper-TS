import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css',
})
export class Step3Component {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  books: any[] = [];
  areBooksVisible: boolean = false;
  selectedBook: any = null;

  constructor(private router: Router, private bookService: BookService) { }

  fetchBooks() {
    if (this.areBooksVisible) {
      this.areBooksVisible = false;
    } else {
      this.bookService.readBooks().subscribe({
        next: (data) => {
          this.books = data;
          this.successMessage = 'Books extracted from db successfully!';
          this.areBooksVisible = true;
        },
        error: (err) => {
          console.error('Error fetching books', err);
          this.errorMessage = 'Error extracting books from db: ' + err.message;
        }
      });
    }
  }

  deleteBook(bookId: string) {
    this.bookService.deleteBook(bookId).subscribe({
      next: () => {
        this.successMessage = `Book with ID ${bookId} deleted successfully!`;
        this.books = this.books.filter(book => book._id !== bookId);
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Error deleting book', err);
        this.errorMessage = `Error deleting book with ID ${bookId}: ` + err.message;
      }
    });
  }

  toggleUpdateForm(book: any) {
    if (this.selectedBook && this.selectedBook._id === book._id) {
      this.closeUpdateForm();
    } else {
      this.selectedBook = { ...book };
    }
  }

  closeUpdateForm() {
    this.selectedBook = null;
  }

  submitUpdateBook() {
    this.bookService.updateBook(this.selectedBook._id, this.selectedBook).subscribe({
      next: () => {
        this.successMessage = `Book with ID ${this.selectedBook._id} updated successfully!`;
        const index = this.books.findIndex(book => book._id === this.selectedBook._id);
        if (index !== -1) {
          this.books[index] = { ...this.selectedBook };
        }
        this.closeUpdateForm();
      },
      error: (err) => {
        console.error('Error updating book', err);
        this.errorMessage = `Error updating book with ID ${this.selectedBook._id}: ` + err.message;
      }
    });

  }
}
