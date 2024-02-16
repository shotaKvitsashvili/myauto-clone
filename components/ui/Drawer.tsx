import React, { SetStateAction, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { motion } from 'framer-motion'

interface Props {
    children: React.ReactNode
    setShowDrawer: React.Dispatch<SetStateAction<boolean>>
    direction?: 'left' | 'right'
}

function Drawer({ children, setShowDrawer, direction }: Props) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.getElementsByTagName('html')[0].style.overflow = 'hidden'
        }

        return () => {
            if (typeof window !== 'undefined') {
                document.getElementsByTagName('html')[0].style.overflow = ''
            }
        }
    }, [])

    const PortalCOntent = (
        <div className={`fixed flex w-screen h-screen z-[99] top-0 left-0 ${direction === 'left' ? 'justify-start' : 'justify-end'}`}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: .5 }}
                exit={{ opacity: 0 }}
                className='fixed w-full h-full bg-site-black-50 left-0 top-0'
                onClick={() => setShowDrawer(false)}
            />
            <motion.div
                initial={{ x: direction === 'left' ? -400 : 400, opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === 'left' ? -400 : 400, opacity: 0, transition: { duration: .3 } }}
                transition={{ duration: .5 }}
                className='fixed h-full w-full'
            >
                {children}
            </motion.div>
        </div>
    )

    return typeof document !== 'undefined' ? createPortal(PortalCOntent, document.body) : <></>
}

export default Drawer