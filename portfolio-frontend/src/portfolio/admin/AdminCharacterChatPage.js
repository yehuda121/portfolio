import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { adminCharacterChat } from "../../api/quizApi";
import InlineAlert from "../../components/ui/InlineAlert/InlineAlert";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import AdminShell from "./AdminShell";
import "./AdminPage.css";

const EMPTY_CHARACTER = {
  name: "",
  age: "",
  location: "",
  religion: "",
  world: "",
  personality: "",
  speakingStyle: "",
  extraNotes: "",
};

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

const CHAT_ERROR_KEYS = {
  chat_message_required: "Admin.chat.errors.messageRequired",
  chat_invalid_image: "Admin.chat.errors.invalidImage",
  chat_empty_reply: "Admin.chat.errors.emptyReply",
  bedrock_access_denied: "Admin.chat.errors.accessDenied",
  aws_not_configured: "Admin.chat.errors.awsNotConfigured",
  chat_invalid_request: "Admin.chat.errors.invalidRequest",
  chat_quota_exceeded: "Admin.chat.errors.quotaExceeded",
  chat_unavailable: "Admin.chat.errors.unavailable",
  network_error: "Admin.chat.errors.unavailable",
  api_not_configured: "Quiz.errors.apiNotConfigured",
};

function formatFromMime(mime) {
  if (mime === "image/jpeg" || mime === "image/jpg") return "jpeg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("read_failed"));
    reader.readAsDataURL(file);
  });
}

