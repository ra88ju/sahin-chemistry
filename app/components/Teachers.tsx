interface Teacher {
  name: string;
  specialty: string;
  image?: string;
}

const teachers: Teacher[] = [
  {
    name: 'Dr. Ahmed Sahin',
    specialty: 'Organic Chemistry',
  },
  {
    name: 'Prof. Sarah Johnson',
    specialty: 'Physical Chemistry',
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Inorganic Chemistry',
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialty: 'Biochemistry',
  },
  {
    name: 'Prof. David Wilson',
    specialty: 'Analytical Chemistry',
  },
  {
    name: 'Dr. Lisa Anderson',
    specialty: 'Lab Techniques',
  },
];

export default function Teachers() {
  return (
    <section id="teachers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Teachers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-bold">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{teacher.name}</h3>
              <p className="text-blue-600 font-medium">{teacher.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

