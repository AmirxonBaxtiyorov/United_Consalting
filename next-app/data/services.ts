export type ServiceKey =
  | 's1'
  | 's2'
  | 's3'
  | 's4'
  | 's5'
  | 's6'
  | 's7'
  | 's8'
  | 's9';

export type Service = {
  key: ServiceKey;
  slug: string;
  icon: string;
  span?: 'col' | 'row' | 'both';
};

export const SERVICES: Service[] = [
  { key: 's1', slug: 'university-selection', icon: 'GraduationCap', span: 'both' },
  { key: 's2', slug: 'document-submission', icon: 'FileText' },
  { key: 's3', slug: 'motivation-letter', icon: 'PenLine' },
  { key: 's4', slug: 'cv', icon: 'Briefcase' },
  { key: 's5', slug: 'translation-apostille', icon: 'Languages', span: 'col' },
  { key: 's6', slug: 'scholarship-advice', icon: 'Award', span: 'row' },
  { key: 's7', slug: 'interview-prep', icon: 'MessagesSquare' },
  { key: 's8', slug: 'visa-support', icon: 'StampIcon' },
  { key: 's9', slug: 'departure-prep', icon: 'Plane' },
];
