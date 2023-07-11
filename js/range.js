function range(start, stop, step){
  step = step || 1;
  var arr = [];
  for (var i=start;i<stop;i+=step){
     arr.push(i);
  }
  return arr;
};