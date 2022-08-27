export interface Numbers {
  value: number,
  action: string
}

export interface Expressions {
  p: number,
  q: number | string,
  action: string
}

export interface Data {
  Number: Numbers[],
  add: { value: number | string },
  multiply: { value: number | string }
}
