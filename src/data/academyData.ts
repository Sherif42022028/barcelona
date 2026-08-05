export interface SkillMetric {
  id: string;
  name: string;
  nameAr: string;
  level: number; // percentage 0 - 100
  category: string;
}

export interface AnalyticalFramework {
  id: string;
  numberStr: string;
  title: string;
  subtitle: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  keyPoints: string[];
  visualType: "structure" | "dynamic" | "decision" | "transition";
  relatedLessonIds: string[];
}

export interface LessonStepData {
  stepNumber: number;
  stepKey: "LEARN" | "SEE" | "DECONSTRUCT" | "THINK" | "DECIDE" | "FEEDBACK" | "APPLY" | "ASSESS";
  title: string;
  content: string;
  tacticalPrompt?: string;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }>;
}

export interface LessonData {
  id: string;
  moduleId: string;
  stageId: string;
  title: string;
  subtitle: string;
  type: "Concept" | "Framework" | "Application";
  estimatedMinutes: number;
  summary: string;
  steps: LessonStepData[];
  pitchScenario?: {
    ballPosition: { x: number; y: number };
    players: Array<{
      id: string;
      role: string;
      x: number;
      y: number;
      team: 'home' | 'away';
      label: string;
      highlighted?: boolean;
    }>;
    passLines?: Array<{ fromX: number; fromY: number; toX: number; toY: number; dashed?: boolean }>;
  };
}

export interface ModuleData {
  id: string;
  stageId: string;
  numberStr: string;
  title: string;
  subtitle: string;
  description: string;
  lessons: LessonData[];
}

export interface StageData {
  id: string; // 'build' | 'read' | 'analyze' | 'implement'
  numberStr: string;
  codeName: string; // BUILD, READ, ANALYZE, IMPLEMENT
  title: string;
  subtitle: string;
  question: string;
  description: string;
  unlocked: boolean;
  progress: number;
  modules: ModuleData[];
}

export interface MatchAnalysisCase {
  id: string;
  title: string;
  matchTitle: string;
  minuteTimestamp: string;
  phase: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questionText: string;
  frameworkId: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    scoreMetrics: {
      structure: number;
      decision: number;
      comprehension: number;
    };
  }>;
}

export const SKILL_METRICS: SkillMetric[] = [
  { id: "s1", name: "Decision Making", nameAr: "اتخاذ القرار التكتيكي", level: 72, category: "Core" },
  { id: "s2", name: "Structural Analysis", nameAr: "التحليل الهيكلي للملعب", level: 61, category: "Tactical" },
  { id: "s3", name: "Dynamic Analysis", nameAr: "تحليل العناصر الديناميكية والإيقاع", level: 48, category: "Tactical" },
  { id: "s4", name: "Positioning", nameAr: "التموضُع ورصد المساحة", level: 67, category: "Spatial" },
  { id: "s5", name: "Game Reading", nameAr: "قراءة المباراة والخصم", level: 55, category: "Analysis" },
  { id: "s6", name: "Training Implementation", nameAr: "تصميم التمارين والتطبيق", level: 40, category: "Execution" }
];

