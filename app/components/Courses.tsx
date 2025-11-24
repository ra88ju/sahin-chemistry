 'use client';

import { useState } from 'react';

interface Course {
  name: string;
  duration: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  startSession: string;
  sessionsPerWeek: string;
  highlights: string[];
  enrollmentStatus: 'Open' | 'Waitlist' | 'Filling Fast';
  curriculumUrl: string;
  theme: 'blue' | 'indigo' | 'cyan';
  details: string[];
}

const courses: Course[] = [
  {
    name: 'Organic Chemistry',
    duration: '6 Months',
    description: 'Comprehensive study of carbon compounds, reactions, and mechanisms.',
    level: 'Advanced',
    startSession: 'Spring 2025',
    sessionsPerWeek: '3 Sessions / week',
    highlights: ['Aromatic & aliphatic mastery', 'Problem-solving workshops'],
    enrollmentStatus: 'Filling Fast',
    curriculumUrl: '#admission',
    theme: 'blue',
    details: [
      'Run-throughs of aromatic & aliphatic reaction mechanisms.',
      'Guided problem-solving clinics centered on synthesis.',
      'Weekly peer-led spectroscopic data workshops.',
    ],
  },
  {
    name: 'Inorganic Chemistry',
    duration: '6 Months',
    description: 'Explore the properties and behavior of inorganic compounds.',
    level: 'Intermediate',
    startSession: 'Spring 2025',
    sessionsPerWeek: '3 Sessions / week',
    highlights: ['Coordination chemistry studio', 'Crystal field simulations'],
    enrollmentStatus: 'Open',
    curriculumUrl: '#admission',
    theme: 'indigo',
    details: [
      'Simulation-led crystal field and bonding studies.',
      'Hands-on coordination chemistry modeling in lab suites.',
      'Progressive assessments tied to inorganic structure ideas.',
    ],
  },
  {
    name: 'Physical Chemistry',
    duration: '6 Months',
    description: 'Study of physical properties and principles governing chemical systems.',
    level: 'Advanced',
    startSession: 'Summer 2025',
    sessionsPerWeek: '2 Sessions / week',
    highlights: ['Thermodynamics clinics', 'Quantum lab demonstrations'],
    enrollmentStatus: 'Open',
    curriculumUrl: '#contact',
    theme: 'cyan',
    details: [
      'Thermodynamics clinics with real-time data analysis.',
      'Quantum-focused lab sessions with high-res visualizers.',
      'Project work mapping physical principles to reactions.',
    ],
  },
  {
    name: 'Analytical Chemistry',
    duration: '4 Months',
    description: 'Learn techniques for analyzing chemical composition and structure.',
    level: 'Intermediate',
    startSession: 'Summer 2025',
    sessionsPerWeek: '3 Sessions / week',
    highlights: ['Chromatography bootcamp', 'Instrument calibration practice'],
    enrollmentStatus: 'Waitlist',
    curriculumUrl: '#contact',
    theme: 'blue',
    details: [
      'Chromatography bootcamps with troubleshooting scenarios.',
      'Instrument calibration labs paced for mastery.',
      'Analytical case studies connecting theory to real samples.',
    ],
  },
  {
    name: 'Biochemistry',
    duration: '5 Months',
    description: 'Understand chemical processes within living organisms.',
    level: 'Beginner',
    startSession: 'Autumn 2025',
    sessionsPerWeek: '2 Sessions / week',
    highlights: ['Protein folding studios', 'Metabolic pathway mapping'],
    enrollmentStatus: 'Open',
    curriculumUrl: '#admission',
    theme: 'indigo',
    details: [
      'Protein folding studios exploring thermodynamic stability.',
      'Metabolic pathway mapping with animated visual aids.',
      'Lab journals focused on living systems chemistry.',
    ],
  },
  {
    name: 'Advanced Lab Techniques',
    duration: '3 Months',
    description: 'Hands-on training with modern laboratory equipment and methods.',
    level: 'Advanced',
    startSession: 'Autumn 2025',
    sessionsPerWeek: '4 Sessions / week',
    highlights: ['Industry-grade equipment access', 'Safety certification included'],
    enrollmentStatus: 'Filling Fast',
    curriculumUrl: '#admission',
    theme: 'cyan',
    details: [
      'Blueprints for setting up advanced lab workflows safely.',
      'Equipment deep dives with manufacturer-style run-throughs.',
      'Evaluation rubrics covering troubleshooting and analysis.',
    ],
  },
];

