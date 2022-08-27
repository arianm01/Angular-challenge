import { TestBed } from '@angular/core/testing';

import { DataServiceService } from './data-service.service';
import {HttpClient} from "@angular/common/http";

describe('DataServiceService', () => {
  let service: DataServiceService;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers:[
        {provide : HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(DataServiceService);
    // http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
