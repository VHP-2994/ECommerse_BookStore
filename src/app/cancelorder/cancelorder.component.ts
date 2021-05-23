import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Order } from '../Order';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancelorder',
  templateUrl: './cancelorder.component.html',
  styleUrls: ['./cancelorder.component.css']
})
export class CancelorderComponent implements OnInit {

  order: Order;
  id: number;
  flag: Boolean;
  orderstat: String;
  private _success = new Subject<string>();
  cancelSuccess = '';
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;
  constructor(private route: ActivatedRoute,private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.order = new Order();
    

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.bookService.findOrderByOrderId(this.id).subscribe(data =>{
      this.order = data;
    })

    this._success.subscribe(message => this.cancelSuccess = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    
  }

  

  updateOrderStatus(){
    this.bookService.updateOrderStatusByOrderId(this.id,this.order).subscribe(data =>{
      this.order = data;
      console.log(this.order);
      this.flag  = true;
      this.gotoMyOrdersafterCancel();
    })
  }

  gotoMyOrdersafterCancel() {
    this.router.navigate(['/myOrders']);
  }

  public changeSuccessMessage() { this._success.next(`Order Cancelled Successfully`); }

}
