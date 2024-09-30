'use client'
import dynamic from 'next/dynamic';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FishCard = dynamic(() => import('@/components/main/cards/FishCard'), { ssr: false })
const MilkCard = dynamic(() => import('@/components/main/cards/MilkCard'), { ssr: false })
const CoffeCard = dynamic(() => import('@/components/main/cards/CoffeeCard'), { ssr: false })
const BreadCard = dynamic(() => import('@/components/main/cards/BreadCard'), { ssr: false })


export default function MainCarousel() {

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        lazyLoad: true,
        autoplay: true,
        pauseOnHover: true,
        dots: true,
        centerPadding: "60px",
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
        ]
    };


    return (
        <div style={{ marginBottom: '2rem', marginBlock: '1rem' }}>
            <Slider {...settings}>
                <FishCard />
                <MilkCard />
                <CoffeCard />
                <BreadCard />
            </Slider>
        </div>
    )
}