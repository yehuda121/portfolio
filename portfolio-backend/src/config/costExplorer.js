const { CostExplorerClient } = require("@aws-sdk/client-cost-explorer");

const REGION = process.env.AWS_REGION_CE || "us-east-1";

const ce = new CostExplorerClient({ region: REGION });

module.exports = { ce };
