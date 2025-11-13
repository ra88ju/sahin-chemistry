interface Course {
  name: string;
  duration: string;
  description: string;
}

const courses: Course[] = [
  {
    name: 'Organic Chemistry',
    duration: '6 Months',
    description: 'Comprehensive study of carbon compounds, reactions, and mechanisms.',
  },
  {
    name: 'Inorganic Chemistry',
    duration: '6 Months',
    description: 'Explore the properties and behavior of inorganic compounds.',
  },
  {
    name: 'Physical Chemistry',
    duration: '6 Months',
    description: 'Study of physical properties and principles governing chemical systems.',
  },
  {
    name: 'Analytical Chemistry',
    duration: '4 Months',
    description: 'Learn techniques for analyzing chemical composition and structure.',
  },
  {
    name: 'Biochemistry',
    duration: '5 Months',
    description: 'Understand chemical processes within living organisms.',
  },
  {
    name: 'Advanced Lab Techniques',
    duration: '3 Months',
    description: 'Hands-on training with modern laboratory equipment and methods.',
  },
];

export default function Courses() {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-blue-100"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-700">{course.name}</h3>
              <p className="text-sm text-gray-800 mb-3">
                <span className="font-medium">Duration:</span> {course.duration}
              </p>
              <p className="text-gray-700">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

