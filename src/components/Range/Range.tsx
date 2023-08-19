import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
};

export type RangeProps = {
    size?: keyof typeof sizes;
    className?: string;
    label?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export const Range = ({
    type = 'range',
    size = 'md',
    className = '',
    min = 0,
    max = 10,
    step = 0.25,
    label,
    ...props
}: RangeProps) => {
    return (
        <input
            type={type}
            min={min}
            max={max}
            step={step}
            className={twMerge(
                'bg-gray-200 rounded-lg appearance-none cursor-pointer w-full',
                sizes[size],
                className
            )}
            {...props}
        />
    );
};
