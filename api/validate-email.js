import dns from "dns";
import { promisify } from "util";

const resolveMx = promisify(dns.resolveMx);

const DISPOSABLE_DOMAINS = new Set([
  "tempmail.com", "throwaway.email", "guerrillamail.com", "mailinator.com",
  "yopmail.com", "10minutemail.com", "trashmail.com", "fakeinbox.com",
  "sharklasers.com", "guerrillamailblock.com", "grr.la", "dispostable.com",
  "mailnesia.com", "maildrop.cc", "discard.email", "temp-mail.org",
  "tempail.com", "mohmal.com", "burnermail.io", "getnada.com",
  "emailondeck.com", "mintemail.com", "tempr.email", "throwawaymail.com",
  "harakirimail.com", "tmail.ws", "tmpmail.net", "tmpmail.org",
  "binkmail.com", "mailcatch.com", "tempinbox.com", "spamgourmet.com",
  "mytemp.email", "guerrillamail.info", "guerrillamail.net", "guerrillamail.org",
  "guerrillamail.de", "spam4.me", "trashmail.me", "trashmail.net",
  "wegwerfmail.de", "wegwerfmail.net", "emkei.cz", "mailsac.com",
  "jetable.org", "spamfree24.org", "crazymailing.com"
]);

export default async function handler(req, res) {
  const origin = process.env.ALLOWED_ORIGIN || "https://bilalessakini.com";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ valid: false, reason: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(200).json({ valid: false, reason: "Invalid email format" });
    }

    const domain = email.split("@")[1].toLowerCase();

    if (DISPOSABLE_DOMAINS.has(domain)) {
      return res.status(200).json({ valid: false, reason: "Disposable emails are not allowed" });
    }

    try {
      const mxRecords = await resolveMx(domain);
      if (!mxRecords || mxRecords.length === 0) {
        return res.status(200).json({ valid: false, reason: "This email domain doesn't accept mail" });
      }
    } catch {
      return res.status(200).json({ valid: false, reason: "This email domain doesn't accept mail" });
    }

    return res.status(200).json({ valid: true });
  } catch (error) {
    console.error("Email validation error:", error);
    return res.status(500).json({ valid: false, reason: "Validation service error" });
  }
}
