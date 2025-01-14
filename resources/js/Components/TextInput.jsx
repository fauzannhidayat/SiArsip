import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                `border-2 border-indigo-300 bg-indigo-50 text-indigo-900 placeholder-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-lg px-4 py-2 shadow-sm transition duration-300 ` +
                className
            }
            ref={input}
        />
    );
});
