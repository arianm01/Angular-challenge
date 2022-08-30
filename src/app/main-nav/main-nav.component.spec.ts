import {LayoutModule} from '@angular/cdk/layout';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from "@angular/material/card";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {By} from "@angular/platform-browser";

import {MainNavComponent} from './main-nav.component';
import {DataServiceService} from "../Service/data-service.service";


describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainNavComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatCardModule,
        HttpClientTestingModule
      ],
      providers: [DataServiceService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit on click with desired state', () => {
    let buttons = fixture.debugElement.queryAll(By.css('a'))
    let spy = spyOn(component, 'onClick')

    buttons[0].triggerEventHandler('click', null);
    buttons[1].triggerEventHandler('click', null);
    buttons[2].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('All');
    expect(spy).toHaveBeenCalledWith('add');
    expect(spy).toHaveBeenCalledWith('multiply');
  });

  it('should set the status to state', () => {
    let buttons = fixture.debugElement.queryAll(By.css('a'))
    let service = TestBed.inject(DataServiceService)

    buttons[0].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(service.getStatus()).toBe("All");

    buttons[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(service.getStatus()).toBe("add");

    buttons[2].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(service.getStatus()).toBe("multiply");
  });
});
