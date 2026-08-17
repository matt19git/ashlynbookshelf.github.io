// ─── Original Bookshelf Image Dimensions ─────────────────────────────
// Update these to match the full-resolution bookshelf photo (pixels).
export const ORIGINAL_IMAGE_DIMENSIONS = {
  width: 1751,
  height: 2122,
};

// ─── Book Data ────────────────────────────────────────────────────────
// Each entry maps a spine region on the bookshelf photo to its cover.
//
// You can specify the spine bounding box in ONE of two ways:
//
//  1) `points` – 4 pixel-coordinate pairs [[x,y], ...] from the original image.
//     The app converts these to percentage clip-paths at runtime.
//
//  2) `pixels` / `box` – rectangle bounding boxes (converted to 4 corners).

export const books = [
  // ── Shelf 1 ─────────────────────────────────────────────────────────
  {
    id: "range",
    title: "Range — David Epstein",
    coverUrl: "./assets/covers/range.png",
    pixels: { x: 970, y: 699, width: 645, height: 122 },
  },

  // ── Shelf 2 ─────────────────────────────────────────────────────────
  {
    id: "modern-love-poems",
    title: "Modern Love Poems",
    coverUrl: "./assets/covers/modern-love-poems.png",
    points: [[809, 885], [825, 882], [880, 1377], [861, 1377]],
  },
  {
    id: "love-poems-ovid",
    title: "Love Poems — Ovid",
    coverUrl: "./assets/covers/love-poems-ovid.png",
    points: [[835, 913], [861, 913], [905, 1369], [877, 1372]],
  },
  {
    id: "de-profundis",
    title: "De Profundis and Other Writings — Oscar Wilde",
    coverUrl: "./assets/covers/de-profundis.png",
    points: [[870, 910], [905, 910], [947, 1365], [915, 1369]],
  },
  {
    id: "importance-of-being-earnest",
    title: "The Importance of Being Earnest — Oscar Wilde",
    coverUrl: "./assets/covers/importance-of-being-earnest.png",
    points: [[918, 910], [963, 910], [989, 1372], [954, 1375]],
  },
  {
    id: "carry-on-jeeves",
    title: "Carry On, Jeeves — P.G. Wodehouse",
    coverUrl: "./assets/covers/carry-on-jeeves.jpeg",
    points: [[973, 897], [1024, 897], [1040, 1375], [986, 1378]],
  },
  {
    id: "very-good-jeeves",
    title: "Very Good, Jeeves — P.G. Wodehouse",
    coverUrl: "./assets/covers/very-good-jeeves.png",
    points: [[1031, 852], [1063, 849], [1072, 1375], [1037, 1378]],
  },
  {
    id: "against-nature",
    title: "Against Nature — Joris-Karl Huysmans",
    coverUrl: "./assets/covers/against-nature.png",
    points: [[1069, 852], [1114, 849], [1114, 1375], [1075, 1381]],
  },
  {
    id: "men-are-better-than-women",
    title: "Men Are Better Than Women",
    coverUrl: "./assets/covers/men-are-better-than-women.png",
    points: [[1120, 823], [1159, 823], [1162, 1381], [1117, 1381]],
  },
  {
    id: "perfume",
    title: "Perfume — Patrick Süskind",
    coverUrl: "./assets/covers/perfume.png",
    points: [[1168, 832], [1226, 832], [1223, 1375], [1162, 1381]],
  },
  {
    id: "normal-people",
    title: "Normal People — Sally Rooney",
    coverUrl: "./assets/covers/normal-people.png",
    points: [[1233, 832], [1274, 829], [1287, 1381], [1242, 1381]],
  },
  {
    id: "bell-jar",
    title: "The Bell Jar — Sylvia Plath",
    coverUrl: "./assets/covers/bell-jar.png",
    points: [[1284, 832], [1332, 832], [1338, 1378], [1293, 1378]],
  },
  {
    id: "ariel",
    title: "Ariel — Sylvia Plath",
    coverUrl: "./assets/covers/ariel.png",
    points: [[1332, 836], [1358, 832], [1370, 1378], [1348, 1378]],
  },
  {
    id: "persuasion",
    title: "Persuasion — Jane Austen",
    coverUrl: "./assets/covers/persuasion.png",
    points: [[1354, 823], [1393, 823], [1415, 1378], [1380, 1381]],
  },
  {
    id: "picture-of-dorian-gray",
    title: "The Picture of Dorian Gray — Oscar Wilde",
    coverUrl: "./assets/covers/the-picture-of-dorian-gray.png",
    points: [[1409, 829], [1502, 829], [1486, 1378], [1412, 1385]],
  },
  {
    id: "cranford",
    title: "Cranford — Elizabeth Gaskell",
    coverUrl: "./assets/covers/cranford.png",
    points: [[1505, 829], [1579, 829], [1563, 1378], [1486, 1378]],
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre — Charlotte Brontë",
    coverUrl: "./assets/covers/jane-eyre.png",
    points: [[1582, 832], [1675, 829], [1656, 1381], [1569, 1381]],
  },

  // ── Shelf 3 ─────────────────────────────────────────────────────────
  {
    id: "man-who-was-thursday",
    title: "The Man Who Was Thursday — G.K. Chesterton",
    coverUrl: "./assets/covers/the-man-who-was-thursday.jpg",
    points: [[399, 1478], [428, 1478], [460, 2075], [431, 2068]],
  },
  {
    id: "wuthering-heights",
    title: "Wuthering Heights — Emily Brontë",
    coverUrl: "./assets/covers/wuthering-heights.png",
    points: [[434, 1503], [498, 1503], [524, 2059], [466, 2062]],
  },
  {
    id: "stories-wilde",
    title: "Stories — Oscar Wilde",
    coverUrl: "./assets/covers/stories.png",
    points: [[505, 1539], [575, 1539], [598, 2049], [524, 2056]],
  },
  {
    id: "metamorphosis",
    title: "The Metamorphosis — Franz Kafka",
    coverUrl: "./assets/covers/metamorphosis.jpg",
    points: [[572, 1532], [604, 1532], [620, 2052], [591, 2052]],
  },
  {
    id: "i-claudius",
    title: "I, Claudius — Robert Graves",
    coverUrl: "./assets/covers/i-claudius.png",
    points: [[607, 1545], [684, 1545], [697, 2062], [630, 2059]],
  },
  {
    id: "bend-sinister",
    title: "Bend Sinister — Vladimir Nabokov",
    coverUrl: "./assets/covers/bend-sinister.png",
    points: [[681, 1548], [732, 1552], [735, 2056], [694, 2056]],
  },
  {
    id: "speak-memory",
    title: "Speak, Memory — Vladimir Nabokov",
    coverUrl: "./assets/covers/speak-memory.jpg",
    points: [[729, 1545], [787, 1548], [787, 2046], [735, 2049]],
  },
  {
    id: "pnin",
    title: "Pnin — Vladimir Nabokov",
    coverUrl: "./assets/covers/pnin.png",
    points: [[784, 1548], [828, 1545], [822, 2049], [787, 2049]],
  },
  {
    id: "the-emigrants",
    title: "The Emigrants — W.G. Sebald",
    coverUrl: "./assets/covers/the-emigrants.jpg",
    points: [[828, 1548], [877, 1552], [873, 2036], [819, 2040]],
  },
  {
    id: "a-man-called-ove",
    title: "A Man Called Ove — Fredrik Backman",
    coverUrl: "./assets/covers/man-called-ove.jpg",
    points: [[877, 1532], [954, 1532], [934, 2036], [880, 2043]],
  },
];
