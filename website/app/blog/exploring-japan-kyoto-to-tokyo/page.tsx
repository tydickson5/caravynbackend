import type { Metadata } from 'next';
import {
  BlogNav,
  BlogFooter,
  BlogContainer,
  BlogHeader,
  BlogHeading,
  BlogParagraph,
  BlogImage,
  MiniMapTrip,
  MiniMapPost,
  BlogCallout,
  BlogWaitlistCTA,
} from '../components';

export const metadata: Metadata = {
  title: 'From Kyoto Temples to Tokyo Neon: A 10-Day Journey Across Honshu - Caravyn Blog',
  description: 'Explore ancient cedar forests in Arashiyama, forge chef knives with local masters, and navigate the world’s most seamless transit network.',
};

export default function JapanTripBlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      <BlogNav />

      <main className="flex-1">
        <BlogContainer maxWidth="standard">
          {/* Article Header */}
          <BlogHeader
            title="From Kyoto Temples to Tokyo Neon: A 10-Day Journey Across Honshu"
            subtitle="Ten days of riding the Shinkansen, early morning walks through bamboo groves, forging hand-made blades with master blacksmiths, and getting wonderfully lost in Shibuya."
            category="Trip Report"
            date="September 12, 2026"
            readTime="6 min read"
            author={{
              name: 'Caravyn Team',
              role: 'Founding Explorers',
            }}
            coverImage={{
              src: 'https://coeythfyfwzrwzuqowfe.supabase.co/storage/v1/object/public/post-media/d971cec8-661c-47da-9a2d-090947e09af3/8B166176-0E9B-4027-824A-3B66B13D6D71/EC7CE90E-5513-4EB5-86ED-5C2FE649C463.jpg',
              alt: 'Morning light in Kyoto temple gardens',
              caption: 'Morning sun filtering through historic temple grounds in eastern Kyoto.',
            }}
          />

          {/* Lead Paragraph */}
          <BlogParagraph lead>
            There is a quiet rhythm to traveling through Japan that sets in the moment your bullet train slides away from the platform without a sound. Over ten days, we traced a line between quiet cedar-draped mountain shrines and the glowing labyrinth of Tokyo's neon canyons.
          </BlogParagraph>

          <BlogParagraph>
            We mapped our stops in Caravyn to test how route logging, timestamped coordinates, and quick photo reflections work together when moving through fast-paced transit systems.
          </BlogParagraph>

          {/* Route Mini-Map */}
          <BlogHeading level="h2">
            The Journey Itinerary
          </BlogHeading>

          <BlogParagraph>
            Below is the interactive route connecting each stop along the trip. You can pan, zoom, or click any card marker to inspect the exact location:
          </BlogParagraph>

          <MiniMapTrip
            title="Honshu Expedition Route"
            height="360px"
            caption="Interactive journey trace connecting Kyoto, the Mt. Fuji foothills, and Tokyo."
          />

          {/* Kyoto Section */}
          <BlogHeading level="h2">
            Kyoto: Before the City Wakes
          </BlogHeading>

          <BlogParagraph>
            Our best decision in Kyoto was waking at 5:30 AM to walk the streets before shop shutters were raised. In Gion, wooden machiya townhouses stand silent under lanterns, and the only sound is water trickling through canal gutters.
          </BlogParagraph>

          <BlogImage
            src="https://coeythfyfwzrwzuqowfe.supabase.co/storage/v1/object/public/post-media/d971cec8-661c-47da-9a2d-090947e09af3/8B166176-0E9B-4027-824A-3B66B13D6D71/EC7CE90E-5513-4EB5-86ED-5C2FE649C463.jpg"
            alt="Kyoto traditional street"
            caption="Empty stone pathways in Gion at sunrise."
            aspectRatio="16/9"
          />

          {/* Single Spot Mini-Map */}
          <BlogHeading level="h3">
            Spot Spotlight: Artisan Forging Studio
          </BlogHeading>

          <BlogParagraph>
            Tucked up in the hills north of Kyoto, we spent an afternoon inside a traditional blacksmith workshop learning how steel blanks are heated, hammered, and tempered into Japanese kitchen knives.
          </BlogParagraph>

          <MiniMapPost
            latitude={35.065425}
            longitude={135.808167}
            title="Master Knife Forging Studio"
            subtitle="Kyoto Prefecture • 35.065° N, 135.808° E"
            zoom={15}
            height="260px"
            caption="The artisan forge nestled in the quiet foothills north of Kyoto."
          />

          <BlogCallout type="insight" title="Blacksmithing Experience Insight">
            If you book an artisan knife experience in Japan, schedule it for the middle of your trip. The finished blade needs overnight cooling and sharpening before you can safely pack it into your checked luggage.
          </BlogCallout>

          {/* The Foothills of Fuji */}
          <BlogHeading level="h2">
            The Climb Near Mount Fuji
          </BlogHeading>

          <BlogParagraph>
            Leaving Kyoto, we took the Tokaido Shinkansen east toward Shizuoka and Yamanashi. The contrast between coastal tea plantations and volcanic ridgelines is breathtaking.
          </BlogParagraph>

          <MiniMapPost
            latitude={35.351505}
            longitude={138.735455}
            title="Subashiri Trailhead Ridge"
            subtitle="Mount Fuji Region • 35.351° N, 138.735° E"
            zoom={13}
            height="260px"
            caption="High-elevation trailhead overlooking the cloud layer."
          />

          <BlogCallout type="tip" title="Train Transit Tip">
            Reserve seats on the <strong>right side</strong> of the train when heading from Kyoto to Tokyo (Seats D/E on ordinary cars) for the clearest views of Mount Fuji on sunny mornings.
          </BlogCallout>

          {/* Closing & Call to Action */}
          <BlogHeading level="h2">
            What We Learned About Mapping Travels
          </BlogHeading>

          <BlogParagraph>
            When you travel with an itinerary app that focuses on coordinates and photos rather than algorithmic recommendations, your trip notes turn into a personal geographic chronicle. You can look back months later and know the exact turn you took.
          </BlogParagraph>

          <BlogWaitlistCTA
            title="Have an upcoming journey to document?"
            description="We are building Caravyn for travelers who love authentic routes. Apply for the Winter 2026 beta to test our live map features on your next trip."
          />
        </BlogContainer>
      </main>

      <BlogFooter />
    </div>
  );
}