export const FRAMEWORKS: AnalyticalFramework[] = [
  {
    id: "fw-01",
    numberStr: "01",
    title: "Decision Evaluation & Comprehension",
    subtitle: "تقييم وفهم مسار القرار التكتيكي",
    difficulty: "Beginner",
    description: "إطار عمل مخصص لتحليل القرار التكتيكي للاعب المستحوذ بناءً على زاوية الرؤية، وضعية الجسد، وموقعية الخيار الأفضل.",
    keyPoints: [
      "رصد التوجه الجسدي المفتوح للاعب قبل استلام الكرة.",
      "تحديد ما إذا كان القرار المختار يفتح مجالاً للتقدم أم يحافظ على الهيكل فقط.",
      "قياس توقيت التمرير مقارنة بمسافة اندفاع المدافع المنافس."
    ],
    visualType: "decision",
    relatedLessonIds: ["l-1-1", "l-1-2"]
  },
  {
    id: "fw-02",
    numberStr: "02",
    title: "Study of the Structural Element",
    subtitle: "دراسة العناصر الهيكلية والاتساع",
    difficulty: "Intermediate",
    description: "أداة تفكيك وتحديد الهيكل البنائي للفريق (Substructures) في العمق والاتساع والممر الرأسي.",
    keyPoints: [
      "تقسيم الملعب إلى 4 مناطق (Zones A, B, C, D) و 4 ممرات طولي.",
      "تحديد الخط البنائي (البناء بـ 4 أو 3 أو 2 لاعبين).",
      "رصد تمركز الأظهرة والأجنحة على خط التماس لتوسيع المسافات بين المدافعين."
    ],
    visualType: "structure",
    relatedLessonIds: ["l-2-1", "l-2-2"]
  },
  {
    id: "fw-03",
    numberStr: "03",
    title: "Study of the Dynamic Element",
    subtitle: "دراسة العناصر الديناميكية والتحكم بالإيقاع",
    difficulty: "Intermediate",
    description: "تحليل حركة الكرة واللاعبين، تسريع وتبطيء الإيقاع (La Pausa)، واستفزاز ضغط المنافس.",
    keyPoints: [
      "تطبيق التريث (La Pausa) لإغراء المدافع بالاندفاع وترك المساحة خلفه.",
      "التمرير بالقدم البعيدة لتجاوز زوايا ضغط الخصم المباشرة.",
      "التحول من التدوير البطيء في الخلف للتمرير العمودي الخاطف."
    ],
    visualType: "dynamic",
    relatedLessonIds: ["l-3-1"]
  },
  {
    id: "fw-04",
    numberStr: "04",
    title: "Rest Defense & Loss of Possession",
    subtitle: "التغطية الوقائية وضغط ما بعد فقدان الكرة",
    difficulty: "Advanced",
    description: "تأمين الفريق أثناء الهجوم وضغط الـ 5 ثواني العكسي (Gegenpressing) فور فقدان الكرة.",
    keyPoints: [
      "تمركز الارتكاز والمدافعين في قنوات المرتدات أثناء الهجوم.",
      "رد الفعل الانقضاضي الشرس في أول ثانيتين بعد فقدان الكرة.",
      "حصر حامل الكرة نحو خط التماس لتقليل خيارات التمرير."
    ],
    visualType: "transition",
    relatedLessonIds: ["l-4-1"]
  }
];

