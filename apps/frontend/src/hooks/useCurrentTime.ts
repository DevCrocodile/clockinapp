import { useState, useEffect } from 'react'

interface UseCurrentTimeReturnType {
  currentTime: Date
}

export function useCurrentTime (): UseCurrentTimeReturnType {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return { currentTime }
}
