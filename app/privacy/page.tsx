import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0F1C] text-white selection:bg-cyan-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.1),transparent_50%)]" />
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
            className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-2 text-sm font-mono mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm font-mono">
            Last Updated: January 10, 2026
          </p>
        </div>

        <div className="space-y-12 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-500 rounded-full" />
              1. Introduction
            </h2>
            <p>
              Welcome to GitPulse ("we," "our," or "us"). We respect your
              privacy and are committed to protecting the personal information
              you share with us. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our
              website and use our developer tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full" />
              2. Information We Collect
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-bold mb-2">GitHub Data</h3>
                <p>
                  When you sign in with GitHub, we collect your basic public
                  profile information (username, avatar, email) and read-only
                  access to your repositories to provide the visualization
                  statistics. We do not modify your code.
                </p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
                <h3 className="text-purple-400 font-bold mb-2">Usage Data</h3>
                <p>
                  We may collect anonymous usage statistics to improve our
                  service performance and user experience.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-500 rounded-full" />
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
              <li>To provide and maintain our Service.</li>
              <li>To authenticate you via GitHub.</li>
              <li>
                To generate visualization metrics and insights for your
                repositories.
              </li>
              <li>To improve and optimize our application.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full" />
              4. Data Security
            </h2>
            <p>
              We prioritize the security of your data. We use industry-standard
              encryption and security measures to protect your information. Your
              GitHub tokens are securely stored and encrypted. We never share
              your private code or data with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-500 rounded-full" />
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <a
              href="mailto:dharanish816@gmail.com"
              className="inline-block mt-2 text-cyan-400 hover:text-cyan-300 transition-colors"
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
