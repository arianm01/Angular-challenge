import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.css']
})
export class ExpressionComponent implements OnInit {
  @Input('item') expression: any

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.expression)
  }

  result() {
    return this.validate() ? this.expression.p + (this.expression.action === "add" ? "+" : "*") + this.expression.q + "=" +
      (this.expression.action === "add" ? this.expression.p + this.expression.q : this.expression.p * this.expression.q)
      : this.expression.q
  }

  getStyle() {
    return this.validate() ? this.expression.action === "add" ? "#41f665" : "#4393e5" : "#ee3131";
  }


  validate() {
    return this.expression.q !== "Missing Data"
  }

  getValid() {
    return this.validate() ? "valid" : "invalid"
  }

}
