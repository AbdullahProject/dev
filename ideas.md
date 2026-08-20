# Axicon Developers — Design Direction

## Three Initial Directions

### Theme Name: Concrete / Brass Editorial
Very restrained architectural luxury: warm concrete, charcoal ink, muted brass, and an editorial serif paired with a precise sans. The site should feel like a printed architecture monograph translated into motion.

**Probability:** 0.07

### Theme Name: Quiet Garden Modernism
A softer residential direction built around stone, olive, parchment, and generous daylight. The mood is calm, tactile, and landscape-led, with gentle reveals and a more domestic warmth.

**Probability:** 0.03

### Theme Name: Midnight Structure
A darker, gallery-like experience with near-black surfaces, subtle bronze lines, and cinematic image crops. The visual language is dramatic and nocturnal without leaning into neon or spectacle.

**Probability:** 0.09

## Chosen Approach: Concrete / Brass Editorial

### Design Movement
Contemporary architectural editorial, influenced by monographs from modernist studios and the tactile restraint of luxury property journals.

### Core Principles
1. **Architecture is the hero.** Text recedes when the image or video has something meaningful to say.
2. **Contrast through material.** Charcoal ink, warm concrete, parchment, and muted brass create hierarchy without loud color.
3. **Asymmetry with intention.** Sections use offset columns, vertical labels, and wide negative space rather than repetitive centered cards.
4. **Motion follows structure.** Scroll-linked video and restrained reveals should feel physically tied to the architecture.

### Color Philosophy
The palette should feel excavated from the film: the ash of concrete, the warmth of late sun, and the dark outline of glass. Muted brass is reserved for wayfinding and actions, making it feel ownable rather than decorative.

### Layout Paradigm
Use a long editorial canvas with a pinned video chapter, then alternate wide image bands and offset text blocks. The main content spine is left-aligned, while project cards break the rhythm with a 2/3 + 1/3 composition. Avoid generic centered hero layouts.

### Signature Elements
- A thin vertical chapter marker with a live scroll percentage.
- Hairline brass rules and small uppercase labels as wayfinding.
- Oversized italic serif pull quotes that sit beside compact sans-serif copy.

### Interaction Philosophy
Interactions should feel like opening a heavy architectural volume: deliberate, responsive, and quiet. Buttons use small directional arrows and a tactile press state; project cards reveal metadata on hover without bouncing or glowing.

### Animation
The hero video is pinned inside a tall scroll chapter. A requestAnimationFrame loop maps normalized scroll progress to the video duration, with a small easing buffer to avoid jumps while still allowing forward and reverse playback. Content reveals use opacity and translateY only, with 180–260ms transitions and staggered 50ms delays. All non-essential motion respects `prefers-reduced-motion`.

### Typography System
Use **Cormorant Garamond** for display statements, italic pull quotes, and the wordmark accent. Use **DM Sans** for navigation, labels, body copy, and controls. Headlines are large, tightly tracked, and often mixed case; metadata is 10–11px uppercase with wide letter spacing.

### Brand Essence
Axicon Developers shapes considered spaces for people who value architecture, longevity, and quiet distinction.

**Personality:** discerning, grounded, exacting.

### Brand Voice
Headlines are declarative and human, never salesy. CTAs are direct, low-pressure, and spatially aware. Microcopy should sound like a curator guiding a visitor through a building.

Example lines:
- “We build more than properties.”
- “A considered address, from first line to final light.”

### Wordmark & Logo
The mark is a compact A-shaped portal made from two offset architectural planes. The wordmark is set in uppercase DM Sans with expanded tracking, paired with a small italic “Developers” line for contrast.

### Signature Brand Color
**Oxide Brass — `#B89B69`**. A warm, low-saturation brass pulled from late-sun highlights on stone and metal; used sparingly for active navigation, rules, and calls to action.

## Asset Notes
The supplied video is a 10-second, 1280×720, 24fps time-lapse showing an empty plot progressing through foundation, structure, glazing, finishing, and a completed luxury residence in golden-hour light. Desktop can use `object-fit: cover`; mobile should preserve the central house by using a focused crop and slightly reduced overlay copy.

## Style Decisions
- Keep the hero video as the sole visual centerpiece of the opening chapter; do not add a competing hero image.
- Use a warm parchment content field rather than a generic white background.
- Treat brass as a navigational accent, not a gradient or decorative glow.
- Use real architecture imagery only for lower-page project cards and supporting sections.
