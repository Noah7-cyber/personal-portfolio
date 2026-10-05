'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/schemas';
import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactInput) {
    setStatusMessage('Transmitting message securely...');
    setIsSuccess(null);
    setMailtoUrl(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setStatusMessage(result.message || 'Message delivered successfully! Noah will respond shortly.');
        if (result.mailto) {
          setMailtoUrl(result.mailto);
        }
        reset();
      } else {
        setIsSuccess(false);
        setStatusMessage(result.message || 'Transmission failed. Please try again or email directly.');
      }
    } catch {
      setIsSuccess(false);
      setStatusMessage('Network fault encountered. Please email noahibr2@gmail.com directly.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="panel rounded-2xl sm:rounded-3xl p-5 sm:p-8"
      noValidate
    >
      {/* Honeypot for spam bot mitigation */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        {...register('company')}
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-soft">
          <span>
            Your Name <span className="text-cyan">*</span>
          </span>
          <input
            className={`rounded-xl border bg-white/5 px-4 py-3 text-sm text-soft placeholder:text-steel/60 transition-colors focus:outline-none ${
              errors.name
                ? 'border-amber/80 focus:border-amber focus:ring-1 focus:ring-amber'
                : 'border-white/10 focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50'
            }`}
            placeholder="Ada Lovelace"
            {...register('name')}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <span className="flex items-center gap-1 text-xs text-amber">
              <AlertCircle size={13} /> {errors.name.message}
            </span>
          )}
        </label>

        <label className="grid gap-2 text-sm font-semibold text-soft">
          <span>
            Email Address <span className="text-cyan">*</span>
          </span>
          <input
            type="email"
            className={`rounded-xl border bg-white/5 px-4 py-3 text-sm text-soft placeholder:text-steel/60 transition-colors focus:outline-none ${
              errors.email
                ? 'border-amber/80 focus:border-amber focus:ring-1 focus:ring-amber'
                : 'border-white/10 focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50'
            }`}
            placeholder="ada@example.com"
            {...register('email')}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="flex items-center gap-1 text-xs text-amber">
              <AlertCircle size={13} /> {errors.email.message}
            </span>
          )}
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-soft">
        <span>
          Subject <span className="text-cyan">*</span>
        </span>
        <input
          className={`rounded-xl border bg-white/5 px-4 py-3 text-sm text-soft placeholder:text-steel/60 transition-colors focus:outline-none ${
            errors.subject
              ? 'border-amber/80 focus:border-amber focus:ring-1 focus:ring-amber'
              : 'border-white/10 focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50'
          }`}
          placeholder="Product Engineering / Job Opportunity / Project Collaboration"
          {...register('subject')}
          aria-invalid={!!errors.subject}
        />
        {errors.subject && (
          <span className="flex items-center gap-1 text-xs text-amber">
            <AlertCircle size={13} /> {errors.subject.message}
          </span>
        )}
      </label>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-soft">
        <span>
          Message <span className="text-cyan">*</span>
        </span>
        <textarea
          maxLength={1500}
          rows={5}
          className={`rounded-xl border bg-white/5 px-4 py-3 text-sm text-soft placeholder:text-steel/60 transition-colors focus:outline-none resize-y ${
            errors.message
              ? 'border-amber/80 focus:border-amber focus:ring-1 focus:ring-amber'
              : 'border-white/10 focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50'
          }`}
          placeholder="Share project parameters, opportunity requirements, or engineering inquiries..."
          {...register('message')}
          aria-invalid={!!errors.message}
        />
        <div className="flex justify-between text-xs text-steel">
          {errors.message ? (
            <span className="flex items-center gap-1 text-amber">
              <AlertCircle size={13} /> {errors.message.message}
            </span>
          ) : (
            <span>Maximum 1,500 characters</span>
          )}
        </div>
      </label>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Send Message</span>
            </>
          )}
        </button>

        <p className="text-xs text-steel">
          Encrypted over HTTPS · Honeypot anti-spam active
        </p>
      </div>

      {statusMessage && (
        <div
          role="status"
          className={`mt-4 rounded-xl p-3.5 text-sm flex items-start gap-2.5 ${
            isSuccess === true
              ? 'border border-emerald/30 bg-emerald/10 text-emerald'
              : isSuccess === false
              ? 'border border-amber/30 bg-amber/10 text-amber'
              : 'border border-cyan/30 bg-cyan/10 text-cyan'
          }`}
        >
          {isSuccess === true ? (
            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
          ) : isSuccess === false ? (
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
          ) : (
            <Loader2 size={18} className="shrink-0 mt-0.5 animate-spin" />
          )}
          <div className="space-y-1">
            <p>{statusMessage}</p>
            {mailtoUrl && (
              <a
                href={mailtoUrl}
                className="inline-block text-xs font-semibold underline hover:text-soft mt-1"
              >
                Open Default Mail Client Fallback →
              </a>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
