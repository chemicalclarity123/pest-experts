// src/pages/api/submit-lead.ts
// Endpoint para recibir formularios de leads, guardar en Sanity y enviar correos
import type { APIRoute } from 'astro';
import { createClient } from '@sanity/client';

// Fuerza SSR — este endpoint necesita correr en el servidor, no ser pre-renderizado
export const prerender = false;

/**
 * Helper para obtener variables de entorno desde múltiples fuentes.
 * Cloudflare Pages expone secrets de forma diferente según la versión del adapter.
 * También maneja keys con espacios accidentales (ej: " RESEND_API_KEY" en el dashboard).
 */
function getEnvVar(name: string, runtimeEnv?: Record<string, any>): string | undefined {
  // 1. Búsqueda exacta en runtimeEnv
  if (runtimeEnv?.[name]) return runtimeEnv[name];
  // 2. Búsqueda con trim — cubre keys con espacios accidentales en Cloudflare Dashboard
  if (runtimeEnv) {
    const trimmedMatch = Object.keys(runtimeEnv).find(k => k.trim() === name);
    if (trimmedMatch && runtimeEnv[trimmedMatch]) return runtimeEnv[trimmedMatch];
  }
  // 3. import.meta.env — build-time env vars
  if ((import.meta.env as any)[name]) return (import.meta.env as any)[name];
  // 4. process.env — último recurso para Node-compatible runtimes
  try { if ((globalThis as any).process?.env?.[name]) return (globalThis as any).process.env[name]; } catch { }
  return undefined;
}

/**
 * Extrae el entorno de Cloudflare runtime.
 * La ruta estándar es locals.runtime.env (adapter v10+).
 */
function extractRuntimeEnv(locals: any): Record<string, any> | undefined {
  if (locals?.runtime?.env && typeof locals.runtime.env === 'object') {
    return locals.runtime.env;
  }
  if (locals?.runtime && typeof locals.runtime === 'object') {
    return locals.runtime;
  }
  return undefined;
}

