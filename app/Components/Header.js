import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className='flex flex-col md:flex-row justify-between items-center py-5 px-5 md:px-10 bg-lightgreen'>
            <div className='flex justify-between items-center w-full'>
                <h1 className='font-bold text-xl'>
                    Lumi<span className='text-logocolor'>Flash</span>
                </h1>
                <button
                    className='md:hidden text-darkgreen'
                    onClick={toggleMenu}
                >
                    Menu
                </button>
            </div>
            <div
                className={`${
                    isMenuOpen ? 'block' : 'hidden'
                } md:flex flex-col md:flex-row items-center gap-4 md:gap-20 w-full mt-4 md:mt-0`}
            >
                <nav className='w-full'>
                    <ul className='flex flex-col md:flex-row items-center gap-4 md:gap-4'>
                        <li className='w-full text-center'>
                            <Link href="/about">About</Link>
                        </li>
                        <li className='w-full text-center'>
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>

                <div className='flex flex-col md:flex-row items-center gap-4 md:gap-10  text-center'>
                    <Link className='border-2 border-solid border-darkgreen px-4 py-1 rounded w-full md:w-auto' href="/signin">Login</Link>
                    <Link className='border-2 border-solid border-darkgreen px-4 py-1 rounded bg-darkgreen text-white w-full md:w-auto' href="/signup">Register</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
