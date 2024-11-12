import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'react-medium-image-zoom/dist/styles.css';
import { EffectCoverflow, Pagination, Keyboard, Lazy } from 'swiper/modules';
import { SwipperWrapper } from './_styles';
import Zoom from 'react-medium-image-zoom';

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
				lazy={true}
				modules={[EffectCoverflow, Pagination, Keyboard]}
				className='mySwiper'
			>
				{/* 		{imgUrls?.map(url => (
					<SwiperSlide key={url}>
						<Zoom classDialog='zoom-dialog'>
							<img src={url} loading='lazy' />
						</Zoom>
					</SwiperSlide>
				))} */}
				{Array.from({ length: 20 }).map((_, index) => (
					<SwiperSlide key={index}>
						<Zoom classDialog='zoom-dialog'>
							<img
								loading='lazy'
								src={`https://swiperjs.com/demos/images/nature-${(index % 10) + 1}.jpg`}
							/>
						</Zoom>
					</SwiperSlide>
				))}
			</Swiper>
		</SwipperWrapper>
	);
}
