'use client'

import { useEffect } from 'react'

interface TrackingEvent {
  event: string
  parameters?: Record<string, any>
}

interface ProductData {
  id: string
  name: string
  price: number
  category?: string
}

// GA4 Analytics tracker
export function AnalyticsTracker() {
  useEffect(() => {
    // Initialize analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      console.log('Analytics initialized')
    }
  }, [])

  return null
}

// Event tracking functions
export function trackProductView(product: ProductData) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'view_item', {
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category || 'producto',
        },
      ],
    })
  }
}

export function trackAddToCart(product: ProductData, quantity: number = 1) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'UYU',
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          quantity: quantity,
          price: product.price,
        },
      ],
    })
  }
}

export function trackSearch(query: string, results: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'search', {
      search_term: query,
      results_count: results,
    })
  }
}

export function trackVideoWatch(videoId: string, title: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'video_view', {
      video_title: title,
      video_id: videoId,
    })
  }
}

export function trackReviewRead(productId: string, reviewCount: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'view_item_list', {
      item_category: 'review',
      items_count: reviewCount,
    })
  }
}

export function trackPageView(pagePath: string, pageTitle: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
    })
  }
}

export function trackCheckout(totalValue: number, itemsCount: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'begin_checkout', {
      currency: 'UYU',
      value: totalValue,
      items_count: itemsCount,
    })
  }
}

export function trackConversion(orderId: string, totalValue: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: orderId,
      value: totalValue,
      currency: 'UYU',
    })
  }
}
