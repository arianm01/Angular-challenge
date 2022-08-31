import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {DataServiceService} from "../Service/data-service.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Expressions} from "../Model/App.Model";
import {BehaviorSubject, of} from "rxjs";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let DataService: DataServiceService;
  let snackbar: MatSnackBar

  beforeEach(async () => {
    const DataSpy = jasmine.createSpyObj('DataServiceService', ['getData']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: DataServiceService, useValue: DataSpy},
        {provide: MatSnackBar, useValue: snackBarSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    snackbar = fixture.debugElement.injector.get(MatSnackBar)
    DataService = fixture.debugElement.injector.get(DataServiceService)
  });

  it('should return data', () => {
    let output: Expressions[] = [{p: 1, q: 5, action: "add"}, {p: 2, q: 10, action: "multiply"}]
    DataService.getData = () => {
      return of(output)
    }
    DataService.status = new BehaviorSubject<string>("All")

    fixture.detectChanges()
    component.ngOnInit()

    expect(component.data).toEqual(output)
  });
  xit('should return Error', () => {
    let output: Expressions[] = [{p: 1, q: 5, action: "add"}, {p: 2, q: 10, action: "multiply"}]
    DataService.getData = () => {
      return of(output)
    }
    DataService.status = new BehaviorSubject<string>("All")

    fixture.detectChanges()
    component.ngOnInit()

    expect(component.data).toEqual(output)
  });
});
