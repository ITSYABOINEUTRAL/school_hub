export const users = [
  {
    id: 1,
    name: "Mrs. Adaeze Okafor",
    email: "admin@schoolhub.test",
    password: "admin123",
    role: "admin",
    avatar:
      "https://res.cloudinary.com/db8mcyukl/image/upload/v1755295348/arcana/profile_pictures/bfa73qbq5efxttduqz41.jpg",
  },
  {
    id: 2,
    name: "Mr. Tunde Bello",
    email: "teacher@schoolhub.test",
    password: "teacher123",
    role: "teacher",
    avatar:
      "https://res.cloudinary.com/db8mcyukl/image/upload/v1782897101/Passport_Photograph_w5ezww.jpg",
  },
  {
    id: 3,
    name: "Amina Yusuf",
    email: "amina@schoolhub.test",
    password: "student123",
    role: "student",
    avatar:
      "https://res.cloudinary.com/db8mcyukl/image/upload/v1757170438/arcana/profile_pictures/ernmnr5yr42bdhsyycwo.webp",
    studentId: 101,
  },
];

export const students = [
  { id: 101, name: "Amina Yusuf", classLevel: "JSS 1", score: 88 },
  { id: 102, name: "Chidi Nwosu", classLevel: "JSS 2", score: 72 },
  { id: 103, name: "Fatima Sani", classLevel: "JSS 1", score: 95 },
  { id: 104, name: "Emeka Obi", classLevel: "JSS 3", score: 64 },
  { id: 105, name: "Zainab Ahmed", classLevel: "JSS 2", score: 81 },
  { id: 106, name: "Tobi Adeyemi", classLevel: "JSS 3", score: 45 },
];

// Full Tailwind class names for each role's badge
export const roleStyles = {
  admin: "bg-purple-100 text-purple-700",
  teacher: "bg-sky-100 text-sky-700",
  student: "bg-emerald-100 text-emerald-700",
};