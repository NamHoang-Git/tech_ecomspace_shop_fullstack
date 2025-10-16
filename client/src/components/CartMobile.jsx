import React from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { FaCartShopping } from 'react-icons/fa6';
import { FaCaretRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { DisplayPriceInVND } from '../utils/DisplayPriceInVND';
import { Link } from 'react-router-dom';

const CartMobileLink = () => {
    const { totalPrice, totalQty } = useGlobalContext();
    const cartItem = useSelector((state) => state.cartItem.cart);

    return (
        <>
            {cartItem[0] && (
                <Link to={'/cart'} className="sticky bottom-4 p-2">
                    <div
                        className="flex items-center justify-between gap-3 lg:hidden text-secondary-200 text-sm
                    bg-primary px-4 py-3 rounded shadow-lg shadow-secondary-100 font-bold"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary rounded shadow-md shadow-slate-600">
                                <FaCartShopping size={16} />
                            </div>
                            <div className="sm:text-sm text-xs">
                                <p>{totalQty} sản phẩm</p>
                                <p>{DisplayPriceInVND(totalPrice)}</p>
                            </div>
                        </div>

                        <span className="flex items-center gap-1 hover:opacity-70">
                            <span className="sm:text-sm text-xs">
                                Xem giỏ hàng
                            </span>
                            <FaCaretRight />
                        </span>
                    </div>
                </Link>
            )}
        </>
    );
};

export default CartMobileLink;
