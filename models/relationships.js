const models = require('./index.js');

models.SubLeavingReason.belongsTo(models.LeavingReason);
