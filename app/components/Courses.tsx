 'use client';

import { useState } from 'react';

interface YouTubeVideo {
  url: string;
  title: string;
  isPublic: boolean;
}

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
  youtubeVideos?: YouTubeVideo[];
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
    youtubeVideos: [
      {
        url: 'https://www.youtube.com/watch?v=Bq82f821ZaQ',
        title: 'Introduction to Organic Chemistry',
        isPublic: true,
      },
      {
        url: 'https://www.youtube.com/watch?v=Bq82f821ZaQ',
        title: 'Advanced Reaction Mechanisms',
        isPublic: false,
      },
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
    youtubeVideos: [
      {
        url: 'https://www.youtube.com/watch?v=Bq82f821ZaQ',
        title: 'Coordination Chemistry Basics',
        isPublic: true,
      },
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
    youtubeVideos: [
      {
        url: 'https://www.youtube.com/watch?v=Bq82f821ZaQ',
        title: 'Thermodynamics Fundamentals',
        isPublic: true,
      },
      {
        url: 'https://www.youtube.com/watch?v=Bq82f821ZaQ',
        title: 'Quantum Chemistry Deep Dive',
        isPublic: false,
      },
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

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper function to get embed URL
const getYouTubeEmbedUrl = (url: string): string => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
};

const getVideoKey = (courseName: string, videoUrl: string, videoIndex: number) =>
  `${courseName}-${videoIndex}-${videoUrl}`;

export default function Courses() {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [showPrivateVideos, setShowPrivateVideos] = useState(false);
  const [unlockedVideos, setUnlockedVideos] = useState<Record<string, boolean>>({});
  const [videoAccessForm, setVideoAccessForm] = useState<
    Record<string, { phone: string; password: string; error?: string }>
  >({});

  const resetVideoAccessState = () => {
    setUnlockedVideos({});
    setVideoAccessForm({});
  };

  const handleViewCurriculum = (course: Course) => {
    setActiveCourse(course);
    setShowPrivateVideos(false);
    resetVideoAccessState();
  };

  const closeCurriculum = () => {
    setActiveCourse(null);
    setShowPrivateVideos(false);
    resetVideoAccessState();
  };

  const toggleVideoVisibility = (course: Course, videoIndex: number) => {
    if (!course.youtubeVideos) return;
    const updatedVideos = [...course.youtubeVideos];
    updatedVideos[videoIndex].isPublic = !updatedVideos[videoIndex].isPublic;
    setActiveCourse({ ...course, youtubeVideos: updatedVideos });

    const videoKey = getVideoKey(course.name, updatedVideos[videoIndex].url, videoIndex);

    if (!updatedVideos[videoIndex].isPublic) {
      setUnlockedVideos((prev) => {
        const next = { ...prev };
        delete next[videoKey];
        return next;
      });
    }
  };

  const handleVideoAccessInputChange = (
    videoKey: string,
    field: 'phone' | 'password',
    value: string
  ) => {
    setVideoAccessForm((prev) => {
      const current = prev[videoKey] ?? { phone: '', password: '' };
      return {
        ...prev,
        [videoKey]: {
          ...current,
          [field]: value,
          error: undefined,
        },
      };
    });
  };

  const handleUnlockVideo = (videoKey: string) => {
    const formState = videoAccessForm[videoKey] ?? { phone: '', password: '' };
    const cleanedPhone = formState.phone.replace(/\D/g, '');

    if (cleanedPhone.length < 10 || formState.password.trim().length < 4) {
      setVideoAccessForm((prev) => ({
        ...prev,
        [videoKey]: {
          phone: formState.phone,
          password: formState.password,
          error: 'Enter a valid phone (10 digits) and password (min 4 chars).',
        },
      }));
      return;
    }

    setUnlockedVideos((prev) => ({
      ...prev,
      [videoKey]: true,
    }));

    setVideoAccessForm((prev) => ({
      ...prev,
      [videoKey]: {
        phone: formState.phone,
        password: formState.password,
      },
    }));
  };

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
              className={`group relative rounded-2xl border bg-white p-8 shadow-sm transition hover:shadow-md hover:-translate-y-1 ${levelThemes[course.theme].border}`}
            >
              {/* subtle themed glow on hover */}
              <div className={`absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500 ${levelThemes[course.theme].gradient}`} />

              <div className="flex items-start justify-between">
                <div className="max-w-[60%]">
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900">{course.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{course.description}</p>
                </div>

                <div className="flex-shrink-0 text-right">
                  <span className={`inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${levelThemes[course.theme].pill}`}>{course.level}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 text-sm text-slate-700 flex flex-wrap items-center gap-3">
                <span>Start: <span className="font-semibold text-slate-900">{course.startSession}</span></span>
                <span className="text-slate-300">•</span>
                <span>{course.sessionsPerWeek}</span>
                <span className="text-slate-300">•</span>
                <span>{course.duration}</span>
              </div>

              <ul className="mt-4 grid gap-2 text-sm text-slate-800">
                {course.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex} className="flex items-start gap-3">
                    <span className={`mt-1 w-2 h-2 rounded-full ${levelThemes[course.theme].dot}`} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {course.youtubeVideos && course.youtubeVideos.length > 0 && (
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="font-medium">
                    {course.youtubeVideos.filter(v => v.isPublic).length} public video{course.youtubeVideos.filter(v => v.isPublic).length !== 1 ? 's' : ''}
                    {course.youtubeVideos.filter(v => !v.isPublic).length > 0 && (
                      <span className="text-slate-400"> • {course.youtubeVideos.filter(v => !v.isPublic).length} private</span>
                    )}
                  </span>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <a href="#" className="text-sm text-slate-500 hover:text-slate-700">{course.enrollmentStatus === 'Filling Fast' ? <><span className={`${levelThemes[course.theme].text} font-semibold`}>{course.enrollmentStatus}</span></> : course.enrollmentStatus}</a>

                <button
                  type="button"
                  onClick={() => handleViewCurriculum(course)}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-blue-50 hover:border-blue-200 transition"
                >
                  View Curriculum
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {activeCourse && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center px-4 py-8">
              <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={closeCurriculum}
              />
              <div
                className="relative max-w-3xl w-full rounded-3xl bg-white p-8 shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-label={`${activeCourse.name} curriculum`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeCurriculum}
                  className="absolute top-4 right-4 rounded-full bg-slate-100 p-2.5 text-slate-600 hover:bg-red-100 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 z-10 transition-colors shadow-sm"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
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

                {activeCourse.youtubeVideos && activeCourse.youtubeVideos.length > 0 && (
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <h4 className="text-xl font-bold text-slate-900">Course Videos</h4>
                      </div>
                      {activeCourse.youtubeVideos.some(v => !v.isPublic) && (
                        <button
                          type="button"
                          onClick={() => setShowPrivateVideos(!showPrivateVideos)}
                          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
                        >
                          {showPrivateVideos ? 'Hide' : 'Show'} Private Videos
                        </button>
                      )}
                    </div>
                    <div className="grid gap-4">
                      {activeCourse.youtubeVideos
                        .filter((video) => video.isPublic || showPrivateVideos)
                        .map((video, videoIndex) => {
                          const embedUrl = getYouTubeEmbedUrl(video.url);
                          if (!embedUrl) return null;

                          const videoKey = getVideoKey(activeCourse.name, video.url, videoIndex);
                          const isUnlocked = video.isPublic || unlockedVideos[videoKey];
                          const formState = videoAccessForm[videoKey] ?? { phone: '', password: '' };

                          return (
                            <div key={videoIndex} className="relative">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-base font-semibold text-slate-900">{video.title}</h5>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                                      video.isPublic ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                    }`}
                                  >
                                    {video.isPublic ? 'Public' : 'Private'}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => toggleVideoVisibility(activeCourse, videoIndex)}
                                    className="text-xs text-slate-600 hover:text-slate-900 transition"
                                    title={video.isPublic ? 'Make private' : 'Make public'}
                                  >
                                    {video.isPublic ? (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                      </svg>
                                    )}
                                  </button>
                                </div>
                              </div>
                              {isUnlocked ? (
                                <div className="relative w-full rounded-lg overflow-hidden bg-slate-900" style={{ paddingBottom: '56.25%' }}>
                                  <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={embedUrl}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              ) : (
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                  <p className="text-sm font-medium text-slate-700 mb-3">
                                    This video is private. Enter your phone number and password to unlock.
                                  </p>
                                  <div className="space-y-3">
                                    <input
                                      type="tel"
                                      inputMode="tel"
                                      placeholder="Phone number"
                                      value={formState.phone}
                                      onChange={(event) =>
                                        handleVideoAccessInputChange(videoKey, 'phone', event.target.value)
                                      }
                                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                    <input
                                      type="password"
                                      placeholder="Password"
                                      value={formState.password}
                                      onChange={(event) =>
                                        handleVideoAccessInputChange(videoKey, 'password', event.target.value)
                                      }
                                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                    {formState.error && (
                                      <p className="text-sm text-red-600">{formState.error}</p>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => handleUnlockVideo(videoKey)}
                                      className="w-full rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                                    >
                                      Unlock Video
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6">
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
          </div>
        )}
      </div>
    </section>
  );
}

