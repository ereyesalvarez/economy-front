
let a = [
  {
    x: "a",
    y: "b"
  },
  {
    x: "a1",
    y: "b2"
  }
]

console.log(a.find(value => value.x === "b") === undefined)
