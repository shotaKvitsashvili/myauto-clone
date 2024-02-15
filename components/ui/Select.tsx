import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import useOutsideClick from '@/hooks/useOutsideClick';

type Option = {
    val: string | number;
    text: string | React.ReactNode;
};

type Props = {
    type: 'multiSelect' | 'dropDown';
    title: string;
    options: Option[];
    label?: string;
    optionType?: 'checkBox' | 'badge'; // Only required for MultiSelect
    customContent?: React.ReactNode; // Only required for DropDown
};

const CustomSelect: React.FC<Props> = ({ type, title, options, label, optionType, customContent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [searchKey, setSearchKey] = useState<string>('');

    const containerRef = useRef<HTMLDivElement | null>(null);

    useOutsideClick(containerRef, () => setIsOpen(false));

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (val: any) => {
        type === 'dropDown' ? setSelectedOption(val) : toggleOption(val);
        setIsOpen(false);
    };

    const toggleOption = (option: Option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(prev => prev.filter(item => item.val !== option.val));
        } else {
            setSelectedOptions(prev => [...prev, option]);
        }
    };

    const renderOptions = () => {
        return options
            .filter(option => {
                if (typeof option.text === 'string') {
                    return option.text.trim().toLowerCase().includes(searchKey.trim().toLocaleLowerCase());
                }
                return true;
            })
            .map(option => {
                const isChecked = type === 'multiSelect' ? selectedOptions.includes(option) : selectedOption === option.text;
                return (
                    <motion.li
                        key={option.val}
                        className={`${isChecked ? 'bg-[#F2F3F6] text-black-800' : 'hover:bg-[#F2F3F6] text-black-600 hover:text-black-800'
                            } text-sm transition-all px-4 py-2 cursor-pointer`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option.text}
                    </motion.li>
                );
            });
    };

    return (
        <div>
            {label && <span className="text-black-800 text-xs mb-2 inline-block">{label}</span>}
            <div className="relative" ref={containerRef}>
                <div
                    onClick={handleToggle}
                    className="relative border border-[#C2C9D8] pl-3 pr-1 rounded-md text-black-600 cursor-pointer flex items-center justify-between h-[40px]"
                >
                    <h2 className="transition-all origin-left text-xs pointer-events-none">{selectedOption ?? title}</h2>
                    <div className="shrink-0 w-8 h-8 rounded-full hover:bg-[#f2f3f6] transition-all flex justify-center items-center">
                        <Image
                            src="/icons/chevron-down.svg"
                            alt="dropdown-arrow"
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
                            transition={{ type: 'spring', duration: 0.5 }}
                            className="absolute top-[calc(100%+10px)] mt-1 w-full left-0 bg-white shadow-[0_4px_20px_#A4AEC166] rounded-lg z-20"
                        >
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {type === 'dropDown' ? customContent : renderOptions()}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CustomSelect;
