'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Teacher {
  name: string;
  specialty: string;
  image?: string;
  role?: string;
  bio?: string;
  phone?: string;
  email?: string;
}

const teachers: Teacher[] = [
  {
    name: 'MD. Sahin Alom',
    specialty: 'Chemistry-Teacher',
    role: 'Director',
    bio: 'Founder and Director with a passion for chemistry education and community outreach.',
    image: '/gallery/shahin-alom.jpg',
    phone: '+8801234567890',
    email: 'sahin.alom@chemistryworld.com',
  },
  {
    name: 'Mrs. Jane Doe',
    specialty: 'Administration',
    role: 'Manager',
    bio: 'Manages daily operations and admissions. Reach out for enrollment questions.',
    phone: '+8801234567891',
    email: 'jane.doe@chemistryworld.com',
  },
  {
    name: 'Prof. Sarah Johnson',
    specialty: 'Physical Chemistry',
    phone: '+8801234567892',
    email: 'sarah.johnson@chemistryworld.com',
  },
  {
    name: 'Prof. Sarah Johnson',
    specialty: 'Physical Chemistry',
    phone: '+8801234567893',
    email: 'sarah.johnson2@chemistryworld.com',
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Inorganic Chemistry',
    phone: '+8801234567894',
    email: 'michael.chen@chemistryworld.com',
  },
];

export default function Teachers() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleContact = (teacher: Teacher, e: React.MouseEvent) => {
    e.preventDefault();
    if (teacher.phone) {
      const link = document.createElement('a');
      link.href = `tel:${teacher.phone}`;
      link.click();
    } else if (teacher.email) {
      const link = document.createElement('a');
      link.href = `mailto:${teacher.email}`;
      link.click();
    }
  };

  const handleProfile = (teacher: Teacher, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedTeacher(teacher);
  };

  const closeProfile = () => {
    setSelectedTeacher(null);
  };
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
                    <Image 
                      src={teacher.image} 
                      alt={`Photo of ${teacher.name}`} 
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
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
                  <button
                    onClick={(e) => handleContact(teacher, e)}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm shadow-sm hover:bg-blue-700 transition"
                  >
                    Contact
                  </button>
                  <button 
                    onClick={(e) => handleProfile(teacher, e)}
                    className="inline-block border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    Profile
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center px-4 py-8">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={closeProfile}
            />
            <div
              className="relative max-w-2xl w-full rounded-3xl bg-white p-8 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedTeacher.name} profile`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeProfile}
                className="absolute top-4 right-4 rounded-full bg-slate-100 p-2.5 text-slate-600 hover:bg-red-100 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 z-10 transition-colors shadow-sm"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 ring-4 ring-blue-100 shadow-lg mb-6">
                  {selectedTeacher.image ? (
                    <Image 
                      src={selectedTeacher.image} 
                      alt={`Photo of ${selectedTeacher.name}`} 
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-bold text-3xl">
                      {selectedTeacher.name.split(' ').filter(Boolean).map(n => n[0]).join('')}
                    </div>
                  )}
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedTeacher.name}</h2>
                {selectedTeacher.role && (
                  <p className="text-lg text-gray-600 mb-1">{selectedTeacher.role}</p>
                )}
                <p className="text-blue-600 font-medium mb-6">{selectedTeacher.specialty}</p>

                {selectedTeacher.bio && (
                  <p className="text-base text-gray-700 mb-6 max-w-md">{selectedTeacher.bio}</p>
                )}

                <div className="w-full space-y-3 mt-4">
                  {selectedTeacher.phone && (
                    <a
                      href={`tel:${selectedTeacher.phone}`}
                      className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call: {selectedTeacher.phone}
                    </a>
                  )}
                  {selectedTeacher.email && (
                    <a
                      href={`mailto:${selectedTeacher.email}`}
                      className="flex items-center justify-center gap-3 w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-50 transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email: {selectedTeacher.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

