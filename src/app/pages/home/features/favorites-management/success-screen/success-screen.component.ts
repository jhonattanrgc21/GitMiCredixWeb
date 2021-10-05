import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesManagementService } from '../favorites-management.service';

@Component({
  selector: 'app-success-screen',
  templateUrl: './success-screen.component.html',
  styleUrls: ['./success-screen.component.scss']
})
export class SuccessScreenComponent implements OnInit {

  title: string;
  status: 'success' | 'error';
  message: string;

  constructor(
    private favoritesManagementService: FavoritesManagementService,
    private router: Router,) {
      
    }

  ngOnInit(): void {
    if ( this.favoritesManagementService.result ) {
      this.title = this.favoritesManagementService.result.title;
      this.status = this.favoritesManagementService.result.status;
      this.message = this.favoritesManagementService.result.message;
    } else {
      this.router.navigate(['/home/favorites-management']);
    }
  }

}
