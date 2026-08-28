export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  parentSlug?: string;
  image: string;
  children?: Category[];
};
