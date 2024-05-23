export const ContainsWhiteSpace=(str)=>{
        return Math.max.apply(Math, str.split(" ").map(function (el) { return el.length })); 
  }