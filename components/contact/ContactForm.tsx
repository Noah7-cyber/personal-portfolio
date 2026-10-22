'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/schemas';
import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail } from 'lucide-react';
import { contact } from '@/lib/constants';

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
    setStatusMessage('Sending your message…');
    setIsSuccess(null);
    setMailtoUrl(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.mailto) {
        setIsSuccess(null);
        setStatusMessage(result.message);
        setMailtoUrl(result.mailto);
      } else if (response.ok) {
        setIsSuccess(true);
        setStatusMessage(
          result.message || 'Message delivered successfully! Noah will respond shortly.',
        );
        reset();
      } else {
        setIsSuccess(false);
        setStatusMessage(
          result.message || 'Your message could not be sent. Please try again or email directly.',
        );
      }
    } catch {
      setIsSuccess(false);
      setStatusMessage(`Could not connect. Please try again or email ${contact.email} directly.`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="contact-form rounded-2xl border border-graphite/12 bg-white/80 p-4 sm:p-6 shadow-sm"
      aria-label="Contact Noah"
      aria-busy={isSubmitting}
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
            autoComplete="name"
            maxLength={80}
            required
            {...register('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name && (
            <span
              id="contact-name-error"
              className="form-error flex items-center gap-1 font-sans text-xs font-medium text-coral normal-case"
            >
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
            autoComplete="email"
            maxLength={120}
            required
            {...register('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email && (
            <span
              id="contact-email-error"
              className="form-error flex items-center gap-1 font-sans text-xs font-medium text-coral normal-case"
            >
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
          placeholder="A project, an opportunity, or just a hello"
          maxLength={120}
          required
          {...register('subject')}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
        />
        {errors.subject && (
          <span
            id="contact-subject-error"
            className="form-error flex items-center gap-1 font-sans text-xs font-medium text-coral normal-case"
          >
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
          placeholder="Tell me a little about what you have in mind…"
          required
          {...register('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-hint'}
        />
        <div className="flex justify-between font-sans text-xs font-normal text-slate normal-case">
          {errors.message ? (
            <span
              id="contact-message-error"
              className="form-error flex items-center gap-1 text-coral font-medium"
            >
              <AlertCircle size={13} /> {errors.message.message}
            </span>
          ) : (
            <span id="contact-message-hint">20–1,500 characters</span>
          )}
        </div>
      </label>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <Send size={15} />
              <span>Send Message</span>
            </>
          )}
        </button>

        <p className="form-note text-[11px] font-mono text-slate">
          Prefer email?{' '}
          <a className="underline" href={`mailto:${contact.email}`}>
            Write to me directly.
          </a>
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
          ) : mailtoUrl ? (
            <Mail size={17} className="text-electric shrink-0 mt-0.5" />
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
                Open your email app to send →
              </a>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
