import {TestBed} from '@angular/core/testing';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import {DataServiceService} from './data-service.service';
import {Data, Expressions, Numbers} from "../Model/App.Model";

describe('DataServiceService', () => {
  let DataService: DataServiceService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    DataService = TestBed.inject(DataServiceService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should return expected Numbers', () => {
      const numbers: Numbers[] = [{"value": 1, "action": "add"}, {"value": 2, "action": "multiply"}, {
        "value": 3,
        "action": "add"
      }]

      DataService.dataFunction().subscribe((data: Numbers[]) => {
        expect(data).toEqual(numbers)
      })
      const request = httpTestingController.expectOne("assets/Numbers.json")
      expect(request.request.method).toEqual('GET')
      request.flush(numbers);
    }
  )
  it('should return expected ADD value', () => {
      const add = {"value": 5}

      DataService.AddFunction().subscribe(data => {
        expect(data).toEqual(add)
      })
      const request = httpTestingController.expectOne("assets/Add.json")
      expect(request.request.method).toEqual('GET')
      request.flush(add);
    }
  )
  it('should return expected Multiply value', () => {
      const multiply = {"value": 10}

      DataService.MultiplyFunction().subscribe(data => {
        expect(data).toEqual(multiply)
      })
      const request = httpTestingController.expectOne("assets/Multiply.json")
      expect(request.request.method).toEqual('GET')
      request.flush(multiply);
    }
  )
  it('should return Missing Data for missing Add.json', () => {
      const data = {status: 404, statusText: 'Not Found'}

      DataService.AddFunction().subscribe(data => {
        expect(data).toEqual({value: 'Missing Data'})
      })
      const request = httpTestingController.expectOne("assets/Add.json")
      expect(request.request.method).toEqual('GET')
      request.flush("", data);
    }
  )
  it('should return Missing Data for missing Multiply.json', () => {
      const data = {status: 404, statusText: 'Not Found'}

      DataService.MultiplyFunction().subscribe(data => {
        expect(data).toEqual({value: 'Missing Data'})
      })
      const request = httpTestingController.expectOne("assets/Multiply.json")
      expect(request.request.method).toEqual('GET')
      request.flush("", data);
    }
  )

  it('should return the value of Q', () => {
    let data: Data = {
      Number: [{"value": 1, "action": "add"}, {"value": 2, "action": "multiply"},],
      add: {value: 5},
      multiply: {value: "Missing Data"}
    }

    let q1 = DataService.getQ(data.Number[0], data)
    let q2 = DataService.getQ(data.Number[1], data)

    expect(q1).toEqual(data.add.value)
    expect(q2).toEqual(data.multiply.value)

  });

  it('should return the value of status', () => {
    expect(DataService.getStatus()).toEqual("All")
    DataService.status.next("Add")
    expect(DataService.getStatus()).toEqual("Add")
  });
  it('should return the value of Output', () => {
    let data: Data = {
      Number: [{"value": 1, "action": "add"}, {"value": 2, "action": "multiply"},],
      add: {value: 5},
      multiply: {value: 10}
    }
    let corruptedData: Data = {
      Number: [{"value": 1, "action": "add"}, {"value": 2, "action": "multiply"},],
      add: {value: 5},
      multiply: {value: "Missing Data"}
    }
    let output: Expressions[] = [{p: 1, q: 5, action: "add"}, {p: 2, q: 10, action: "multiply"}]
    let corruptedOutput: Expressions[] = [{p: 1, q: 5, action: "add"}, {p: 2, q: "Missing Data", action: "multiply"}]

    expect(DataService.prepareFunction(data)).toEqual(output)
    expect(DataService.prepareFunction(corruptedData)).toEqual(corruptedOutput)
  });
  // it('should return the value of status', () => {
  //   expect(DataService.getStatus()).toEqual("All")
  //   DataService.status.next("Add")
  //   expect(DataService.getStatus()).toEqual("Add")
  // });
});
