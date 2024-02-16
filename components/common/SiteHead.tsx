import Head from 'next/head'
import React from 'react'

type Props = {
    children?: React.ReactNode
}

function SiteHead({ children }: Props) {
    return (
        <Head>
            <title>My Auto</title>
            {children}
        </Head>
    )
}

export default SiteHead