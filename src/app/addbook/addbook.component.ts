import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Book } from '../Book';
import { BookService} from '../book.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  book: Book = new Book();
  submitted = false;
  bookadded : String;

    @Output()
  bookAddedEvent = new EventEmitter();
  private selectedFile;
  imgURL: any;
  constructor(private bookService: BookService,private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  save() {
    this.bookadded = null;
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;

    this.http.post('http://localhost:8082/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {

    this.bookService.postBook(this.book)
      .subscribe(data => {
        this.bookadded = "Book Added Successfully";
        console.log(data);
        this.gotoList();
      });
      console.log('Image uploaded successfully');
    }
    else{
      console.log('Image not uploaded successfully');
    }
  });
      error => console.log(error);
    //this.book = new Book();
    this.bookService.findAll();
    //this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.book);
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/bookDetails']);
  }

  
}
