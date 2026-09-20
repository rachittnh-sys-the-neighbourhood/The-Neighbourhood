// The three pillars ("What we're building") — shared between the
// homepage's Today section and their own dedicated pages
// (/parenting-app, /parenting-community, /parenting-space-gurugram), so
// the copy can't drift between the two places it appears.
import aanganSpace from "../assets/aangan-space.jpg";
import neighboursCircle from "../assets/neighbours-circle.jpg";
import guidancePhone from "../assets/guidance-phone.jpg";

const PILLARS = [
  {
    number: "01",
    slug: "parenting-app",
    eyebrow: "The Guidance",
    title: "Answers that know your child.",
    body: "One quiet app. Ask anything at 2pm or 2am and get an answer shaped by your child: their age, their temperament, their history. Grounded in real expertise, spoken like a friend, never a script.",
    image: {
      src: guidancePhone,
      alt: "A phone held up at night showing a gentle, reassuring reply to a parent's question, with a sleeping baby softly visible below in warm lamplight",
    },
  },
  {
    number: "02",
    slug: "parenting-community",
    eyebrow: "The Neighbours",
    title: "The same faces, week after week.",
    body: "Small circles of parents who live near you, matched by your child's age and stage. Not another group chat. Real people you'll actually see, until they stop being strangers and start being the aunties and uncles your child grows up around.",
    image: {
      src: neighboursCircle,
      alt: "Parents sitting on floor cushions in easy conversation beneath a tree-shaped bookshelf, while two children read together on a rug nearby",
    },
  },
  {
    number: "03",
    slug: "parenting-space-gurugram",
    eyebrow: "The Spaces",
    title: "Places where children belong, not just attend.",
    body: "The Aangan and The Verandah are calm, beautiful spaces near you: natural materials, soft light, room to move. Designed around a child's nervous system, not a brochure. A regulated child is a child who can truly play, learn, and grow.",
    image: {
      src: aanganSpace,
      alt: "Inside The Aangan: a child absorbed in a wooden activity tray on the floor of a calm Montessori room, with low shelves, pale wood, and soft morning light",
    },
  },
];

export default PILLARS;
