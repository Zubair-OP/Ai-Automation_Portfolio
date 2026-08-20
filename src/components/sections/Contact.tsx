'use client'

import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { SectionHead } from '@/components/ui/SectionHead'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ArrowUpRight, Check, GithubIcon, LinkedinIcon, MailIcon, UpworkIcon, WhatsAppIcon } from '@/components/ui/icons'
import { PERSON } from '@/lib/site'
import { EASE } from '@/lib/motion'

function ContactLink({ icon, label, value, href, external }: { icon: ReactNode; label: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center justify-between border-b border-white/[0.07] py-4 transition-colors duration-500 hover:border-accent-mint/40"
    >
      <div className="flex items-center gap-4">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-ink-soft transition-colors duration-500 group-hover:border-accent-mint/40 group-hover:text-accent-mint">
          {icon}
        </span>
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-mega text-ink-faint">{label}</div>
          <div className="mt-0.5 text-[14px] font-medium text-ink">{value}</div>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-rotate-45 group-hover:text-accent-mint" />
    </a>
  )
}

function Field({
  label, placeholder, type = 'text', textarea = false, value, onChange, required,
}: {
  label: string
  placeholder: string
  type?: string
  textarea?: boolean
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const base =
    'w-full bg-transparent border-b border-white/[0.12] px-1 py-3 text-ink placeholder:text-ink-faint/60 focus:outline-none focus:border-accent-mint transition-colors duration-500'
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[9.5px] uppercase tracking-mega text-ink-faint">
        {label}
        {required && <span className="ml-1 text-accent-mint">*</span>}
      </span>
      {textarea ? (
        <textarea rows={4} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} required={required} className={base + ' resize-none'} />
      ) : (
        <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} required={required} className={base} />
      )}
    </label>
  )
}

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = [
      'Hi Zubair! You have a new portfolio inquiry.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n')
    const url = `https://wa.me/${PERSON.whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSent(true)
    setTimeout(() => {
      setName('')
      setEmail('')
      setMessage('')
      setSent(false)
    }, 4000)
  }

  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-white/[0.06] py-24 lg:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left — editorial CTA + channels */}
          <div className="lg:col-span-6">
            <SectionHead
              index="06"
              name="Contact"
              title={
                <>
                  Have a workflow worth automating?
                  <br />
                  <span className="text-glow">Let&apos;s build it.</span>
                </>
              }
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="mt-8 max-w-md text-[15px] leading-[1.85] text-ink-mute"
            >
              Product to ship, AI feature to wire up, or a business process that needs to stop
              eating hours? Send a note — I reply within a day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="mt-12"
            >
              <ContactLink icon={<MailIcon className="h-4 w-4" />} label="Email" value={PERSON.email} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSON.email}`} external />
              <ContactLink icon={<LinkedinIcon className="h-4 w-4" />} label="LinkedIn" value={PERSON.linkedinHandle} href={PERSON.linkedin} external />
              <ContactLink icon={<GithubIcon className="h-4 w-4" />} label="GitHub" value={PERSON.githubHandle} href={PERSON.github} external />
              <ContactLink icon={<UpworkIcon className="h-4 w-4" />} label="Upwork" value={PERSON.upworkHandle} href="#" />
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="bezel self-start lg:col-span-6"
          >
            <div className="bezel-core p-6 sm:p-9">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                  new-message.txt
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-mega text-accent-mint">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent-mint" />
                  open inbox
                </span>
              </div>

              <div className="space-y-5">
                <Field label="Name" placeholder="Your name" value={name} onChange={setName} required />
                <Field label="Email" placeholder="you@domain.com" value={email} onChange={setEmail} type="email" required />
                <Field label="Message" placeholder="What are you building or automating?" value={message} onChange={setMessage} textarea required />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  {sent ? (
                    <span className="flex items-center gap-1.5 text-accent-mint">
                      <Check className="h-3.5 w-3.5" /> WhatsApp opened
                    </span>
                  ) : (
                    'avg. reply < 24h'
                  )}
                </div>

                <MagneticButton>
                  <button
                    type="submit"
                    disabled={sent}
                    className="btn-pill group bg-ink px-2 py-2 pl-6 text-graphite-950 hover:bg-accent-mint disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>{sent ? 'Sent!' : 'Send on WhatsApp'}</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-graphite-950/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-[1px] group-hover:translate-x-1">
                      {sent ? <Check className="h-4 w-4" /> : <WhatsAppIcon className="h-4 w-4" />}
                    </span>
                  </button>
                </MagneticButton>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}