/* ─── Plantilla de correo para el equipo (admin) ─── */
function buildAdminEmail(data: Record<string, string>) {
  const timestamp = new Date().toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

        <!-- Header verde -->
        <tr>
          <td style="background:#1d5f20;padding:28px 32px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">🪲 New Lead Received</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Pest Experts Website</p>
          </td>
        </tr>

        <!-- Cuerpo -->
        <tr>
          <td style="padding:28px 32px;">
            <p style="margin:0 0 20px;color:#374151;font-size:15px;">A new quote request has been submitted. Details below:</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
              <tr style="background:#f9fafb;">
                <td style="padding:12px 16px;font-weight:600;color:#374151;font-size:14px;width:130px;border-bottom:1px solid #e5e7eb;">Name</td>
                <td style="padding:12px 16px;color:#1f2937;font-size:14px;border-bottom:1px solid #e5e7eb;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-weight:600;color:#374151;font-size:14px;width:130px;border-bottom:1px solid #e5e7eb;">Phone</td>
                <td style="padding:12px 16px;color:#1f2937;font-size:14px;border-bottom:1px solid #e5e7eb;">
                  <strong style="color:#1d5f20;">${data.phone}</strong>
                </td>
              </tr>
              <tr style="background:#f9fafb;">
                <td style="padding:12px 16px;font-weight:600;color:#374151;font-size:14px;width:130px;border-bottom:1px solid #e5e7eb;">Email</td>
                <td style="padding:12px 16px;color:#1f2937;font-size:14px;border-bottom:1px solid #e5e7eb;">
                  <strong style="color:#1d5f20;">${data.email}</strong>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-weight:600;color:#374151;font-size:14px;width:130px;border-bottom:1px solid #e5e7eb;">Suburb</td>
                <td style="padding:12px 16px;color:#1f2937;font-size:14px;border-bottom:1px solid #e5e7eb;">${data.suburb || 'Not specified'}</td>
              </tr>
              <tr style="background:#f9fafb;">
                <td style="padding:12px 16px;font-weight:600;color:#374151;font-size:14px;width:130px;">Message</td>
                <td style="padding:12px 16px;color:#1f2937;font-size:14px;">${data.message || 'No message provided'}</td>
              </tr>
            </table>

            <!-- Metadata -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
              <tr>
                <td style="padding:8px 0;color:#9ca3af;font-size:12px;">
                  <strong>Source:</strong> ${data.source || 'Unknown'} &nbsp;|&nbsp;
                  <strong>Received:</strong> ${timestamp}
                </td>
              </tr>
            </table>

            <!-- CTA rápida -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
              <tr>
                <td align="center">
                  <div style="display:inline-block;background:#1d5f20;color:#ffffff;padding:12px 28px;border-radius:8px;font-weight:600;font-size:14px;">
                    📞 Phone: ${data.phone}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">Pest Experts — Gauteng's Trusted Pest Control</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─── Plantilla de correo de confirmación para el usuario ─── */
function buildUserEmail(data: Record<string, string>) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

        <!-- Header verde -->
        <tr>
          <td style="background:#1d5f20;padding:32px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Thank You, ${data.fullName}!</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:15px;">We've received your enquiry</p>
          </td>
        </tr>

        <!-- Cuerpo -->
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">
              Thank you for reaching out to <strong>Pest Experts</strong>. We've received your request and a member of our team will be in touch with you <strong>within 1 hour</strong> during business hours.
            </p>

            <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.6;">
              Here's a summary of what you submitted:
            </p>

            <!-- Resumen -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;overflow:hidden;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 6px;color:#166534;font-size:13px;"><strong>Suburb:</strong> ${data.suburb || 'Not specified'}</p>
                  <p style="margin:0;color:#166534;font-size:13px;"><strong>Message:</strong> ${data.message || 'No message'}</p>
                </td>
              </tr>
            </table>

            <!-- Urgente -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;overflow:hidden;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 8px;color:#92400e;font-size:14px;font-weight:600;">⚡ Need urgent help?</p>
                  <p style="margin:0;color:#92400e;font-size:14px;line-height:1.5;">
                    Contact us directly at <strong style="color:#1d5f20;">071 590 6630</strong>
                    or chat with us on <strong>WhatsApp</strong> at the same number.
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin:24px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">
              Kind regards,<br>
              <strong style="color:#1d5f20;">The Pest Experts Team</strong><br>
              Gauteng's Trusted Pest Control
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;">Pest Experts (Pty) Ltd</p>
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              <a href="https://pestexperts.co.za" style="color:#1d5f20;text-decoration:none;">pestexperts.co.za</a> &nbsp;|&nbsp;
              <a href="tel:+27715906630" style="color:#1d5f20;text-decoration:none;">071 590 6630</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─── Envía correo via Resend API ─── */
async function sendEmail(
  apiKey: string,
  to: string[],
  subject: string,
  html: string,
  from: string = 'Pest Experts <info@pestexperts.co.za>',
  replyTo?: string,
) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Resend API error:', response.status, errorBody);
    return { success: false, error: errorBody };
  }

  return { success: true };
}

