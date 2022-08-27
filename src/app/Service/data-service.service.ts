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


  AddFunction() {
    return this.httpClient.get<{ value: number }>('assets/Add.json')
  }

  MultiplyFunction() {
    return this.httpClient.get<{ value: number }>('assets/Multiply.json')
  }

  dataFunction() {
    return this.httpClient.get<Numbers[]>("assets/Numbers.json")
  }

  prepareFunction(data: Data) {
    console.log(data)
    return data.Number.filter(item => {
      return item.action === this.status.getValue() || this.status.getValue() === "All";
    }).map(item => {
      return {
        p: item.value,
        q: item.action === "add" ? data.add.value : data.multiply.value,
        action: item.action
      }
    })
  }

  getData() {
    this.loading = true
    let missing: string = "Missing Data"
    return this.dataFunction().pipe(
      take(1),
      mergeMap(data => this.AddFunction().pipe(
        map(add => ({Number: data, add: add})),
        catchError(() => of({Number: data, add: {value: missing}})))),
      mergeMap((data: any) => this.MultiplyFunction().pipe(
        map(Multiply => ({...data, multiply: Multiply})),
        catchError(() => of({...data, multiply: {value: missing}})))),
      map((data: Data) => {
        return this.prepareFunction(data)
      }),
    )
  }
}
