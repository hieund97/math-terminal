import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const questions = [
  // Đại số
  {
    subject: 'Đại số',
    topic: 'Phương trình bậc hai',
    level: 'Dễ',
    question: 'Giải phương trình: $x^2 - 5x + 6 = 0$',
    options: [
      '$x = 2$ hoặc $x = 3$',
      '$x = -2$ hoặc $x = -3$',
      '$x = 1$ hoặc $x = 6$',
      '$x = -1$ hoặc $x = -6$',
    ],
    correctAnswer: 'A',
    hint: 'Phân tích thành tích: tìm hai số có tổng bằng 5 và tích bằng 6.',
    solution:
      '$x^2 - 5x + 6 = (x-2)(x-3) = 0 \\Rightarrow x = 2$ hoặc $x = 3$.',
  },
  {
    subject: 'Đại số',
    topic: 'Logarit',
    level: 'Trung bình',
    question: 'Tính giá trị của $\\log_2 8 + \\log_3 27$.',
    options: ['$6$', '$5$', '$9$', '$8$'],
    correctAnswer: 'A',
    hint: 'Nhớ rằng $\\log_a a^n = n$.',
    solution:
      '$\\log_2 8 = \\log_2 2^3 = 3$ và $\\log_3 27 = \\log_3 3^3 = 3$. Vậy tổng là $3 + 3 = 6$.',
  },
  {
    subject: 'Đại số',
    topic: 'Hệ phương trình',
    level: 'Khó',
    question:
      'Giải hệ phương trình: $\\begin{cases} x + y = 5 \\\\ x^2 + y^2 = 17 \\end{cases}$',
    options: [
      '$(1, 4)$ và $(4, 1)$',
      '$(2, 3)$ và $(3, 2)$',
      '$(0, 5)$ và $(5, 0)$',
      '$(1, 3)$ và $(3, 1)$',
    ],
    correctAnswer: 'A',
    hint: 'Sử dụng $(x+y)^2 = x^2 + 2xy + y^2$ để tìm $xy$.',
    solution:
      'Từ $x + y = 5 \\Rightarrow (x+y)^2 = 25 = x^2 + 2xy + y^2 = 17 + 2xy \\Rightarrow xy = 4$. Vậy $x, y$ là nghiệm của $t^2 - 5t + 4 = 0 \\Rightarrow t = 1$ hoặc $t = 4$.',
  },
  // Giải tích
  {
    subject: 'Giải tích',
    topic: 'Giới hạn',
    level: 'Dễ',
    question: 'Tính $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.',
    options: ['$4$', '$2$', '$0$', 'Không tồn tại'],
    correctAnswer: 'A',
    hint: 'Phân tích tử số: $x^2 - 4 = (x-2)(x+2)$.',
    solution:
      '$\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = \\lim_{x \\to 2} \\frac{(x-2)(x+2)}{x-2} = \\lim_{x \\to 2} (x+2) = 4$.',
  },
  {
    subject: 'Giải tích',
    topic: 'Tích phân',
    level: 'Trung bình',
    question: 'Tính $\\int_0^1 x^2 \\, dx$.',
    options: ['$\\frac{1}{3}$', '$\\frac{1}{2}$', '$1$', '$\\frac{2}{3}$'],
    correctAnswer: 'A',
    hint: 'Nguyên hàm của $x^2$ là $\\frac{x^3}{3}$.',
    solution:
      '$\\int_0^1 x^2 \\, dx = \\left[\\frac{x^3}{3}\\right]_0^1 = \\frac{1}{3} - 0 = \\frac{1}{3}$.',
  },
  {
    subject: 'Giải tích',
    topic: 'Chuỗi số',
    level: 'Khó',
    question: 'Tính tổng chuỗi $\\sum_{n=1}^{\\infty} \\frac{1}{n(n+1)}$.',
    options: ['$1$', '$\\frac{1}{2}$', '$2$', 'Phân kỳ'],
    correctAnswer: 'A',
    hint: 'Phân tích $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$.',
    solution:
      'Đây là chuỗi telescoping: $\\sum_{n=1}^{N} \\left(\\frac{1}{n} - \\frac{1}{n+1}\\right) = 1 - \\frac{1}{N+1} \\to 1$ khi $N \\to \\infty$.',
  },
  // Hình học
  {
    subject: 'Hình học',
    topic: 'Diện tích',
    level: 'Dễ',
    question: 'Tính diện tích hình tròn có bán kính $r = 5$.',
    options: ['$25\\pi$', '$10\\pi$', '$50\\pi$', '$5\\pi$'],
    correctAnswer: 'A',
    hint: 'Công thức diện tích hình tròn: $S = \\pi r^2$.',
    solution: '$S = \\pi r^2 = \\pi \\cdot 5^2 = 25\\pi$.',
  },
  {
    subject: 'Hình học',
    topic: 'Véc-tơ',
    level: 'Trung bình',
    question: 'Cho $\\vec{a} = (3, 4)$. Tính $|\\vec{a}|$.',
    options: ['$5$', '$7$', '$\\sqrt{7}$', '$12$'],
    correctAnswer: 'A',
    hint: 'Độ dài véc-tơ: $|\\vec{a}| = \\sqrt{x^2 + y^2}$.',
    solution:
      '$|\\vec{a}| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
  },
  {
    subject: 'Hình học',
    topic: 'Hình học không gian',
    level: 'Khó',
    question: 'Tính thể tích hình cầu có bán kính $R = 3$.',
    options: ['$36\\pi$', '$27\\pi$', '$108\\pi$', '$12\\pi$'],
    correctAnswer: 'A',
    hint: 'Công thức thể tích hình cầu: $V = \\frac{4}{3}\\pi R^3$.',
    solution:
      '$V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\cdot 27 = 36\\pi$.',
  },
  // Xác suất
  {
    subject: 'Xác suất',
    topic: 'Xác suất cơ bản',
    level: 'Dễ',
    question:
      'Tung một đồng xu 2 lần. Xác suất để được 2 mặt sấp là bao nhiêu?',
    options: [
      '$\\frac{1}{4}$',
      '$\\frac{1}{2}$',
      '$\\frac{3}{4}$',
      '$\\frac{1}{8}$',
    ],
    correctAnswer: 'A',
    hint: 'Mỗi lần tung có xác suất mặt sấp là $\\frac{1}{2}$. Hai lần tung độc lập.',
    solution: '$P = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$.',
  },
  {
    subject: 'Xác suất',
    topic: 'Tổ hợp',
    level: 'Trung bình',
    question: 'Tính $C_5^2$.',
    options: ['$10$', '$20$', '$5$', '$25$'],
    correctAnswer: 'A',
    hint: '$C_n^k = \\frac{n!}{k!(n-k)!}$.',
    solution:
      '$C_5^2 = \\frac{5!}{2! \\cdot 3!} = \\frac{120}{2 \\cdot 6} = 10$.',
  },
  // Bất đẳng thức
  {
    subject: 'Bất đẳng thức',
    topic: 'AM-GM',
    level: 'Trung bình',
    question: 'Cho $a, b > 0$ và $a + b = 4$. Giá trị lớn nhất của $ab$ là:',
    options: ['$4$', '$2$', '$8$', '$16$'],
    correctAnswer: 'A',
    hint: 'Áp dụng bất đẳng thức AM-GM: $\\frac{a+b}{2} \\geq \\sqrt{ab}$.',
    solution:
      'Theo AM-GM: $\\frac{a+b}{2} \\geq \\sqrt{ab} \\Rightarrow 2 \\geq \\sqrt{ab} \\Rightarrow ab \\leq 4$. Dấu "=" khi $a = b = 2$.',
  },
  {
    subject: 'Bất đẳng thức',
    topic: 'Cauchy-Schwarz',
    level: 'Khó',
    question: 'Cho $a^2 + b^2 = 1$. Giá trị lớn nhất của $a + b$ là:',
    options: ['$\\sqrt{2}$', '$1$', '$2$', '$\\frac{\\sqrt{2}}{2}$'],
    correctAnswer: 'A',
    hint: 'Áp dụng bất đẳng thức Cauchy-Schwarz: $(a+b)^2 \\leq 2(a^2+b^2)$.',
    solution:
      'Theo Cauchy-Schwarz: $(1 \\cdot a + 1 \\cdot b)^2 \\leq (1^2 + 1^2)(a^2 + b^2) = 2$. Vậy $a + b \\leq \\sqrt{2}$.',
  },
  // Đạo hàm
  {
    subject: 'Đạo hàm',
    topic: 'Đạo hàm cơ bản',
    level: 'Dễ',
    question: 'Tính đạo hàm của $f(x) = x^3 - 2x + 1$.',
    options: ['$3x^2 - 2$', '$3x^2 + 2$', '$x^2 - 2$', '$3x - 2$'],
    correctAnswer: 'A',
    hint: 'Đạo hàm của $x^n$ là $nx^{n-1}$.',
    solution: "$f'(x) = 3x^2 - 2$.",
  },
  {
    subject: 'Đạo hàm',
    topic: 'Đạo hàm hợp',
    level: 'Trung bình',
    question: 'Tính đạo hàm của $y = \\sin(2x)$.',
    options: ['$2\\cos(2x)$', '$\\cos(2x)$', '$-2\\cos(2x)$', '$2\\sin(2x)$'],
    correctAnswer: 'A',
    hint: 'Áp dụng quy tắc đạo hàm hàm hợp: $(\\sin u)\\prime = u\\prime \\cos u$.',
    solution: "$y' = \\cos(2x) \\cdot (2x)' = 2\\cos(2x)$.",
  },
  {
    subject: 'Đạo hàm',
    topic: 'Cực trị',
    level: 'Khó',
    question: 'Hàm số $f(x) = x^3 - 3x + 2$ đạt cực đại tại:',
    options: ['$x = -1$', '$x = 1$', '$x = 0$', '$x = 2$'],
    correctAnswer: 'A',
    hint: "Tìm $f'(x) = 0$ rồi kiểm tra dấu đạo hàm.",
    solution:
      "$f'(x) = 3x^2 - 3 = 3(x-1)(x+1) = 0 \\Rightarrow x = \\pm 1$. Vì $f''(x) = 6x$, nên $f''(-1) = -6 < 0$ → cực đại tại $x = -1$.",
  },
];

async function main() {
  await prisma.question.deleteMany();

  for (const q of questions) {
    await prisma.question.create({ data: q });
  }

  console.log(`Seeded ${questions.length} questions`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
