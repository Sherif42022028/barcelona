---
name: Pitch & Pedagogy
colors:
  surface: '#f9f9ff'
  surface-dim: '#d9d9e0'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fa'
  surface-container: '#ededf4'
  surface-container-high: '#e7e8ef'
  surface-container-highest: '#e1e2e9'
  on-surface: '#191c21'
  on-surface-variant: '#424751'
  inverse-surface: '#2e3036'
  inverse-on-surface: '#f0f0f7'
  outline: '#727782'
  outline-variant: '#c2c6d3'
  surface-tint: '#235eaa'
  primary: '#00366f'
  on-primary: '#ffffff'
  primary-container: '#004d98'
  on-primary-container: '#9dc0ff'
  inverse-primary: '#a9c7ff'
  secondary: '#b71850'
  on-secondary: '#ffffff'
  secondary-container: '#ff5483'
  on-secondary-container: '#5e0024'
  tertiary: '#755b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#d2a500'
  on-tertiary-container: '#503d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a9c7ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#00468b'
  secondary-fixed: '#ffd9de'
  secondary-fixed-dim: '#ffb2bf'
  on-secondary-fixed: '#3f0015'
  on-secondary-fixed-variant: '#90003a'
  tertiary-fixed: '#ffdf90'
  tertiary-fixed-dim: '#f3c00e'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#f9f9ff'
  on-background: '#191c21'
  surface-variant: '#e1e2e9'
typography:
  display-lg:
    fontFamily: Oswald
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg:
    fontFamily: Oswald
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Oswald
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  scoreboard-num:
    fontFamily: Oswald
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: 2px
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Oswald
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
  caption:
    fontFamily: Source Sans 3
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1140px
  gutter: 24px
---

## Brand & Style
This design system translates the intensity and tradition of Barcelona’s aesthetic into a focused, personal learning environment. The brand personality is disciplined yet passionate, blending the high-stakes energy of professional football with the quiet focus required for deep study.

The design style is **Minimalist-Athletic**. It utilizes heavy whitespace and high-quality typography to ensure long-form reading comfort, while injecting character through "Tactical" elements—precise lines, geometric markers, and strategic use of the Blaugrana palette. The interface avoids generic SaaS gloss in favor of a raw, editorial feel that treats every lesson like a tactical briefing.

## Colors
The palette is rooted in the *Blaugrana* heritage. 
- **Primary Blue (#004D98)** and **Primary Garnet (#A50044)** are used as a dual-primary system, typically appearing in tandem as structural accents or indicators.
- **Background (#F7F5F0)**: A warm, creamy white chosen specifically to reduce eye strain during prolonged reading sessions, providing a "paper-like" quality.
- **Accent Gold (#EDBB00)**: This color is strictly reserved for "Trophies"—achievements, mastery badges, and completed milestones. It should never be used for functional UI like buttons or links.
- **Foreground (#1A1A1A)**: A soft black for high-contrast legibility.

## Typography
The typographic system creates a hierarchy between "Action" and "Absorption."

- **Headlines & Stats**: Use **Oswald**. Its condensed, vertical nature evokes jersey numbers and scoreboard displays. Use All-Caps for major headers and progress numbers to lean into the athletic motif.
- **Learning Content**: Use **Source Sans 3**. It offers exceptional legibility for long-form lesson text, providing a neutral, professional contrast to the bold headlines.
- **Numbers**: Treat numeric data as "scores." Large, bold Oswald figures should represent streaks, percentages, and completed units.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to mimic the feel of a structured playbook, centering content for maximum focus.

- **Grid**: A 12-column system with 24px gutters.
- **Rhythm**: All spacing is derived from a 4px base unit.
- **Margins**: Generous 48px+ outer margins on desktop to create a "focus zone." On mobile, margins reduce to 16px.
- **Tactical Lines**: Vertical and horizontal hair-thin lines (0.5pt) should be used to separate sections, mimicking the markings of a football pitch.

## Elevation & Depth
This design system avoids heavy shadows, favoring a "Flat-Tactile" look.

- **Tonal Layers**: Depth is achieved through color stacking rather than shadows. Primary containers use the Cream background, while secondary "side-line" areas or cards use a slightly darker off-white or a very thin 1px border (#1A1A1A at 10% opacity).
- **Subtle Stripes**: Visual depth is added via a "Blaugrana Band"—a thin diagonal stripe pattern (Blue and Garnet) applied to the left edge or top corner of cards to signify active states.
- **Active State**: Instead of an elevation lift, active elements are highlighted with a 2px Garnet or Blue solid border.

## Shapes
The shape language is **Sharp**. Elements use 0px border radius to maintain a precise, architectural, and "official document" aesthetic. This sharpness mirrors the hard lines of a pitch and the directness of athletic branding.

- **Buttons**: Perfectly rectangular.
- **Cards**: Sharp corners with a thin 1px stroke.
- **Progress Markers**: Small circles (dots) are the only rounded exception, used to represent "players" or "tactical positions" in progress tracking.

## Components
- **Buttons**: Solid Blue (#004D98) for primary actions, Solid Garnet (#A50044) for secondary. Text is always white, uppercase Oswald. No rounded corners.
- **Learning Cards**: Cream background with a 1px border. A subtle 4px diagonal Blaugrana stripe should appear in the top-right corner of the "Current Lesson" card.
- **Tactical Progress Tracker**: Instead of a standard progress bar, use a series of dots. Completed lessons are solid Blue; the current lesson is a Garnet dot; future lessons are empty outlines.
- **Achievement Badges**: Simple geometric shapes (triangles or shields) in Accent Gold (#EDBB00).
- **Input Fields**: Minimalist. Only a bottom border (1px) that turns Blue on focus. Labels use uppercase Oswald at 12px.
- **Unit Scoreboards**: Large blocks containing a single Oswald number (e.g., "08") to denote the chapter or unit number, serving as a landmark in the learning flow.