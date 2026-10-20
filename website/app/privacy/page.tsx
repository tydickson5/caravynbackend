import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Caravyn App & Website',
  description:
    'Learn how Caravyn collects, uses, and protects your personal data, location coordinates, camera and photo media across the Caravyn mobile app (iOS & Android) and website.',
};

export default function PrivacyPolicyPage() {
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
                App & Web Privacy
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
            <span>📱 iOS App • Android App • Website</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">
            Applies to the <strong>Caravyn Mobile Application</strong> (available on the Apple App Store & Google Play) and the <strong>Caravyn Website</strong> (caravyn.com).
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last Updated: <strong className="text-gray-700 dark:text-gray-300">{lastUpdated}</strong>
          </p>
        </div>

        {/* Highlight Callout Box */}
        <div className="mb-12 p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-gray-200/80 dark:border-zinc-800 shadow-sm backdrop-blur-sm">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <span>🛡️</span>
            <span>Key Highlights for App & Web Users</span>
          </h2>
          <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-2 leading-relaxed">
            <li>
              • <strong>Covers Both App & Web:</strong> This policy governs your use of the Caravyn mobile app on iOS and Android as well as our web application.
            </li>
            <li>
              • <strong>We never sell your data:</strong> We do not sell, rent, monetize, or trade your personal information, photos, or location data to third-party data brokers or ad networks.
            </li>
            <li>
              • <strong>Location is in your control:</strong> Location access in the mobile app is only used while actively using the app to place pins on your itinerary or view your trip route. We do not track your location in the background without your knowledge.
            </li>
            <li>
              • <strong>In-App Account & Data Deletion:</strong> You can permanently delete your account and all associated trips, photos, and coordinates directly inside the mobile app settings at any time.
            </li>
          </ul>
        </div>

        {/* Policy Body */}
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-10 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              1. Overview & Scope
            </h2>
            <p>
              Caravyn (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) provides interactive travel itinerary mapping, route exploration, and travel journaling through:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <li>The <strong>Caravyn mobile application</strong> for iOS (Apple App Store) and Android (Google Play).</li>
              <li>The <strong>Caravyn website and web application</strong> accessible at{' '}
                <a href="https://caravyn.com" className="text-[#4B2492] dark:text-purple-400 font-medium hover:underline">
                  caravyn.com
                </a>{' '}
                and related domains.
              </li>
              <li>Related application programming interfaces (APIs), notifications, and backend services.</li>
            </ul>
            <p>
              By downloading, installing, accessing, or using the Caravyn mobile app or website, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>

          {/* Section 2: Mobile App Specific Permissions */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              2. Mobile Application Permissions & Device Access
            </h2>
            <p>
              To provide core travel journaling and itinerary mapping features, the Caravyn mobile app requests certain device permissions on your smartphone or tablet. You can grant or revoke these permissions at any time through your device operating system settings:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/70 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">📍</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Location Services (GPS)
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Used while you use the app to center the map on your current location, suggest nearby waypoints, and record coordinates for pins you add to your trip. <strong>We do not run continuous background GPS tracking</strong> when the app is closed.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/70 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">📷</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Camera
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Used only when you choose to take a photo or record a video directly inside the app to attach to a trip stop or memory pin.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/70 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">🖼️</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Photo & Media Library
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Used when you select existing photos or videos from your camera roll to upload to your travel itinerary. We only access media files that you explicitly choose to upload.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/70 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">🔔</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Push Notifications
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  With your permission, we send push notifications (via Apple APNs) for trip updates, community interactions, beta testing announcements, and contest alerts. You can disable notifications at any time in system settings.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              3. Information We Collect
            </h2>
            <p>We collect information you provide directly and information gathered automatically when you interact with the app or website:</p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/70 dark:border-zinc-800">
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                  A. Information You Provide Directly
                </h3>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <li><strong>Account Registration:</strong> Email address, display name or username, password, or third-party authentication tokens.</li>
                  <li><strong>Travel Content:</strong> Trip titles, descriptions, route stops, captions, notes, reviews, and uploaded photos or videos.</li>
                  <li><strong>Waitlist & Beta Intake:</strong> Email address, preferred travel cohort, past travel insights, and planned trip destinations.</li>
                  <li><strong>Contest Entries & Support:</strong> Trip links, entry descriptions, and support communications submitted to us.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/70 dark:border-zinc-800">
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                  B. Geolocation Data
                </h3>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <li><strong>Itinerary Coordinates:</strong> Latitude and longitude coordinates for points of interest, stops, and waypoints you place on your trip map.</li>
                  <li><strong>Photo Location Metadata:</strong> If permitted by your device photo settings, EXIF metadata in photos you upload may be used to automatically place pins on your itinerary map.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/70 dark:border-zinc-800">
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                  C. Device & Technical Information Collected Automatically
                </h3>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <li><strong>Device Information:</strong> Device model, hardware identifiers, operating system version (iOS/Android), and app version.</li>
                  <li><strong>Usage & Crash Logs:</strong> Performance analytics, crash stack traces, and feature interaction metrics used to resolve bugs and improve app stability.</li>
                  <li><strong>Notification Device Tokens:</strong> Unique device tokens generated by Apple or Google to deliver push notifications.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              4. How We Use Your Information
            </h2>
            <p>We use your information to operate and improve the app and website:</p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 pl-2">
              <li><strong>Map & Route Generation:</strong> Rendering interactive maps, connecting sequential pins, and calculating distances and geographic paths.</li>
              <li><strong>Media Storage & Synchronization:</strong> Securely syncing your trips, media, and profile between your mobile devices and the web.</li>
              <li><strong>Community Features:</strong> Displaying published trips, likes, and comments when you choose to share your trip publicly.</li>
              <li><strong>Notifications & Communications:</strong> Sending service alerts, contest updates, beta announcements, and critical account notices.</li>
              <li><strong>Security & Troubleshooting:</strong> Detecting fraudulent use, preventing unauthorized access, and resolving app crashes.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              5. Third-Party Service Providers & Subprocessors
            </h2>
            <p>
              We do not sell your personal data. We engage trusted third-party service providers who assist us in operating the mobile app and website, under strict confidentiality and security agreements:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 pl-2">
              <li><strong>Supabase:</strong> Cloud database infrastructure, user authentication, and encrypted media storage.</li>
              <li><strong>Mapbox:</strong> Vector map rendering, geographic tiles, and geolocation services in the mobile app and website.</li>
              <li><strong>Apple Push Notification service (APNs):</strong> Transmitting push notifications to iOS devices.</li>
              <li><strong>Hosting & Cloud Providers:</strong> Secure application hosting and content delivery.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              6. Data Retention, Security & Local Caching
            </h2>
            <p>
              We employ encryption in transit (HTTPS/TLS) and encryption at rest to safeguard your data. The mobile app also uses secure on-device local storage to cache map tiles, session tokens, and draft trip entries so you can use the app seamlessly even in low-connectivity travel environments.
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              We retain your information for as long as your account is active. When you delete your account or content, it is permanently purged from our active databases in accordance with our data deletion policy.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              7. In-App Account Deletion & User Rights
            </h2>
            <p>
              In full compliance with <strong>Apple App Store Review Guidelines (5.1.1(v))</strong> and <strong>Google Play policies</strong>, Caravyn provides direct, self-service account deletion:
            </p>

            <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-gray-200/80 dark:border-zinc-800 space-y-3">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                How to Delete Your Account & All Data:
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 pl-2">
                <li>Open the <strong>Caravyn mobile app</strong> on your device.</li>
                <li>Go to <strong>Profile</strong> &rarr; <strong>Settings</strong> &rarr; <strong>Account</strong>.</li>
                <li>Tap <strong>Delete Account</strong> and confirm.</li>
              </ol>
              <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                Upon confirmation, your user profile, authentication credentials, all created trips, posts, coordinates, and media uploads will be permanently removed from our active databases. You can also request deletion by emailing{' '}
                <a href="mailto:support@caravyn.com" className="text-[#4B2492] dark:text-purple-400 font-semibold underline">
                  support@caravyn.com
                </a>.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              8. Children&rsquo;s Privacy
            </h2>
            <p>
              Caravyn is not directed to children under the age of 13 (or under 16 in the European Union / UK). We do not knowingly collect personal information from children under these ages. If we learn that personal data of a child has been collected through the app or website without verifiable parental consent, we will promptly delete that data.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              9. Contact Us
            </h2>
            <p>
              If you have any questions, feedback, or privacy requests regarding the Caravyn mobile app or website, please reach out to us:
            </p>
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-gray-200/80 dark:border-zinc-800 text-xs sm:text-sm space-y-1">
              <p className="font-bold text-gray-900 dark:text-white">Caravyn Support & Privacy</p>
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
            <Link href="/privacy" className="font-semibold text-[#4B2492] dark:text-purple-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#4B2492] dark:hover:text-purple-300 transition-colors">
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
