import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { IoSearch } from 'react-icons/io5';
import { GiReturnArrow } from 'react-icons/gi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useMobile from '../hooks/useMobile';

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [isMobile] = useMobile();
    const params = useLocation();
    const searchText = params.search.slice(3);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const isSearch = location.pathname === '/search';
        setIsSearchPage(isSearch);
    }, [location]);

    const redirectToSearchPage = () => {
        navigate('/search');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOnChange = (e) => {
        const value = e.target.value;
        const url = `/search?q=${value}`;
        setIsTyping(true);
        navigate(url);
        setTimeout(() => {
            setIsTyping(false);
        }, 200);
    };

    return (
        <search className="cursor-pointer liquid-glass max-w-2xl container mx-auto rounded-3xl">
            <div
                className="md:px-8 px-2 sm:my-0 h-8 sm:h-12 rounded-3xl border-[3px] border-inset overflow-hidden
                flex items-center text-sm text-gray-300 liquid-glass group focus-within:border-purple-400"
            >
                <div>
                    {isMobile && isSearchPage ? (
                        <Link
                            to={'/'}
                            className="flex justify-center items-center h-full p-1 m-2 group-focus-within:text-purple-400
                        shadow-sm shadow-purple-400 group-focus-within:shadow-purple-400 rounded-full"
                        >
                            <GiReturnArrow size={14} />
                        </Link>
                    ) : (
                        <button
                            className="flex justify-center items-center h-full p-4
                    group-focus-within:text-purple-400 font-bold mb-[2px]"
                        >
                            <IoSearch size={18} />
                        </button>
                    )}
                </div>
                <div className="w-full h-full outline-none">
                    {!isSearchPage ? (
                        // Not in Search Page
                        <div
                            onClick={redirectToSearchPage}
                            className="w-full h-full flex items-center font-medium"
                        >
                            <TypeAnimation
                                sequence={[
                                    'Tìm kiếm "điện thoại"',
                                    1000,
                                    'Tìm kiếm "iPad"',
                                    1000,
                                    'Tìm kiếm "máy tính xách tay"',
                                    1000,
                                    'Tìm kiếm "bàn phím"',
                                    1000,
                                    'Tìm kiếm "bộ xử lý"',
                                    1000,
                                ]}
                                wrapper="span"
                                speed={60}
                                repeat={Infinity}
                            />
                        </div>
                    ) : (
                        // Search Page
                        <div className="relative w-full h-full outline-none">
                            <input
                                type="text"
                                placeholder="Bạn muốn mua gì hôm nay?"
                                autoFocus={true}
                                className="w-full h-full bg-transparent text-white outline-none"
                                defaultValue={searchText}
                                onChange={handleOnChange}
                                spellCheck={false}
                            />
                            {isTyping && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </search>
    );
};

export default Search;
