import { React } from 'react';
import { useEffect, useState } from 'react';
import './Main.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import close from '../icons/delete.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import cn from 'classnames';
import { getVideo } from '../utils/getVideo.ts';

export const Main = () => {
  const [video, setVideo] = useState({});
  const [shownVideo, setshownVideo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isClose, setIsClose] = useState(false);
  const videosArray = [video, video, video, video, video, video, video, video];

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await getVideo();
        console.log('response', response);
        setVideo(response);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handleSetVideo = () => {
    setshownVideo(video.player_embed_url);
    setIsClose(false);
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="slider__wrapper">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          navigation
          pagination={{ clickable: true }}
          dynamicBullets={true}
          simulateTouch={true}
          grabCursor={true}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1260: {
              slidesPerView: 4,
            }
          }}
        >
          {videosArray.map((video, index) => (
            <>
              <SwiperSlide key={index} style={{ width: '250px', height: '250px' }}>
                <img
                  src={video.pictures.sizes[2].link_with_play_button}
                  alt='video'
                  onClick={handleSetVideo}
                  className='image'
                />
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>

      {!isClose && (
        <div className={cn("popup", {
          'popup--active': shownVideo.length > 0,
        })}>
          <div className="popup__body" onClick={() => setIsClose(true)}>
            <div className="popup__close" onClick={() => setIsClose(true)}>
              <img src={close} className='close__image'></img>
            </div>

            <div className="popup__content">
              <iframe
                src={shownVideo}
                webkitallowfullscreen mozallowfullscreen allowfullscreen
                className='video'
                allow="autoplay"
              >
              </iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
