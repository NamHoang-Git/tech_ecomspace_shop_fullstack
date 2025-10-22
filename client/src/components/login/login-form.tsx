import type React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import GlareHover from '../GlareHover';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Axios from '@/utils/Axios';
import SummaryApi from '@/common/SummaryApi';
import toast from 'react-hot-toast';
import fetchUserDetails from '@/utils/fetchUserDetails';
import { setUserDetails } from '@/store/userSlice';
import AxiosToastError from '@/utils/AxiosToastError';
import Loading from '../Loading';

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'form'>) {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         e.preventDefault();

    //         // lấy tất cả input hợp lệ trong form
    //         const form = e.target.form;
    //         const focusable = Array.from(form.elements).filter(
    //             (el) =>
    //                 el.tagName === 'INPUT' ||
    //                 el.tagName === 'SELECT' ||
    //                 el.tagName === 'TEXTAREA'
    //         );

    //         // tìm vị trí hiện tại
    //         const index = focusable.indexOf(e.target);

    //         // focus phần tử tiếp theo nếu có
    //         if (index > -1 && index < focusable.length - 1) {
    //             focusable[index + 1].focus();
    //         }
    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const valideValue = Object.values(data).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.login,
                data: data,
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem(
                    'accesstoken',
                    response.data.data.accessToken
                );
                localStorage.setItem(
                    'refreshToken',
                    response.data.data.refreshToken
                );

                const userDetails = await fetchUserDetails();
                dispatch(setUserDetails(userDetails.data));

                // Reset form
                setData({
                    email: '',
                    password: '',
                });
                navigate('/');
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <form
            className={cn('flex flex-col gap-6 text-white', className)}
            {...props}
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Đăng Nhập Vào Tài Khoản</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Nhập email của bạn bên dưới để đăng nhập vào tài khoản của
                    bạn
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        autoFocus
                        placeholder="m@example.com"
                        onChange={handleChange}
                        value={data.email}
                        className="h-12 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white/20 focus:border-[#3F3FF3]"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Nhập mật khẩu"
                            onChange={handleChange}
                            value={data.password}
                            className="h-12 pr-10 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white/20 focus:border-[#3F3FF3]"
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="rounded border-gray-300 cursor-pointer"
                        />
                        <Label
                            htmlFor="remember"
                            className="text-sm text-muted-foreground cursor-pointer"
                        >
                            Ghi nhớ đăng nhập
                        </Label>
                    </div>
                    <Link
                        to={'/forgot-password'}
                        className="p-0 h-auto text-sm hover:text-opacity-80 cursor-pointer text-lime-300"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>

                <GlareHover
                    glareColor="#ffffff"
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                >
                    <Button
                        disabled={!valideValue}
                        type="submit"
                        className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer"
                        style={{ backgroundColor: '#000' }}
                    >
                        {loading ? <Loading /> : 'Đăng nhập'}
                    </Button>
                </GlareHover>

                <>
                    <div className="relative">
                        <div className="relative text-center text-sm uppercase flex items-center justify-between px-1.5">
                            <div
                                className="relative after:absolute after:inset-0 after:top-1/2 after:left-0 after:z-0 after:flex after:items-end
                        after:border-t after:border-border w-16 md:w-28 xl:w-56"
                            ></div>
                            <span className="relative z-10 px-2 text-muted-foreground">
                                Hoặc đăng nhập bằng
                            </span>
                            <div
                                className="relative after:absolute after:inset-0 after:top-1/2 after:right-0 after:z-0 after:flex after:items-start
                        after:border-t after:border-border w-16 md:w-28 xl:w-56"
                            ></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-black">
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 h-12 border-gray-200 hover:bg-gray-400 hover:text-gray-900 rounded-lg
                            bg-white/90 shadow-none cursor-pointer"
                        >
                            <FaGoogle className="mb-1" />
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 h-12 border-gray-200 hover:bg-gray-400 hover:text-gray-900 rounded-lg
                            bg-white/90 shadow-none cursor-pointer"
                        >
                            <FaFacebookSquare className="mb-1" />
                            Facebook
                        </Button>
                    </div>
                </>
            </div>
            <div className="text-center text-sm text-muted-foreground">
                Bạn chưa có tài khoản?{' '}
                <Link
                    to={'/register'}
                    className="p-0 h-auto text-sm hover:text-opacity-80 font-medium cursor-pointer text-lime-300"
                >
                    Đăng ký ngay.
                </Link>
            </div>
        </form>
    );
}
