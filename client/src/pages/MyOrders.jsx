import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoData from '../components/NoData';
import { useGlobalContext } from '../provider/GlobalProvider';
import toast from 'react-hot-toast';
import { DisplayPriceInVND } from '../utils/DisplayPriceInVND';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector((state) => state.orders.data || []);
    const { fetchOrder } = useGlobalContext();

    const handleBuyAgain = (productId) => {
        navigate(`/product/${productId}`);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const loadOrders = async () => {
            const accessToken = localStorage.getItem('accesstoken');
            if (!accessToken) return;

            try {
                await dispatch(fetchOrder());
            } catch (error) {
                toast.error(
                    'Không thể tải danh sách đơn hàng: ' + error.message
                );
            }
        };
        loadOrders();
    }, [dispatch, fetchOrder]);

    return (
        <section className="container mx-auto lg:pyy-4 py-2 px-1 flex flex-col">
            <div className="p-4 mb-3 bg-primary-4 rounded-md shadow-md shadow-secondary-100 font-bold text-secondary-200 sm:text-lg text-sm uppercase flex justify-between items-center gap-2">
                <h2 className="text-ellipsis line-clamp-1">Đơn hàng của tôi</h2>
            </div>
            <div className="bg-white p-2 grid gap-4">
                {!orders.length ? (
                    <div className="flex flex-col gap-4 items-center">
                        <NoData />
                        <button
                            onClick={() => navigate('/')}
                            className="bg-primary-4 text-secondary-200 py-2 px-5 rounded-md transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto text-center font-bold shadow-md"
                        >
                            Mua sắm ngay!
                        </button>
                    </div>
                ) : (
                    orders.map((order, index) => (
                        <div
                            key={order._id || index}
                            className="border border-secondary-100 rounded-md px-2 sm:px-4 py-3 hover:bg-base-100 shadow-md
                        flex flex-col smgap-3 gap-2 sm:text-base text-xs"
                        >
                            <div className="flex md:flex-row flex-col md:gap-2">
                                <p className="font-semibold">Mã đơn hàng:</p>
                                <p className="flex items-center gap-2">
                                    {order?.orderId || 'N/A'}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 sm:py-0 py-2">
                                <img
                                    src={
                                        order?.product_details?.image?.[0] ||
                                        '/placeholder.jpg'
                                    }
                                    alt={
                                        order?.product_details?.name ||
                                        'Product Image'
                                    }
                                    className="sm:w-14 sm:h-14 w-12 h-12 object-cover rounded shadow-md shadow-secondary-100"
                                    onError={(e) => {
                                        e.target.src = '/placeholder.jpg';
                                    }}
                                />
                                <div className="flex flex-col sm:gap-1">
                                    <p className="font-semibold line-clamp-2">
                                        {order?.product_details?.name ||
                                            'Sản phẩm không xác định'}
                                    </p>
                                    <p className="text-secondary-200 font-bold">
                                        x{order?.quantity || 'Chưa xác định'}
                                    </p>
                                    <p className="text-gray-600">
                                        Ngày đặt:{' '}
                                        {new Date(
                                            order?.createdAt
                                        ).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 items-center">
                                    <p className="font-semibold">Trạng thái:</p>
                                    <span
                                        className={`px-2 py-1 rounded-md sm:text-sm text-xs font-semibold ${
                                            order?.payment_status === 'Đã thanh toán'
                                                ? 'bg-green-100 text-green-800'
                                                : order?.payment_status === 'Thanh toán khi giao hàng'
                                                ? 'bg-blue-100 text-blue-800'
                                                : order?.payment_status === 'Đã hủy'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        {order?.payment_status || 'Chưa xác định'}
                                    </span>
                                </div>
                                {order?.payment_status === 'Đã hủy' && order?.cancelReason && (
                                    <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-red-700">
                                                    <span className="font-medium">Lý do hủy đơn:</span> {order.cancelReason}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-2 items-center">
                                    <p className="font-semibold">Thành tiền:</p>
                                    <p className="flex items-center gap-2 text-secondary-200 font-semibold">
                                        {DisplayPriceInVND(
                                            order?.totalAmt || 0
                                        )}
                                    </p>
                                </div>
                                {order?.points_used > 0 && (
                                    <div className="flex gap-2 text-sm text-green-600">
                                        <p>
                                            Đã dùng {order.points_used} điểm (-
                                            {DisplayPriceInVND(
                                                order.points_value || 0
                                            )}
                                            )
                                        </p>
                                    </div>
                                )}
                                {order?.voucherApplied?.length > 0 && (
                                    <div className="flex flex-col gap-1 text-sm text-blue-600">
                                        {order.voucherApplied.map(
                                            (voucher, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-1"
                                                >
                                                    <span>
                                                        Mã giảm giá:{' '}
                                                        {voucher.code}
                                                    </span>
                                                    {voucher.isFreeShipping ? (
                                                        <span>
                                                            (Miễn phí vận
                                                            chuyển)
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            (-
                                                            {DisplayPriceInVND(
                                                                voucher.discountValue ||
                                                                    0
                                                            )}
                                                            )
                                                        </span>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="flex sm:flex-row flex-col items-baseline gap-1">
                                <p className="font-semibold">
                                    Địa chỉ giao hàng:
                                </p>
                                <p className="text-gray-500 text-[10px] sm:text-sm font-medium">
                                    {order?.delivery_address?.city +
                                        ', ' +
                                        order?.delivery_address?.district +
                                        ', ' +
                                        order?.delivery_address?.ward ||
                                        'Chưa xác định'}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    handleBuyAgain(order?.productId || '');
                                    scrollToTop();
                                }}
                                className="mt-2 bg-primary-4 text-secondary-200 py-[6px] px-4 rounded-md transition-colors duration-200 text-xs sm:text-base w-full sm:w-auto text-center font-bold shadow-md"
                            >
                                Mua lại
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default MyOrders;