const levelThemes: Record<
  Course['theme'],
  {
    pill: string;
    gradient: string;
    text: string;
    dot: string;
    border: string;
  }
> = {
  blue: {
    pill: 'bg-blue-50 text-blue-700',
    gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
    text: 'text-blue-600',
    dot: 'bg-blue-500',
    border: 'border-blue-100',
  },
  indigo: {
    pill: 'bg-indigo-50 text-indigo-700',
    gradient: 'from-indigo-500/10 via-indigo-500/5 to-transparent',
    text: 'text-indigo-600',
    dot: 'bg-indigo-500',
    border: 'border-indigo-100',
  },
  cyan: {
    pill: 'bg-cyan-50 text-cyan-700',
    gradient: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
    text: 'text-cyan-600',
    dot: 'bg-cyan-500',
    border: 'border-cyan-100',
  },
};

export default function Courses() {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  const handleViewCurriculum = (course: Course) => {
    setActiveCourse(course);
  };

  const closeCurriculum = () => setActiveCourse(null);

  return (
    <section
      id="courses"
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Courses</h2>
          <p className="text-blue-500 text-lg mt-3 max-w-2xl mx-auto text-base">
            Select from curated modules designed to balance theory, lab experience, and problem-solving clinics.
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course, index) => (
            <div
              key={`${course.name}-${index}`}
              className={`group relative rounded-3xl border bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:shadow-[0_25px_70px_rgba(15,23,42,0.12)] ${levelThemes[course.theme].border}`}
            >
              <div
                className={`absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br ${levelThemes[course.theme].gradient}`}
              />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-3xl font-semibold text-slate-900">{course.name}</h3>
                  <p className="text-base text-slate-900 mt-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${levelThemes[course.theme].pill}`}>
                  {course.level}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-900">
                <span>
                  Start:{' '}
                  <span className="font-semibold text-slate-900">{course.startSession}</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-900">{course.sessionsPerWeek}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-900">{course.duration}</span>
              </div>

              <ul className="mt-5 space-y-2 text-base text-slate-900 border-t border-slate-100 pt-4">
                {course.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${levelThemes[course.theme].dot}`} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${levelThemes[course.theme].dot}`} />
                  <span className={levelThemes[course.theme].text}>{course.enrollmentStatus}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleViewCurriculum(course)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 bg-white hover:border-blue-300 hover:text-blue-700 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  View Curriculum
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </button>
              </div>
            </div>
          ))}
        </div>
        {activeCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={closeCurriculum}
            />
            <div
              className="relative max-w-3xl w-full rounded-3xl bg-white p-8 shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label={`${activeCourse.name} curriculum`}
            >
              <button
                type="button"
                onClick={closeCurriculum}
                className="absolute top-4 right-4 rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                <span className="sr-only">Close</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.5em] text-slate-500">Curriculum Focus</p>
                <h3 className="text-4xl font-bold text-slate-900">{activeCourse.name}</h3>
                <p className="text-lg text-slate-900 leading-relaxed">{activeCourse.description}</p>
                <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {activeCourse.startSession} · {activeCourse.duration}
                  </span>
                  <span>
                    {activeCourse.sessionsPerWeek} · {activeCourse.enrollmentStatus}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-base text-slate-700">
                  {activeCourse.highlights.map((highlight, highlightIndex) => (
                    <div key={`highlight-${highlightIndex}`} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 font-medium text-slate-900">
                      {highlight}
                    </div>
                  ))}
                </div>
                <ul className="mt-4 space-y-3 text-lg leading-relaxed text-slate-800">
                  {activeCourse.details.map((detail, detailIndex) => (
                    <li key={`detail-${detailIndex}`} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeCurriculum}
                    className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-blue-600 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

