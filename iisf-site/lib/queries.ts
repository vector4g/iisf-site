import { groq } from "next-sanity";

export const allPostsQuery = groq`
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  _updatedAt,
  excerpt,
  categories[]->{
    _id,
    title
  }
}
`;

export const singlePostQuery = groq`
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  _updatedAt,
  excerpt,
  body,
  categories[]->{
    _id,
    title
  }
}
`;
