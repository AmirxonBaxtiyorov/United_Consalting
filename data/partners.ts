export type Partner = {
  name: string;
  logo: string;
};

// Real partner universities. Logos served from /public/partners/ so they
// are not subject to third-party rate limits or hotlink blocks.
export const PARTNERS: Partner[] = [
  { name: 'Marmara Üniversitesi', logo: '/partners/marmara.jpg' },
  { name: 'Istanbul Kent University', logo: '/partners/istanbul-kent.jpg' },
  { name: 'İstanbul Kültür Üniversitesi', logo: '/partners/istanbul-kultur.jpg' },
  { name: 'Nişantaşı University', logo: '/partners/nisantasi.jpg' },
  { name: 'Üsküdar University', logo: '/partners/uskudar.jpg' },
];
