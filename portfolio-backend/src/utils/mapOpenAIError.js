function mapOpenAIError(err) {
  const status = err?.status || err?.response?.status;
  const code = err?.code || err?.error?.code || "";
  const message = err?.message || "";

  if (
    message.includes("OPENAI_API_KEY") ||
    code === "invalid_api_key" ||
    status === 401
  ) {
    return "chat_unavailable";
  }

  if (
    status === 429 ||
    code === "rate_limit_exceeded" ||
    code === "insufficient_quota" ||
    message.includes("Rate limit") ||
    message.includes("quota")
  ) {
    return "chat_quota_exceeded";
  }

  if (status === 400 || code === "invalid_request_error") {
    return "chat_invalid_request";
  }

  return "chat_unavailable";
}

module.exports = { mapOpenAIError };
