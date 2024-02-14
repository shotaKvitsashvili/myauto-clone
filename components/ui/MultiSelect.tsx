import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import useOutsideClick from '@/hooks/useOutsideClick';

type Toption = {
    val: string | number
    text: string
}

type Props = {
    optionType: 'checkBox' | 'badge'
    options: Toption[]
    label: string
    topLabel?: string
}

const multiselectSubscringValue = 100;

const MultiSelect = ({ options, optionType, label, topLabel }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedOptions, setSelectedOptions] = useState<Array<Toption>>([]);
    const [searchKey, setSearchKey] = useState<string>('')

    const floatingLabel = isOpen || selectedOptions.length > 0

    const inputRef = useRef<HTMLInputElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useOutsideClick(containerRef, () => setIsOpen(false))

    const optionsString = selectedOptions
        .map((option, index) => (
            option.text
        ))
        .toString().substring(0, multiselectSubscringValue)

    const toggleOption = (option: Toption) => {
        const { val, text } = option

        if (selectedOptions.includes(option)) {
            setSelectedOptions(prev => prev.filter((item) => item.val !== val));
        } else {
            setSelectedOptions(prev => [...prev, option]);
        }
    };

    useEffect(() => {
        isOpen ? inputRef.current?.focus() : setSearchKey('')
    }, [isOpen])

    return (
        <div>
            {topLabel ? <span className='text-gray-800 text-xs mb-2 inline-block'>{topLabel}</span> : <></>}
            <div className='relative' ref={containerRef}>
                <div onClick={() => setIsOpen(!isOpen)}>
                    <div className='relative border border-[#C2C9D8] pl-3 pr-1 rounded-md text-black-600 cursor-pointer'>
                        <h2
                            className={`transition-all origin-left absolute text-xs pointer-events-none ${floatingLabel ? 'top-0 scale-75' : 'top-1/2 -translate-y-1/2'}`}>
                            {label}
                        </h2>

                        <div className='h-[40px] flex items-center'>
                            <input
                                className={`placeholder:text-black-600 placeholder:text-xs truncate text-black w-full !outline-none pt-4 text-xs`}
                                type="text"
                                readOnly={!isOpen}
                                value={searchKey}
                                onChange={e => setSearchKey(e.target.value)}
                                placeholder={
                                    optionsString + (optionsString.length >= multiselectSubscringValue ? '...' : '')
                                }
                            />

                            <div className='shrink-0 w-8 h-8 rounded-full hover:bg-[#f2f3f6] transition-all flex justify-center items-center'>
                                <Image
                                    src={selectedOptions.length ? "/icons/close.svg" : "/icons/chevron-down.svg"}
                                    alt='arrow'
                                    width={selectedOptions.length ? 18 : 10}
                                    height={selectedOptions.length ? 18 : 10}
                                    className={`${isOpen ? 'rotate-180' : ''}  object-contain object-center`}
                                    onClick={(e) => {
                                        if (selectedOptions.length) {
                                            e.stopPropagation()
                                            setSelectedOptions([])
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {
                        isOpen && <motion.div
                            className='absolute top-[calc(100%+10px)] rounded-lg flex flex-col border border-[#D8DBE2] shadow-sm z-[9999] w-full px-2 bg-white'
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                        >
                            <div className={`max-h-[310px] overflow-auto mt-2 multiselect-scroll pb-3 ${optionType === 'checkBox' ? '' : 'flex flex-wrap gap-3'}`}>
                                {options.filter(({ text }) => text.trim().toLowerCase().includes(searchKey.trim().toLocaleLowerCase())).map((option, index) => {
                                    const isChecked = selectedOptions.includes(option)

                                    return optionType === 'checkBox'
                                        ?
                                        <label className='w-full flex items-center gap-4 cursor-pointer px-6 py-[10px] md:text-xs xl:text-sm font-medium'>
                                            <div className={`${isChecked ? 'bg-success border-transparent' : ''} flex items-center justify-center w-[24px] h-[24px] rounded-md border shrink-0`}>
                                                <Image
                                                    src="/icons/check.svg"
                                                    alt={option.text}
                                                    width={24}
                                                    height={24}
                                                />
                                            </div>
                                            <input
                                                type='checkbox'
                                                onChange={() => toggleOption(option)}
                                                checked={isChecked}
                                                className='hidden'
                                            />
                                            {option.text}
                                        </label>
                                        :
                                        // option.text
                                        <label
                                            className={`
                                                flex items-center min-h-8 px-3 py-1 border rounded-lg text-xs md:text-sm cursor-pointer transition-all
                                                ${isChecked ? 'bg-[#e8f8f0] border-[#1aba6b]' : 'border-[#F2F3F6] md:hover:border-[#F2F3F6]'}
                                                `}
                                            onClick={() => toggleOption(option)}
                                        >
                                            <div className='w-fit'>
                                                {option.text}
                                            </div>
                                        </label>
                                })}
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
                {/* <div>
                <h3>Selected Options:</h3>
                <ul>
                    {selectedOptions.map((option, index) => (
                        <li key={index}>{option.text}</li>
                    ))}
                </ul>
            </div> */}
            </div>
        </div>
    );
};

export default MultiSelect;
