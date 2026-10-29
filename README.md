# Dan Benoit Photo — danbenoit.com (free static site)

Plain HTML/CSS/JS, no build step. Deployable as-is to GitHub Pages
(CNAME file included: danbenoit.com) or Cloudflare Pages.

- Galleries live in images/<gallery>/ with thumbs in images/<gallery>/thumbs/
- Pages: index, portrait, wedding, commercial, events, drone,
  live-stream-sports, about, contact + redirects for the old Flatiron slugs
  (dan-benoit-photo, ii-flatiron, about-flatiron, contact-flatiron).
- Built by Muse from the live Squarespace site on Oct 22, 2026 (all 137
  gallery photos, web-sized, EXIF stripped). See the completion prompt
  from Muse for the remaining launch steps (GitHub repo, DNS at
  Namecheap — leave MX email records untouched — HTTPS check, then
  cancel Squarespace).

## v2 polish (Muse, Oct 22, 2026)
- Mobile hamburger menu (<860px), sticky header with scroll shadow
- Hero slow Ken Burns zoom; staggered scroll-reveal delays; hover lift
  on service cards and deeper shadows on gallery cards
- Gallery pages now open with a photo banner header (title over a photo)
- Mobile bottom Call / Email bar, back-to-top button, skip-to-content
  link, visible keyboard focus, LocalBusiness (Photographer) JSON-LD
  on Home + Contact, canonical URLs on all main pages
- All animation stays transform/opacity and is disabled under
  prefers-reduced-motion

## v3 (Muse, Oct 22, 2026 — Dan: "other pages seem to just be text")
- Root cause found: gallery photos were hidden until a scroll animation
  ran, so any preview without JS showed blank galleries. FIXED for good:
  content is now hidden ONLY when JavaScript is actually running
  (html.js gating) + failsafe + noscript fallback.
- Typography: Fraunces (elegant editorial serif) for logo, headlines,
  banners and the big Contact phone number; Inter for body/UI.
- Home: scrolling services marquee under the hero.
- About: photo banner, pull-quote from Dan's own About text, and a
  "Browse the work" photo strip. Contact: photo banner + oversized
  phone number. Galleries: first photo featured wide (2-col span on
  desktop) and prev/next gallery photo-nav at the bottom of each gallery.
- Footer redesigned: dark, big serif wordmark, full page nav.

## v4 (Muse, Oct 25, 2026 — Facebook picks integrated, Dan approved)
- 12 Facebook photos added to galleries (149 total): Portrait +2 newborn
  (Matteo), Wedding +2 (wine cellar, bouquets), Commercial +2 (Louis
  L'artisan kitchen), Events +3 (ING build day 2010), Art +3 (door
  posters: Quebec, NYC, Rome). Files are fb-*.jpg in each gallery.
- Drone & Real Estate page: new "Recent work" section (Top Grade
  Orléans backyard feature photo + project collage) and "See it in
  motion" with Dan's home/drone promo video embedded
  (youtube-nocookie, youtu.be/yolAdQs6z9w — found via his Facebook Page).
- Facebook files are web copies, not camera originals — swap originals
  in before launch where available (wedding pair is ~400-600px).

## v5 (Muse, Oct 25, 2026 — Dan's v4-preview feedback)
- Nav order: Home, About, Contact, Portrait, Wedding, Drone, Commercial,
  Events, Live Stream Sports (Portrait kept by Muse's call; flagged to Dan)
- Art and Door Project pages removed at Dan's request
- Drone: outdoor-fireplace photo removed; MorrisBel Farms drone film
  embedded in Recent work (OqiUr1YuVPo)
- New Live Stream Sports page: XbotGo explainer + Coyotes 7-0 win over
  Ottawa Ice 2 (xHIC0tiZ-fk), score overlay verified
