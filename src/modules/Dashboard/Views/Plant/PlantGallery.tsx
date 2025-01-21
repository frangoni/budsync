import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Keyboard } from 'swiper/modules';
import { SwipperWrapper } from './_styles';
import { TFile } from '@/redux/reducers/records';
import PlantImage from './PlantImage';

interface PlantGalleryProps {
	files: TFile[] | undefined;
}

export default function PlantGallery({ files }: PlantGalleryProps) {
	return (
		<SwipperWrapper>
			<Swiper
				effect={'coverflow'}
				grabCursor={true}
				centeredSlides={true}
				slidesPerView={'auto'}
				coverflowEffect={{
					rotate: 15,
					stretch: 0,
					depth: 500,
				}}
				pagination={true}
				keyboard={true}
				modules={[EffectCoverflow, Pagination, Keyboard]}
				className='mySwiper'
			>
				{files?.map(file => {
					const { id, path } = file;
					return (
						<SwiperSlide key={id + path}>
							<PlantImage key={id} id={id} />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</SwipperWrapper>
	);
}
