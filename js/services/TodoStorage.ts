/// <reference path='../_all.ts' />

module todos {
  'use strict';

  /**
     * localStorageからTODOsを結びつけたりするサービス
  */

  export class TodoStorage implements ITodoStorage {

    STORAGE_ID = 'todos-angularjs-typescript';

    get (): TodoItem[] {
      console.log('get is worked');
        return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
    }

    put(todos: TodoItem[]) {
      console.log('put is worked');
        localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
    }
}
}