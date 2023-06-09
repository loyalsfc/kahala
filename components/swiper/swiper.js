import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from './swiper.module.css'
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import Image from "next/image";

export default function SwiperContainer() {
  return (
    <>
        <Swiper
            spaceBetween={30}
            effect={"fade"}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className={styles.swiperImageWrapper}>
                    <Image
                        src="/images/sliders/slider_FS.png"
                        height="384"
                        width="712"
                        alt="swiper image"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.swiperImageWrapper}>
                    <Image
                        src="/images/sliders/Slider.png"
                        height="384"
                        width="712"
                        alt="swiper image"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.swiperImageWrapper}>
                    <Image
                        src="/images/sliders/Slider_copy.jpg"
                        height="384"
                        width="712"
                        alt="swiper image"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.swiperImageWrapper}>
                    <Image
                        src="/images/sliders/712x384_27th2.gif"
                        height="384"
                        width="712"
                        alt="swiper image"
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.swiperImageWrapper}>
                    <Image
                        src="/images/sliders/712x384_2.jpg"
                        height="384"
                        width="712"
                        alt="swiper image"
                    />
                </div>
            </SwiperSlide>
        </Swiper>
    </>
  );
}
