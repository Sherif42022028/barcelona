# FC Barcelona Methodology Academy — Repository Architecture Audit

## 1. Current Stack
- **Framework**: Next.js 15.1.7 (App Router), React 19.0.0, React-DOM 19.0.0
- **Language**: TypeScript 5.7.3
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss` 4.0.7, `tailwindcss` 4.0.7)
- **Icons & Utilities**: `lucide-react` 0.475.0, `canvas-confetti` 1.9.4
- **Database / Backend**: `@neondatabase/serverless` 1.1.0 (`src/lib/db.ts`)
- **Document Processing**: Source PDFs present in workspace root and month subdirectories; `extracted_tactics/` contains legacy script output with compilation errors.

---

## 2. Current Routes Inventory
| Current Route | Description | Architectural Role | Action Plan |
| :--- | :--- | :--- | :--- |
| `/` | Main Dashboard / Overview | Student Home | **REBUILD** |
| `/learn/path` | Month & Position Roadmap | Academy View | **REBUILD** |
| `/learn/stage/[stageId]` | Stage / Month View | Stage View | **REBUILD** |
| `/learn/pitch` | Standalone Interactive Pitch | Tactical Pitch Component | **MOVE to Component** |
| `/lesson/[moduleId]` | Lesson Page | Lesson Engine | **REBUILD** |
| `/challenge/[moduleId]` | Tactical Challenge Screen | Tactical Practice Workspace | **REBUILD** |
| `/exam/[moduleId]` | Module Quiz Page | Module Assessment Engine | **REBUILD** |
| `/result/[moduleId]` | Exam Result Summary | Assessment Results & Skill Report | **REBUILD** |
| `/frameworks` | Frameworks List | Methodology Library | **REBUILD** |
| `/analyze/lab` | Tactical Analysis Lab | Analysis Workspace | **REBUILD** |
| `/progress` | Progress Analytics | Student Progress & Mastery | **REBUILD** |
| `/api/progress` | Progress API Route | Progress Service API | **REBUILD** |
| `/api/score` | Score API Route | Assessment Score API | **REBUILD** |

---

## 3. Current Architecture Analysis
- **Monolithic Static Data**: Curriculum content is hardcoded in TS arrays (`src/data/curriculumData.ts` and `src/data/academyData.ts`) combining UI presentation strings (`bentoItems`, `fiveTacticalRules`), questions, and pitch coordinates in single arrays.
- **Coupled UI Logic**: Page components directly calculate quiz scores, confetti effects, and local state without a decoupled domain layer.
- **Isolated Tools**: The pitch, challenges, and lessons exist as disconnected destinations rather than an integrated learning experience loop (`SOURCE → KNOWLEDGE → CURRICULUM → LESSON → PRACTICE → ASSESSMENT → MASTERY`).

---

## 4. Existing Reusable Components
- `src/components/FCBLogo.tsx`: FC Barcelona SVG logo branding.
- `src/components/TacticalPitchBoard.tsx`: Core SVG pitch rendering engine (players, ball, lines, dragging).
- `src/components/MiniPitchMap.tsx`: Compact pitch mapping component.
- `src/components/Navbar.tsx`: Global navigation header.
- `src/components/HeaderScoreboard.tsx`: Header scoreboard component.

---

## 5. Existing Tactical Functionality
- SVG tactical board with home/away team markers, ball positioning, pass trajectory lines, and target player selection.
- Tactical challenge option checking (`targetPlayerId`, `isCorrect`, `tacticalExplanation`).

---

## 6. Existing Learning Functionality
- Module lesson rendering based on hardcoded `bentoItems` and `fiveTacticalRules`.
- 4 Month Stage structure (`MONTHS_DATA` 1 to 4).
- Sequential route navigation (`/lesson` → `/challenge` → `/exam`).

---

## 7. Existing Documentation Functionality
- Raw PDF files in root and Month 1-4 folders (`Module_1_...pdf`, `Module_2_...pdf`, `Module_3_...pdf`, `Module 4-1[1].pdf`, `Chris Hogg...pdf`).
- Needs structured ingestion pipeline for text extraction, chunking, and source traceability.

---

## 8. Existing Assessment Functionality
- 1 Tactical Challenge per module.
- 1-2 Multiple Choice questions per module (`examQuestions`).
- Confetti celebration upon completion.
- API endpoints `/api/progress` and `/api/score` connected to Neon DB.

---

## 9. Current Database & Data Structure
- `src/data/curriculumData.ts` containing static `MONTHS_DATA` and `MODULES_DATA`.
- `src/lib/db.ts` containing `@neondatabase/serverless` connection for `user_progress` and `user_scores`.

---

## 10. Audit Categorization & Migration Map

### KEEP
- Next.js 15 App Router setup, TypeScript & Tailwind CSS configs.
- Raw source PDFs (`Module_1...`, `Module_2...`, `Module_3...`, `Module_4...`, `Chris Hogg...`).
- SVG Pitch rendering logic in `TacticalPitchBoard.tsx` (to be unified into `TacticalEngine`).
- `FCBLogo.tsx` branding icon.

### REFACTOR
- `TacticalPitchBoard.tsx`: Unify into a single, domain-driven `TacticalEngine` component supporting Visualization, Exploration, Practice, Assessment, and Analysis states.
- Navigation (`Navbar.tsx`): Refactor into clean Student vs Admin navigation.
- Database (`db.ts`): Refactor to support clean domain schemas.

### REMOVE
- Standalone `/learn/pitch` route (tactical pitch becomes an embedded learning tool).
- Hardcoded mixed UI/Curriculum data arrays in `curriculumData.ts` and `academyData.ts`.
- Vanity stats (fake XP, streaks, decorative scoreboards).
- Failed docling build artifacts in `extracted_tactics/`.

### MISSING (To Be Built)
- **Domain Layer (`src/lib/domain/`)**: `Document`, `KnowledgeObject`, `KnowledgeRelation`, `Curriculum`, `Stage`, `Module`, `LearningObjective`, `Lesson`, `LessonBlock`, `TacticalScenario`, `Question`, `Rubric`, `Assessment`, `AssessmentBlueprint`, `StudentProgress`, `Mastery`, `Recommendation`.
- **Block-Based Lesson Engine**: `LessonRenderer` & `BlockRenderer`.
- **Unified Tactical Engine**: Single reusable component for Pitch visuals and interactions across all contexts.
- **Admin CMS & Content Pipeline (`/admin/...`)**: Document upload, Docling parsing viewer, Knowledge extraction review, Evidence viewer, Curriculum builder, Question Bank editor, Assessment blueprint builder.
- **Source Traceability**: Evidence linking from Questions & Knowledge to exact PDF pages/sections.
- **Mastery Tracking**: Mastery vs Completion metrics and evidence-based personalized recommendations.
- **Unresolved Model Handling**: Explicit `UNRESOLVED MODEL` classification for unnamed source models.

---

## 11. Exact Phase 01 Execution Steps
1. Create `ARCHITECTURE_AUDIT.md` (Completed).
2. Create foundational domain structure (`src/lib/domain/` and subdomains).
3. Create standardized entity TypeScript interfaces and schemas according to specification.
4. Establish clean domain UI primitive tokens (`src/components/ui/`) and feature boundaries (`src/components/domain/`).
5. Begin Phase 02 (Foundation Refactor) & Phase 03 (Data Model) to construct a complete vertical slice.
