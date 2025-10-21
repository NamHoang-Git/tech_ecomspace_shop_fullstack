import type React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useRef, useState } from 'react';
import GlareHover from '../GlareHover';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from '@/utils/Axios';
import SummaryApi from '@/common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '@/utils/AxiosToastError';
import Loading from '../Loading';

export function OtpVerificationForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'form'>) {
    const [data, setData] = useState(['', '', '', '', '', '']);
    const navigate = useNavigate();
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const valideValue = Object.values(data).every((el) => el);

    useEffect(() => {
        if (!location?.state?.email) {
            navigate('/forgot-password');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(''),
                    email: location?.state?.email,
                },
            });

            if (response.data.error) {
                toast.error(response.data.message);
                return;
            }

            if (response.data.success) {
                toast.success(response.data.message);

                setData(['', '', '', '', '', '']);
                navigate('/reset-password', {
                    state: {
                        data: response.data,
                        email: location?.state?.email,
                    },
                });
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className={cn('flex flex-col gap-6 text-white', className)}
            {...props}
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Xác nhận OTP</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Nhập mã OTP đã được gửi đến email của bạn để tiếp tục quy
                    trình đặt lại mật khẩu.
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Mã OTP</Label>
                    <div className="flex items-center justify-between gap-2">
                        {data.map((element, index) => {
                            return (
                                <Input
                                    key={'otp' + index}
                                    type="number"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    id={`otp-${index}`}
                                    ref={(el) => {
                                        inputRef.current[index] = el;
                                    }}
                                    value={data[index]}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        const newData = [...data];
                                        newData[index] = value;
                                        setData(newData);

                                        if (value && index < 5) {
                                            inputRef.current[index + 1].focus();
                                        }
                                    }}
                                    maxLength={1}
                                    className="h-12 text-lime-200 border-gray-200 focus:ring-0 shadow-none rounded-lg
                                    bg-black/50 focus:border-[#3F3FF3] no-spinner text-center"
                                />
                            );
                        })}
                    </div>
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
                        {loading ? <Loading /> : 'Xác nhận OTP'}
                    </Button>
                </GlareHover>
            </div>
            <div className="text-center text-sm text-muted-foreground">
                Nhớ mật khẩu?{' '}
                <Link
                    to={'/login'}
                    className="p-0 h-auto text-sm hover:text-opacity-80 font-medium cursor-pointer text-lime-300"
                >
                    Quay lại đăng nhập.
                </Link>
            </div>
        </form>
    );
}
