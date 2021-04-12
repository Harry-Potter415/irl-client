import { useState, useEffect } from 'react'
import { usePagination } from 'shopjs/hooks'
import { productsIndex } from 'shopjs/services/Algolia'
import { animateScroll } from 'react-scroll'

const useProducts = ({
  autoLoad = true,
  keywords = '',
  hitsPerPage = 24,
  filters = {},
  collectionHandle = '',
  ...props
}) => {
  const [results, setResults] = useState({})
  const [products, setProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { page, nbHits, nbPages, nbStart, nbFinish, rangeWithDots } = usePagination({ results })

  const [query, setQuery] = useState({
    keywords,
    filters,
    page,
    hitsPerPage,
  })

  const searchProducts = async q => {
    let newProducts = await searchIndex(q)
    setProducts(newProducts)
  }

  const loadMoreProducts = async q => {
    let moreProducts = await searchIndex(q)
    setProducts([...products, ...moreProducts])
  }

  const searchIndex = async q => {
    setQuery(q)
    setIsLoading(true)
    let facetFilters = buildFacetFilters(q)
    const results = await productsIndex.search(q.keywords, {
      facetFilters: facetFilters,
      hitsPerPage: hitsPerPage,
      page: parseInt(q.page) - 1,
      distinct: true,
    })
    setResults(results)
    setIsLoading(false)
    results.hits.length > 0 ? setIsLoaded(true) : setIsLoaded(false)
    return results.hits
  }

  const handleSearch = () => {
    let q = {
      ...query,
      page: 1,
    }
    searchProducts(q)
    animateScroll.scrollToTop()
  }

  const handleClear = () => {
    setProducts([])
    setIsLoaded(false)
  }

  const buildFacetFilters = q => {
    let facetFilters = []
    if (q.filters && Object.keys(q.filters).length > 0) {
      Object.keys(q.filters).forEach(facet => {
        let facets = []
        q.filters[facet].forEach(value => {
          facets.push(`${facet}:${value}`)
        })
        facetFilters.push(facets)
      })
    }
    return facetFilters
  }

  const handleRefine = page => {
    let q = {
      ...query,
      page,
    }
    searchProducts(q)
    animateScroll.scrollToTop()
  }

  const handleLoadMore = page => {
    let q = {
      ...query,
      page,
    }
    loadMoreProducts(q)
  }

  const handleClearSearch = () => {
    let q = {
      ...query,
      keywords: '',
      page: 1,
    }
    searchProducts(q)
    setIsLoaded(false)
  }

  const handleToggleFilter = (facetName, value) => {
    if (!query.filters[facetName]) query.filters[facetName] = []
    if (query.filters[facetName].includes(value)) {
      query.filters[facetName] = query.filters[facetName].filter(v => v !== value)
    } else {
      query.filters[facetName].push(value)
    }
    searchProducts(query)
  }

  const handleRemoveFilter = (filterName, value) => {
    query.filters[filterName] = query.filters[filterName].filter(v => v !== value)
    searchProducts(query)
  }

  const handleChange = ev => {
    const { name, value } = ev.target
    const q = {
      ...query,
      [name]: value,
    }
    setQuery(q)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') handleSearch()
  }

  useEffect(() => {
    const updateQuery = () => {
      let q = {
        ...query,
        keywords: keywords,
        filters: filters,
        page: 1,
        hitsPerPage: hitsPerPage,
      }
      if (collectionHandle) {
        q.filters.collections = [collectionHandle]
      }

      setQuery(q)

      if (autoLoad) {
        searchProducts(q)
      }
    }

    updateQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords, collectionHandle])

  return {
    page,
    isLoaded,
    isLoading,
    keywords: query.keywords,
    products,
    nbHits,
    nbPages,
    nbStart,
    nbFinish,
    query,
    setQuery,
    setProducts,
    handleSearch,
    handleChange,
    handleClear,
    handleClearSearch,
    handleToggleFilter,
    handleRemoveFilter,
    handleKeyPress,
    handleRefine,
    handleLoadMore,
    rangeWithDots,
  }
}

export default useProducts
