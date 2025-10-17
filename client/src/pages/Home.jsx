import React from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { valideURLConvert } from './../utils/valideURLConvert';
import CategoryWiseProductDisplay from './../components/CategoryWiseProductDisplay';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Hero } from '../components/home/hero';
import { LogoMarquee } from '../components/home/logo-marquee';
import { AppverseFooter } from '../components/home/appverse-footer';
import Search from '../components/Search';

const Home = () => {
    const categoryData = useSelector((state) => state.product.allCategory);
    // const navigate = useNavigate();
    // const containerRef = useRef();

    // const handleRedirectProductListPage = (id, cat) => {
    //     const url = `/${valideURLConvert(cat)}-${id}`;
    //     navigate(url);
    // };

    return (
        <section className="">
            <Hero />
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
        </section>
    );
};

export default Home;