/* ─── Handler principal ─── */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Extrae el entorno de Cloudflare runtime — prueba múltiples rutas
    const runtimeEnv = extractRuntimeEnv(locals);

    console.log('API handler started. Runtime env available:', !!runtimeEnv,
      'RESEND key found:', !!getEnvVar('RESEND_API_KEY', runtimeEnv));

    const data = await request.json();

    // 1. Origin Verification (CORS/CSRF Protection)
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://pestexperts.co.za',
      'https://www.pestexperts.co.za',
      'http://localhost:4321',
      'http://localhost:3000'
    ];

    // Si el origen no está en la lista permitida (y existe), y no contiene '.pages.dev', bloqueamos
    if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed)) && !origin.endsWith('.pages.dev')) {
      console.warn(`Blocked request from unauthorized origin: ${origin}`);
      return new Response(JSON.stringify({ error: 'Unauthorized request origin.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Honeypot Validation (Bot Protection)
    if (data.a_password && data.a_password.trim() !== '') {
      console.warn('Bot detected via honeypot field. Dropping submission silently.');
      // Devolvemos 200 OK para que el bot piense que tuvo éxito, pero no procesamos nada
      return new Response(JSON.stringify({
        success: true,
        message: "Thank you! We'll contact you within 1 hour."
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Acepta ambos nombres de campo para compatibilidad (cast to string to fix TS errors)
    const name = String(data.fullName || data.name || '');
    const phone = String(data.phone || '');
    const email = String(data.email || '');
    const suburb = String(data.suburb || data.pestChallenge || '');
    const message = String(data.message || '');

    // Valida campos obligatorios
    if (!name || !phone || !email || !suburb || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required. Please complete the form.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Intenta guardar en Sanity (opcional — no bloquea si falla)
    let submissionId = 'no-sanity';
    const sanityToken = getEnvVar('SANITY_WRITE_TOKEN', runtimeEnv);
    if (sanityToken) {
      try {
        const sanityClient = createClient({
          projectId: getEnvVar('PUBLIC_SANITY_PROJECT_ID', runtimeEnv) || 'vc8zkv1m',
          dataset: getEnvVar('PUBLIC_SANITY_DATASET', runtimeEnv) || 'production',
          apiVersion: getEnvVar('PUBLIC_SANITY_API_VERSION', runtimeEnv) || '2024-01-01',
          token: sanityToken,
          useCdn: false,
        });

        const submission = await sanityClient.create({
          _type: 'formSubmission',
          name: name,
          phone: phone,
          email: email,
          serviceInterest: suburb,
          message: message,
          submittedAt: new Date().toISOString(),
          status: 'new',
          source: data.source || 'homepage',
        });
        submissionId = submission._id;
        console.log('Sanity submission created:', submissionId);
      } catch (sanityErr) {
        // Sanity falla pero no bloquea el envío — los emails se envían igual
        console.error('Sanity save failed (non-blocking):', sanityErr);
      }
    } else {
      console.warn('SANITY_WRITE_TOKEN not found — skipping Sanity save');
    }

    // Prepara datos para las plantillas de correo
    const emailData = {
      fullName: name,
      phone,
      email,
      suburb,
      message,
      source: data.source || 'homepage',
    };

    // Obtiene la API key de Resend desde runtime env o build-time env
    const resendApiKey = getEnvVar('RESEND_API_KEY', runtimeEnv);

    if (resendApiKey) {
      // Envía correo de notificación al equipo
      const adminEmailPromise = sendEmail(
        resendApiKey,
        ['louderthan+pests@gmail.com', 'info@pestexperts.co.za'],
        `New Lead: ${name} — ${suburb}`,
        buildAdminEmail(emailData),
        'Pest Experts Website <website@pestexperts.co.za>', // Use a different address to prevent self-spoofing drops
        email, // Reply to client
      );

      // Envía correo de confirmación al usuario
      const userEmailPromise = sendEmail(
        resendApiKey,
        [email],
        'Thank You for Contacting Pest Experts',
        buildUserEmail(emailData),
        'info@pestexperts.co.za' // Simplified From
      );

      // Espera ambos emails para confirmar que se enviaron antes de responder
      try {
        const results = await Promise.all([adminEmailPromise, userEmailPromise]);

        // Si alguno falló, lanzamos error para que el catch lo maneje
        const failedResult = results.find(r => !r.success);
        if (failedResult) {
          let errorMsg = failedResult.error || 'Unknown error';
          try {
            // Intenta parsear JSON de Resend
            const parsed = JSON.parse(failedResult.error || '{}');
            errorMsg = parsed.message || errorMsg;
          } catch (e) { }
          throw new Error(errorMsg);
        }

        console.log('Both emails sent successfully');
      } catch (emailErr: any) {
        console.error('Email sending failed:', emailErr);
        // Devolvemos error 500 con el mensaje exacto para debugging
        return new Response(
          JSON.stringify({ error: `Resend Error: ${emailErr.message}` }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // Diagnóstico detallado — ayuda a depurar bindings faltantes en Cloudflare
      const availableKeys = runtimeEnv ? Object.keys(runtimeEnv) : [];
      console.error(
        'RESEND_API_KEY not found in any env source.',
        '\n  runtime env available:', !!runtimeEnv,
        '\n  runtime env keys:', availableKeys.length > 0 ? availableKeys.join(', ') : '(empty)',
        '\n  import.meta.env has RESEND_API_KEY:', !!(import.meta.env as any).RESEND_API_KEY,
      );
      return new Response(
        JSON.stringify({
          error: 'Email service is temporarily unavailable. Your enquiry was saved — we will contact you shortly.',
          debug: `runtime_env=${!!runtimeEnv}, keys=${availableKeys.length}`,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you! We'll contact you within 1 hour.",
        submissionId: submissionId,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit form. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
