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

function urlFor(source: any) {
  return builder.image(source);
}

export default async function SanityBlogPost() {
  const data: blogSanity[] = await getData();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4">
      {data.map((post, index) => (
        <Card key={index} className="mr-3 bg-transparent">
          <CardHeader>
            <CardTitle className="text-rose-700">{post.name}</CardTitle>
            <CardDescription>{post.smallDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={urlFor(post.image).url()}
              alt="img"
              width={200}
              height={200}
              className="rounded-t-lg h-[200px] object-cover"
            />
          </CardContent>
          <CardFooter className="text-rose-700">
            <Link href={""}>{post.currentSlug}</Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}