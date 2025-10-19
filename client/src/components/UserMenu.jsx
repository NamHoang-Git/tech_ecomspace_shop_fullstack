import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Divider from './Divider';
import Axios, { setIsLoggingOut } from './../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { logout, updateUserPoints } from '../store/userSlice';
import { clearCart } from '../store/cartProduct';
import { toast } from 'react-hot-toast';
import AxiosToastError from './../utils/AxiosToastError';
import { BiLinkExternal, BiRefresh } from 'react-icons/bi';
// import isAdmin from '../utils/isAdmin';
import GradientText from './GradientText';

const UserMenu = ({ close }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef();
    const [isLoadingPoints, setIsLoadingPoints] = useState(false);

    // Function to fetch user points
    const fetchUserPoints = useCallback(async () => {
        try {
            setIsLoadingPoints(true);
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await Axios.get(SummaryApi.user_points.url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success && response.data.data) {
                dispatch(updateUserPoints(response.data.data.points || 0));
            }
        } catch (error) {
            console.error('Error fetching user points:', error);
        } finally {
            setIsLoadingPoints(false);
        }
    }, [dispatch]);

    // Fetch points when menu opens
    useEffect(() => {
        const fetchData = async () => {
            if (user?._id) {
                await fetchUserPoints();
            }
        };

        fetchData();
    }, [user?._id, fetchUserPoints]);

    // Function to check if a path is active
    const isActive = (path) => {
        // Exact match for root path
        if (path === '/dashboard' && location.pathname === '/dashboard')
            return true;
        // Check if current path starts with the given path (for nested routes)
        return location.pathname.startsWith(path) && path !== '/dashboard';
    };

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout,
            });

            if (response.data.success) {
                if (close) {
                    close();
                }
                // Clear Redux state immediately
                dispatch(logout());
                dispatch(clearCart());
                setIsLoggingOut(true);

                // Clear localStorage
                localStorage.removeItem('accesstoken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('checkoutSelectedItems');

                toast.success(response.data.message);
                navigate('/');
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleClose = () => {
        if (close) {
            close();
        }
    };

    return (
        <div
            ref={menuRef}
            className="p-6 rounded-2xl bg-neutral-600/95 backdrop-blur-lg border border-white/20 shadow-xl"
        >
            <div className="text-lime-200 font-medium">Tài khoản</div>

            <div className="text-sm flex items-start gap-2 px-4 lg:px-2 py-2 font-semibold">
                <div className="w-full grid gap-1">
                    <div className="mt-1 flex items-center gap-1">
                        <GradientText
                            colors={[
                                '#FFD700',
                                '#FFFFFF',
                                '#FFD700',
                                '#FFFACD',
                                '#FF6347',
                            ]}
                            animationSpeed={3}
                            showBorder={false}
                            className="custom-class"
                        >
                            <div className="flex items-center gap-1">
                                Điểm thưởng:{' '}
                                {user.rewardsPoint?.toLocaleString() || 0} điểm
                            </div>
                        </GradientText>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                fetchUserPoints();
                            }}
                            className={`transition-colors text-yellow-600 ${
                                isLoadingPoints ? 'animate-spin' : ''
                            }`}
                            disabled={isLoadingPoints}
                            title="Làm mới điểm"
                        >
                            <BiRefresh size={20} className="mb-1" />
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="text-sm flex items-start gap-2 px-4 lg:px-2 py-2 font-semibold">
                <div className="w-full grid gap-1">
                    <div className="text-gray-600 mt-1 flex items-center gap-1">
                        <div className="flex items-center gap-1">
                            <span className="font-medium text-yellow-500">
                                Điểm thưởng:
                            </span>
                            <span className="font-bold text-yellow-500">
                                {user.rewardsPoint?.toLocaleString() || 0} điểm
                            </span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                fetchUserPoints();
                            }}
                            className={`text-yellow-500 hover:text-yellow-500 transition-colors ${
                                isLoadingPoints ? 'animate-spin' : ''
                            }`}
                            disabled={isLoadingPoints}
                            title="Làm mới điểm"
                        >
                            <BiRefresh size={20} className="mb-1" />
                        </button>
                    </div>
                </div>
            </div> */}
            <Divider />
            <div className="lg:text-sm text-xs grid gap-2 font-semibold">
                {/* {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={'/dashboard/category'}
                        className={`flex items-center text-bl gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                            isActive('/dashboard/category')
                                ? 'bg-white/20 shadow-md'
                                : ''
                        }`}
                    >
                        <span className="text-white font-medium text-sm">
                            Danh mục
                        </span>
                    </Link>
                )}

                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={'/dashboard/product'}
                        className={`flex items-center text-bl gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                            isActive('/dashboard/product')
                                ? 'bg-white/20 shadow-md'
                                : ''
                        }`}
                    >
                        <span className="text-white font-medium text-sm">
                            Sản phẩm
                        </span>
                    </Link>
                )}

                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={'/dashboard/bill'}
                        className={`flex items-center text-bl gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                            isActive('/dashboard/bill')
                                ? 'bg-white/20 shadow-md'
                                : ''
                        }`}
                    >
                        <span className="text-white font-medium text-sm">
                            Đơn hàng
                        </span>
                    </Link>
                )}

                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={'/dashboard/report'}
                        className={`flex items-center text-bl gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                            isActive('/dashboard/report')
                                ? 'bg-white/20 shadow-md'
                                : ''
                        }`}
                    >
                        <span className="text-white font-medium text-sm">
                            Báo cáo
                        </span>
                    </Link>
                )}

                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={'/dashboard/voucher'}
                        className={`flex items-center text-bl gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                            isActive('/dashboard/voucher')
                                ? 'bg-white/20 shadow-md'
                                : ''
                        }`}
                    >
                        <span className="text-white font-medium text-sm">
                            Mã giảm giá
                        </span>
                    </Link>
                )} */}
                <Link
                    onClick={handleClose}
                    to={'/dashboard/profile'}
                    className={`flex items-center text-bl gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                        isActive('/dashboard/profile')
                            ? 'bg-white/20 shadow-md'
                            : ''
                    }`}
                >
                    <span className="text-white font-medium text-sm">
                        Thông tin tài khoản
                    </span>
                </Link>

                <Link
                    onClick={handleClose}
                    to={'/dashboard/address'}
                    className={`flex items-center text-bl gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                        isActive('/dashboard/address')
                            ? 'bg-white/20 shadow-md'
                            : ''
                    }`}
                >
                    <span className="text-white font-medium text-sm">
                        Địa chỉ
                    </span>
                </Link>

                <Link
                    onClick={handleClose}
                    to={'/dashboard/my-orders'}
                    className={`flex items-center text-bl gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                        isActive('/dashboard/my-orders')
                            ? 'bg-white/20 shadow-md'
                            : ''
                    }`}
                >
                    <span className="text-white font-medium text-sm">
                        Lịch sử mua hàng
                    </span>
                </Link>

                <Divider />
                <button
                    onClick={handleLogout}
                    className="flex items-center text-bl gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                >
                    <span className="text-white font-medium text-sm">
                        Đăng xuất
                    </span>
                </button>
            </div>
        </div>
    );
};

export default UserMenu;
