import { getFormContent } from '../lib/datocms'
import GetQuotePopupWrapper from '../components/GetQuotePopupWrapper'

export default async function Home() {
  const content = await getFormContent()

  return (
    <main className="min-h-screen p-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Space Solutions</h1>
        <p className="text-xl text-gray-600 mb-8">
          Find the perfect workspace for your business in prime locations across the UK.
        </p>
        <GetQuotePopupWrapper content={content} />
      </div>
    </main>
  )
}
