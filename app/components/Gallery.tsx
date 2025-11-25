'use client';

import Image from 'next/image';
import { useState } from 'react';

// Gallery items. Make sure images are in the public/gallery folder or public root.
const galleryImages = [
  { id: 1, title: 'Chemistry World Team', src: '/gallery/attached.jpg', fallback: '/gallery/books-graduation.jpg' },
  { id: 2, title: 'Students in Class', src: '/gallery/books-graduation.jpg' },
  { id: 3, title: 'Experiment Demonstration', src: '/gallery/books-graduation.jpg' },
  { id: 4, title: 'Group Study', src: '/gallery/books-graduation.jpg' },
  { id: 5, title: 'Lab Equipment', src: '/gallery/books-graduation.jpg' },
  { id: 6, title: 'Award Ceremony', src: '/gallery/books-graduation.jpg' },
  { id: 7, title: 'Field Trip', src: '/gallery/books-graduation.jpg' },
  { id: 8, title: 'Research Project', src: '/gallery/books-graduation.jpg' },
];

export default function Gallery() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (imageId: number) => {
    setImageErrors((prev) => ({ ...prev, [imageId]: true }));
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Gallery</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => {
            const hasError = imageErrors[image.id];
            const imageSrc = hasError && image.fallback ? image.fallback : image.src;
            
            return (
              <div
                key={image.id}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 aspect-square relative"
              >
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={imageSrc} 
                    alt={image.title} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                    unoptimized
                    onError={() => handleImageError(image.id)}
                  />
                </div>

              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />

                <div className="relative z-10 flex items-center justify-center h-full p-4">
                  <p className="text-white text-center font-semibold opacity-90 bg-black bg-opacity-30 px-3 py-1 rounded">
                    {image.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

