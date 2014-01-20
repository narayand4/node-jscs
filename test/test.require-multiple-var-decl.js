var Checker = require('../lib/checker');
var assert = require('assert');

describe('rules/require-multiple-var-decl', function() {
    var checker;
    beforeEach(function() {
        checker = new Checker();
        checker.registerDefaultRules();
    });
    it('should report multiple consecutive var decl', function() {
        checker.configure({ requireMultipleVarDecl: true });
        assert(checker.checkString('var x; var y;').getErrorList(), []);
    });
    it('should report single consecutive var decl', function() {
        checker.configure({ requireMultipleVarDecl: true });
        assert(checker.checkString('var x, y;').getErrorCount(), 1);
    });
    it('should not report separated var decl', function() {
        checker.configure({ requireMultipleVarDecl: true });
        assert(checker.checkString('var x; x++; var y;').getErrorList(), []);
    });
});
