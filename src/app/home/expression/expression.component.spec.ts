import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionComponent } from './expression.component';

xdescribe('ExpressionComponent', () => {
  let component: ExpressionComponent;
  let fixture: ComponentFixture<ExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
