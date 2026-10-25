export const site = {
  name: "The Outcast Syndicate",
  description:
    "The Outcast Syndicate is four people working across research, writing, video editing, interface design and code. Every project is credited to the people who made it.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Interim inbox: replace with the agency address once it exists.
  contactEmail: "gurjeetsinghvirdee@gmail.com",
} as const;
