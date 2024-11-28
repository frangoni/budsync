import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'react-medium-image-zoom/dist/styles.css';
import { EffectCoverflow, Pagination, Keyboard } from 'swiper/modules';
import { SwipperWrapper } from './_styles';
import Zoom from 'react-medium-image-zoom';
import { TFile } from '@/redux/reducers/records';

interface PlantGalleryProps {
	files: TFile[] | undefined;
}

export default function PlantGallery({ files }: PlantGalleryProps) {
	const MINIO_URL =
		process.env.NODE_ENV === 'production' ? process.env.VITE_MINIO_URL : import.meta.env.VITE_MINIO_URL;

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
				{files?.map(file => {
					if (file && !file.path) return null;
					const { id, path } = file;
					const src = `${MINIO_URL}/images/${path}`;

					return (
						<SwiperSlide key={id}>
							<Zoom classDialog='zoom-dialog'>
								<img src={src} loading='lazy' />
							</Zoom>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</SwipperWrapper>
	);
}
