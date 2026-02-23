export type Persona = "joy" | "sadness" | "anger" | "fear" | "disgust";

export async function sendToBot(persona: Persona, message: string) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ persona, message }),
  });

  if (!res.ok) {
    throw new Error("Failed to get response from server");
  }

  const data = await res.json();
  return data.reply;
}