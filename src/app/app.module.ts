import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { AddbookComponent } from './addbook/addbook.component';
import { RouterModule, Routes } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UpdatebookComponent } from './updatebook/updatebook.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddwishlistComponent } from './addwishlist/addwishlist.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { CartComponent } from './cart/cart.component';
import { BookreviewComponent } from './bookreview/bookreview.component';
import { ReviewdialogComponent } from './reviewdialog/reviewdialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { StarRatingModule } from 'angular-star-rating';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { BasicAuthHtppInterceptorService } from './basic-auth-htpp-interceptor.service';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AccountComponent } from './account/account.component';
import { EditaccountComponent } from './editaccount/editaccount.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add-book', component: AddbookComponent},
  {path:'bookDetails', component: BookdetailComponent},
  {path: 'updateDetails/:book_id', component: UpdatebookComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'cart', component: CartComponent},
  {path: 'review/:book_id', component: BookreviewComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component:LogoutComponent},
  {path: 'account', component: AccountComponent},
  {path: 'edit-account/:id', component: EditaccountComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddbookComponent,
    BookdetailComponent,
    UpdatebookComponent,
    WishlistComponent,
    AddwishlistComponent,
    AddtocartComponent,
    CartComponent,
    BookreviewComponent,
    ReviewdialogComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    AccountComponent,
    EditaccountComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatDividerModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    StarRatingModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true }],
  bootstrap: [HeaderComponent]
})
export class AppModule { }
