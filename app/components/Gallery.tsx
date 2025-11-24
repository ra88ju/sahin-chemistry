import Image from 'next/image';

// Simple gallery items. Save your attached photo to `public/gallery/attached.jpg`.
// The first item points to that file; other items fall back to existing
// public images. Replace these with your real images under /public/gallery.
const galleryImages = [
  { id: 1, title: 'Chemistry Lab Session', src: '/gallery/attached.jpg' },
  { id: 2, title: 'Students in Class', src: '/book.jpg' },
  { id: 3, title: 'Experiment Demonstration', src: '/books-graduation.jpg' },
  { id: 4, title: 'Group Study', src: '/books-graduation.jpg' },
  { id: 5, title: 'Lab Equipment', src: '/books-graduation.jpg' },
  { id: 6, title: 'Award Ceremony', src: '/books-graduation.jpg' },
  { id: 7, title: 'Field Trip', src: '/books-graduation.jpg' },
  { id: 8, title: 'Research Project', src: '/books-graduation.jpg' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Gallery</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 aspect-square relative"
            >
              <div className="absolute inset-0 z-0">
                <Image src={image.src} alt={image.title} fill className="object-cover" />
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />

              <div className="relative z-10 flex items-center justify-center h-full p-4">
                <p className="text-white text-center font-semibold opacity-90 bg-black bg-opacity-30 px-3 py-1 rounded">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

