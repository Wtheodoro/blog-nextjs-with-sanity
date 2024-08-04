import { Card, CardContent } from '@/components/ui/card'
import { PostOverview } from './lib/interface'
import { client, urlFor } from './lib/sanity'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const getData = async () => {
  const sanityQuery = `
    *[_type == 'blog'] | order(_createdAt desc) {
      title,
      titleImage,
      smallDescription,
      "slug": slug.current,
    }
  `

  const data = await client.fetch(sanityQuery)

  return data
}

export default async function Home() {
  const dataPosts: PostOverview[] = await getData()

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-5'>
      {dataPosts.map((post) => (
        <Card key={post.slug}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt={`${post.title} image`}
            width={500}
            height={500}
            className='rounded-t-lg h-52 object-cover'
          />

          <CardContent className='mt-5'>
            <h3 className='text-lg line-clamp-2 font-bold'>{post.title}</h3>
            <p className='line-clamp-4 text-sm mt-2 text-gray-600 dark:text-gray-300'>
              {post.smallDescription}
            </p>
            <Button asChild className='w-full mt-7'>
              <Link href={`/blog/${post.slug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
