import React, { useState } from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  source: string;
  salary: string;
  postedAt: string;
  status: 'New' | 'Saved' | 'Applied';
}

const mockStats = [
  { label: 'Total Jobs Scraped', value: '1,428', change: '+12.5%', isUp: true },
  { label: 'Active Scrapers', value: '6 / 8', change: '2 idle', isUp: true },
  { label: 'Pending Applications', value: '24', change: '+4 today', isUp: true },
  { label: 'Failed Scraping Tasks', value: '1', change: '-2 from yesterday', isUp: false },
];

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer (React/TypeScript)',
    company: 'TechCorp Labs',
    location: 'Remote (US/EU)',
    source: 'LinkedIn',
    salary: '$130,000 - $160,000',
    postedAt: '12m ago',
    status: 'New',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'FinScale Solutions',
    location: 'New York, NY',
    source: 'Indeed',
    salary: '$110,000 - $135,000',
    postedAt: '1h ago',
    status: 'Saved',
  },
  {
    id: '3',
    title: 'Software Engineer II (Python / Node.js)',
    company: 'DataFlow Systems',
    location: 'Remote',
    source: 'Glassdoor',
    salary: '$120,000 - $140,000',
    postedAt: '3h ago',
    status: 'Applied',
  },
  {
    id: '4',
    title: 'React Native Mobile Developer',
    company: 'MobileApp Hub',
    location: 'San Francisco, CA',
    source: 'LinkedIn',
    salary: '$140,000 - $170,000',
    postedAt: '5h ago',
    status: 'New',
  },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState('All');

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = filterSource === 'All' || job.source === filterSource;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-sm">
              JS
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-tight">JobScraper Pro</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
              + Run Scraper
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor active crawler pipelines and latest scraped postings.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mockStats.map((stat, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:shadow-sm">
              <span className="text-sm font-medium text-slate-500">{stat.label}</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900">{stat.value}</span>
                <span className={`text-xs font-semibold ${stat.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filter / Search Bar */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search title, tech stack, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Filter:</span>
            {['All', 'LinkedIn', 'Indeed', 'Glassdoor'].map((source) => (
              <button
                key={source}
                onClick={() => setFilterSource(source)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  filterSource === source
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Scraped Jobs Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-800">Latest Collected Opportunities</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">Job Title & Company</th>
                  <th scope="col" className="px-6 py-3 font-medium">Location</th>
                  <th scope="col" className="px-6 py-3 font-medium">Salary</th>
                  <th scope="col" className="px-6 py-3 font-medium">Platform</th>
                  <th scope="col" className="px-6 py-3 font-medium">Discovered</th>
                  <th scope="col" className="px-6 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="transition-colors hover:bg-slate-50/80">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{job.title}</div>
                        <div className="text-xs text-slate-500">{job.company}</div>
                      </td>
                      <td className="px-6 py-4">{job.location}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-800">{job.salary}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          {job.source}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">{job.postedAt}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition">
                          View details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-sm text-slate-400">
                      No jobs found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}