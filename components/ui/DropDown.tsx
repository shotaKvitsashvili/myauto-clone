import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import useOutsideClick from '@/hooks/useOutsideClick';
import { Control, Controller } from 'react-hook-form';
type Toption = {
    val: string | number
    text: string | React.ReactNode
}

type Props = {
    customContent?: React.ReactNode
    title: string
    options: Toption[]
    label: string
    wrapperClassName?: string
    name: string
    control: Control<any>
    onChangeFunc?: () => void
};

const DropDown: React.FC<Props> = ({ options, customContent, title, label, wrapperClassName, control, name, onChangeFunc }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Toption>();

    const dropDownRef = useRef<HTMLDivElement | null>(null)

    useOutsideClick(dropDownRef, () => setIsOpen(false))

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: Toption) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        (onChangeFunc && selectedOption) && onChangeFunc()
    }, [selectedOption])

    return (
        <Controller
            control={control}
            defaultValue={0}
            name={name}
            render={({ field }) => (
                <div className={wrapperClassName ?? ''}>
                    {label ? <span className='text-black-800 text-xs mb-2 inline-block'>{label}</span> : <></>}
                    <div className='relative' ref={dropDownRef}>
                        <div
                            onClick={handleToggle}
                            className='relative border border-[#C2C9D8] pl-3 pr-1 rounded-md text-black-600 cursor-pointer flex items-center justify-between h-[40px] bg-white'
                        >
                            <h2
                                className={`transition-all origin-left text-xs pointer-events-none`}>
                                {selectedOption?.text ?? title}
                            </h2>
                            <div className='shrink-0 w-8 h-8 rounded-full hover:bg-[#f2f3f6] transition-all flex justify-center items-center'>
                                <Image
                                    src={"/icons/chevron-down.svg"}
                                    alt='dropdown-arrow'
                                    width={10}
                                    height={10}
                                    className={isOpen ? 'rotate-180' : ''}
                                />
                            </div>
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ type: 'spring', duration: .5 }}
                                    className='absolute top-[calc(100%+10px)] mt-1 w-full left-0 bg-white shadow-[0_4px_20px_#A4AEC166] rounded-lg z-20'
                                >
                                    {
                                        customContent ?? <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {options?.map((option) => {
                                                const { text, val } = option

                                                return <motion.li
                                                    className={`
                                                        ${selectedOption === text ? 'bg-[#F2F3F6] text-black-800' : 'hover:bg-[#F2F3F6] text-black-600 hover:text-black-800'}
                                                        text-sm
                                                        transition-all
                                                        px-4
                                                        py-2
                                                        cursor-pointer
                                                        mb-[1px]
                                                        last-of-type:m-0
                                                        `}
                                                    key={val}
                                                    onClick={() => {
                                                        handleOptionClick(option)
                                                        field.onChange(option.val)
                                                    }}
                                                >
                                                    {text}
                                                </motion.li>
                                            })}
                                        </ul>
                                    }
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        />
    );
};

export default DropDown;
