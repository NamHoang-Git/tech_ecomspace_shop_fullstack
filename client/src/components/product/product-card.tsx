'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { pricewithDiscount } from '../../utils/PriceWithDiscount';
import { DisplayPriceInVND } from '../../utils/DisplayPriceInVND';
import { MdAccessTime } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AddToCartButton from '../AddToCartButton';

interface Product {
    _id: string;
    name: string;
    image: string[];
    unit: string;
    discount: number;
    price: number;
    stock: number;
}

interface ProductCardProps {
    data: Product;
}

export function ProductCard({ data }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const url = `/product/${data.name.toLowerCase().replace(/\s+/g, '-')}-${
        data._id
    }`;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Link
            to={url}
            onClick={scrollToTop}
            className="block rounded-[28px] liquid-glass p-2 shadow-2xl"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                }}
            >
                <Card
                    className="bg-white rounded-3xl shadow-md shadow-secondary-100 hover:shadow-lg transition-all duration-300 overflow-hidden group relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Glow effect on hover */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 opacity-0 transition-opacity duration-500 pointer-events-none ${
                            isHovered ? 'opacity-100' : ''
                        }`}
                    />

                    {/* Border glow */}
                    <div
                        className={`absolute inset-0 rounded-lg border-2 border-emerald-500/0 transition-all duration-500 ${
                            isHovered
                                ? 'border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                : ''
                        }`}
                    />

                    <div className="relative w-full h-full overflow-hidden">
                        <img
                            src={data.image[0]}
                            alt={data.name}
                            className={`w-full h-52 object-contain bg-white transition-transform duration-700 ${
                                isHovered ? 'scale-100' : 'scale-100'
                            }`}
                        />

                        {/* Time badge */}
                        {/* <div className="absolute top-2 right-2 bg-green-100 text-green-800 sm:px-2 sm:py-1 px-1 py-[2px] rounded-md flex items-center gap-1">
                            <MdAccessTime size={13} className="mb-[2px]" />
                            <p className="sm:text-xs text-[8px] font-medium leading-[14px]">
                                10 min
                            </p>
                        </div> */}

                        {data.discount > 0 && (
                            <div className="absolute top-2 left-2 z-10">
                                <motion.div
                                    animate={{
                                        scale: isHovered ? [1, 1.1, 1] : 1,
                                        rotate: isHovered ? [0, -5, 5, 0] : 0,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: isHovered
                                            ? Number.POSITIVE_INFINITY
                                            : 0,
                                        repeatDelay: 2,
                                    }}
                                >
                                    <Badge className="bg-gradient-to-r from-emerald-700 to-cyan-500 shadow-lg shadow-emerald-500/20 font-bold text-white">
                                        -{data.discount}%
                                    </Badge>
                                </motion.div>
                            </div>
                        )}

                        {/* Add to cart button on hover */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent md:flex hidden items-end justify-center p-4
                                transition-opacity duration-300 ${
                                    isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            {/* <Button
                                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-emerald-500/20"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // Add to cart logic here
                                }}
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Thêm vào giỏ
                            </Button> */}
                            <AddToCartButton data={data} />
                        </div>
                    </div>

                    <CardContent className="md:p-4 p-3 relative z-10 text-white grid gap-1 md:h-36">
                        <h3
                            className={`font-semibold mb-1 transition-colors duration-300 line-clamp-2 h-fit md:w-auto w-full ${
                                isHovered ? 'text-emerald-500' : ''
                            }`}
                        >
                            {data.name}
                        </h3>

                        {/* <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">{data.unit}</span>
                        </div> */}

                        <div className="flex items-center justify-between">
                            <div className="flex md:flex-col md:items-start items-center justify-between md:gap-0 gap-2 md:w-auto w-full">
                                {data.discount > 0 ? (
                                    <>
                                        <span className="text-gray-400 line-through text-sm">
                                            {DisplayPriceInVND(data.price)}
                                        </span>
                                        <span className="text-emerald-500 font-bold text-lg">
                                            {DisplayPriceInVND(
                                                pricewithDiscount(
                                                    data.price,
                                                    data.discount
                                                )
                                            )}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-emerald-500 font-bold text-lg">
                                        {DisplayPriceInVND(data.price)}
                                    </span>
                                )}
                            </div>

                            {data.stock == 0 && (
                                <span className="text-rose-400 text-sm font-medium md:block hidden">
                                    Hết hàng
                                </span>
                            )}
                        </div>
                        <div className='w-full md:hidden block'>
                            <AddToCartButton data={data} />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    );
}

export default ProductCard;
