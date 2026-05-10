export const ACTION_LABELS: Record<string, string> = {
  'lead.status_change': 'Holat o\'zgartirildi',
  'lead.notes_update': 'Eslatma yangilandi',
  'lead.delete': 'So\'rovnoma o\'chirildi',
  'partner.create': 'Hamkor qo\'shildi',
  'partner.update': 'Hamkor tahrirlandi',
  'partner.delete': 'Hamkor o\'chirildi',
  'auth.login': 'Tizimga kirildi',
  'auth.login_failed': 'Login muvaffaqiyatsiz',
  'auth.logout': 'Tizimdan chiqildi',
};

export function formatActivityWhen(iso: string): string {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 1) return 'hozirgina';
  if (min < 60) return `${min} daq oldin`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} soat oldin`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} kun oldin`;
  return d.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
