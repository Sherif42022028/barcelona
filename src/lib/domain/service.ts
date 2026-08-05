import {
  STAGES_DATA,
  MODULES_DATA,
  LESSONS_DATA,
  INITIAL_KNOWLEDGE,
  TACTICAL_SCENARIOS_DATA,
  QUESTIONS_DATA,
  ASSESSMENTS_DATA,
  INITIAL_DOCUMENTS,
  INITIAL_PROGRESS,
  INITIAL_MASTERY,
  INITIAL_RECOMMENDATIONS
} from './store';
import {
  CurriculumStage,
  CurriculumModule,
  Lesson,
  KnowledgeObject,
  TacticalScenario,
  Question,
  Assessment,
  SourceDocument,
  StudentProgress,
  KnowledgeMastery,
  PersonalizedRecommendation,
  AssessmentAttempt
} from './types';

class DomainService {
  private stages: CurriculumStage[] = [...STAGES_DATA];
  private modules: CurriculumModule[] = [...MODULES_DATA];
  private lessons: Lesson[] = [...LESSONS_DATA];
  private knowledge: KnowledgeObject[] = [...INITIAL_KNOWLEDGE];
  private scenarios: TacticalScenario[] = [...TACTICAL_SCENARIOS_DATA];
  private questions: Question[] = [...QUESTIONS_DATA];
  private assessments: Assessment[] = [...ASSESSMENTS_DATA];
  private documents: SourceDocument[] = [...INITIAL_DOCUMENTS];
  private progress: StudentProgress = { ...INITIAL_PROGRESS };
  private mastery: KnowledgeMastery[] = [...INITIAL_MASTERY];
  private recommendations: PersonalizedRecommendation[] = [...INITIAL_RECOMMENDATIONS];

  // 1. Stages & Modules
  getStages(): CurriculumStage[] {
    return this.stages;
  }

  getStageById(id: string): CurriculumStage | undefined {
    return this.stages.find((s) => s.id === id);
  }

  getModules(stageId?: string): CurriculumModule[] {
    if (stageId) {
      return this.modules.filter((m) => m.stageId === stageId);
    }
    return this.modules;
  }

  getModuleById(id: string): CurriculumModule | undefined {
    return this.modules.find((m) => m.id === id);
  }

  // 2. Lessons & Blocks
  getLessons(moduleId?: string): Lesson[] {
    if (moduleId) {
      return this.lessons.filter((l) => l.moduleId === moduleId);
    }
    return this.lessons;
  }

  getLessonById(id: string): Lesson | undefined {
    return this.lessons.find((l) => l.id === id);
  }

  // 3. Knowledge Base
  getKnowledgeList(): KnowledgeObject[] {
    return this.knowledge;
  }

  getKnowledgeById(id: string): KnowledgeObject | undefined {
    return this.knowledge.find((k) => k.id === id);
  }

  getKnowledgeUsages(knowledgeId: string) {
    const usedInModules = this.modules.filter((m) => m.knowledgeIds?.includes(knowledgeId));
    const usedInLessons = this.lessons.filter((l) => l.knowledgeIds?.includes(knowledgeId));
    const usedInScenarios = this.scenarios.filter((s) => s.knowledgeIds?.includes(knowledgeId));
    const usedInQuestions = this.questions.filter((q) => q.knowledgeId === knowledgeId);

    return {
      modules: usedInModules,
      lessons: usedInLessons,
      scenarios: usedInScenarios,
      questions: usedInQuestions
    };
  }

  // 4. Tactical Scenarios
  getTacticalScenarios(): TacticalScenario[] {
    return this.scenarios;
  }

  getTacticalScenarioById(id: string): TacticalScenario | undefined {
    return this.scenarios.find((s) => s.id === id);
  }

  // 5. Question Bank & Assessments
  getQuestions(knowledgeId?: string): Question[] {
    if (knowledgeId) {
      return this.questions.filter((q) => q.knowledgeId === knowledgeId);
    }
    return this.questions;
  }

  getQuestionById(id: string): Question | undefined {
    return this.questions.find((q) => q.id === id);
  }

  getAssessments(moduleId?: string): Assessment[] {
    if (moduleId) {
      return this.assessments.filter((a) => a.moduleId === moduleId);
    }
    return this.assessments;
  }

  getAssessmentById(id: string): Assessment | undefined {
    return this.assessments.find((a) => a.id === id);
  }

  // 6. Source Documents
  getSourceDocuments(): SourceDocument[] {
    return this.documents;
  }

  getSourceDocumentById(id: string): SourceDocument | undefined {
    return this.documents.find((d) => d.id === id);
  }

  // 7. Student Progress & Mastery
  getStudentProgress(): StudentProgress {
    return this.progress;
  }

  completeLesson(lessonId: string) {
    if (!this.progress.completedLessonIds.includes(lessonId)) {
      this.progress.completedLessonIds.push(lessonId);
    }
    this.progress.lessonProgress[lessonId] = {
      lessonId,
      completed: true,
      completedAt: new Date().toISOString(),
      lastBlockIndex: 99
    };

    // Check if parent module is now fully completed
    const lesson = this.getLessonById(lessonId);
    if (lesson) {
      const moduleLessons = this.getLessons(lesson.moduleId);
      const allDone = moduleLessons.every((l) => this.progress.completedLessonIds.includes(l.id));
      if (allDone && !this.progress.completedModuleIds.includes(lesson.moduleId)) {
        this.progress.completedModuleIds.push(lesson.moduleId);
      }
    }
    this.progress.updatedAt = new Date().toISOString();
  }

  recordAssessmentAttempt(attempt: AssessmentAttempt) {
    this.progress.assessmentHistory.push(attempt);
    this.progress.updatedAt = new Date().toISOString();
  }

  getKnowledgeMastery(): KnowledgeMastery[] {
    return this.mastery;
  }

  getRecommendations(): PersonalizedRecommendation[] {
    return this.recommendations;
  }

  // 8. Global Search
  searchAll(query: string) {
    const q = query.toLowerCase().trim();
    if (!q) return { knowledge: [], lessons: [], scenarios: [], questions: [], documents: [] };

    return {
      knowledge: this.knowledge.filter((k) => k.title.toLowerCase().includes(q) || k.definition.toLowerCase().includes(q)),
      lessons: this.lessons.filter((l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)),
      scenarios: this.scenarios.filter((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)),
      questions: this.questions.filter((quest) => quest.questionText.toLowerCase().includes(q)),
      documents: this.documents.filter((d) => d.title.toLowerCase().includes(q) || d.filename.toLowerCase().includes(q))
    };
  }
}

export const domainService = new DomainService();
