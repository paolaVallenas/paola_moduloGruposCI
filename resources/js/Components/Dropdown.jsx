import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { createContext, useContext, useState, useRef, useEffect } from 'react';

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOpen = () => {
        setOpen((prevState) => !prevState);
    };

    const closeDropdown = () => {
        setOpen(false);
    };

    // Cerrar el dropdown si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen, closeDropdown }}>
            <div ref={dropdownRef} className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen} aria-haspopup="true" aria-expanded={open}>
                {children}
            </div>
            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={toggleOpen}
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
};

const Content = ({
    align = 'right',
    width = '48',
    contentClasses = 'py-1 bg-white',
    children,
}) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';
    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    let widthClasses = width === '48' ? 'w-48' : '';

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div
                className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                onClick={() => setOpen(false)}
                role="menu"
                aria-hidden={!open}
            >
                <div
                    className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses} shadow-lg`}
                >
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={`block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${className}`}
            role="menuitem"
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;