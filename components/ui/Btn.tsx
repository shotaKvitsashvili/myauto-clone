import classNames from 'classnames'
import React from 'react'

type Props = {
    color: 'primary' | 'black'
    onClick?: () => void
    text: string
}

function Btn({ color, onClick, text }: Props) {
    return (
        <button
            onClick={e => {
                if (onClick) {
                    e.preventDefault()
                    onClick()
                }
            }}
            className={
                classNames(
                    'flex justify-center items-center w-full rounded-lg transition-all font-medium text-white',
                    {
                        'bg-primary hover:bg-[#eb4800] h-12 text-sm': color === 'primary',
                        'bg-black-800 hover:opacity-90 h-10 text-xs': color === 'black',
                    }
                )
            }
        >
            {text}
        </button>
    )
}

export default Btn