// Placeholder images - replace with actual images
const galleryImages = [
  { id: 1, title: 'Chemistry Lab Session' },
  { id: 2, title: 'Students in Class' },
  { id: 3, title: 'Experiment Demonstration' },
  { id: 4, title: 'Group Study' },
  { id: 5, title: 'Lab Equipment' },
  { id: 6, title: 'Award Ceremony' },
  { id: 7, title: 'Field Trip' },
  { id: 8, title: 'Research Project' },
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
              className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 aspect-square flex items-center justify-center group cursor-pointer relative"
            >
              <div className="text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <p className="font-semibold">{image.title}</p>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
              {/* Replace with actual image:
              <Image
                src={`/gallery/${image.id}.jpg`}
                alt={image.title}
                fill
                className="object-cover"
              />
              */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

