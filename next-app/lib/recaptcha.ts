export async function verifyRecaptcha(
  token: string | null | undefined,
  expectedAction?: string
): Promise<{ ok: boolean; score: number; reason?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true, score: 1 };
  if (!token) return { ok: false, score: 0, reason: 'missing_token' };

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }).toString(),
    });
    const data = (await res.json()) as {
      success: boolean;
      score?: number;
      action?: string;
      'error-codes'?: string[];
    };

    if (!data.success) {
      return { ok: false, score: 0, reason: (data['error-codes'] ?? []).join(',') };
    }
    if (expectedAction && data.action && data.action !== expectedAction) {
      return { ok: false, score: data.score ?? 0, reason: 'wrong_action' };
    }
    const score = data.score ?? 0;
    return { ok: score >= 0.5, score, reason: score < 0.5 ? 'low_score' : undefined };
  } catch (e) {
    console.error('[recaptcha] verify error', e);
    return { ok: true, score: 0, reason: 'verify_failed' };
  }
}
