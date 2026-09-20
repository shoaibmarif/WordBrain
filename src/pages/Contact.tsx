import React, { useState } from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { APP_NAME } from '../utils/constants';
import { ArrowLeft, Mail, Send, CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const navigateToHome = () => {
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-8">
      <SeoHead
        title={`Contact & Feedback - ${APP_NAME}`}
        description="Have suggestions, questions, or dictionary word requests? Get in touch with the LexiQuest team."
        canonicalPath="/contact"
      />

      <button
        onClick={navigateToHome}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Game
      </button>

      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <Mail className="w-8 h-8 text-emerald-600" />
          Contact & Feedback
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Have ideas, dictionary additions, or bug reports? We'd love to hear from you!
        </p>
      </div>

      {submitted ? (
        <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3">
          <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Thank you for your message!</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            We review feedback regularly to improve the game, expand curated word pools, and refine gameplay.
          </p>
          <button
            onClick={navigateToHome}
            className="mt-4 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow transition-colors cursor-pointer"
          >
            Back to Game
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Alex Smith"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Message or Word Suggestion
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us what you think or suggest words to add to our dictionary..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Send Feedback
          </button>
        </form>
      )}
    </div>
  );
};
