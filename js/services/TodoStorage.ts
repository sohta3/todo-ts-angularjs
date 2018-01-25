/// <reference path='../_all.ts' />

module todos {
  'use strict';


  /**
     * localStorageからTODOsを結びつけたりするサービス
  */

  export class TodoStorage implements ITodoStorage {

    STORAGE_ID = 'todo-angularjs-typescript';

    get(): TodoItem[]{
      return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
    }

    put(todo:TodoItem[]){
      localStorage.setItem(this.STORAGE_ID,JSON.stringify(todos));
    }
  }
}