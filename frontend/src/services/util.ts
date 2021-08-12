import { useEffect, useState } from "react"
import { KeyLoader, useSWRInfinite } from "swr"
import queryString from 'query-string'

type FetchParameters = Parameters<typeof fetch>

type LinkHeader = {
  url: string,
  params: { [key: string]: string }
}

type JsonFetcherWithLinksReturn<T> = {
  links: LinkHeader[]
  data: T
}

const parseLinkParams = (params: string[]) => {
  return params.reduce((acc, cur) => {
    const [key, value] = cur.split('=')
    return {
      ...acc,
      [key.trim()]: value.replaceAll("\"", '').trim()
    }
  }, {})
}

const parseLink = (link: string) => {
  const [url, ...rest] = link.split(';')
  const params = parseLinkParams(rest)

  return {
    url: url.replaceAll(/[<>]/g, '').trim(),
    params,
  }
}

export const getLastPageLink = (links: LinkHeader[]) => {
  const lastLink = links.find(ref => ref.params.rel === 'last')

  if (!lastLink) {
    throw new Error('Last link not found')
  }

  return lastLink
}

export const getLastPageIndex = (links: LinkHeader[]) => {
  const lastPageIndex = queryString.parseUrl(getLastPageLink(links).url).query.page

  if (!lastPageIndex || typeof lastPageIndex !== 'string') {
    throw new Error('Last page index not found')
  }

  return parseInt(lastPageIndex)
}

export const isLastPage = (links: LinkHeader[], page: number) => {
  return getLastPageIndex(links) === page
}

export const parseLinkHeader = (response: Response): LinkHeader[] => {
  const links = response.headers.get('Link');

  if (!links) {
    throw new Error('Link header not found')
  }

  return links.split(',').map(parseLink)
}

export const jsonFetcher = <T>(...args: FetchParameters): Promise<T> => fetch(...args).then(res => res.json())

export const jsonFetcherWithLinks = <T>(...args: FetchParameters): Promise<JsonFetcherWithLinksReturn<T>> => {
  return fetch(...args)
  .then((res) => {
    const links = parseLinkHeader(res)
    return res.json().then((data: T) => ({
        links,
        data,
      }))
  })
}

// TODO: Gambs copied from https://swr.vercel.app/examples/infinite-loading
export const useHeaderPagination = <T>(getKey: KeyLoader) => {
  const [itemPerPage, setItemPerPage ] = useState<Array<T>>([])
  const [isLoadingMore, setIsLoadingMore] = useState(true)

  const { data, error, setSize, size } = useSWRInfinite<JsonFetcherWithLinksReturn<T>>(getKey, jsonFetcherWithLinks)

  useEffect(() => {
    if (data && data[size - 1]) {
      setItemPerPage((ipp) => {
        ipp[size - 1] = data[size - 1].data
        return ipp
      })
      setIsLoadingMore(false)
    } else {
      setIsLoadingMore(true)
    }
  }, [data, size, error])

  return {
    itemPerPage,
    isLoadingMore,
    isLastPage: (data && data[size - 1] ? isLastPage(data[size - 1].links, size - 1) : false),
    page: size,
    setPage: setSize,
    error
  }
}
