import { useEffect, useState } from 'react'

const getScreenSize = () => (window.innerWidth <= 768 ? "mobile" : "desktop")

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize)

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize())
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return screenSize
}

export default useScreenSize
