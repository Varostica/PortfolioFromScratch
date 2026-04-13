import { useEffect, useState } from 'react'
import type { Product } from '../types/product'
import type { ProductsPage as ProductsPageType } from '../types/strapi'
import { getProducts, getProductsPage } from '../services'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Spinner'
import { ApiError } from '../services/apiClient'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [pageData, setPageData] = useState<ProductsPageType | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      getProductsPage(),
      getProducts()
    ])
      .then(([strapiData, fakestoreData]) => {
        setPageData(strapiData)
        setProducts(fakestoreData)
      })
      .catch((err) => {
        if (err instanceof ApiError) {
          setErrorMsg(err.getUserMessage())
        } else {
          setErrorMsg('An unexpected error occurred. Please try again later.')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" label="Loading Products…" />
      </div>
    )
  }

  if (errorMsg) {
    return (
      <div className="flex min-h-screen items-center justify-center flex-col px-6">
        <div className="text-red-500 font-bold mb-2">Error loading products</div>
        <p className="text-text-muted text-center">{errorMsg}</p>
      </div>
    )
  }

  return (
    <section className="min-h-screen pt-36 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-2 text-center text-3xl font-bold">
          {pageData?.pageTitle ?? 'Products'}
        </h1>
        <p className="mb-10 text-center text-text-muted">
          {pageData?.intro ?? 'Browse our awesome products.'}
        </p>

        {products.length === 0 ? (
          <p className="text-center text-text-muted">No products available at the moment.</p>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {products.map((product) => (
              <div key={product.id} className="mb-4 break-inside-avoid">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
