import { Component, Input} from '@angular/core';

@Component({
  selector: 'landing-skeleton-loader',
  templateUrl: './landing-skeleton-loader.component.html',
  styleUrls: ['./landing-skeleton-loader.component.scss']
})
export class LandingSkeletonLoaderComponent {

  @Input() mainColor: string = '#E9E9E9'
}
