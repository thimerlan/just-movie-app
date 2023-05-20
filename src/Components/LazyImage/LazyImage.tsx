import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: FC<LazyImageProps> = ({ src, alt }) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      effect="blur"
      threshold={100}
      placeholderSrc={src}
	  
    />
  );
};

export default LazyImage;
