import type { Subject } from '@/types';

export const SUBJECTS: Subject[] = [
  { id: 'dai-so', name: 'Đại số', icon: 'Σ' },
  { id: 'giai-tich', name: 'Giải tích', icon: '∫' },
  { id: 'hinh-hoc', name: 'Hình học', icon: '△' },
  { id: 'xac-suat', name: 'Xác suất', icon: '⚂' },
  { id: 'bat-dang-thuc', name: 'Bất đẳng thức', icon: '≥' },
  { id: 'dao-ham', name: 'Đạo hàm', icon: '∂' },
];

export const XP_PER_CORRECT = 20;
export const XP_PER_ATTEMPT = 5;
export const XP_HINT_COST = 5;
export const XP_PER_LEVEL = 100;

export const ANSWER_LABELS = ['A', 'B', 'C', 'D'] as const;
