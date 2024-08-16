import Image from 'next/image';

const Footer = () => {
    return (
        <footer className='bg-lightgreen flex text-white text-center justify-around items-center py-4 pt-10 px-10'>
            <ul className='flex gap-10'>
                <li>
                    <Image src="/facebook.svg" alt="Facebook" width={50} height={50} />
                </li>
                <li>
                    <Image src="/twitter.svg" alt="Twitter" width={50} height={50} />
                </li>
                <li>
                    <Image src="/instagram.svg" alt="Instagram" width={50} height={50} />
                </li>
                <li>
                    <Image src="/linkedin.svg" alt="LinkedIn" width={50} height={50} />
                </li>
            </ul>
            <p className='text-black text-xl'>© 2024 - All rights reserved</p>

        </footer>
    );
};

export default Footer;
