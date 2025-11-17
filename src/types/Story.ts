export interface StoryPage {
  id: number;
  text: string;
  image?: string; // URL ou chemin vers l'image (optionnel)
}

export interface Story {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  ageRange: string; // ex: "3-5 ans"
  pages: StoryPage[];
  readingTime: number; // en minutes
}
