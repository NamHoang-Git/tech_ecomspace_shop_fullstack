import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { valideURLConvert } from './../utils/valideURLConvert';
import CategoryWiseProductDisplay from './../components/CategoryWiseProductDisplay';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Hero } from '../components/home/hero';
import { LogoMarquee } from '../components/home/logo-marquee';
import { AppverseFooter } from '../components/home/appverse-footer';
import Search from '../components/Search';

const Home = () => {
    const loadingCategory = useSelector(
        (state) => state.product.loadingCategory
    );
    const categoryData = useSelector((state) => state.product.allCategory);
    const navigate = useNavigate();
    const containerRef = useRef();

    const handleRedirectProductListPage = (id, cat) => {
        const url = `/${valideURLConvert(cat)}-${id}`;
        navigate(url);
    };

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 500;
    };

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 500;
    };

    return (
        <section className="">
            <Hero />
            <LogoMarquee />
            <div className="container mx-auto px-4">
                <div className="relative flex items-center">
                    {/* Category */}
                    <div
                        ref={containerRef}
                        className="grid grid-flow-col auto-cols-[minmax(7rem,7rem)] sm:auto-cols-[minmax(9rem,9rem)]
                    md:auto-cols-[minmax(9rem,9rem)] lg:auto-cols-[minmax(10rem,10rem)]
                    gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 pt-6 pb-6 overflow-x-auto scroll-smooth scrollbar-hide"
                    >
                        {loadingCategory
                            ? new Array(12).fill(null).map((c, index) => {
                                  return (
                                      <div
                                          key={index + 'loadingCategory'}
                                          className="grid grid-flow-col grid-cols-[2fr_1fr] h-[4rem] sm:h-[5rem] md:h-[5rem] lg:h-[6rem]
                                        place-items-center border-2 rounded-2xl sm:rounded-3xl bg-white
                                        shadow-md shadow-primary-100 cursor-pointer animate-pulse"
                                      >
                                          <div className="h-full w-full flex flex-col gap-2 justify-center p-2">
                                              <div className="bg-blue-100 w-full h-2 rounded"></div>
                                              <div className="bg-blue-100 w-2/3 h-2 rounded"></div>
                                          </div>
                                          <div className="bg-blue-100 w-full h-full rounded"></div>
                                      </div>
                                  );
                              })
                            : categoryData.map((cat, index) => {
                                  return (
                                      <div
                                          key={
                                              cat._id + 'displayCategory' ||
                                              index
                                          }
                                          className="w-full h-full"
                                          onClick={() =>
                                              handleRedirectProductListPage(
                                                  cat._id,
                                                  cat.name
                                              )
                                          }
                                      >
                                          <div
                                              className="grid grid-flow-col grid-cols-[2fr_1fr] h-[4rem] sm:h-[5rem] md:h-[5rem] lg:h-[6rem] gap-2
                                            place-items-center shadow-md shadow-secondary-100 rounded-2xl sm:rounded-3xl bg-primary-5
                                            cursor-pointer group"
                                          >
                                              <p className="text-[10px] sm:text-sm md:text-base lg:text-base text-center p-2 text-secondary-200 font-bold">
                                                  {cat.name}
                                              </p>
                                              <img
                                                  src={cat.image}
                                                  alt={cat.name}
                                                  className="w-full h-full object-cover rounded-3xl transition-transform duration-500
                                                group-hover:scale-95"
                                              />
                                          </div>
                                      </div>
                                  );
                              })}
                    </div>

                    {/* Arrow */}
                    <div className="left-0 absolute hidden lg:block cursor-pointer">
                        <button
                            onClick={handleScrollLeft}
                            className="z-10 bg-white hover:bg-gray-100 shadow-md shadow-secondary-200 text-lg
                        p-2 rounded-full "
                        >
                            <FaAngleLeft size={16} />
                        </button>
                    </div>

                    <div className="right-0 absolute hidden lg:block cursor-pointer">
                        <button
                            onClick={handleScrollRight}
                            className="z-10 bg-white hover:bg-gray-100 shadow-md shadow-secondary-200 text-lg
                        p-2 rounded-full "
                        >
                            <FaAngleRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
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
