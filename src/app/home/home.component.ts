import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataServiceService} from "../Service/data-service.service";
import {Expressions} from "../Model/App.Model";
import {switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  data: Expressions[] = [];

  constructor(public dataService: DataServiceService, private snackbar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.dataService.status.pipe(
      switchMap(() => this.dataService.getData()))
      .subscribe(
        data => {
          this.data = data
          this.dataService.loading = false
        }, err =>{
          this.snackbar.open("there is an internal error","",{duration: 3000})
        }
      )
  }

  ngOnDestroy(): void {
    this.dataService.status.complete()
  }
}
