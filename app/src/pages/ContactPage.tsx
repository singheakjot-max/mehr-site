import { site } from '@/content/site';
import { Mail, MapPin, Clock } from 'lucide-react';
import Footer from '@/components/global/Footer';

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-main">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="font-body inline-block mb-4"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Contact
            </span>
            <h1 className="font-display mb-4" style={{ color: 'var(--color-text)' }}>
              We&apos;re here to help
            </h1>
            <p className="font-body" style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Have a question about a product, your order, or a subscription?
              Reach out — a real human will respond, usually within a few hours.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Mail size={20} />,
                label: 'Email',
                value: site.promises.contactEmail,
                href: `mailto:${site.promises.contactEmail}`,
              },
              {
                icon: <MapPin size={20} />,
                label: 'Location',
                value: site.promises.location,
                href: undefined,
              },
              {
                icon: <Clock size={20} />,
                label: 'Response Time',
                value: 'Usually within 4 hours',
                href: undefined,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-xl text-center"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: 'var(--color-border-subtle)', color: 'var(--color-text)' }}
                >
                  {item.icon}
                </div>
                <p className="font-body" style={{ fontSize: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-body font-medium focus-ring transition-opacity hover:opacity-70"
                    style={{ fontSize: '14px', color: 'var(--color-text)' }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-body font-medium" style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2 className="font-display mb-6" style={{ fontSize: '20px', color: 'var(--color-text)' }}>
              Send us a message
            </h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-body block mb-1.5" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-md border font-body focus-ring outline-none"
                    style={{
                      fontSize: '14px',
                      backgroundColor: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-body block mb-1.5" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-md border font-body focus-ring outline-none"
                    style={{
                      fontSize: '14px',
                      backgroundColor: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="font-body block mb-1.5" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  Subject
                </label>
                <select
                  className="w-full px-4 py-3 rounded-md border font-body focus-ring outline-none cursor-pointer"
                  style={{
                    fontSize: '14px',
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                >
                  <option>Product Question</option>
                  <option>Order Status</option>
                  <option>Subscription Help</option>
                  <option>Return Request</option>
                  <option>Wholesale Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="font-body block mb-1.5" style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border font-body focus-ring outline-none resize-none"
                  style={{
                    fontSize: '14px',
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                  placeholder="How can we help you?"
                />
              </div>
              <button type="submit" className="btn-primary w-full py-3.5">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
