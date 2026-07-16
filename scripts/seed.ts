import { config } from "dotenv";

config({ path: ".env.local" });

async function seed() {
  const { db } = await import("../src/db");
  const { blogs } = await import("../src/db/schema");

  const existing = await db.select().from(blogs).limit(1);
  if (existing.length > 0) {
    console.log("Blogs already seeded, skipping.");
    return;
  }

  await db.insert(blogs).values([
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    },
  ]);

  console.log("Seeded blogs.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
