import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { Menu, Briefcase, Tag, HelpCircle, FileText, Info } from 'lucide-react';
import logo from '../assets/logo.png';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa6';
import { FaCaretDown, FaCaretUp, FaSearch } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';
import { DisplayPriceInVND } from '../utils/DisplayPriceInVND';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
import defaultAvatar from '../assets/defaultAvatar.png';
import Search from './Search';
// import { UserMenu } from './menu/user-menu';

export default function Header() {
    const links = [
        { href: '/', label: 'Trang chủ' },
        { href: '/', label: 'Sản phẩm' },
        {
            href: '/search',
            label: 'Tìm kiếm',
            icon: <FaSearch size={14} className="mb-[3px]" />,
        },
    ];
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const menuRef = useRef(null);
    const cartItem = useSelector((state) => state.cartItem.cart);
    const { totalPrice, totalQty } = useGlobalContext();
    const [openCartSection, setOpenCartSection] = useState(false);

    // Handle clicks outside the menu
    useEffect(() => {
        const handleClick = (event) => {
            if (!menuRef.current) return;
            const isClickInside = menuRef.current.contains(event.target);
            const isToggleButton = event.target.closest(
                'button[aria-haspopup="true"]'
            );
            if (!isClickInside && !isToggleButton) {
                setOpenUserMenu(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setOpenUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClick, true);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClick, true);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    // Chỉ mở menu nếu đang đóng, đóng menu nếu đang mở
    const toggleUserMenu = useCallback((e) => {
        e.stopPropagation();
        setOpenUserMenu((prev) => (prev ? false : true)); // Chỉ mở nếu đang đóng, đóng nếu đang mở
    }, []);

    // Hàm đóng menu
    const closeMenu = useCallback(() => {
        setOpenUserMenu(false);
    }, []);

    const redirectToLoginPage = () => {
        navigate('/login');
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <header className="sticky top-0 z-50 p-4">
                <div className="container mx-auto">
                    <div className="flex h-16 items-center justify-between px-6 liquid-glass-header rounded-full">
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
                                    {l.icon}
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                        {/* User */}
                        <div className="hidden md:flex items-center justify-end gap-5">
                            {user?._id ? (
                                <div className="relative" ref={menuRef}>
                                    <div className="relative">
                                        <button
                                            onClick={toggleUserMenu}
                                            className="flex items-center gap-2 w-full px-2 py-1.5 text-white rounded-lg hover:bg-white/10 transition-colors"
                                            aria-expanded={openUserMenu}
                                            aria-haspopup="true"
                                            aria-label="User menu"
                                            type="button"
                                        >
                                            <div className="relative p-0.5 overflow-hidden rounded-full liquid-glass">
                                                <img
                                                    src={
                                                        user.avatar ||
                                                        defaultAvatar
                                                    }
                                                    alt={user.name}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                    width={32}
                                                    height={32}
                                                />
                                            </div>
                                            <div className="flex flex-col items-start flex-1 min-w-0">
                                                <span title={user.name} className="text-sm font-medium text-white truncate max-w-16 lg:max-w-20 xl:max-w-max">
                                                    {user.name}
                                                </span>
                                                {user.role === 'ADMIN' && (
                                                    <span className="text-xs text-purple-400">
                                                        Quản trị viên
                                                    </span>
                                                )}
                                            </div>
                                            {openUserMenu ? (
                                                <FaCaretUp
                                                    className="flex-shrink-0 ml-2"
                                                    size={15}
                                                />
                                            ) : (
                                                <FaCaretDown
                                                    className="flex-shrink-0 ml-2"
                                                    size={15}
                                                />
                                            )}
                                        </button>
                                    </div>
                                    <AnimatePresence>
                                        {openUserMenu && (
                                            <motion.div
                                                className="absolute right-0 top-full mt-2 z-50 w-64"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{
                                                    duration: 0.15,
                                                    ease: 'easeOut',
                                                }}
                                            >
                                                {/* <UserMenu
                                                        close={closeMenu}
                                                        menuTriggerRef={menuRef}
                                                    /> */}
                                                <UserMenu
                                                    close={closeMenu}
                                                    menuTriggerRef={menuRef}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <button
                                    onClick={redirectToLoginPage}
                                    className="underline text-sm text-gray-300 hover:text-purple-300 transition-colors"
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
                                className={`${
                                    cartItem[0] ? ' py-1.5' : ' py-3'
                                } flex items-center gap-2 bg-lime-400 text-gray-700 font-medium rounded-lg px-3.5
                                hover:bg-lime-300 hover:shadow-md hover:scale-[1.02] transition-all`}
                            >
                                <div className="animate-bounce">
                                    <FaCartPlus size={20} />
                                </div>
                                <div className="font-bold text-sm">
                                    {cartItem[0] ? (
                                        <div className="ml-1 flex flex-col items-center justify-center">
                                            <p>{totalQty} sản phẩm</p>
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
