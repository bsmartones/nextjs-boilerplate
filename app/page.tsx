import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to SEO Campaign Dashboard</h1>
      <Link href="/seo" className="text-blue-500 hover:text-blue-700 underline">
        View SEO Campaign Details
      </Link>
    </main>
  )
}
