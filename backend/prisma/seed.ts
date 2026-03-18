import { PrismaClient } from '@prisma/client';
import { daiSoQuestions } from './data/dai-so';
import { giaiTichQuestions } from './data/giai-tich';
import { hinhHocQuestions } from './data/hinh-hoc';
import { xacSuatQuestions } from './data/xac-suat';
import { batDangThucQuestions } from './data/bat-dang-thuc';
import { daoHamQuestions } from './data/dao-ham';

const prisma = new PrismaClient();

const allQuestions = [
  ...daiSoQuestions,
  ...giaiTichQuestions,
  ...hinhHocQuestions,
  ...xacSuatQuestions,
  ...batDangThucQuestions,
  ...daoHamQuestions,
];

async function main() {
  console.log(`Deleting existing questions...`);
  await prisma.question.deleteMany();

  console.log(`Seeding ${allQuestions.length} questions...`);

  // Batch create for speed
  const batchSize = 50;
  for (let i = 0; i < allQuestions.length; i += batchSize) {
    const batch = allQuestions.slice(i, i + batchSize);
    await prisma.question.createMany({ data: batch });
    console.log(
      `  Inserted ${Math.min(i + batchSize, allQuestions.length)}/${allQuestions.length}`,
    );
  }

  // Print summary
  const subjects = [...new Set(allQuestions.map((q) => q.subject))];
  for (const s of subjects) {
    const count = allQuestions.filter((q) => q.subject === s).length;
    console.log(`  ${s}: ${count} questions`);
  }

  console.log(`Done! Total: ${allQuestions.length} questions`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
