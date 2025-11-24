interface Teacher {
  name: string;
  specialty: string;
  image?: string;
  role?: string;
  bio?: string;
}

const teachers: Teacher[] = [
  {
    name: 'MD. Sahin Alom',
    specialty: 'Chemistry-Teacher',
    role: 'Director',
    bio: 'Founder and Director with a passion for chemistry education and community outreach.',
    image: '/gallery/shahin-alom.jpg', // save your attached photo to public/gallery/attached.jpg
  },
  {
    name: 'Mrs. Jane Doe',
    specialty: 'Administration',
    role: 'Manager',
    bio: 'Manages daily operations and admissions. Reach out for enrollment questions.',
  },
  {
    name: 'Prof. Sarah Johnson',
    specialty: 'Physical Chemistry',
  },
  {
    name: 'Prof. Sarah Johnson',
    specialty: 'Physical Chemistry',
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Inorganic Chemistry',
  },
  
];

export default function Teachers() {
  return (
    <section id="teachers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Teachers</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <article
              key={index}
              className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white shadow-md -mt-14 mb-4">
                  {teacher.image ? (
                    <img src={teacher.image} alt={`Photo of ${teacher.name}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-bold text-2xl">
                      {teacher.name.split(' ').filter(Boolean).map(n => n[0]).join('')}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-gray-900">{teacher.name}</h3>
                {teacher.role && <p className="text-sm text-gray-500 mt-1">{teacher.role}</p>}

                <a className="mt-2 text-blue-600 font-medium hover:underline" href="#">
                  {teacher.specialty}
                </a>

                {teacher.bio && (
                  <p className="text-sm text-gray-600 mt-4 px-2">{teacher.bio}</p>
                )}

                <div className="mt-5 flex gap-3">
                  <a
                    href="#"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm shadow-sm hover:bg-blue-700"
                  >
                    Contact
                  </a>
                  <a href="#" className="inline-block border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-50">
                    Profile
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

