import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExpressionComponent} from './expression.component';
import {MatCardModule} from "@angular/material/card";
import {By} from "@angular/platform-browser";

describe('ExpressionComponent', () => {
  let component: ExpressionComponent;
  let fixture: ComponentFixture<ExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpressionComponent],
      imports: [MatCardModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExpressionComponent);
    component = fixture.componentInstance;
  });

  it('should return the expression invalid', () => {
    component.expression = {p: 1, q: "Missing Data", action: "add"}

    expect(component.result()).toBe("Missing Data");
    expect(component.getStyle()).toBe("#ee3131")
    expect(component.getValid()).toBe("invalid")
  });

  it('should return the expression valid', () => {
    component.expression = {p: 1, q: 5, action: "add"}

    expect(component.result()).toBe("1+5=6");
    expect(component.getStyle()).toBe("#41f665")
    expect(component.getValid()).toBe("valid")
  });
  it('should have the right icon', () => {
    component.expression = {p: 1, q: 10, action: "multiply"}
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.css("#multiply"))).not.toBeNull()
  });
});
