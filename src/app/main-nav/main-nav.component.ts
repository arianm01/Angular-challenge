import {Component} from '@angular/core';
import {DataServiceService} from "../Service/data-service.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  constructor(private dataService: DataServiceService) {}

  onClick(query: string) {
    if (!this.dataService.status)
      this.dataService.status = new BehaviorSubject<string>(query)
    else
      this.dataService.status.next(query)
  }
}
