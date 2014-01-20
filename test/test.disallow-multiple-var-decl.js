var Checker = require('../lib/checker');
var assert = require('assert');

describe('rules/disallow-multiple-var-decl', function() {
    var checker;
    beforeEach(function() {
        checker = new Checker();
        checker.registerDefaultRules();
    });
    it('should not report multiple var decl', function() {
        checker.configure({ disallowMultipleVarDecl: true });
        assert(checker.checkString('var x, y;').getErrorList(), []);
    });
    it('should report separated var decl', function() {
        checker.configure({ disallowMultipleVarDecl: true });
        assert(checker.checkString('var x; x++; var y;').getErrorList(), 1);
    });
    it('should not report single var decl', function() {
        checker.configure({ disallowMultipleVarDecl: true });
        assert(checker.checkString('var x;').getErrorList(), []);
    });
    it('should report separated var decl', function() {
        checker.configure({ disallowMultipleVarDecl: true });
        assert(checker.checkString('var x; var y;').getErrorCount(), 1);
    });
    it('should not report multiple var decl in for statement', function() {
        checker.configure({ disallowMultipleVarDecl: true });
        assert(checker.checkString('var foo; for (var i = 0, j = arr.length; i < j; i++) {}').getErrorList(), []);
    });
});
