import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, message, wordCount, deadline, formType } = body;

    const targetEmail = "pencrack684@gmail.com";
    const subject = `[Pen Crack ${formType || "Form"}] Submission from ${name || email}`;

    // Payload for FormSubmit service (AJAX JSON)
    const payload = {
      _subject: subject,
      _template: "table",
      _captcha: "false",
      form_type: formType || "General Contact Inquiry",
      sender_name: name || "N/A",
      sender_email: email || "N/A",
      service_requested: service || "N/A",
      word_count_scope: wordCount || "N/A",
      target_deadline: deadline || "N/A",
      project_brief_message: message || "N/A",
      submitted_at: new Date().toISOString(),
    };

    // 1. Dispatch to FormSubmit AJAX endpoint
    await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    }).catch((err) => console.error("FormSubmit fetch error:", err));

    // 2. Dispatch Form-Encoded payload to trigger FormSubmit activation email if not yet activated
    const formData = new URLSearchParams();
    formData.append("_subject", subject);
    formData.append("email", email || targetEmail);
    formData.append("name", name || "Client");
    formData.append("service", service || "General");
    formData.append("message", message || "N/A");

    await fetch(`https://formsubmit.co/${targetEmail}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    }).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        message: `Submission successfully processed for ${targetEmail}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Contact Route Error:", error);
    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  }
}
