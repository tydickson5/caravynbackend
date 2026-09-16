import type { Metadata } from 'next';
import {
  BlogNav,
  BlogFooter,
  BlogContainer,
  BlogHeader,
  BlogHeading,
  BlogParagraph,
  BlogImage,
  BlogVideo,
  MiniMapTrip,
  MiniMapPost,
  BlogCallout,
  BlogWaitlistCTA,
} from '../components';

/**
 * ==============================================================================
 * CARAVYN BLOG STARTER TEMPLATE
 * ==============================================================================
 * How to create a new blog page:
 * 1. Create a new folder under `website/app/blog/[your-post-slug]/`
 * 2. Copy this `page.tsx` file into that folder.
 * 3. Update the metadata and content blocks below.
 * 4. Add the entry to `website/app/blog/postsData.ts` so it shows on `/blog`.
 * ==============================================================================
 */

export const metadata: Metadata = {
  title: 'Blog Post Starter Template & Component Guide - Caravyn',
  description: 'A complete reference and copy-paste boilerplate demonstrating all Caravyn blog blocks.',
};

export default function BlogTemplatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      <BlogNav />

      <main className="flex-1">
        <BlogContainer maxWidth="standard">
          {/* 1. ARTICLE HEADER (Title, Subtitle, Author, Date, Cover Photo) */}
          <BlogHeader
            title="Blog Post Starter Template & Component Guide"
            subtitle="Everything you need to craft engaging travel journals with interactive route maps, focused spot previews, rich media, and responsive styling."
            category="Guide"
            date="September 15, 2026"
            readTime="3 min read"
            author={{
              name: 'Caravyn Docs',
              role: 'Creator Guides',
            }}
            coverImage={{
              src: 'https://coeythfyfwzrwzuqowfe.supabase.co/storage/v1/object/public/post-media/51dd8574-e9eb-4346-b79b-94e121a986cf/A5C32288-19CD-46DF-A50D-596C3816ED33/79AC68AB-E934-4E3A-8798-1023968DC7D3.jpg',
              alt: 'Scenic mountain overlook',
              caption: 'Scenic vistas from the Appalachian ridge at dawn.',
            }}
          />

          {/* 2. LEAD PARAGRAPH (Large introductory paragraph) */}
          <BlogParagraph lead>
            Welcome to the Caravyn block-based writing system. Every piece of your story—from full journey routes down to single café coordinates—can be assembled cleanly using ready-made modular blocks.
          </BlogParagraph>

          <BlogParagraph>
            This page functions both as documentation and as an interactive sandbox. Duplicate this file into a new folder under <code>website/app/blog/your-slug/page.tsx</code> to publish a new post immediately.
          </BlogParagraph>

          {/* 3. SECTION HEADING (H2 with Caravyn purple accent bar) */}
          <BlogHeading level="h2">
            1. The Trip Mini-Map Block
          </BlogHeading>

          <BlogParagraph>
            The <code>&lt;MiniMapTrip /&gt;</code> block embeds a full interactive Mapbox map tracing a travel route. It connects every recorded stop with an elegant route line and pins thumbnail photo cards directly on the terrain.
          </BlogParagraph>

          {/* MINI-MAP TRIP BLOCK */}
          <MiniMapTrip
            title="Summer Travels Preview"
            height="340px"
            caption="Interactive itinerary trace through Kyoto, West Virginia, and Charlottesville."
          />

          <BlogCallout type="tip" title="Connecting Real Database Trips">
            You can pass <code>tripId="your-trip-id"</code> to automatically query and map any live trip directly from Supabase! Or pass a custom list of posts via <code>posts={'{...}'}</code>.
          </BlogCallout>

          {/* 4. SECTION HEADING (H2) & SUBHEADING (H3) */}
          <BlogHeading level="h2">
            2. Single Post / Location Mini-Map
          </BlogHeading>

          <BlogParagraph>
            When you want to spotlight a specific restaurant, scenic viewpoint, or hidden trailhead, use <code>&lt;MiniMapPost /&gt;</code>. It zooms in on exact coordinates with an animated Caravyn location card.
          </BlogParagraph>

          {/* MINI-MAP POST BLOCK */}
          <MiniMapPost
            latitude={35.000385}
            longitude={135.778094}
            title="Gion District Evening Walk"
            subtitle="Kyoto, Japan • Stop #1"
            imgSrc="https://coeythfyfwzrwzuqowfe.supabase.co/storage/v1/object/public/post-media/d971cec8-661c-47da-9a2d-090947e09af3/8B166176-0E9B-4027-824A-3B66B13D6D71/EC7CE90E-5513-4EB5-86ED-5C2FE649C463.jpg"
            zoom={14}
            height="260px"
            caption="Focused street-level coordinates in central Kyoto."
          />

          <BlogHeading level="h3">
            Pairing Spot Coordinates with Story Text
          </BlogHeading>

          <BlogParagraph>
            Readers can pan, zoom, and inspect exact locations right beside your narrative, keeping your story immersive and actionable for anyone planning their own adventures.
          </BlogParagraph>

          {/* 5. IMAGE BLOCK */}
          <BlogHeading level="h2">
            3. Rich Photography
          </BlogHeading>

          <BlogParagraph>
            The <code>&lt;BlogImage /&gt;</code> component automatically resolves Supabase storage paths and full URLs, adding rounded corners, drop shadows, and delicate captions.
          </BlogParagraph>

          <BlogImage
            src="https://coeythfyfwzrwzuqowfe.supabase.co/storage/v1/object/public/post-media/d971cec8-661c-47da-9a2d-090947e09af3/9EE30646-17A4-43D8-8B7D-B315B775FD7F/BC662007-B8FD-4AD4-B40C-9DDEF9148B44.jpg"
            alt="Scenic road trip vista"
            caption="Golden hour across Charlottesville backroads."
            aspectRatio="16/9"
          />

          {/* 6. CALLOUT BOX VARIATIONS */}
          <BlogHeading level="h2">
            4. Highlight Callouts
          </BlogHeading>

          <BlogCallout type="insight" title="Local Insight">
            Always carry cash for rural bus routes and local tea houses—many historic spots don't take contactless payments.
          </BlogCallout>

          <BlogCallout type="quote" title="Traveler Quote">
            “The most memorable parts of a journey are rarely the destinations you scheduled, but the turn-offs you took on a whim.”
          </BlogCallout>

          {/* 7. VIDEO BLOCK */}
          <BlogHeading level="h2">
            5. Video Media Player
          </BlogHeading>

          <BlogParagraph>
            Embed direct mp4 videos, Supabase storage media clips, or YouTube/Vimeo embeds seamlessly with responsive 16:9 aspect ratio and full playback controls.
          </BlogParagraph>

          <BlogVideo
            src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            caption="Video clips can be embedded anywhere within your journal entry."
          />

          {/* 8. WAITLIST CTA (Early access conversion block) */}
          <BlogWaitlistCTA
            title="Have travels planned for Winter 2026?"
            description="Apply to beta test Caravyn. Share your own routes, publish field notes, and help shape our travel community."
          />
        </BlogContainer>
      </main>

      <BlogFooter />
    </div>
  );
}

