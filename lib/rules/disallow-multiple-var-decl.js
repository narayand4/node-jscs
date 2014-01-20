var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {

    configure: function(disallowMultipleVarDecl) {
        assert(
            typeof disallowMultipleVarDecl === 'boolean',
            'disallowMultipleVarDecl option requires boolean value'
        );
        assert(
            disallowMultipleVarDecl === true,
            'disallowMultipleVarDecl option requires true value or should be removed'
        );
    },

    getOptionName: function () {
        return 'disallowMultipleVarDecl';
    },

    check: function(file, errors) {
        file.iterateNodesByType('VariableDeclaration', function (node) {
            var pos = node.parentCollection.indexOf(node);
            if (pos < node.parentCollection.length - 1 && node.parentNode.type !== 'ForStatement') {
                var sibling = node.parentCollection[pos + 1];
                if (sibling.type === 'VariableDeclaration') {
                    errors.add(
                        'Var declarations should be joined',
                        sibling.loc.start
                    );
                }
            }
        });
    }

};
