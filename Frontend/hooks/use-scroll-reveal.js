"use client"

import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Use a small timeout to ensure the class is applied after the element is visible
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
        // Stop observing after element is revealed to improve performance
        observer.unobserve(entry.target)
      }
    }, {
      threshold: options.threshold ?? 0.1,
      rootMargin: options.rootMargin ?? '0px 0px -50px 0px',
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options.threshold, options.rootMargin])

  return { ref, isVisible }
}
