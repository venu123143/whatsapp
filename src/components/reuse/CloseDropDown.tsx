import { useEffect, useState } from 'react';

const useCloseDropDown = (initialState: boolean, classname: string) => {
    const [dropdown, setDropdown] = useState(initialState);

    useEffect(() => {
        const closeDropdown = (event: MouseEvent) => {
            if (dropdown && (!event.target || !(event.target as HTMLElement).closest(classname))) {
                setDropdown(false);
            }
        };

        document.body.addEventListener('click', closeDropdown);

        return () => {
            document.body.removeEventListener('click', closeDropdown);
        };
    }, [dropdown]);

    return [dropdown, setDropdown] as const;
};

export default useCloseDropDown;
