import {TestBed} from '@angular/core/testing';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import {DataServiceService} from './data-service.service';
import {Numbers} from "../Model/App.Model";

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
      const multiply = { "value": 10 }
      DataService.MultiplyFunction().subscribe(data => {
        expect(data).toEqual(multiply)
      })
      const request = httpTestingController.expectOne("assets/Multiply.json")
      expect(request.request.method).toEqual('GET')
      request.flush(multiply);
    }
  )
  it('should return Missing Data for missing Add.json', () => {
      const data = { status: 404, statusText: 'Not Found' }
      DataService.AddFunction().subscribe(data => {
        expect(data).toEqual('Missing Data')
      })
      const request = httpTestingController.expectOne("assets/Add.json")
      expect(request.request.method).toEqual('GET')
      request.flush("",data);
    }
  )
  it('should return Missing Data for missing Multiply.json', () => {
    const data = { status: 404, statusText: 'Not Found' }
    DataService.MultiplyFunction().subscribe(data => {
      expect(data).toEqual('Missing Data')
    })
    const request = httpTestingController.expectOne("assets/Multiply.json")
    expect(request.request.method).toEqual('GET')
    request.flush("",data);
    }
  )
});
