import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataServiceService} from "../Service/data-service.service";
import {Expressions} from "../Model/App.Model";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  data: Expressions[] = [];

  constructor(public dataService: DataServiceService) {
  }


  ngOnInit(): void {
    this.dataService.status.pipe(
      switchMap(() => this.dataService.getData()))
      .subscribe(
        data => {
          this.data = data
          this.dataService.loading = false
        }
      )
  }

  ngOnDestroy(): void {
    this.dataService.status.complete()
  }
}
