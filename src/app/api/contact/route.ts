import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      name = "",
      email = "",
      brief = "",
      url = "",
      stage = "",
      deadline = "",
      budget = "",
    } = data ?? {};

    // Basic validation
    if (!name || !email || !brief) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Name, email and brief are required.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: "Please provide a valid email." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO_EMAIL || "johannesseleshi@gmail.com";
    const FROM =
      process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Missing RESEND_API_KEY server env.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const subject = `New portfolio inquiry from ${name}`;
    const text = `New inquiry from ${name} (${email})\n\nBrief:\n${brief}\n\nWebsite: ${
      url || "-"
    }\nStage: ${stage || "-"}\nDeadline: ${deadline || "-"}\nBudget: ${
      budget || "-"
    }`;
    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; font-size:14px; color:#111">
        <h2>New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Website:</strong> ${escapeHtml(url || "-")}</p>
        <p><strong>Stage:</strong> ${escapeHtml(stage || "-")}</p>
        <p><strong>Deadline:</strong> ${escapeHtml(deadline || "-")}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget || "-")}</p>
        <p><strong>Brief:</strong></p>
        <pre style="white-space:pre-wrap; background:#f7f7f8; padding:12px; border-radius:8px">${escapeHtml(
          brief
        )}</pre>
      </div>
    `;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: [email],
        subject,
        text,
        html,
      }),
      // Resend API runs over HTTPS; no extra config needed.
    });

    if (!resp.ok) {
      const body = await resp.text();
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Email send failed",
          details: body,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return new Response(
      JSON.stringify({ ok: false, error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
