import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {Data, Numbers} from "../Model/App.Model";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

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
    return data.Number.map(item => {
      return {
        p: item.value,
        q: item.action === "add" ? data.add.value : data.multiply.value,
        action: item.action
      }
    })
  }

  getData() {
    return this.dataFunction().pipe(
      mergeMap(data => this.AddFunction().pipe(map(add => ({
        Number: data,
        add: add
      })), catchError(() => of("missing data")))),
      mergeMap((data: any) => this.MultiplyFunction().pipe(map(Multiply => ({
        ...data,
        multiply: Multiply
      })), catchError(() => of("missing data")))),
      map((data: Data) => {
        return this.prepareFunction(data)
      }),
      tap(data => {
        console.log(data)
      }),
    )
  }
}
