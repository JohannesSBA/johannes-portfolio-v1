import { ContactPayload, ContactResponse } from "./types";

export async function sendContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  let json: ContactResponse | undefined;
  try {
    json = (await res.json()) as ContactResponse;
  } catch {}
  if (!res.ok || !json?.ok) {
    throw new Error(json?.error || "Failed to send");
  }
  return json;
}

