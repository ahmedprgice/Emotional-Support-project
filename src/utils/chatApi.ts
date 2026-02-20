export type Persona = "joy" | "sadness" | "anger" | "fear" | "disgust";

export async function sendToBot(persona: Persona, message: string) {
  const res = await fetch("http://localhost:3001/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ persona, message }),
  });

  const data = await res.json();
  return data.reply;
}
