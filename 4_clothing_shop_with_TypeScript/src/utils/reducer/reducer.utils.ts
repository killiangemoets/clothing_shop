import { AnyAction } from "redux";
// AnyAction type is an interface that extends upon the action type

//// TYPE PREDICATE FUNCTION ////
type Alien = {
  fly: () => {};
};

type Human = {
  speak: () => {};
};

// The output of this function is this type predicate
function isHuman(entity: Human | Alien): entity is Human {
  return (entity as Human).speak !== undefined;
  // We have to write (entity as Human).speak bc if we write entity.speak and entity doesn't have the speak method, we're gonna have an error
}

/*
//// INTERSECTION TYPE ////
type Human = {
  name: string;
};

type Alien = {
  fly: () => void;
};

// An interserction is the joining of two differents types:
type Hybrid = Human & Alien;

const Josh: Hybrid = {
  name: "josh",
  fly: () => {},
};
*/
/*
//// RETURN TYPE ////
type Human = {
  name: string;
};

// type MyFunc = () => string;
type MyFunc = () => Human;

// ReturnType allows to get the return type of a function
type MyReturn = ReturnType<MyFunc>;
*/

// AC stands for Action Creator
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type; //bc we now that actionCreator must return back an action, and every actionmust have a type value
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}
// I want to be able to pass that enumarable member value and then set that as the type
// For the payload, we can pass in any payload that we want
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// We want action with payload and action without payload to be 2 different types, that's why we don't just write "payload?: P"

// Then depending of if we receive a payload or not, we want to return the appropriate action

// FUNCTION OVERLOADING comes from TypeScript. It provides us the ability to make multiple function type definitions of the same name, so we can have multiple type definitions for create action.
// => It allows us to receive different parameter types, and it can now return different types depending on the parameter types that we receive

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void //void means that we are not expecting anything
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

// export const createAction = (type, payload) => ({ type, payload });
