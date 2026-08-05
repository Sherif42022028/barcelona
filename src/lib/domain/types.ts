/**
 * FC Barcelona Methodology Academy — Core Domain Entities & Schemas
 */

// ==========================================
// 1. SOURCE DOCUMENTATION & EVIDENCE
// ==========================================

export type DocumentStatus = 'UPLOADED' | 'PROCESSING' | 'PROCESSED' | 'FAILED' | 'NEEDS_REVIEW' | 'APPROVED' | 'ARCHIVED';

export interface SourceDocument {
  id: string;
  title: string;
  filename: string;
  fileSize: number;
  fileType: 'PDF' | 'DOCX' | 'TXT' | 'MARKDOWN';
  source: string;
  version: string;
  language: 'en' | 'ar';
  uploadedAt: string;
  status: DocumentStatus;
  pageCount?: number;
  metadata?: Record<string, any>;
}

export interface DocumentSection {
  id: string;
  documentId: string;
  title: string;
  chapterIndex?: number;
  sectionIndex?: number;
  startPage?: number;
  endPage?: number;
  content: string;
  parentSectionId?: string;
}

export interface SourceEvidence {
  id: string;
  documentId: string;
  documentTitle: string;
  sectionId?: string;
  sectionTitle?: string;
  pageNumber?: number;
  excerpt: string;
  confidenceScore?: number;
}

// ==========================================
// 2. KNOWLEDGE BASE & GRAPH
// ==========================================

export type KnowledgeType =
  | 'CONCEPT'
  | 'MODEL'
  | 'FRAMEWORK'
  | 'PRINCIPLE'
  | 'RULE'
  | 'METHOD'
  | 'PROCESS'
  | 'TACTICAL_PATTERN'
  | 'EXAMPLE'
  | 'CASE'
  | 'TERM'
  | 'UNRESOLVED_MODEL';

export type KnowledgeStatus = 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';

export interface KnowledgeObject {
  id: string;
  title: string;
  type: KnowledgeType;
  definition: string;
  description: string;
  sourceEvidences: SourceEvidence[];
  confidence: number;
  status: KnowledgeStatus;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

export type KnowledgeRelationType =
  | 'RELATED_TO'
  | 'SUPPORTS'
  | 'APPLIED_IN'
  | 'DEPENDS_ON'
  | 'EXAMPLE_OF'
  | 'CONTRASTS_WITH'
  | 'PART_OF';

export interface KnowledgeRelation {
  id: string;
  sourceKnowledgeId: string;
  targetKnowledgeId: string;
  relationType: KnowledgeRelationType;
  evidence?: SourceEvidence;
}

// ==========================================
// 3. CURRICULUM ARCHITECTURE
// ==========================================

export type StageId = 'stage-01' | 'stage-02' | 'stage-03' | 'stage-04';

export interface CurriculumStage {
  id: StageId;
  stageNumber: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  description: string;
  objectives: string[];
  moduleIds: string[];
  status: 'AVAILABLE' | 'LOCKED' | 'COMPLETED';
}

export interface LearningObjective {
  id: string;
  moduleId: string;
  statement: string;
  cognitiveLevel: 'RECALL' | 'UNDERSTAND' | 'APPLY' | 'ANALYZE' | 'EVALUATE';
  targetKnowledgeIds: string[];
}

export interface CurriculumModule {
  id: string;
  stageId: StageId;
  order: number;
  numberStr: string;
  title: string;
  subtitle: string;
  description: string;
  positionRole: string;
  pitchPosition: { x: number; y: number };
  learningObjectives: LearningObjective[];
  prerequisites: string[];
  knowledgeIds: string[];
  lessonIds: string[];
  practiceScenarioIds: string[];
  assessmentId?: string;
  status: 'DRAFT' | 'PUBLISHED';
}

// ==========================================
// 4. LESSON ENGINE & CONTENT BLOCKS
// ==========================================

export type BlockType =
  | 'TEXT'
  | 'IMAGE'
  | 'VIDEO'
  | 'DIAGRAM'
  | 'TACTICAL'
  | 'EXAMPLE'
  | 'KNOWLEDGE_CHECK'
  | 'CALLOUT'
  | 'SUMMARY';

export interface LessonBlock {
  id: string;
  lessonId: string;
  order: number;
  type: BlockType;
  content: {
    text?: string;
    title?: string;
    mediaUrl?: string;
    caption?: string;
    tacticalScenarioId?: string;
    knowledgeCheckQuestionId?: string;
    highlightText?: string;
    calloutType?: 'info' | 'tip' | 'warning' | 'principle';
  };
}

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  estimatedDurationMinutes: number;
  objectiveIds: string[];
  knowledgeIds: string[];
  blocks: LessonBlock[];
  status: 'DRAFT' | 'PUBLISHED';
}

