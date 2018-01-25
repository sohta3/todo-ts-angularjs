/// <reference path='../_all.ts' />

module todos {
  'use strict';

  const ESCAPE_KEY = 27;


  export function todoEscape(): ng.IDirective{
    return {
      link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
        element.bind('keydown', (event)=>{
          if (event.keyCode === ESCAPE_KEY){
            $scope.$apply(attributes.todoEscape);
          }
        });

        $scope.$on('$destroy', () => { element.unbind('keydown'); });
    }
  };
}
}