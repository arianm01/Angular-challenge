import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../Service/data-service.service";
import {Expressions} from "../Model/App.Model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: Expressions[] = [];
  loading: boolean = false;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.loading = true;
    this.dataService.getData().subscribe(
      data => {
        this.data = data
        this.loading = false
      }
    )
    // this.dataService.getData().subscribe(data =>{
    //   this.data.push(data);
    //   console.log(data)
    // })
  }

}