// ==========================================
// 5. REUSABLE TACTICAL ENGINE
// ==========================================

export type TeamSide = 'home' | 'away';

export interface PlayerState {
  id: string;
  label: string;
  role: string;
  team: TeamSide;
  x: number; // 0 to 100 percentage of pitch width
  y: number; // 0 to 100 percentage of pitch height
  highlighted?: boolean;
}

export interface TacticalPassLine {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  dashed?: boolean;
}

export interface TacticalZone {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

export interface TacticalState {
  id: string;
  ballPosition: { x: number; y: number };
  players: PlayerState[];
  passLines?: TacticalPassLine[];
  zones?: TacticalZone[];
}

export interface TacticalSequence {
  id: string;
  scenarioId: string;
  states: TacticalState[];
  durationMs: number;
}

export interface TacticalOption {
  id: string;
  text: string;
  isCorrect: boolean;
  tacticalExplanation: string;
  targetPlayerId?: string;
  resultingState?: TacticalState;
}

export interface TacticalScenario {
  id: string;
  title: string;
  description: string;
  knowledgeIds: string[];
  initialState: TacticalState;
  expectedState?: TacticalState;
  targetZone?: TacticalZone;
  sequence?: TacticalSequence;
  options: TacticalOption[];
  rubricId?: string;
  sourceEvidence?: SourceEvidence;
}

// ==========================================
// 6. QUESTION BANK & ASSESSMENT ENGINE
// ==========================================

export type QuestionType =
  | 'MCQ'
  | 'MULTI_SELECT'
  | 'TRUE_FALSE'
  | 'ORDERING'
  | 'MATCHING'
  | 'SCENARIO'
  | 'TACTICAL_POSITIONING'
  | 'OPEN_RESPONSE';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  targetPlayerId?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  knowledgeId: string;
  objectiveId: string;
  cognitiveLevel: 'RECALL' | 'UNDERSTAND' | 'APPLY' | 'ANALYZE' | 'EVALUATE';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
  options: QuestionOption[];
  tacticalScenarioId?: string;
  rubricId?: string;
  sourceEvidence?: SourceEvidence;
  status: 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'PUBLISHED';
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  weightPercentage: number;
  maxScore: number;
}

export interface AssessmentRubric {
  id: string;
  title: string;
  criteria: RubricCriterion[];
  totalScore: number;
}

export type AssessmentType =
  | 'KNOWLEDGE_CHECK'
  | 'PRACTICE_TEST'
  | 'MODULE_ASSESSMENT'
  | 'STAGE_ASSESSMENT'
  | 'FINAL_EXAM';

export interface AssessmentBlueprint {
  id: string;
  assessmentId: string;
  cognitiveDistribution: {
    RECALL: number;
    UNDERSTAND: number;
    APPLY: number;
    ANALYZE: number;
    EVALUATE: number;
  };
  totalQuestions: number;
}

export interface Assessment {
  id: string;
  title: string;
  type: AssessmentType;
  stageId?: StageId;
  moduleId?: string;
  durationMinutes: number;
  passingScorePercentage: number;
  maxAttempts: number;
  blueprint?: AssessmentBlueprint;
  questionIds: string[];
  status: 'DRAFT' | 'PUBLISHED';
}

export interface StudentAnswer {
  questionId: string;
  selectedOptionId?: string;
  selectedOptionIds?: string[];
  openResponseText?: string;
  tacticalResponse?: {
    selectedPlayerId?: string;
    positionedCoordinates?: { x: number; y: number };
  };
  isCorrect?: boolean;
  scoreAwarded: number;
  feedback?: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  studentId: string;
  version: number;
  startedAt: string;
  submittedAt?: string;
  answers: StudentAnswer[];
  totalScorePercentage: number;
  passed: boolean;
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'EVALUATED';
}

// ==========================================
// 7. STUDENT PROGRESS & MASTERY ENGINE
// ==========================================

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  lastBlockIndex: number;
}

export interface StudentProgress {
  studentId: string;
  stageProgress: Record<StageId, number>; // Percentage
  completedModuleIds: string[];
  completedLessonIds: string[];
  lessonProgress: Record<string, LessonProgress>; // lessonId -> LessonProgress
  assessmentHistory: AssessmentAttempt[];
  updatedAt: string;
}

export interface KnowledgeMastery {
  knowledgeId: string;
  knowledgeTitle: string;
  scorePercentage: number;
  confidence: number;
  evidenceCount: number;
  updatedAt: string;
}

export interface PersonalizedRecommendation {
  id: string;
  studentId: string;
  type: 'REVIEW_LESSON' | 'PRACTICE_SCENARIO' | 'RETAKE_ASSESSMENT';
  targetId: string; // lessonId, scenarioId, or assessmentId
  title: string;
  reason: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}
