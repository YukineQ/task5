import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
    icon?: React.ReactElement;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ type = 'button', className = '', icon, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={twMerge(
                    'flex justify-center items-center bg-blue-500 rounded-md py-2.5 px-3.5 text-white hover:bg-blue-600 transition',
                    className
                )}
                {...props}
            >
                {icon}
                <span className="mx-2">{props.children}</span>
            </button>
        );
    }
);
