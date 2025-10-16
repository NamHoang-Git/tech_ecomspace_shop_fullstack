import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { Menu, Briefcase, Tag, HelpCircle, FileText, Info } from 'lucide-react';
import logo from '../assets/logo.png';
import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa6';
import { FaCaretDown, FaCaretUp, FaSearch, FaUserTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';
import { DisplayPriceInVND } from '../utils/DisplayPriceInVND';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
import defaultAvatar from '../assets/defaultAvatar.png';
import Search from './Search';

export default function Header() {
    const links = [
        { href: '/', label: 'Trang chủ'},
        { href: '/', label: 'Sản phẩm'},
        { href: '/search', label: 'Tìm kiếm', icon: <FaSearch size={14} /> },
    ];

    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const cartItem = useSelector((state) => state.cartItem.cart);
    const { totalPrice, totalQty } = useGlobalContext();
    const [openCartSection, setOpenCartSection] = useState(false);

    const redirectToLoginPage = () => {
        navigate('/login');
    };

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <header className="sticky top-0 z-50 p-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
                        {/* Brand Logo */}
                        <Link
                            to="/"
                            onClick={scrollToTop}
                            className="flex items-center gap-1.5"
                        >
                            <img
                                src={logo}
                                alt="TechSpace logo"
                                width={25}
                                height={25}
                                className="h-5 w-5"
                            />
                            <span className="font-semibold tracking-wide text-white">
                                TechSpace
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
                            {links.map((l) => (
                                <Link
                                    key={l.href}
                                    to={l.href}
                                    onClick={scrollToTop}
                                    className="hover:text-purple-300 transition-colors flex items-center gap-[6px]"
                                >
                                    {l.icon}{l.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center justify-end gap-8">
                            {/* <Link to="#contact">Chat With Us</Link> */}
                            {user?._id ? (
                                <div className="relative">
                                    <div
                                        onClick={() =>
                                            setOpenUserMenu((prev) => !prev)
                                        }
                                        className="flex select-none items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out"
                                    >
                                        <img
                                            src={user.avatar || defaultAvatar}
                                            alt={user.name}
                                            className="w-[52px] h-[52px] rounded-full border-[3px] border-inset border-primary-200"
                                        />
                                        {openUserMenu ? (
                                            <FaCaretUp
                                                size={20}
                                                className="text-primary-200"
                                            />
                                        ) : (
                                            <FaCaretDown
                                                size={20}
                                                className="text-primary-200"
                                            />
                                        )}
                                    </div>
                                    {openUserMenu && (
                                        <div className="absolute right-0 top-[60px]">
                                            <div className="bg-white min-w-[300px] lg:shadow-md lg:shadow-secondary-100 rounded p-4">
                                                <UserMenu
                                                    close={handleCloseUserMenu}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={redirectToLoginPage}
                                    className="text-sm text-gray-300 hover:text-purple-300 transition-colors"
                                >
                                    Đăng nhập
                                </button>
                            )}
                            <button
                                onClick={
                                    user?._id
                                        ? () => setOpenCartSection(true)
                                        : redirectToLoginPage
                                }
                                // className="flex items-center gap-2 bg-primary-3 hover:bg-green-800 px-4 py-3
                                //         rounded-lg text-secondary-200 font-bold"
                                className="flex items-center gap-2 bg-lime-400 text-gray-700 font-medium rounded-lg px-4 py-2.5
                                hover:bg-lime-300 hover:shadow-md hover:scale-[1.02] transition-all"
                            >
                                {/* { Add to cart icons } */}
                                <div className="animate-bounce">
                                    <FaCartPlus size={20} />
                                </div>
                                <div className="font-bold text-sm">
                                    {cartItem[0] ? (
                                        <div className="ml-1 flex flex-col items-center justify-center">
                                            <p>{totalQty} items</p>
                                            <p>
                                                {DisplayPriceInVND(totalPrice)}
                                            </p>
                                        </div>
                                    ) : (
                                        <p>Giỏ hàng</p>
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* Mobile Nav */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="border-gray-700 bg-gray-900/80 text-gray-200 hover:bg-gray-800"
                                    >
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="right"
                                    className="liquid-glass border-gray-800 p-0 w-64 flex flex-col"
                                >
                                    {/* Brand Header */}
                                    <div className="flex items-center gap-1.5 px-4 py-4 border-b border-gray-800">
                                        <img
                                            alt="Skitbit logo"
                                            width={24}
                                            height={24}
                                            className="h-6 w-6"
                                        />
                                        <span className="font-semibold tracking-wide text-white text-lg">
                                            Skitbit
                                        </span>
                                    </div>

                                    {/* Nav Links */}
                                    <nav className="flex flex-col gap-1 mt-2 text-gray-200">
                                        {links.map((l) => (
                                            <Link
                                                key={l.href}
                                                to={l.href}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-purple-300 transition-colors"
                                            >
                                                <span className="inline-flex items-center justify-center w-5 h-5 text-gray-400">
                                                    <l.icon className="h-4 w-4" />
                                                </span>
                                                <span className="text-sm">
                                                    {l.label}
                                                </span>
                                            </Link>
                                        ))}
                                    </nav>

                                    {/* CTA Button at Bottom */}
                                    <div className="mt-auto border-t border-gray-800 p-4">
                                        <Button
                                            asChild
                                            className="w-full bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                                                hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                                                transition-all"
                                        >
                                            <a
                                                href="https://wa.link/65mf3i"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Get a Quote
                                            </a>
                                        </Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>
            <div className="hidden md:block">
                <Search />
            </div>

            {openCartSection && (
                <DisplayCartItem close={() => setOpenCartSection(false)} />
            )}
        </>
    );
}
