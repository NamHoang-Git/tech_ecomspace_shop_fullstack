import LiquidEther from '@/components/LiquidEther';
import { OtpVerificationForm } from '@/components/otpVerification/otp-verification-form';

export default function OtpVerificationPage() {
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
            <div className="rounded-2xl liquid-glass overflow-hidden md:mt-8 mt-0">
                <div className="relative flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full md:max-w-md xl:max-w-2xl">
                            <OtpVerificationForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
