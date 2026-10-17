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
        setStatusMessage(
          result.message || 'Message delivered successfully! Noah will respond shortly.'
        );
        if (result.mailto) {
          setMailtoUrl(result.mailto);
        }
        reset();
      } else {
        setIsSuccess(false);
        setStatusMessage(
          result.message || 'Transmission failed. Please try again or email directly.'
        );
      }
    } catch {
      setIsSuccess(false);
      setStatusMessage(
        'Network fault encountered. Please email noahibr2@gmail.com directly.'
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-graphite/12 bg-white/80 p-4 sm:p-6 shadow-sm"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-mono font-bold uppercase text-graphite">
          <span>
            Your Name <span className="text-electric">*</span>
          </span>
          <input
            className={`rounded-xl border bg-porcelain/70 px-3.5 py-2.5 font-sans text-sm font-normal text-graphite placeholder:text-slate/60 transition-colors focus:outline-none ${
              errors.name
                ? 'border-coral focus:border-coral'
                : 'border-graphite/15 focus:border-electric'
            }`}
            placeholder="Ada Lovelace"
            {...register('name')}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <span className="flex items-center gap-1 font-sans text-xs font-medium text-coral normal-case">
              <AlertCircle size={13} /> {errors.name.message}
            </span>
          )}
        </label>

        <label className="grid gap-1.5 text-xs font-mono font-bold uppercase text-graphite">
          <span>
            Email Address <span className="text-electric">*</span>
          </span>
          <input
            type="email"
            className={`rounded-xl border bg-porcelain/70 px-3.5 py-2.5 font-sans text-sm font-normal text-graphite placeholder:text-slate/60 transition-colors focus:outline-none ${
              errors.email
                ? 'border-coral focus:border-coral'
                : 'border-graphite/15 focus:border-electric'
            }`}
            placeholder="ada@example.com"
            {...register('email')}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="flex items-center gap-1 font-sans text-xs font-medium text-coral normal-case">
              <AlertCircle size={13} /> {errors.email.message}
            </span>
          )}
        </label>
      </div>

      <label className="mt-4 grid gap-1.5 text-xs font-mono font-bold uppercase text-graphite">
        <span>
          Subject <span className="text-electric">*</span>
        </span>
        <input
          className={`rounded-xl border bg-porcelain/70 px-3.5 py-2.5 font-sans text-sm font-normal text-graphite placeholder:text-slate/60 transition-colors focus:outline-none ${
            errors.subject
              ? 'border-coral focus:border-coral'
              : 'border-graphite/15 focus:border-electric'
          }`}
          placeholder="Senior Engineering Role / Product Architecture / Collaboration"
          {...register('subject')}
          aria-invalid={!!errors.subject}
        />
        {errors.subject && (
          <span className="flex items-center gap-1 font-sans text-xs font-medium text-coral normal-case">
            <AlertCircle size={13} /> {errors.subject.message}
          </span>
        )}
      </label>

      <label className="mt-4 grid gap-1.5 text-xs font-mono font-bold uppercase text-graphite">
        <span>
          Message <span className="text-electric">*</span>
        </span>
        <textarea
          maxLength={1500}
          rows={4}
          className={`rounded-xl border bg-porcelain/70 px-3.5 py-2.5 font-sans text-sm font-normal text-graphite placeholder:text-slate/60 transition-colors focus:outline-none resize-y ${
            errors.message
              ? 'border-coral focus:border-coral'
              : 'border-graphite/15 focus:border-electric'
          }`}
          placeholder="Share opportunity details, architectural requirements, or engineering inquiries..."
          {...register('message')}
          aria-invalid={!!errors.message}
        />
        <div className="flex justify-between font-sans text-xs font-normal text-slate normal-case">
          {errors.message ? (
            <span className="flex items-center gap-1 text-coral font-medium">
              <AlertCircle size={13} /> {errors.message.message}
            </span>
          ) : (
            <span>Maximum 1,500 characters</span>
          )}
        </div>
      </label>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <Send size={15} />
              <span>Send Message</span>
            </>
          )}
        </button>

        <p className="text-[11px] font-mono text-slate">
          HTTPS Encrypted · Anti-spam active
        </p>
      </div>

      {statusMessage && (
        <div
          role="status"
          className={`mt-4 rounded-xl p-3 text-xs sm:text-sm flex items-start gap-2.5 ${
            isSuccess === true
              ? 'border border-emerald/40 bg-emerald/10 text-graphite'
              : isSuccess === false
              ? 'border border-coral/40 bg-coral/10 text-graphite'
              : 'border border-electric/30 bg-electric/10 text-graphite'
          }`}
        >
          {isSuccess === true ? (
            <CheckCircle2 size={17} className="text-emerald shrink-0 mt-0.5" />
          ) : isSuccess === false ? (
            <AlertCircle size={17} className="text-coral shrink-0 mt-0.5" />
          ) : (
            <Loader2 size={17} className="text-electric shrink-0 mt-0.5 animate-spin" />
          )}
          <div className="space-y-1">
            <p>{statusMessage}</p>
            {mailtoUrl && (
              <a
                href={mailtoUrl}
                className="inline-block text-xs font-semibold text-electric underline mt-1"
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
