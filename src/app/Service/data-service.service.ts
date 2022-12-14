import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, mergeMap, of, take} from "rxjs";
import {Data, Numbers} from "../Model/App.Model";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  status: BehaviorSubject<string> = new BehaviorSubject<string>("All");
  loading: boolean = false;


  constructor(private httpClient: HttpClient) {}

  getStatus() {
    return this.status.getValue();
  }

  AddFunction() {
    return this.httpClient.get<{ value: number }>('assets/Add.json').pipe(
      catchError(() => of({value: "Missing Data"}))
    )
  }

  MultiplyFunction() {
    return this.httpClient.get<{ value: number }>('assets/Multiply.json').pipe(
      catchError(() => of({value: "Missing Data"}))
    )
  }

  dataFunction() {
    return this.httpClient.get<Numbers[]>("assets/Numbers.json")
  }

  prepareFunction(data: Data) {
    return data.Number.filter(item => item.action === this.getStatus() || this.getStatus() === "All")
      .map(item => {
        return {
          p: item.value,
          q: this.getQ(item, data),
          action: item.action
        }
      })
  }

  getQ(item: Numbers, data: Data) {
    console.log(data)
    return item.action === "add" ? data.add.value : data.multiply.value
  }

  getData() {
    this.loading = true
    return this.dataFunction().pipe(
      take(1),
      mergeMap(data => this.AddFunction().pipe(
        map(add => ({Number: data, add: add})))
      ),
      mergeMap((data: any) => this.MultiplyFunction().pipe(
        map(Multiply => ({...data, multiply: Multiply})))
      ),
      map((data: Data) => {
        return this.prepareFunction(data)
      }),
    )
  }
}
