/// <reference path='../_all.ts' />

module todos {
	'use strict';

	/**
	 * このアプリのメインのコントローラ. 
	 * - todoStorage serviceを通して,モデルを維持したり結びつけたりする。
	 * - モデルをテンプレートに渡してイベントハンドラを提供する
	 */

	export class TodoCtrl{

		private todos: TodoItem[];

		public static $inject = [
			'$scope',
			'$location',
			'todoStorage',
			'filterFilter'
		];
		
		
		//依存関係はAngularjs $injector　を通してインジェクトされる
		//コントローラの名前はApplication.tsに登録されて、index.htmlのng-controller属性によって特定されている
		constructor(
			private $scope: ITodoScope,
			private $location: ng.ILocationService,
			private todoStorage: ITodoStorage,
			private filterFilter
		) {
			this.todos = $scope.todos = todoStorage.get();

			$scope.newTodo = '';
			$scope.editedTodo = null;

			//vm はviewmodelから名付けられている。scopeにコントローラへのリファレンスを追加する
			//というのも、view/htmlからこの関数を使えるようにするためにね！
			$scope.vm = this;

			//view/user input によるイベントや変更を感知するために書く
			$scope.$watch('todos', () => this.onTodos(), true);
			$scope.$watch('location.path()', path => this.onPath(path))

			if ($location.path() === '') $location.path('/');
			$scope.location = $location;
		}

		onPath(path: string){
			this.$scope.statusFilter = (path === '/active' ) ? {completed: false} : (path === 'completed' ) ? { completed: true } : {};
		}

		onTodos() {
			this.$scope.remainingCount = this.filterFilter(this.todos, { completed: false }).length;
			this.$scope.doneCount = this.todos.length - this.$scope.remainingCount;
			this.$scope.allChecked = !this.$scope.remainingCount
			this.todoStorage.put(this.todos);
		}

		addTodo(){
			var newTodo : string = this.$scope.newTodo.trim();
			if (!newTodo.length){
				return;
			}
			this.todos.push(new TodoItem(newTodo, false));
			this.$scope.newTodo = '';
		}

		editTodo(todoItem:TodoItem){
			this.$scope.editedTodo = todoItem;

			//編集が中断された時用にクローンしておく
			this.$scope.originalTodo = angular.extend({},todoItem);
		}

		revertEdits(todoItem: TodoItem){
			this.todos[this.todos.indexOf(todoItem)] = this.$scope.originalTodo;
			this.$scope.reverted = true;
		}

		doneEditing(todoItem: TodoItem){
			this.$scope.editedTodo = null;
			this.$scope.originalTodo = null;
			if(this.$scope.reverted){
				this.$scope.reverted = null;
				return;
			}
			todoItem.title = todoItem.title.trim();
			if(!todoItem.title){
				this.removeTodo(todoItem);
			}
		}

		removeTodo(todoItem: TodoItem){
			this.todos.splice(this.todos.indexOf(todoItem),1);
		}

		clearDoneTodos(){
			this.$scope.todos = this.todos = this.todos.filter(todoItem => !todoItem.completed);
		}

		markAll(completed:boolean){
			this.todos.forEach(todoItem => { todoItem.completed = completed;})
		}
	}
}