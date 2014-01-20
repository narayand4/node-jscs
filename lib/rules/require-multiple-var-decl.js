var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {
    configure: function(requireMultipleVarDecl) {
        assert(
            typeof requireMultipleVarDecl === 'boolean',
            'requireMultipleVarDecl option requires boolean value'
        );
        assert(
            requireMultipleVarDecl === true,
            'requireMultipleVarDecl option requires true value or should be removed'
        );
    },

    getOptionName: function () {
        return 'requireMultipleVarDecl';
    },

    check: function(file, errors) {
        file.iterateNodesByType('VariableDeclaration', function (node) {
            // allow multiple var declarations in for statement
            // for (var i = 0, j = myArray.length; i < j; i++) {}
            if (node.declarations.length > 1 && node.parentNode.type !== 'ForStatement') {
                errors.add('Multiple var declaration should be used', node.loc.start);
            }
        });
    }

};
