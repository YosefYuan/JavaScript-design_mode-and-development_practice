var obj1 = {
  name:'sven',
  getName: function(){
    return this.name;
  }
};

var obj2 = {
  name:'anne'
};

console.log(obj1.getName());
console.log(obj1.getName.call(obj2));