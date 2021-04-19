import { Component } from '@angular/core';
import { AppPermission } from '../../enums';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public readonly permissions = AppPermission;

  slides = [
    { img: 'assets/images/Greenwich-01.jpg' },
    { img: 'assets/images/Greenwich-05.jpg' },
    { img: 'assets/images/Greenwich-03.jpg' },
    { img: 'assets/images/Greenwich-04.jpg' },
  ];

  
  slideConfig = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
 

  


}
