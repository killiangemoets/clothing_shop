// These are the only three category related action types
// So thhis can be converted to a enumarable type, i.e. a enum
// An enum is an extended data structure that TypeScript introduces to us
// It's usable the same way that you can use an object
// The only thing about it is that IT HAS FIXED VALUES

export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED",
}

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};
