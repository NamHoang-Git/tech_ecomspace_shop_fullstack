import React from 'react';
import { useSelector } from 'react-redux';
import CategoryWiseProductDisplay from './../components/CategoryWiseProductDisplay';
import { CategoryPanel } from '../components/home/category-panel';
import { LogoMarquee } from '../components/home/logo-marquee';
import { AppverseFooter } from '../components/home/appverse-footer';
import LiquidEther from '@/components/LiquidEther';

const Home = () => {
    const categoryData = useSelector((state) => state.product.allCategory);

    return (
        <div className="relative min-h-screen">
            {/* Background effect - position absolute */}
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

            {/* Content - position relative để nổi lên trên background */}
            <div className="relative z-10">
                <CategoryPanel />
                <LogoMarquee />

                {/* Display Category Product */}
                <div className="mt-2 mb-8 flex flex-col gap-8 sm:gap-12 sm:px-4 px-2">
                    {categoryData?.map((c, index) => {
                        return (
                            <CategoryWiseProductDisplay
                                key={c?._id + 'CategoryWiseProduct' || index}
                                id={c?._id}
                                name={c?.name}
                            />
                        );
                    })}
                </div>

                <AppverseFooter />
            </div>
        </div>
    );
};

export default Home;
