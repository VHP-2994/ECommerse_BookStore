import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public data : number;

  constructor() { }

  setOption(value) {      
    this.data= value;  
  }  
  
  getOption() {  
    return this.data;  
  }
}
