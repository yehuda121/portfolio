const { getOpenAIClient } = require("../../config/openai");
const { buildCharacterSystemPrompt } = require("../../utils/buildCharacterSystemPrompt");
const { mapOpenAIError } = require("../../utils/mapOpenAIError");
const logger = require("../../utils/logger");

const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const ALLOWED_IMAGE_FORMATS = new Set(["jpeg", "png", "webp"]);
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function normalizeImageFormat(format) {
  const value = String(format || "").toLowerCase();
  if (value === "jpg") return "jpeg";
  return value;
}

function imageMime(format) {
  const normalized = normalizeImageFormat(format);
  if (normalized === "jpeg") return "image/jpeg";
  if (normalized === "png") return "image/png";
  if (normalized === "webp") return "image/webp";
  return null;
}

function toOpenAIMessages(messages) {
  return (messages || [])
    .slice(-10)
    .filter((msg) => msg?.role === "user" || msg?.role === "assistant")
    .map((msg) => ({
      role: msg.role,
      content: String(msg.text || "").trim() || "…",
    }));
}

function buildUserMessage(text, image) {
  const parts = [];

  if (image?.data) {
    const format = normalizeImageFormat(image.format);
    const mime = imageMime(format);
    if (!mime) {
      return { error: "chat_invalid_image" };
    }

    let bytes;
    try {
      bytes = Buffer.from(String(image.data), "base64");
    } catch {
      return { error: "chat_invalid_image" };
    }

    if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) {
      return { error: "chat_invalid_image" };
    }

    parts.push({
      type: "image_url",
      image_url: { url: `data:${mime};base64,${image.data}` },
    });
  }

  if (text) {
    parts.push({ type: "text", text });
  } else {
    parts.push({ type: "text", text: "What do you see in this image?" });
  }

  if (parts.length === 1 && parts[0].type === "text") {
    return { message: { role: "user", content: parts[0].text } };
  }

  return { message: { role: "user", content: parts } };
}

async function characterChatHandler(req, res) {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      return res.status(503).json({ ok: false, error: "chat_unavailable" });
    }

    const { character, messages, userMessage, image } = req.body || {};
    const text = String(userMessage || "").trim();

    if (!text && !image?.data) {
      return res.status(400).json({ ok: false, error: "chat_message_required" });
    }

    if (image?.data) {
      const format = normalizeImageFormat(image.format);
      if (!ALLOWED_IMAGE_FORMATS.has(format)) {
        return res.status(400).json({ ok: false, error: "chat_invalid_image" });
      }
    }

    const userResult = buildUserMessage(text, image);
    if (userResult.error) {
      return res.status(400).json({ ok: false, error: userResult.error });
    }

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: buildCharacterSystemPrompt(character) },
        ...toOpenAIMessages(messages),
        userResult.message,
      ],
      max_tokens: 600,
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({ ok: false, error: "chat_empty_reply" });
    }

    return res.json({ ok: true, reply });
  } catch (err) {
    const error = mapOpenAIError(err);
    logger.error("admin_character_chat_failed", { message: err.message, error });
    const status =
      error === "chat_invalid_request" || error === "chat_quota_exceeded"
        ? 503
        : 500;
    return res.status(status).json({ ok: false, error });
  }
}

module.exports = characterChatHandler;
