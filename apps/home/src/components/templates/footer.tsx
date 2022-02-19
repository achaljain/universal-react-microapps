import React, {useRef, useEffect} from 'react'

const renderFn = async (domTarget, props, appName) => {
    const domain = 'http://localhost:4001'
    const res = await fetch(`${domain}/manifest.json`)
    const data = await res.json()
    const scriptUrl =  `${domain}/${data['main.js']}`

    const element = document.createElement("script");
    element.src = scriptUrl;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => {
      window[appName].render(domTarget, props)
    };

    document.head.appendChild(element);
}

const Footer = () => {
    const ref = useRef(null)

    useEffect(() => {
      renderFn(ref.current, { shadowROOT: true }, 'footer')
    }, [])

    return <div ref={ref}></div>
}

export default Footer