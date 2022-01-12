'use strict';

module.exports = {
    up: async function (queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'users',
            'isCompany',
            {type: Sequelize.BOOLEAN}
        )
    },


    down: async function (queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'users',
            'isCompany',
        )
    }
};
