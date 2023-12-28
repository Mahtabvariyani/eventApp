import { client } from "@/lib/sanity";
import { fullBlog } from "@/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/components/SanityBlogPost";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          name,
          content,
          image
      }[0] `;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="mt-8 flex flex-col justify-center items-center">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Developers - Articles
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.name}
        </span>
      </h1>

      <Image
        src={urlFor(data.image).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}

/* 
 *[_type == "blog" && slug.current == slug] {
        "currentSlug": slug.current,
          name,
          content,
          titleImage
      }[0] 
*/
