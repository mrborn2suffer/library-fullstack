/* Seed sample books into librarydb.books */

const books = [
  {
    _id: "b_horror_001",
    title: "The Whispering Corridor",
    author: "A. K. Rao",
    genre: "horror",
    description: "A quiet hostel hallway that remembers every secret ever spoken.",
    marketPrice: 299,
    coverImageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "b_romance_001",
    title: "Letters in Monochrome",
    author: "Meera Iyer",
    genre: "romance",
    description: "Two strangers fall in love through unsent letters left in a café.",
    marketPrice: 249,
    coverImageUrl:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "b_comedy_001",
    title: "The Accidental Stand‑Up",
    author: "N. S. Verma",
    genre: "comedy",
    description: "A shy librarian is mistaken for a comedian and rolls with it.",
    marketPrice: 199,
    coverImageUrl:
      "https://images.unsplash.com/photo-1455885666463-42d1f67ce36a?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "b_scifi_001",
    title: "Orbit of Ink",
    author: "J. Sen",
    genre: "sci-fi",
    description: "A station archivist finds a book that rewrites reality, page by page.",
    marketPrice: 399,
    coverImageUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "b_thriller_001",
    title: "Index of Lies",
    author: "R. K. Malhotra",
    genre: "thriller",
    description: "A missing catalogue card leads to a chain of impossible crimes.",
    marketPrice: 349,
    coverImageUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "b_fantasy_001",
    title: "The Paper Crown",
    author: "S. Das",
    genre: "fantasy",
    description: "A kingdom where every decree is bound into spellbooks guarded by owls.",
    marketPrice: 459,
    coverImageUrl:
      "https://images.unsplash.com/photo-1528459105426-b9548367069b?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "b_nonfiction_001",
    title: "Small Habits, Big Focus",
    author: "K. Anand",
    genre: "non-fiction",
    description:
      "A practical guide to building reading routines and sustained concentration.",
    marketPrice: 279,
    coverImageUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
  },
  {
    _id: "b_mystery_001",
    title: "The Silent Bookmark",
    author: "Tara Menon",
    genre: "mystery",
    description:
      "Every time a bookmark appears, someone disappears. A librarian investigates.",
    marketPrice: 329,
    coverImageUrl:
      "https://images.unsplash.com/photo-1474932430478-367d0ae0e0e9?auto=format&fit=crop&w=600&q=80",
  },
];

const result = db.books.bulkWrite(
  books.map((b) => ({
    updateOne: {
      filter: { _id: b._id },
      update: { $set: b },
      upsert: true,
    },
  }))
);

print("Seeded/updated books:", JSON.stringify(result, null, 2));