const AdminCharacterChatPage = () => {
  const { t } = useTranslation();
  const [character, setCharacter] = useState(EMPTY_CHARACTER);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pendingImage, setPendingImage] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const updateCharacter = (field, value) => {
    setCharacter((prev) => ({ ...prev, [field]: value }));
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setPendingImage(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetCharacter = () => {
    setCharacter(EMPTY_CHARACTER);
  };

  const clearPendingImage = () => {
    setPendingImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError(t("Admin.chat.errors.invalidImageType"));
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setError(t("Admin.chat.errors.imageTooLarge"));
      e.target.value = "";
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const base64 = dataUrl.split(",")[1] || "";
      setPendingImage({
        preview: dataUrl,
        data: base64,
        format: formatFromMime(file.type),
      });
      setError(null);
    } catch {
      setError(t("Admin.chat.errors.invalidImage"));
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (sending || (!text && !pendingImage)) return;

    setSending(true);
    setError(null);

    const history = messages.slice(-10).map(({ role, text: msgText }) => ({
      role,
      text: msgText,
    }));

    const result = await adminCharacterChat({
      character,
      messages: history,
      userMessage: text,
      image: pendingImage
        ? { data: pendingImage.data, format: pendingImage.format }
        : undefined,
    });

    setSending(false);

    if (!result.ok || !result.data?.reply) {
      const key = CHAT_ERROR_KEYS[result.error] || CHAT_ERROR_KEYS.chat_unavailable;
      setError(t(key));
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: text || t("Admin.chat.imageOnlyMessage"),
      imagePreview: pendingImage?.preview || null,
    };
    const assistantMessage = {
      id: Date.now() + 1,
      role: "assistant",
      text: result.data.reply,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    clearPendingImage();
  };

  const canSend = !sending && (input.trim() || pendingImage);

  return (
    <AdminShell
      title={t("Admin.chat.title")}
      subtitle={t("Admin.chat.subtitle")}
      backTo="/Admin"
      backLabel={t("Admin.backToDashboard")}
    >
      <div className="admin-chat-layout">
        <div className="quiz-card admin-chat-profile-card">
          <div className="admin-chat-profile-header">
            <h3 className="admin-costs-section-title">{t("Admin.chat.profileTitle")}</h3>
            <button type="button" className="quiz-next-btn" onClick={resetCharacter}>
              {t("Admin.chat.resetCharacter")}
            </button>
          </div>

          <div className="admin-chat-profile-grid">
            <label className="quiz-admin-label">
              {t("Admin.chat.fields.name")}
              <input
                className="quiz-admin-input"
                value={character.name}
                onChange={(e) => updateCharacter("name", e.target.value)}
              />
            </label>
            <label className="quiz-admin-label">
              {t("Admin.chat.fields.age")}
              <input
                className="quiz-admin-input"
                value={character.age}
                onChange={(e) => updateCharacter("age", e.target.value)}
              />
            </label>
            <label className="quiz-admin-label">
              {t("Admin.chat.fields.location")}
              <input
                className="quiz-admin-input"
                value={character.location}
                onChange={(e) => updateCharacter("location", e.target.value)}
              />
            </label>
            <label className="quiz-admin-label">
              {t("Admin.chat.fields.religion")}
              <input
                className="quiz-admin-input"
                value={character.religion}
                onChange={(e) => updateCharacter("religion", e.target.value)}
              />
            </label>
            <label className="quiz-admin-label admin-chat-profile-full">
              {t("Admin.chat.fields.world")}
              <input
                className="quiz-admin-input"
                value={character.world}
                onChange={(e) => updateCharacter("world", e.target.value)}
              />
            </label>
            <label className="quiz-admin-label admin-chat-profile-full">
              {t("Admin.chat.fields.personality")}
              <textarea
                className="quiz-admin-textarea"
                rows={2}
                value={character.personality}
                onChange={(e) => updateCharacter("personality", e.target.value)}
              />
            </label>
            <label className="quiz-admin-label admin-chat-profile-full">
              {t("Admin.chat.fields.speakingStyle")}
              <textarea
                className="quiz-admin-textarea"
                rows={2}
                value={character.speakingStyle}
                onChange={(e) => updateCharacter("speakingStyle", e.target.value)}
              />
            </label>
            <label className="quiz-admin-label admin-chat-profile-full">
              {t("Admin.chat.fields.extraNotes")}
              <textarea
                className="quiz-admin-textarea"
                rows={2}
                value={character.extraNotes}
                onChange={(e) => updateCharacter("extraNotes", e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="quiz-card admin-chat-panel">
          <div className="admin-chat-toolbar">
            <button type="button" className="quiz-next-btn" onClick={resetChat}>
              {t("Admin.chat.resetChat")}
            </button>
          </div>

          <div className="admin-chat-messages">
            {messages.length === 0 && !sending && (
              <div className="admin-chat-empty">{t("Admin.chat.empty")}</div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`admin-chat-row admin-chat-row-${msg.role}`}
              >
                <div className={`admin-chat-bubble admin-chat-bubble-${msg.role}`}>
                  {msg.imagePreview && (
                    <img
                      src={msg.imagePreview}
                      alt={t("Admin.chat.uploadedImageAlt")}
                      className="admin-chat-message-image"
                    />
                  )}
                  {msg.text && <div className="admin-chat-message-text">{msg.text}</div>}
                </div>
              </div>
            ))}
            {sending && (
              <div className="admin-chat-row admin-chat-row-assistant">
                <div className="admin-chat-bubble admin-chat-bubble-assistant admin-chat-typing">
                  <LoadingSpinner label={t("Admin.chat.thinking")} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && <InlineAlert type="error" message={error} />}

          {pendingImage && (
            <div className="admin-chat-image-preview">
              <img src={pendingImage.preview} alt={t("Admin.chat.previewAlt")} />
              <button
                type="button"
                className="quiz-next-btn admin-chat-remove-image"
                onClick={clearPendingImage}
              >
                {t("Admin.chat.removeImage")}
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-chat-form">
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              className="admin-chat-file-input"
              onChange={handleImageSelect}
              disabled={sending}
            />
            <button
              type="button"
              className="quiz-next-btn admin-chat-attach-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={sending}
            >
              {t("Admin.chat.attachImage")}
            </button>
            <input
              type="text"
              className="quiz-admin-input admin-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("Admin.chat.inputPlaceholder")}
              autoComplete="off"
              disabled={sending}
            />
            <button type="submit" className="quiz-start-btn" disabled={!canSend}>
              {sending ? t("Admin.chat.sending") : t("Admin.chat.send")}
            </button>
          </form>
        </div>
      </div>
    </AdminShell>
  );
};

export default AdminCharacterChatPage;
