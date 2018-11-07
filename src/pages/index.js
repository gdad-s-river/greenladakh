import React, { useState, Fragment, useRef, useEffect } from 'react'
import Layout from '../components/layout'
import mountainsSketch from '../utils/mountainsSketch'
import { setConfig } from 'react-hot-loader'

setConfig({ pureSFC: true })

const GreenLadakhHome = () => {
  const [p5Mounted, setp5Mounted] = useState(false)
  const mountainRef = useRef(null)

  useEffect(async () => {
    const p5 = await import('p5')
    setp5Mounted(true)
    new p5.default(mountainsSketch, mountainRef.current.id)
  }, [])

  return (
    <Layout>
      {p5Mounted ? (
        <Fragment>
          <main
            ref={mountainRef}
            id="moving-mountains"
            style={{
              width: '100%',
              height: '100%',
              // overflow: 'hidden',
              color: 'white',
            }}
          />
        </Fragment>
      ) : (
        // react svg spinner https://github.com/chantastic/react-svg-spinner
        // TODO: take care of styles, so that it wouldn't
        // jump around when canvas loads.
        <Loading />
      )}
    </Layout>
  )
}

function Loading() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vw',
        background: '#b6c592',
        overflow: 'hidden',
      }}
    />
  )
}

// this works
export default GreenLadakhHome
