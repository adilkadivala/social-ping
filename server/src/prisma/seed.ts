import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 1. Create a test user
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      password: "textuser",
      plan: "free",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  });

  // 2. Add some keywords for the user
  const keyword1 = await prisma.keyword.create({
    data: {
      user_id: user.id,
      keyword: "supabase",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  });

  const keyword2 = await prisma.keyword.create({
    data: {
      user_id: user.id,
      keyword: "openai",
      is_active: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  });

  // 3. Add mentions for a keyword
  await prisma.mention.createMany({
    data: [
      {
        user_id: user.id,
        keyword_id: keyword1.id,
        platform: "twitter",
        text: "Check out Supabase, it’s amazing!",
        url: "https://twitter.com/test/status/1",
        author: "john_doe",
        published_at: new Date().toISOString(),
        is_read: false,
        sentiment: "positive",
        created_at: new Date().toISOString(),
      },
      {
        user_id: user.id,
        keyword_id: keyword1.id,
        platform: "reddit",
        text: "Why is everyone switching to Supabase?",
        url: "https://reddit.com/r/dev/comments/abc123",
        author: "dev_reddit_user",
        published_at: new Date().toISOString(),
        is_read: false,
        sentiment: "neutral",
        created_at: new Date().toISOString(),
      },
    ],
  });

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
