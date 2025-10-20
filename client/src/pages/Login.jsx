import { LoginForm } from '@/components/login/login-form';
import banner from '@/assets/register_banner.jpg';
import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import LiquidEther from '@/components/LiquidEther';

export default function LoginPage() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='relative container mx-auto'>
            <div className="fixed inset-0 z-0 pointer-events-none">
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <div className="rounded-2xl liquid-glass overflow-hidden grid lg:grid-cols-2">
                <div className="relative  flex flex-col gap-4 p-6 md:p-10">
                    <div className="relative flex justify-center gap-2 md:justify-start">
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
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <LoginForm />
                        </div>
                    </div>
                </div>
                <div className="relative hidden bg-muted lg:block">
                    <img
                        src={banner}
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </div>
    );
}
