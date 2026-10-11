import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SERVICES_CATALOG } from "../src/lib/servicesCatalog";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Pencrack MySQL Database Seeding...");

  // 1. Roles
  const roles = ["READER", "WRITER", "STAFF", "ADMIN", "SUPER_ADMIN"];
  const roleMap: Record<string, number> = {};

  for (const roleName of roles) {
    const role = await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
        description: `${roleName} privileges on Pencrack platform`,
      },
    });
    roleMap[roleName] = role.id;
    console.log(`✓ Role: ${roleName}`);
  }

  // 2. Categories
  const categories = [
    { name: "Creative Writing", slug: "creative-writing", type: "STORY" as const },
    { name: "African Literature", slug: "african-literature", type: "STORY" as const },
    { name: "Romance & Drama", slug: "romance", type: "STORY" as const },
    { name: "Poetry & Verses", slug: "poetry", type: "POEM" as const },
    { name: "Essays & Culture", slug: "culture", type: "BLOG" as const },
    { name: "Comics & Illustrated", slug: "comics", type: "COMIC" as const },
    { name: "Academic & Research", slug: "academic", type: "BLOG" as const },
    { name: "Craft & Commentary", slug: "writing-craft", type: "BLOG" as const },
  ];

  const categoryMap: Record<string, number> = {};
  for (const cat of categories) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categoryMap[cat.slug] = record.id;
    console.log(`✓ Category: ${cat.name}`);
  }

  // 3. Services & Fields
  console.log("Seeding 16 Services and Dynamic Fields...");
  for (const s of SERVICES_CATALOG) {
    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        category: s.category,
        shortDesc: s.shortDesc,
        fullDesc: s.fullDesc,
        turnaroundTime: s.turnaroundTime,
        startingPrice: s.startingPrice,
        guarantee: s.guarantee,
        isActive: true,
      },
      create: {
        name: s.name,
        slug: s.slug,
        category: s.category,
        shortDesc: s.shortDesc,
        fullDesc: s.fullDesc,
        turnaroundTime: s.turnaroundTime,
        startingPrice: s.startingPrice,
        guarantee: s.guarantee,
        isActive: true,
      },
    });

    let order = 1;
    for (const f of s.fields) {
      const existingField = await prisma.serviceField.findFirst({
        where: {
          serviceId: service.id,
          fieldKey: f.fieldKey,
        },
      });

      if (existingField) {
        await prisma.serviceField.update({
          where: { id: existingField.id },
          data: {
            fieldLabel: f.fieldLabel,
            fieldType: f.fieldType,
            isRequired: f.isRequired,
            displayOrder: order++,
            optionsJson: f.options ? f.options : undefined,
          },
        });
      } else {
        await prisma.serviceField.create({
          data: {
            serviceId: service.id,
            fieldKey: f.fieldKey,
            fieldLabel: f.fieldLabel,
            fieldType: f.fieldType,
            isRequired: f.isRequired,
            displayOrder: order++,
            optionsJson: f.options ? f.options : undefined,
          },
        });
      }
    }
    console.log(`✓ Service: ${s.name}`);
  }

  // 4. Default Admin User
  const passwordHash = await bcrypt.hash("Password123!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@pencrack.com" },
    update: {},
    create: {
      email: "admin@pencrack.com",
      username: "admin",
      passwordHash,
      status: "ACTIVE",
      profile: {
        create: {
          fullName: "Pencrack Executive Team",
          bio: "Platform Administration, Editor-in-Chief and Quality Reviewers.",
          isWriter: true,
          country: "Nigeria",
        },
      },
      wallet: {
        create: {
          currency: "NGN",
          availableBalance: 500000.0,
          pendingBalance: 0.0,
          totalEarned: 1250000.0,
        },
      },
    },
  });

  // Assign admin roles
  for (const r of ["SUPER_ADMIN", "ADMIN", "WRITER", "READER"]) {
    if (roleMap[r]) {
      await prisma.userRole.upsert({
        where: {
          userId_roleId: {
            userId: admin.id,
            roleId: roleMap[r],
          },
        },
        update: {},
        create: {
          userId: admin.id,
          roleId: roleMap[r],
        },
      });
    }
  }
  console.log(`✓ Admin user: admin@pencrack.com`);

  // 5. Featured Writers
  const writersData = [
    {
      name: "Adaeze Nwosu",
      username: "adaeze.writes",
      email: "adaeze@pencrack.com",
      bio: "Lagos-based storyteller writing about love, memory and home. 24 published works.",
      avatar: "https://i.pravatar.cc/120?img=32",
      balance: 1200000.0,
    },
    {
      name: "Tunde Okafor",
      username: "tunde.o",
      email: "tunde@pencrack.com",
      bio: "Poet and cultural essayist documenting African contemporary narratives.",
      avatar: "https://i.pravatar.cc/120?img=12",
      balance: 850000.0,
    },
    {
      name: "Zainab Bello",
      username: "zee.writes",
      email: "zainab@pencrack.com",
      bio: "Historical fiction writer exploring pre-colonial empires and mythology.",
      avatar: "https://i.pravatar.cc/120?img=45",
      balance: 1800000.0,
    },
    {
      name: "Chidi Eze",
      username: "chidi",
      email: "chidi@pencrack.com",
      bio: "Comic creator and illustrator blending African folklore with science fiction.",
      avatar: "https://i.pravatar.cc/120?img=60",
      balance: 620000.0,
    },
  ];

  const createdWriters: Array<{ id: bigint }> = [];
  for (const w of writersData) {
    const user = await prisma.user.upsert({
      where: { email: w.email },
      update: {},
      create: {
        email: w.email,
        username: w.username,
        passwordHash,
        status: "ACTIVE",
        profile: {
          create: {
            fullName: w.name,
            bio: w.bio,
            avatarUrl: w.avatar,
            isWriter: true,
            country: "Nigeria",
          },
        },
        wallet: {
          create: {
            currency: "NGN",
            availableBalance: w.balance,
            pendingBalance: 0.0,
            totalEarned: w.balance * 1.5,
          },
        },
      },
    });

    for (const r of ["WRITER", "READER"]) {
      if (roleMap[r]) {
        await prisma.userRole.upsert({
          where: {
            userId_roleId: {
              userId: user.id,
              roleId: roleMap[r],
            },
          },
          update: {},
          create: {
            userId: user.id,
            roleId: roleMap[r],
          },
        });
      }
    }
    createdWriters.push(user);
    console.log(`✓ Writer: ${w.name}`);
  }

  // 6. Seed Showcase Published Content
  const contents = [
    {
      title: "The Harmattan Letters",
      slug: "the-harmattan-letters",
      type: "STORY" as const,
      excerpt: "A love written entirely on paper during the harshest drought Lagos had seen in forty years.",
      bodyContent: `The first letter arrived with the dry wind, its edges curled by heat and distance. She read it twice before the meaning settled — the way sand settles after a storm, slow and unarguable.

In the compound, the mango tree had already dropped its leaves. Everything felt paused, waiting for a rain that the harmattan would not permit.

A season of waiting:
She kept the letters in a tin that once held butter biscuits. Each one a small country she could visit when the nights grew long and the generator fell silent.

“Write to me as if the distance were nothing,” he had asked. And so she did, every evening, by lamplight.

By the time the rains returned, the tin was full, and so was she — of words, of waiting, of a love that had learned to live on paper.`,
      coverImageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1000&q=75",
      readTime: "8 min",
      viewsCount: 14200,
      likesCount: 2431,
      authorId: createdWriters[0].id,
      categoryId: categoryMap["romance"],
      status: "PUBLISHED" as const,
      publishedAt: new Date(),
    },
    {
      title: "Market Day on Broad Street",
      slug: "market-day-on-broad-street",
      type: "STORY" as const,
      excerpt: "The rhythm of Lagos trading floor: sweat, naira, negotiation, and an unlikely friendship formed over broken calabashes.",
      bodyContent: `Broad Street wakes before the sun does. By five-thirty, the handcart pushers are already in motion, calling warnings in three languages.

To trade here is to understand human nature stripped of ceremony. You look a person in the eye, you name a figure, and the dance begins. It is neither hostile nor gentle; it is the currency of survival refined into an art form.`,
      coverImageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1000&q=75",
      readTime: "12 min",
      viewsCount: 9800,
      likesCount: 1890,
      authorId: createdWriters[2].id,
      categoryId: categoryMap["african-literature"],
      status: "PUBLISHED" as const,
      publishedAt: new Date(),
    },
    {
      title: "The Midnight Radio",
      slug: "the-midnight-radio",
      type: "STORY" as const,
      excerpt: "Every Sunday at 2am, a pirate frequency plays music that shouldn't exist from an era never recorded.",
      bodyContent: `It was static at first — that familiar hiss of the shortwave spectrum when the dial slips between approved channels. But at 2:04 AM on the second Tuesday of October, the noise resolved into strings.

Not guitar strings, not violins. Something bowed, something bronze.

There is a broadcaster in this city who knows what the daylight forgets. And if you listen long enough, you realize the voice isn't transmitting from another city; it's transmitting from tomorrow.`,
      coverImageUrl: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=1000&q=75",
      readTime: "6 min",
      viewsCount: 6400,
      likesCount: 1210,
      authorId: createdWriters[1].id,
      categoryId: categoryMap["creative-writing"],
      status: "PUBLISHED" as const,
      publishedAt: new Date(),
    },
    {
      title: "Why Modern African Writers Are Reclaiming the Folktale",
      slug: "why-modern-african-writers-reclaiming-folktale",
      type: "BLOG" as const,
      excerpt: "Oral storytelling was never primitive. It was hyper-collaborative, multimodal, and far ahead of the novel.",
      bodyContent: `For decades, African writers were pressured into Western literary forms: the three-act realistic novel, the detached third-person narrator, the linear chronology.

Yet our oldest narrative traditions — the moonlight stories told beneath the iroko tree, the participatory call-and-response, the fluid boundary between human, spirit, and animal — anticipated modernism long before modernism had a name. Today's most daring novelists are returning home to the ancient fire.`,
      coverImageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1000&q=75",
      readTime: "7 min",
      viewsCount: 11200,
      likesCount: 1850,
      authorId: createdWriters[1].id,
      categoryId: categoryMap["culture"],
      status: "PUBLISHED" as const,
      publishedAt: new Date(),
    },
    {
      title: "In Praise of Slow Sentences",
      slug: "in-praise-of-slow-sentences",
      type: "BLOG" as const,
      excerpt: "In an era of 7-second attention spans, the long, winding, deliberate sentence is an act of quiet resistance.",
      bodyContent: `Speed is the enemy of nuance. The contemporary internet demands sentences that can be skimmed on a commute, swallowed whole, and forgotten before the next notification chime.

A slow sentence, however, asks you to breathe. It asks you to hold multiple clauses in your mind simultaneously, to savor rhythm and cadence, to participate in the architecture of thought rather than consume it like fast food.`,
      coverImageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1000&q=75",
      readTime: "5 min",
      viewsCount: 8900,
      likesCount: 1420,
      authorId: createdWriters[0].id,
      categoryId: categoryMap["writing-craft"],
      status: "PUBLISHED" as const,
      publishedAt: new Date(),
    },
    {
      title: "Salt on the Tongue",
      slug: "salt-on-the-tongue",
      type: "POEM" as const,
      excerpt: "A poem on ancestry, the Atlantic, and return.",
      bodyContent: `The sea does not remember the names of the boats.
It remembers only the weight they shed.
Every wave that touches the shoreline at Badagry
is a translation of a prayer spoken two centuries ago
in a dialect no dictionary now holds.

We stand here, feet in the foam,
eating salt and calling it memory.`,
      coverImageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1000&q=75",
      readTime: "2 min",
      viewsCount: 5200,
      likesCount: 890,
      authorId: createdWriters[1].id,
      categoryId: categoryMap["poetry"],
      status: "PUBLISHED" as const,
      publishedAt: new Date(),
    },
    {
      title: "Chronicles of the Sun Keeper: Ep. 1",
      slug: "chronicles-of-the-sun-keeper-ep-1",
      type: "COMIC" as const,
      excerpt: "When the sky over ancient Benin went dark for seven months, one apprentice learned to forge light.",
      bodyContent: "Full comic panels available in reader viewer.",
      coverImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1000&q=75",
      readTime: "5 min",
      viewsCount: 16800,
      likesCount: 3420,
      authorId: createdWriters[3].id,
      categoryId: categoryMap["comics"],
      status: "PUBLISHED" as const,
      publishedAt: new Date(),
    },
  ];

  for (const c of contents) {
    const item = await prisma.content.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    console.log(`✓ Content: [${c.type}] ${c.title}`);
  }

  console.log(" Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