export const STAGES_DATA: StageData[] = [
  {
    id: "build",
    numberStr: "01",
    codeName: "BUILD",
    title: "Building from the Back",
    subtitle: "بناء اللعب واللعب الموضعي",
    question: "كيف نبني اللعب من الخلف ونخلق التفوق العددي؟",
    description: "تأسيس مفهوم اللعب الموضعي (Juego de Posición)، البناء الثلاثي والرباعي، ودور حارس المرمى والارتكاز والظهيرين.",
    unlocked: true,
    progress: 68,
    modules: [
      {
        id: "m-1",
        stageId: "build",
        numberStr: "01",
        title: "Positional Play Foundations",
        subtitle: "أسس اللعب الموضعي والتفوق العددي",
        description: "فهم أسس اللعب الموضعي وكيف يخلق حارس المرمى وقلبا الدفاع التفوق التموقعي الأول.",
        lessons: [
          {
            id: "l-1-1",
            moduleId: "m-1",
            stageId: "build",
            title: "Numerical Superiority & The Free Player",
            subtitle: "التفوق العددي واللاعب الحر",
            type: "Concept",
            estimatedMinutes: 12,
            summary: "استخدام حارس المرمى كلاعب ارتكاز إضافي لتحويل البناء إلى 11v10 دائم.",
            pitchScenario: {
              ballPosition: { x: 50, y: 85 },
              players: [
                { id: "gk", role: "GK", x: 50, y: 88, team: "home", label: "GK (حامل الكرة)", highlighted: true },
                { id: "cb1", role: "CB", x: 32, y: 72, team: "home", label: "CB اليسار" },
                { id: "cb2", role: "CB", x: 68, y: 72, team: "home", label: "CB اليمين" },
                { id: "cdm", role: "DM", x: 50, y: 55, team: "home", label: "CDM (الرجل الثالث)" },
                { id: "opp1", role: "ST", x: 40, y: 78, team: "away", label: "خصم 1" },
                { id: "opp2", role: "ST", x: 60, y: 78, team: "away", label: "خصم 2" }
              ],
              passLines: [{ fromX: 50, fromY: 88, toX: 50, toY: 55 }]
            },
            steps: [
              {
                stepNumber: 1,
                stepKey: "LEARN",
                title: "المفهوم: التفوق العددي من حارس المرمى",
                content: "في بناء الهجمة من الخلف، حارس المرمى ليس مجرد حارس، بل هو قلب دفاع إضافي يخلق تفوقاً عددياً حتمياً بوجود 11 لاعباً ضد 10 مدافعين."
              },
              {
                stepNumber: 2,
                stepKey: "SEE",
                title: "شاهد الموقف على الملعب",
                content: "لاحظ كيف يتمركز حارس المرمى بين قلبي الدفاع بينما يندفع مهاجما الخصم للضغط."
              },
              {
                stepNumber: 3,
                stepKey: "DECONSTRUCT",
                title: "تفكيك الحالة التكتيكية",
                content: "المهاجمان يغلقان زاوية التمرير المباشرة نحو المدافعين، لكنهما يتركان مساحة الارتكاز (الرجل الثالث) شاغرة في العمق."
              },
              {
                stepNumber: 4,
                stepKey: "THINK",
                title: "فكر في خيار التمرير الأمثل",
                content: "ما هو القرار الذي يحافظ على تفوق فريقك وتجاوز خط الضغط الأول بنجاح؟"
              },
              {
                stepNumber: 5,
                stepKey: "DECIDE",
                title: "اتخذ القرار التكتيكي",
                content: "اختر التمريرة الأكثر مثالية بناءً على وضعية اللاعبين على الملعب:",
                options: [
                  {
                    id: "opt-a",
                    text: "التمرير المباشر لقلب الدفاع الأيسر المضغوط",
                    isCorrect: false,
                    feedback: "تمريرة تضع قلب الدفاع في مصيدة ضغط التماس وتخسر ميزة التفوق التموقعي."
                  },
                  {
                    id: "opt-b",
                    text: "التمرير المباشر للاعب الارتكاز (الرجل الثالث) الحر في العمق",
                    isCorrect: true,
                    feedback: "ممتاز! تطبيق مثالي لمبدأ التثبيت والرجل الثالث لكسر ضغط خط هجوم الخصم."
                  }
                ]
              },
              {
                stepNumber: 6,
                stepKey: "FEEDBACK",
                title: "التحليل والتقييم التكتيكي",
                content: "اختيارك للاعب الارتكاز سمح بتجاوز المهاجمين الضغاطين دون مجازفة وحافظ على الترتيب الهيكلي للفريق."
              },
              {
                stepNumber: 7,
                stepKey: "APPLY",
                title: "تطبيق المفهوم في التمرين",
                content: "تطبيق تمرين Positional Game (3v2 + GK) بمساحة محددة لتعويد اللاعبين على استخدام الحارس كمنشئ للبناء."
              },
              {
                stepNumber: 8,
                stepKey: "ASSESS",
                title: "التقييم الشامل والترقية",
                content: "تم إتقان مفهوم التفوق العددي واللاعب الحر بنجاح وترقية مهارة Decision Making."
              }
            ]
          }
        ]
      },
      {
        id: "m-2",
        stageId: "build",
        numberStr: "02",
        title: "Lavolpiana Build-up & Width",
        subtitle: "البناء الثلاثي والـ Salida Lavolpiana",
        description: "نزول لاعب الارتكاز بين المدافعين وتحرير الظهيرين لأقصى التماس.",
        lessons: [
          {
            id: "l-2-1",
            moduleId: "m-2",
            stageId: "build",
            title: "Salida Lavolpiana Execution",
            subtitle: "تكتيك الخروج بالكرة بـ 3 مدافعين",
            type: "Framework",
            estimatedMinutes: 15,
            summary: "تحليل نزول الارتكاز وتوسع المدافعين وصعود الأظهرة.",
            steps: [
              {
                stepNumber: 1,
                stepKey: "LEARN",
                title: "المفهوم: الـ Salida Lavolpiana",
                content: "نزول لاعب الارتكاز (Pivote) بين قلبي الدفاع مع توسع قلب الدفاع لخط التماس وصعود الأظهرة لأعلى لمنح الاتساع الفائق."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "read",
    numberStr: "02",
    codeName: "READ",
    title: "Opposition & Phase Analysis",
    subtitle: "تحليل الخصوم والكتل الدفاعية",
    question: "كيف نقرأ الخصم والمرحلة والمساحات في الملعب؟",
    description: "قراءة كتل الضغط (High, Mid, Low Block)، تحليل العلاقات التموقعية، وتحديد الثغرات التكتيكية في هيكل الخصم.",
    unlocked: false,
    progress: 0,
    modules: [
      {
        id: "m-3",
        stageId: "read",
        numberStr: "03",
        title: "Pressing Blocks & Spatial Analysis",
        subtitle: "تفكيك كتل الضغط والمساحات",
        description: "تحليل ضغط الخصم المرتفع والمنخفض واستغلال المساحة المتروكة.",
        lessons: []
      }
    ]
  },
  {
    id: "analyze",
    numberStr: "03",
    codeName: "ANALYZE",
    title: "Match Analysis Lab",
    subtitle: "مختبر تحليل المباريات والحالات الحية",
    question: "كيف نحول المشاهدة البصرية إلى قرار تكتيكي محدد؟",
    description: "متابعة الحالات الحية، رصد التغيرات الهيكلية، واستخراج التقرير الفني المباشر.",
    unlocked: false,
    progress: 0,
    modules: []
  },
  {
    id: "implement",
    numberStr: "04",
    codeName: "IMPLEMENT",
    title: "Tactics, Positioning & Training",
    subtitle: "التطبيق، تصميم التمارين والمشروع النهائي",
    question: "كيف أحول الفكرة والتحليل إلى تمرين تدريبي في الملعب؟",
    description: "تصميم التمارين التدريبية (Rondos, Position Games)، التطبيق التكتيكي، والترخيص النهائي.",
    unlocked: false,
    progress: 0,
    modules: []
  }
];

export const MATCH_CASES: MatchAnalysisCase[] = [
  {
    id: "mc-1",
    title: "تحليل موقف: بناء اللعب ضد الضغط العالي الخانق",
    matchTitle: "FC Barcelona vs Real Madrid",
    minuteTimestamp: "34:12",
    phase: "Build-up under High Press",
    difficulty: "Intermediate",
    questionText: "الخصم يضغط بـ 3 مهاجمين على قلبي الدفاع والارتكاز. ما هو الخيار الهيكلي الأنسب لكسر هذا الضغط؟",
    frameworkId: "fw-02",
    options: [
      {
        id: "a1",
        text: "نزول لاعب الوسط الداخلي (Interior) لخلق تفوق 4v3 وتوفير خيار التمرير القطري",
        isCorrect: true,
        explanation: "ممتاز! نزول لاعب الوسط الداخلي يوفر التفوق العددي والزاوية القطرية لكسر خط الضغط.",
        scoreMetrics: { structure: 85, decision: 90, comprehension: 88 }
      },
      {
        id: "a2",
        text: "إرسال كرة طولية مباشرة لأقصر جناح",
        isCorrect: false,
        explanation: "تمريرة خاطئة تسبب فقدان سريع للكرة في صراع هوائي غير متكافئ.",
        scoreMetrics: { structure: 40, decision: 30, comprehension: 35 }
      }
    ]
  }
];
