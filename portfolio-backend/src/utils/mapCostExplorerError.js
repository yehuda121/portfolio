function mapCostExplorerError(err) {
  const name = err?.name || "";
  const message = err?.message || "";

  if (
    name === "CredentialsProviderError" ||
    message.includes("Could not load credentials") ||
    message.includes("security token") ||
    name === "UnrecognizedClientException" ||
    name === "InvalidSignatureException"
  ) {
    return "aws_not_configured";
  }

  if (
    name === "AccessDeniedException" ||
    name === "UnauthorizedException" ||
    message.includes("not authorized") ||
    message.includes("AccessDenied")
  ) {
    return "cost_explorer_access_denied";
  }

  if (
    name === "DataUnavailableException" ||
    message.includes("Cost Explorer is not enabled") ||
    message.includes("not enabled")
  ) {
    return "cost_explorer_disabled";
  }

  return "costs_unavailable";
}

module.exports = { mapCostExplorerError };
