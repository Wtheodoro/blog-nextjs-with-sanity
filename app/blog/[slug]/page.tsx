import { FullBlog } from '@/app/lib/interface'
import { client, urlFor } from '@/app/lib/sanity'
import { PortableText } from 'next-sanity'
import Image from 'next/image'

const getBlogArticle = async (slug: string) => {
  const sanityQuery = `
    *[_type == 'blog' && slug.current == '${slug}'] {
      title,
      "createdAt": _createdAt,
      "bannerImage": titleImage,
      content
    }[0]
  `

  const data = await client.fetch(sanityQuery)
  return data
}

const BlogArticle = async ({ params }: { params: { slug: string } }) => {
  const blogArticle: FullBlog = await getBlogArticle(params.slug)

  const bannerImageUrl = urlFor(blogArticle.bannerImage).url()

  return (
    <div className='mt-8'>
      <h1>
        <span className='block text-base text-center text-primary font-semibold tracking-wider uppercase'>
          Walison Theodoro - Blog
        </span>
        <span className='mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl'>
          {blogArticle.title}
        </span>
      </h1>

      <Image
        priority
        src={bannerImageUrl}
        width={800}
        height={800}
        alt={`${blogArticle.title} banner image`}
        className='rounded-lg mt-8 mx-auto border'
      />

      <div className='mt-16 prose prose-blue lg:prose-xl dark:prose-invert prose-li:marker:text-primary prose-a:text-primary'>
        <PortableText value={blogArticle.content} />
      </div>
    </div>
  )
}

export default BlogArticle
