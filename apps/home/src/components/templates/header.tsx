import React, { useRef, useEffect } from 'react'

const Header = () => {
    const ref = useRef(null)

    const renderFn = async () => {
        const remote = await import('header/app')
        remote.render(ref.current, { shadowROOT: true})
    }

    useEffect(() => {
      renderFn()
    }, [])

    return <div ref={ref}></div>
}

export default Header