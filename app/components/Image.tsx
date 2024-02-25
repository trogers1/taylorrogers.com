import { FC } from 'react';
import { Caption } from './Caption';

type ImageProps = {
  src: string;
  alt: string;
  caption: string;
};
const Image: FC<ImageProps> = ({ caption, alt, src }) => {
  return (
    <div className="space-y-4">
      <img
        alt={alt}
        className="aspect-[4/3] rounded-lg object-cover overflow-hidden"
        height={400}
        src={src}
        width={600}
      />
      <Caption>{caption}</Caption>
    </div>
  );
};

export { Image };
