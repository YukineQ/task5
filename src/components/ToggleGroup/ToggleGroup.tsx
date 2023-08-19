import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const ToggleGroupContext = React.createContext<{
    value: string | null;
    onChange: (value: any) => void;
}>({
    value: null,
    onChange: () => {}
});

type RootBaseProps = {
    children: React.ReactNode;
    className?: string;
    value: string | null;
    onChange: (value: any) => void;
};

type RootProps = RootBaseProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof RootBaseProps>;

export function Root({ value, className, onChange, children, ...props }: RootProps) {
    const providerValue = React.useMemo(
        () => ({
            value,
            onChange
        }),
        [value, onChange]
    );

    return (
        <ToggleGroupContext.Provider value={providerValue}>
            <div
                className={twMerge(
                    'relative flex shrink-0 overflow-auto text-gray-500 w-fit h-fit bg-gray-50 rounded-full dark:bg-dark-400',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </ToggleGroupContext.Provider>
    );
}

type ToggleGroupButtonBaseProps = {
    className?: string;
    value: string;
    children: React.ReactNode;
};

type ToggleGroupButtonProps = ToggleGroupButtonBaseProps &
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ToggleGroupButtonBaseProps>;

export function Button({ children, value, className, ...props }: ToggleGroupButtonProps) {
    const { value: selectValue, onChange } = React.useContext(ToggleGroupContext);

    return (
        <button
            onClick={(e) => onChange(value)}
            className={twMerge(
                'py-2 px-4 hover:bg-gray-100 transition',
                selectValue === value &&
                    'bg-gray-200 hover:bg-gray-300 dark:bg-dark-300 dark:hover:bg-dark-200',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export const ToggleGroup = { Root, Button };
