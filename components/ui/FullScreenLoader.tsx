import React from 'react'
import { createPortal } from 'react-dom'

type Props = {}

function FullScreenLoader({ }: Props) {
    return (
       typeof document !== 'undefined' && createPortal(
            <div className='fixed top-0 left-0 w-screen h-[100svh] z-[99] grid place-items-center bg-white'>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" r="7.14635" fill="none" stroke=" #FD4100" stroke-width="3">
                        <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                        <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                    </circle>
                    
                    <circle cx="50" cy="50" r="29.0108" fill="none" stroke="#ff5d00" stroke-width="3">
                        <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline"></animate>
                        <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline"></animate>
                    </circle>
                </svg>
            </div>,
            document.body
        )
    )
}

export default FullScreenLoader