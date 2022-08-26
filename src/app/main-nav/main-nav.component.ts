import { Component } from '@angular/core';
import {DataServiceService} from "../Service/data-service.service";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );

  constructor(private dataService: DataServiceService) {}

  onClick(query: string){
    this.dataService.status.next(query)
    console.log(this.dataService.status.getValue())
  }
}
