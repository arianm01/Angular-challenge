import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from "@angular/platform-browser";
import {RouterOutlet} from "@angular/router";

import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  })

  it(`should have as title 'Angular-Challenge-1'`, () => {
    expect(component.title).toEqual('Angular-Challenge-1');
  });

  it('should have a router outlet', () => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(de).not.toBeNull();
  });
});
