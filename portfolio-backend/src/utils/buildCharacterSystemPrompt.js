function line(label, value) {
  const trimmed = String(value || "").trim();
  return trimmed ? `- ${label}: ${trimmed}` : null;
}

function buildCharacterSystemPrompt(character = {}) {
  const profileLines = [
    line("Name", character.name),
    line("Age", character.age),
    line("Location", character.location),
    line("Religion / background", character.religion),
    line("World / setting", character.world),
    line("Personality", character.personality),
    line("Speaking style", character.speakingStyle),
    line("Extra notes", character.extraNotes),
  ].filter(Boolean);

  const languageRules = [
    "If the user writes in Hebrew, respond in Hebrew. Otherwise respond in the same language the user uses.",
    "Keep replies relatively short and conversational unless the user asks for more detail.",
  ];

  if (profileLines.length === 0) {
    return [
      "You are a helpful AI assistant in a conversation with an admin user.",
      ...languageRules,
    ].join("\n");
  }

  return [
    "You are roleplaying as a character in a conversation with an admin user.",
    "Stay in character at all times. Answer according to the character profile below.",
    ...languageRules,
    "",
    "Character profile:",
    ...profileLines,
  ].join("\n");
}

module.exports = { buildCharacterSystemPrompt };
