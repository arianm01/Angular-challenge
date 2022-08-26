export interface Numbers {
  value: number,
  action: string
}

export interface Expressions {
  p: number,
  q: number,
  action: string
}

export interface Data {
  Number: Numbers[],
  add: { value: number },
  multiply: { value: number }
}
