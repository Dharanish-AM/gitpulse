import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0F1C] text-white selection:bg-cyan-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(131,56,236,0.1),transparent_50%)]" />
        <div
          className="absolute inset-0 bg-grid-pattern opacity-10"
          style={{
            perspective: "1000px",
            transform: "rotateX(60deg) scale(2)",
          }}
        />
      </div>

      <div className="relative z-10 w-full mx-auto px-6 py-12 md:py-20">
        <div className="mb-8">
          <Link
            href="/"
            className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2 text-sm font-mono mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-sm font-mono">
            Last Updated: January 10, 2026
          </p>
        </div>

        <div className="space-y-12 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using GitPulse ("Service"), you agree to be bound
              by these Terms of Service. If you do not agree to these terms,
              please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-500 rounded-full" />
              2. Use of Service
            </h2>
            <div className="space-y-4">
              <p>
                GitPulse provides GitHub repository visualization and analytics.
                You agree to use the Service only for lawful purposes and in
                accordance with these Terms.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
                <li>
                  You must have a valid GitHub account to use the Service.
                </li>
                <li>
                  You are responsible for maintaining the security of your
                  account.
                </li>
                <li>
                  You agree not to misuse or attempt to compromise the Service.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full" />
              3. Intellectual Property
            </h2>
            <p>
              The Service and its original content, features, and functionality
              are owned by GitPulse and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-500 rounded-full" />
              4. Termination
            </h2>
            <p>
              We may terminate or suspend your access to our Service
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full" />
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall GitPulse, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-500 rounded-full" />
              6. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <a
              href="mailto:dharanish816@gmail.com"
              className="inline-block mt-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              dharanish816@gmail.com
            </a>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm font-mono">
          <p>© 2026 GitPulse. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
