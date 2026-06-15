function mapDynamoError(err) {
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

  return "internal_server_error";
}

module.exports = { mapDynamoError };
