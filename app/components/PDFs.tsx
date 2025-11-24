"use client";
import { useState } from "react";

type PdfItem = {
  id: number;
  title: string;
  file: string;
  description?: string;
  category?: "Class PDF" | "Notes";
  size?: string;
};

const initialPdfs: PdfItem[] = [
  { id: 1, title: "Class 1 - Introduction to Chemistry", file: "/pdfs/class1.pdf", description: "Lecture slides for Class 1", category: "Class PDF", size: "1.2 MB" },
  { id: 2, title: "Class Notes - Class 1", file: "/pdfs/notes1.pdf", description: "Printable class notes for Class 1", category: "Notes", size: "240 KB" },
];

function PdfIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="24" height="24" rx="4" fill="#E53E3E" />
      <path d="M8 7h4l2 2v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" fill="#fff" opacity="0.9" />
      <path d="M14 7v2h2" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PDFs() {
  const [tab, setTab] = useState<"all" | "class" | "notes">("all");

  const filtered = initialPdfs.filter((p) =>
    tab === "all" ? true : tab === "class" ? p.category === "Class PDF" : p.category === "Notes"
  );

  return (
    <section id="pdfs" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900">Class PDFs & Notes</h2>
          <p className="mt-2 text-gray-600">Easily view or download lecture PDFs and printable notes.</p>
        </div>

        <div className="flex justify-center mb-8 gap-3">
          <button
            onClick={() => setTab("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${tab === "all" ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-700 border"}`}
          >
            All
          </button>
          <button
            onClick={() => setTab("class")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${tab === "class" ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-700 border"}`}
          >
            Class PDFs
          </button>
          <button
            onClick={() => setTab("notes")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${tab === "notes" ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-700 border"}`}
          >
            Class Notes
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.id} className="relative overflow-hidden rounded-2xl shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl bg-white">
              <div className="p-5 flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-lg bg-gradient-to-br from-red-500 to-pink-500 p-2">
                    <PdfIcon />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                  {p.description && <p className="text-sm text-gray-500 mt-1">{p.description}</p>}

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <a
                        href={p.file}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-3 py-2 rounded-md text-sm hover:bg-gray-50"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5v14" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M5 12h14" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>View</span>
                      </a>

                      <a href={p.file} download className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 3v12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 11l4 4 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Download</span>
                      </a>
                    </div>

                    <div className="text-xs text-gray-400">{p.size || "—"}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">To add more PDFs, place files into <code className="bg-gray-100 px-1 rounded">public/pdfs/</code> and update this component or ask me to auto-detect files.</p>
      </div>
    </section>
  );
}
