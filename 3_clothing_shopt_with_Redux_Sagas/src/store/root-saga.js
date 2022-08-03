import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/category.saga";
import { userSagas } from "./user/user.saga";

/*

function* gen() {
  console.log("a");
  console.log("b");
}
const g = gen(); // g is undifined bc the function doesn't return anything
g.next(); // it will now console log a and b and g.next() = {value= undefined, done: true}

function* gen2(i) {
  yield i;
  yield i + 10;
}
const generate = gen2(5); // z is undefined
const gObj = generate.next(); // gObj = {value 5, done: false}
const gObj2 = generate.next(); // gObj2 = {value: 15, done: false}
const gObj3 = generate.next(); // gObj3= {value: undefined, done: true}

function* gen3(i) {
  yield i;
  yield i + 10;
  return 25;
}
const generate3 = gen3(5); // z is undefined
const generateObj = generate3.next(); // generateObj = {value 5, done: false}
const generateObj2 = generate3.next(); // generateObj2 = {value: 15, done: false}
const generateObj3 = generate.next(); // generateObj3= {value: 25 done: true}


*/
// * stands for GENERATOR FUNCTION
export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}
