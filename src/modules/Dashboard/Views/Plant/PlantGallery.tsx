import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Keyboard } from 'swiper/modules';
import { SwipperWrapper } from './_styles';

interface PlantGalleryProps {
	imgUrls: string[];
}

export default function PlantGallery({ imgUrls }: PlantGalleryProps) {
	return (
		<SwipperWrapper>
			<Swiper
				effect={'coverflow'}
				grabCursor={true}
				centeredSlides={true}
				slidesPerView={'auto'}
				coverflowEffect={{
					rotate: 45,
					stretch: 0,
					depth: 500,
					modifier: 1,
					slideShadows: true,
				}}
				pagination={true}
				keyboard={true}
				modules={[EffectCoverflow, Pagination, Keyboard]}
				className='mySwiper'
			>
				{imgUrls?.map(url => (
					<SwiperSlide key={url}>
						<img src={url} loading='lazy' />
					</SwiperSlide>
				))}

				<SwiperSlide>
					<img src='https://swiperjs.com/demos/images/nature-1.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='https://swiperjs.com/demos/images/nature-2.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='https://swiperjs.com/demos/images/nature-3.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='https://swiperjs.com/demos/images/nature-4.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='https://swiperjs.com/demos/images/nature-5.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='https://swiperjs.com/demos/images/nature-6.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='https://swiperjs.com/demos/images/nature-7.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='https://swiperjs.com/demos/images/nature-8.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<img src='https://swiperjs.com/demos/images/nature-10.jpg' />
				</SwiperSlide>
			</Swiper>
		</SwipperWrapper>
	);
}
