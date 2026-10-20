import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Caravyn iOS App & Web',
  description:
    'Terms of Service and End User License Agreement (EULA) for the Caravyn mobile application on iOS and the Caravyn web platform.',
};

export default function TermsOfServicePage() {
  const lastUpdated = 'October 20, 2026';

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F1E5] dark:bg-[#090606] text-gray-900 dark:text-[#ededed] transition-colors">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-zinc-800/80 bg-[#F9F1E5]/90 dark:bg-[#090606]/90 backdrop-blur-md transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              style={{ backgroundColor: '#4B2492' }}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-purple-900/20 group-hover:scale-105 transition-transform"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white leading-none">
                Caravyn
              </span>
              <span className="text-[10px] font-semibold text-[#4B2492] dark:text-purple-400 tracking-wider uppercase">
                Terms of Service
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Title & Introduction */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#4B2492]/10 text-[#4B2492] dark:bg-[#4B2492]/25 dark:text-purple-300 border border-[#4B2492]/20 mb-4">
            <span>📱 iOS App Store (EULA) • Web Platform</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">
            End User License Agreement (&ldquo;EULA&rdquo;) and Terms of Use for the <strong>Caravyn iOS Application</strong> and <strong>Caravyn Services</strong>.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last Updated: <strong className="text-gray-700 dark:text-gray-300">{lastUpdated}</strong>
          </p>
        </div>

        {/* Highlight Callout Box */}
        <div className="mb-12 p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-gray-200/80 dark:border-zinc-800 shadow-sm backdrop-blur-sm">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <span>⚖️</span>
            <span>Summary of Key Terms</span>
          </h2>
          <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-2 leading-relaxed">
            <li>
              • <strong>Content Ownership:</strong> You retain ownership of your photos, itinerary stories, and reviews. You grant Caravyn a non-exclusive license to host and display them within the service.
            </li>
            <li>
              • <strong>Zero Tolerance for Objectionable Content:</strong> In accordance with Apple App Store policies, abusive behavior, hate speech, harassment, illegal content, and explicit material are strictly prohibited and will result in immediate removal and account termination.
            </li>
            <li>
              • <strong>Travel & Navigation Safety:</strong> Routes, trail coordinates, travel advice, and pins are provided for informational and sharing purposes. You are responsible for your own safety and verifying local conditions.
            </li>
            <li>
              • <strong>Self-Service Account Deletion:</strong> You can delete your account and all associated data at any time directly within the iOS app settings.
            </li>
          </ul>
        </div>

        {/* Policy Body */}
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-10 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;you&rdquo;) and Caravyn (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) regarding your use of the Caravyn iOS mobile application available on the Apple App Store, the Caravyn website (caravyn.com), and associated features (collectively, the &ldquo;Services&rdquo;).
            </p>
            <p>
              By downloading, installing, registering for, or using the Caravyn iOS app or website, you agree to be bound by these Terms and our{' '}
              <Link href="/privacy" className="text-[#4B2492] dark:text-purple-400 font-medium hover:underline">
                Privacy Policy
              </Link>. If you do not agree to these Terms, you must not download, access, or use the Services.
            </p>
          </section>

          {/* Section 2: Apple App Store Specific Terms */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              2. Apple App Store Additional Terms & EULA
            </h2>
            <p>
              If you download or access the Caravyn app from the Apple App Store on an iOS device (iPhone, iPad), you acknowledge and agree to the following provisions required by Apple Inc. (&ldquo;Apple&rdquo;):
            </p>

            <div className="space-y-3 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/70 dark:border-zinc-800 space-y-2">
                <p>
                  <strong>A. Parties:</strong> This agreement is concluded between you and Caravyn only, and not with Apple. Caravyn, not Apple, is solely responsible for the Caravyn iOS application and the content thereof.
                </p>
                <p>
                  <strong>B. Scope of License:</strong> The license granted to you for the Caravyn iOS app is a non-transferable license to use the application on any Apple-branded products that you own or control, and as permitted by the Usage Rules set forth in the Apple Media Services Terms and Conditions.
                </p>
                <p>
                  <strong>C. Maintenance and Support:</strong> Caravyn is solely responsible for providing any maintenance and support services with respect to the app. You acknowledge that Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the Caravyn app.
                </p>
                <p>
                  <strong>D. Warranty:</strong> Caravyn is solely responsible for any product warranties, whether express or implied by law. In the event of any failure of the Caravyn app to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price (if any) for the app to you. To the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the app.
                </p>
                <p>
                  <strong>E. Product Claims:</strong> Caravyn, not Apple, is responsible for addressing any claims of the user or any third party relating to the app or your possession and/or use of that app, including, but not limited to: (i) product liability claims; (ii) any claim that the app fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection, privacy, or similar legislation.
                </p>
                <p>
                  <strong>F. Intellectual Property Rights:</strong> In the event of any third-party claim that the Caravyn app or your possession and use of the app infringes that third party&rsquo;s intellectual property rights, Caravyn, not Apple, will be solely responsible for the investigation, defense, settlement, and discharge of any such intellectual property infringement claim.
                </p>
                <p>
                  <strong>G. Legal Compliance:</strong> You represent and warrant that (i) you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a &ldquo;terrorist supporting&rdquo; country; and (ii) you are not listed on any U.S. Government list of prohibited or restricted parties.
                </p>
                <p>
                  <strong>H. Third-Party Beneficiary:</strong> You acknowledge and agree that Apple, and Apple&rsquo;s subsidiaries, are third-party beneficiaries of these Terms, and that, upon your acceptance of these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as a third-party beneficiary thereof.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: User Accounts & Eligibility */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              3. Eligibility & User Accounts
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 pl-2">
              <li><strong>Age Requirement:</strong> You must be at least 13 years of age (or 16 in the European Union / UK) to create an account and use Caravyn. If you participate in promotional contests or giveaways, you must meet the specific contest age requirements (e.g., 18 years or older).</li>
              <li><strong>Account Security:</strong> You are responsible for safeguarding your login credentials and for all activities that occur under your account. You agree to notify us immediately at{' '}
                <a href="mailto:support@caravyn.com" className="text-[#4B2492] dark:text-purple-400 font-semibold underline">
                  support@caravyn.com
                </a>{' '}
                if you suspect any unauthorized access to your account.
              </li>
              <li><strong>Accurate Information:</strong> You agree to provide true, accurate, current, and complete information when registering an account or applying for beta cohorts.</li>
            </ul>
          </section>

          {/* Section 4: User-Generated Content & Apple UGC Policy */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              4. User-Generated Content (UGC) & Community Standards
            </h2>
            <p>
              Caravyn enables users to create, post, and share itineraries, geographic pins, captions, photos, and video media (&ldquo;User Content&rdquo;).
            </p>

            <div className="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-xs sm:text-sm space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <span>🚫</span>
                <span>Zero Tolerance Policy for Objectionable Content & Abuse</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                In strict compliance with Apple App Store Guideline 1.2, <strong>there is zero tolerance for objectionable content, harassment, or abusive users on Caravyn</strong>.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You agree that you will not post, upload, transmit, or share any content that:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700 dark:text-gray-300">
                <li>Is defamatory, libelous, harassing, threatening, abusive, or discriminatory based on race, religion, gender, sexual orientation, disability, or national origin.</li>
                <li>Contains explicit nudity, pornography, sexually suggestive depictions, or graphic violence.</li>
                <li>Promotes illegal acts, dangerous activities, trespassing on private property, or self-harm.</li>
                <li>Infringes upon any third party&rsquo;s copyright, trademark, privacy, or publicity rights.</li>
                <li>Contains spam, unsolicited commercial advertisements, phishing, or malware.</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                Reporting & Moderation Mechanism:
              </h3>
              <p>
                Caravyn provides in-app reporting tools that allow any user to flag objectionable content or block abusive accounts immediately.
              </p>
              <p>
                Our moderation team reviews flagged content promptly. We reserve the right to remove any offending User Content and suspend or permanently terminate the account of any user who violates these Community Standards, without prior notice.
              </p>
            </div>
          </section>

          {/* Section 5: Content Ownership & Licenses */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              5. Intellectual Property & License Grants
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>Your Content:</strong> You retain all intellectual property rights in and to the User Content you upload or submit to Caravyn.
              </p>
              <p>
                <strong>License to Caravyn:</strong> By posting User Content on or through the Services, you grant Caravyn a worldwide, non-exclusive, royalty-free, transferable license (with right to sub-license) to host, store, display, reproduce, modify (for formatting and display purposes), and distribute such content solely for the purpose of operating, improving, promoting, and providing the Caravyn platform.
              </p>
              <p>
                <strong>Caravyn Intellectual Property:</strong> All software, trademarks, logos, map styles, user interface designs, visual graphics, and code associated with Caravyn are the exclusive property of Caravyn and its licensors. You may not reverse engineer, decompile, copy, or distribute any part of the app or website without our express written permission.
              </p>
            </div>
          </section>

          {/* Section 6: Travel & Navigation Disclaimers */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              6. Travel, Route & Navigation Disclaimers
            </h2>
            <p>
              Caravyn is an itinerary planning and travel storytelling tool. Geographic coordinates, pins, trail paths, road routes, travel times, and recommendations are provided for informational and inspiration purposes only.
            </p>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/70 dark:border-zinc-800 text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <p>
                • <strong>Real-World Conditions:</strong> Road conditions, trail access, business hours, transit availability, and weather can change rapidly. You are solely responsible for exercising caution, obeying local laws, respecting private property, and verifying travel safety.
              </p>
              <p>
                • <strong>No Professional Advice:</strong> Recommendations posted by Caravyn or community members do not constitute official travel advisories, mountaineering guidance, or emergency routing.
              </p>
            </div>
          </section>

          {/* Section 7: In-App Account Termination & Deletion */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              7. Account Termination & Self-Service Deletion
            </h2>
            <p>
              You may terminate these Terms at any time by ceasing all use of the Services and deleting your account.
            </p>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-gray-200/80 dark:border-zinc-800 text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <p className="font-bold text-gray-900 dark:text-white">
                Self-Service In-App Deletion:
              </p>
              <p>
                To permanently delete your account and all associated trips, media, and location coordinates:
              </p>
              <p className="font-mono text-xs bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg inline-block text-gray-800 dark:text-gray-200">
                Caravyn App &rarr; Profile &rarr; Settings &rarr; Account &rarr; Delete Account
              </p>
              <p>
                Upon confirmation, your personal data and uploaded content will be permanently purged from active databases in accordance with our{' '}
                <Link href="/privacy" className="text-[#4B2492] dark:text-purple-400 font-semibold underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </section>

          {/* Section 8: Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              8. Disclaimer of Warranties & Limitation of Liability
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed uppercase">
              <p>
                THE SERVICES ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
              </p>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CARAVYN, ITS FOUNDERS, EMPLOYEES, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF THE SERVICES.
              </p>
            </div>
          </section>

          {/* Section 9: Governing Law & Contact */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              9. Governing Law & Contact Information
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States and the State of Delaware, without regard to its conflict of law principles.
            </p>
            <p>
              If you have any questions, feedback, copyright notices, or legal inquiries regarding these Terms of Service or the Caravyn iOS application, please contact us:
            </p>
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-gray-200/80 dark:border-zinc-800 text-xs sm:text-sm space-y-1">
              <p className="font-bold text-gray-900 dark:text-white">Caravyn Support & Legal</p>
              <p className="text-gray-600 dark:text-gray-300">
                Email:{' '}
                <a
                  href="mailto:support@caravyn.com"
                  className="text-[#4B2492] dark:text-purple-400 font-semibold hover:underline"
                >
                  support@caravyn.com
                </a>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Website:{' '}
                <a
                  href="https://caravyn.com"
                  className="text-[#4B2492] dark:text-purple-400 font-semibold hover:underline"
                >
                  https://caravyn.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200/80 dark:border-zinc-800/80 bg-[#F9F1E5] dark:bg-[#090606] py-10 px-4 sm:px-6 transition-colors text-center text-xs text-gray-500 dark:text-gray-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: '#4B2492' }}
              className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold"
            >
              C
            </div>
            <span className="font-bold text-sm text-gray-900 dark:text-white">
              Caravyn
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/" className="hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors">
              Blog
            </Link>
            <Link href="/contest" className="hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors">
              Contest
            </Link>
            <Link href="/privacy" className="hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-semibold text-[#4B2492] dark:text-purple-300">
              Terms of Service
            </Link>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Caravyn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

