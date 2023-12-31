import React from "react";
import { client } from "@/lib/sanity";
import { blogSanity } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
async function getData() {
  const query = `*[_type == 'blog']{
    name
      ,smallDescription,
      image,'currentSlug':slug.current}`;

  const data = await client.fetch(query);
  return data;
}

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
export const revalidate = 30; // revalidate at most 30 seconds

export default async function SanityBlogPost() {
  const data: blogSanity[] = await getData();
  return (

    <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
      {data.map((post, index) => (
        <Card key={index} className="min-h-[380px] bg-transparent  shadow-md transition-all hover:shadow-lg  bg-gray-100 border-[#656465] w-full max-w-[400px] duration-1000  rounded-lg  ">
          <CardHeader>
            <CardTitle className="text-gray-500 line-clamp-1 mb-2">{post.name}</CardTitle>
           
            <CardDescription className="line-clamp-3">{post.smallDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={urlFor(post.image).url()}
              alt="img"
              width={400}
              height={200}
              className="rounded-t-lg h-[200px] object-cover "
            />
          </CardContent>
          <CardFooter >
          <Link href={`/blog/${post.currentSlug}`} className="bg-[#4b133d] hover:bg-[#92327a]  duration-1000 text-white p-3 rounded-md">Read More</Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
