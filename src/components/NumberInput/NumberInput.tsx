import { useMemo, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

type CounterActions = {
    get: () => number;
    set: (newState: number) => void;
    inc: (delta?: number) => void;
    dec: (delta?: number) => void;
};

const useCounter = (
    value: number,
    setValue: (value: number) => void,
    min: number | null = null,
    max: number | null = null
): [number, CounterActions] => {
    const get = () => value;

    const set = (newState: number) => {
        const prevState = get();

        if (prevState === newState) {
            return;
        }

        if (typeof min === 'number') {
            newState = Math.max(newState, min);
        }
        if (typeof max === 'number') {
            newState = Math.min(newState, max);
        }

        prevState !== newState && setValue(newState);
    }

    const inc = (delta: number = 1) => {
        const prevState = get();
        set(prevState + delta);
    }

    const dec = (delta: number = 1) => {
        const prevState = get();
        set(prevState - delta);
    }

    return [
        get(),
        {
            get,
            set,
            inc,
            dec,
        },
    ];
};

type NumberInputProps = {
    value: number;
    onChange: (state: number) => void;
    label?: string;
    max?: number;
    min?: number;
};

export const NumberInput = ({ label, max, min, onChange, value }: NumberInputProps) => {
    const [count, { inc, dec, set }] = useCounter(value, onChange, min, max);

    useEffect(() => {
        onChange(count);
    }, [count, onChange]);

    return (
        <div>
            <label className="w-full text-gray-700 text-sm font-semibold dark:text-white/80">
                {label}
            </label>
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button
                    onClick={() => dec()}
                    className="
                        flex 
                        justify-center 
                        items-center 
                        bg-gray-200 
                        text-gray-600 
                        hover:text-gray-700 
                        hover:bg-gray-400 
                        h-full w-20 
                        rounded-l 
                        cursor-pointer 
                        outline-none
                        transition
                        dark:bg-dark-600
                        dark:text-white/80
                        dark:hover:bg-dark-300
                    "
                >
                    <AiOutlineMinus size={18} />
                </button>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => set(Number(e.target.value))}
                    className="
                        focus:outline-none 
                        text-center w-full 
                        bg-gray-100 
                        font-semibold 
                        text-md 
                        hover:text-black 
                        focus:text-black 
                        md:text-basecursor-default 
                        flex 
                        items-center 
                        text-gray-700 
                        outline-none 
                        transition
                        dark:bg-dark-300
                        dark:text-white/80
                    "
                />
                <button
                    onClick={() => inc()}
                    className="
                        flex 
                        justify-center 
                        items-center 
                        bg-gray-200 
                        text-gray-600 
                        hover:text-gray-700 
                        hover:bg-gray-400 
                        h-full w-20 
                        rounded-r
                        cursor-pointer 
                        outline-none
                        transition
                        dark:bg-dark-600
                        dark:text-white/80
                        dark:hover:bg-dark-300
                    "
                >
                    <AiOutlinePlus size={18} />
                </button>
            </div>
        </div>
    );
};
