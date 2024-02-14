import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type TCrumb = {
    name: string
    url: string
}

type Props = {
    crumbs: TCrumb[]
}


function BreadCrumb({ crumbs = [] }: Props) {

    const initialCrumb: TCrumb[] = [
        {
            name: 'მთავარი',
            url: '/'
        },
        ...crumbs
    ]

    return (
        <div className='flex items-center gap-2 text-xs'>
            {
                initialCrumb.map(({ name, url }, index, arr) => {
                    const isLast = index === arr.length - 1;

                    return <>
                        <Link href={url} className={`${isLast ? 'text-primary pointer-events-none' : 'text-black-600 hover:text-gray-800'}`}>
                            {name}
                        </Link>
                        {
                            isLast
                                ?
                                <></>
                                :
                                <Image
                                    width={6}
                                    height={3}
                                    alt={name}
                                    src="/icons/chevron-right.svg"
                                />
                        }
                    </>
                })
            }
        </div>
    )
}

export default BreadCrumb