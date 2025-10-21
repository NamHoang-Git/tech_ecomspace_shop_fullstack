import banner from '@/assets/register_banner.jpg';
import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import LiquidEther from '@/components/LiquidEther';
import { TypeAnimation } from 'react-type-animation';
import { RegisterForm } from '@/components/register/register-form';

export default function RegisterPage() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative container mx-auto p-3">
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
            <div className="relative flex justify-center gap-2 text-xl md:justify-start py-8">
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
                        className="h-6 w-6"
                    />
                    <span className="font-semibold tracking-wide text-white">
                        TechSpace
                    </span>
                </Link>
            </div>
            <div className="rounded-2xl liquid-glass overflow-hidden grid lg:grid-cols-[1.5fr_2fr]">
                <div
                    className="hidden bg-muted lg:flex justify-center items-center"
                    style={{
                        backgroundImage: `url(${banner})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <h1 className="px-4 text-white font-bold text-2xl">
                        <TypeAnimation
                            sequence={['Chào mừng đến với TechSpace!', 800, '', 500]}
                            wrapper="span"
                            speed={75}
                            repeat={Infinity}
                        />
                    </h1>
                </div>
                <div className="relative flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full md:max-w-md xl:max-w-2xl">
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}