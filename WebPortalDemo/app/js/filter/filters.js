/**
 * Created by williamjiang on 2015/5/6.
 */
var fil = angular.module('webPortalApp.filters', []);

fil.filter('captialize', function () {
    return function (input) {
// input�����Ǵ�����ַ���
        if (input) {
            return input[0].toUpperCase() + input.slice(1);
        }
    }
});