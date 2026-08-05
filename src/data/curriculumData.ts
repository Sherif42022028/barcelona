export interface BentoItem {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  highlightText?: string;
}

export interface ChallengeOption {
  id: string;
  text: string;
  isCorrect: boolean;
  tacticalExplanation: string;
  targetPlayerId?: string;
}

export interface TacticalChallenge {
  id: string;
  title: string;
  scenarioDescription: string;
  pitchState: {
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
  options: ChallengeOption[];
}

export interface Question {
  id: string;
  questionText: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }>;
  tacticalDiagramHint?: string;
}

export interface ModuleData {
  id: string;
  monthId: number; // 1, 2, 3, 4
  numberStr: string;
  title: string;
  subtitle: string;
  positionRole: string;
  pitchPosition: { x: number; y: number };
  summary: string;
  bentoItems: BentoItem[];
  fiveTacticalRules: string[];
  challenge: TacticalChallenge;
  examQuestions: Question[];
}

export interface MonthData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export const MONTHS_DATA: MonthData[] = [
  {
    id: 1,
    title: "الشهر الأول: فلسفة وأسس اللعب الموضعي",
    subtitle: "Month 1: Positional Play Foundations",
    description: "بناء اللعب من الخلف، التفوق العددي، العناصر الهيكلية والديناميكية والتغطية الوقائية.",
    iconName: "Compass"
  },
  {
    id: 2,
    title: "الشهر الثاني: تحليل المنافس والتكتيك المضاد",
    subtitle: "Month 2: Opponent Analysis",
    description: "دراسة هياكل المنافسين، كسر ضغط الـ High/Mid-Block وتفكيك التكتلات التكتيكية.",
    iconName: "Search"
  },
  {
    id: 3,
    title: "الشهر الثالث: تحليل المباريات والتتبع المباشر",
    subtitle: "Month 3: Match Analysis",
    description: "التحليل البصري الحي أثناء المباراة، قياس مؤشرات الأداء وتتبع الأخطاء الميدانية.",
    iconName: "Activity"
  },
  {
    id: 4,
    title: "الشهر الرابع: التكنولوجيا وتصميم التدريب والتطبيق",
    subtitle: "Month 4: Implem. & Tech Processes",
    description: "استخدام البرمجيات والتكنولوجيا الحديثة، تصميم التمارين التدريبية بناءً على التحليل.",
    iconName: "Cpu"
  }
];

export const MODULES_DATA: ModuleData[] = [
  // --- MONTH 1 ---
  {
    id: "m1-mod-1",
    monthId: 1,
    numberStr: "01",
    title: "فلسفة اللعب الموضعي والتفوق التموقعي",
    subtitle: "Definition & Comprehension of Positional Play",
    positionRole: "GK & CBs - حارس المرمى وقلبا الدفاع",
    pitchPosition: { x: 50, y: 88 },
    summary: "تحليل التفوق العددي الأول (11v10)، ومفهوم الرجل الثالث (Third Man)، وكيفية التثبيت (Fixing the Opponent) للانتقال من المنطقة A إلى B.",
    bentoItems: [
      {
        title: "التفوق العددي والتموقعي (Numerical & Positional)",
        subtitle: "حارس المرمى كلاعب إضافي",
        description: "استخدام حارس المرمى داخل منطقة الجزاء كلاعب ارتكاز إضافي لتحويل الضغط إلى 11 ضد 10 دائماً وإجبار المهاجم الضغاط على التردد.",
        iconName: "Shield",
        highlightText: "11 vs 10 Always"
      },
      {
        title: "مبدأ الرجل الثالث (The Third Man Concept)",
        subtitle: "التمرير المباشر مقابل التمرير الوسيط",
        description: "عند إغلاق زاوية التمرير المباشرة نحو المهاجم، يتم الاعتماد على لاعب الوسط الوسيط (الرجل الثاني) ليحول الكرة فوراً للرجل الثالث الشاغر.",
        iconName: "GitMerge",
        highlightText: "A ➔ B ➔ C"
      },
      {
        title: "تثبيت المدافع (Fixing the Opponent)",
        subtitle: "جذب الضغط قبل تحرير الكرة",
        description: "التقدم بالكرة نحو المدافع لجذبه وتثبيته في موقعه حتى يترك المساحة خلفه، ثم تمرير الكرة في لحظة الـ Release المثالية.",
        iconName: "Target",
        highlightText: "Attract & Release"
      }
    ],
    fiveTacticalRules: [
      "حارس المرمى هو المنشئ الأول للتفوق العددي وتحديد رتم البناء.",
      "لا تمرر مباشرة للاعب مراقب، بل استخدم الرجل الثالث الشاغر بين الخطوط.",
      "استفز مهاجم المنافس للاندفاع نحوك لفتح ثغرة التمرير العمودية.",
      "قف في قنوات التمرير المفتوحة ولا تضيق المساحة على حامل الكرة.",
      "سرعة التمريرة الأرضية هي التي تحدد قدرة الزميل على الاستلام الموجه."
    ],
    challenge: {
      id: "ch-m1-1",
      title: "موقف تكتيكي: كسر ضغط الثنائي المهاجم",
      scenarioDescription: "الخصم يضغط بمهاجمين اثنين على قلبي الدفاع. حارس المرمى يمتلك الكرة والارتكاز يتحرك في الخلف لاستقبال الكرة. ما هو الخيار التكتيكي لكسر هذا الضغط؟",
      pitchState: {
        ballPosition: { x: 50, y: 85 },
        players: [
          { id: "gk", role: "GK", x: 50, y: 88, team: "home", label: "GK (حامل الكرة)", highlighted: true },
          { id: "cb1", role: "CB", x: 32, y: 72, team: "home", label: "CB اليسار" },
          { id: "cb2", role: "CB", x: 68, y: 72, team: "home", label: "CB اليمين" },
          { id: "cdm", role: "DM", x: 50, y: 55, team: "home", label: "CDM (الرجل الثالث)" },
          { id: "opp1", role: "ST", x: 40, y: 78, team: "away", label: "خصم 1" },
          { id: "opp2", role: "ST", x: 60, y: 78, team: "away", label: "خصم 2" }
        ],
        passLines: [
          { fromX: 50, fromY: 88, toX: 50, toY: 55 }
        ]
      },
      options: [
        {
          id: "opt-1",
          text: "التمرير المباشر لقلب الدفاع الأيسر المضغوط فوراً",
          isCorrect: false,
          tacticalExplanation: "تمريرة تضع قلب الدفاع في مصيدة ضغط التماس وتخسر ميزة التفوق التموقعي."
        },
        {
          id: "opt-2",
          text: "التمرير لقلب الدفاع الأيمن لتثبيت المهاجم ثم التمرير الخاطف للاعب الارتكاز (الرجل الثالث) بين الخطوط",
          isCorrect: true,
          tacticalExplanation: "ممتاز! تطبيق مثالي لمبدأ التثبيت والرجل الثالث لكسر ضغط خط هجوم الخصم.",
          targetPlayerId: "cdm"
        }
      ]
    },
    examQuestions: [
      {
        id: "q1",
        questionText: "ما هو الهدف الجوهري لمبدأ 'الرجل الثالث' (Third Man) في منهجية بناء اللعب؟",
        options: [
          { id: "a", text: "التغلب على التغطية المغلقة عبر لاعب وسيط يمرر للاعب الحر غير المراقب في اتجاه المرمى", isCorrect: true, explanation: "إجابة صحيحة! الرجل الثالث يفك التكتل الدفاعي المغلق." },
          { id: "b", text: "تسريع التمرير الطويل المستعرض", isCorrect: false, explanation: "التمرير الطويل ليس هدفه الوصول للرجل الثالث." }
        ]
      }
    ]
  },
  {
    id: "m1-mod-2",
    monthId: 1,
    numberStr: "02",
    title: "الهياكل البنائية والـ Lavolpiana Build-up",
    subtitle: "Structural Elements: 3-Player & 4-Player Build-ups",
    positionRole: "CBs, FBs & Pivote - المدافعون والأظهرة",
    pitchPosition: { x: 30, y: 72 },
    summary: "دراسة بناء اللعب بـ 3 لاعبين (Salida Lavolpiana) وبـ 4 لاعبين، تقسيم الممر الرأسي والأفقي، وتكوين التفوق الكيفي.",
    bentoItems: [
      {
        title: "البناء الثلاثي الميكس (Mixed 3-Player Build-up)",
        subtitle: "خروج الـ Salida Lavolpiana",
        description: "نزول لاعب الارتكاز (Pivote) بين قلبي الدفاع مع توسع قلب الدفاع لخط التماس وصعود الأظهرة لأعلى لمنح الاتساع الفائق.",
        iconName: "Triangle",
        highlightText: "Salida Lavolpiana"
      },
      {
        title: "الاتساع في الرواق الجانبي (Corridors Width)",
        subtitle: "توسيع خطوط دفاع المنافس",
        description: "تمركُز الأظهرة على خط التماس تماماً يمنع الخصم من إغلاق المنتصف، ويجبر خطوطه على التمدد أفقياً.",
        iconName: "Maximize2",
        highlightText: "Stretch Opponent Block"
      },
      {
        title: "التفوق الكيفي (Qualitative Superiority)",
        subtitle: "تجميع اللعب ثم التفريع",
        description: "تجميع التمريرات القصيرة في جبهة واحدة لتجميع دفاع الخصم، ثم إرسال تمريرة قطرية حاسمة للجناح الماهر في وضعية 1v1.",
        iconName: "Zap",
        highlightText: "Overload to Isolate"
      }
    ],
    fiveTacticalRules: [
      "في البناء الثلاثي (Lavolpiana)، يتراجع الارتكاز بين المدافعين لتحرير الظهيرين للأمام.",
      "قف على التماس تماماً لإجبار جناح الخصم على قطع مسافة أطول في الضغط.",
      "لا تقف على نفس الخط الأفقي مع زميلك المباشر لمنع غلق زوايا التمرير.",
      "التمرير القطري المائل يتجاوز خطوط الضغط بشكل أفضل من التمرير المستعرض.",
      "استغل التفوق العددي في الخلف لنقل الكرة بهدوء حتى تظهر الثغرة الداخلية."
    ],
    challenge: {
      id: "ch-m1-2",
      title: "موقف تكتيكي: تطبيق بناء الـ Lavolpiana",
      scenarioDescription: "الخصم يغلق وسط الملعب بـ 4 لاعبين. قلب الدفاع يمتلك الكرة. الارتكاز ينزل بين قلبي الدفاع والظهير الأيمن يرتفع لأقصى التماس.",
      pitchState: {
        ballPosition: { x: 32, y: 72 },
        players: [
          { id: "cb", role: "CB", x: 32, y: 72, team: "home", label: "CB (حامل الكرة)", highlighted: true },
          { id: "cdm", role: "DM", x: 50, y: 80, team: "home", label: "Pivote (نزول للـ Lavolpiana)" },
          { id: "rb", role: "RB", x: 12, y: 48, team: "home", label: "RB (اتساع التماس)" },
          { id: "rw", role: "RW", x: 88, y: 35, team: "home", label: "RW (عزل 1v1)" }
        ],
        passLines: [
          { fromX: 32, fromY: 72, toX: 12, toY: 48 }
        ]
      },
      options: [
        {
          id: "opt-1",
          text: "التمرير المستعرض القطري للظهير الأيمن المرتفع على التماس لتوسيع دفاع الخصم ثم نقل الكرة للجهة الأخرى",
          isCorrect: true,
          tacticalExplanation: "ممتاز! التمرير للظهير على التماس يجبر دفاع الخصم على الانكماش أفقياً وفتح الفجوات الداخلية.",
          targetPlayerId: "rb"
        },
        {
          id: "opt-2",
          text: "التمرير المباشر في منتصف الملعب المغلق باللاعبين",
          isCorrect: false,
          tacticalExplanation: "تمريرة خاطئة تسبب فقدان سريع للكرة."
        }
      ]
    },
    examQuestions: [
      {
        id: "q1",
        questionText: "ما هو الخيار البنائي المسمى بـ 'Lavolpiana Build-up'؟",
        options: [
          { id: "a", text: "نزول لاعب الارتكاز (Pivote) بين قلبي الدفاع وتوسع المدافعين مع صعود الأظهرة للأمام", isCorrect: true, explanation: "إجابة صحيحة! هي طريقة البناء المكس الثلاثية المشهورة." },
          { id: "b", text: "إرسال تمريرة طولية مباشرة للمهاجم الرئيسي", isCorrect: false, explanation: "غير صحيح." }
        ]
      }
    ]
  },
  {
    id: "m1-mod-3",
    monthId: 1,
    numberStr: "03",
    title: "العناصر الديناميكية، وضعية الجسد و La Pausa",
    subtitle: "Dynamic Elements: Oriented Control & La Pausa",
    positionRole: "CDM & Interiors - الارتكاز ولاعبو الوسط",
    pitchPosition: { x: 50, y: 52 },
    summary: "احتراف وضعية الجسد المفتوحة (Oriented Body Shape)، التوقيت التكتيكي للتحكم بالإيقاع، وتكنيك La Pausa لاستفزاز ضغط المنافس.",
    bentoItems: [
      {
        title: "وضعية الجسد المفتوحة (Oriented Body Shape)",
        subtitle: "الرؤية الشاملة قبل الاستلام",
        description: "الاستلام بالقدم البعيدة مع فتح الكتفين بزاوية قطري لرؤية مسار التمرير والخصم قبل وصول الكرة لقدمك.",
        iconName: "Eye",
        highlightText: "Body Facing Forward"
      },
      {
        title: "تكتيك التريث (La Pausa Technique)",
        subtitle: "التوقف لاستفزاز الاندفاع",
        description: "التوقف لجزء من الثانية بالكرة لإغراء مدافع الخصم بالخروج من خطه نحو الكرة، ثم إرسال التمريرة الحاسمة في المساحة المتروكة.",
        iconName: "Flame",
        highlightText: "La Pausa"
      },
      {
        title: "التحكم بالإيقاع (Slow-Slow-FAST)",
        subtitle: "تسير المباراة تكتيكياً",
        description: "التمرير البطيء والمستمر في الخلف لتسكين دفاع الخصم، ثم كسر الخط بتمريرة عمودية خاطفة للانتقال للسرعة القصوى.",
        iconName: "Gauge",
        highlightText: "Rhythm Change"
      }
    ],
    fiveTacticalRules: [
      "استلم بالقدم البعيدة عن اتجاه ضغط الخصم دائماً.",
      "وجّه جسدك بحيث ترى حامل الكرة والمرمى المقابل في نفس الوقت.",
      "استخدم 'La Pausa' (التريث) لجذب المنافس قبل إرسال التمريرة الحسمية.",
      "التمرير السريع بدون هدف ليس مميزاً، التحكم بالإيقاع هو الحاسمالحقيقي.",
      "اتخذ قرار التمرير والتوجيه قبل أن تلمس الكرة قدمك بنصف ثانية."
    ],
    challenge: {
      id: "ch-m1-3",
      title: "موقف تكتيكي: استلام ارتكاز المحور",
      scenarioDescription: "الكرة قادمة إليك كارتكاز من قلب الدفاع. لاعب وسط الخصم يركض خلفك مباشرة. ماذا تفعل بوضعية جسدك؟",
      pitchState: {
        ballPosition: { x: 50, y: 65 },
        players: [
          { id: "cdm", role: "DM", x: 50, y: 52, team: "home", label: "CDM (أنت)", highlighted: true },
          { id: "cb", role: "CB", x: 40, y: 75, team: "home", label: "CB الممرر" },
          { id: "am", role: "AM", x: 65, y: 38, team: "home", label: "Interior (المساحة)" }
        ],
        passLines: [
          { fromX: 50, fromY: 52, toX: 65, toY: 38 }
        ]
      },
      options: [
        {
          id: "opt-1",
          text: "الاستلام بظهرك للمرمى ثم إعادة الكرة فوراً لقلب الدفاع",
          isCorrect: false,
          tacticalExplanation: "تخسر الرؤية الأمامية وتفقد فرصة كسر خط دفاع الخصم."
        },
        {
          id: "opt-2",
          text: "فتح الجسد بزاوية 45 درجة والاستلام بالقدم اليمنى البعيدة للتفوق على المدافع والتمرير للمهاجم الداخلي",
          isCorrect: true,
          tacticalExplanation: "ممتاز! وضعية الجسد المفتوحة سمحت لك برؤية الملعب وتجاوز ضغط المدافع بنمسة واحدة.",
          targetPlayerId: "am"
        }
      ]
    },
    examQuestions: [
      {
        id: "q1",
        questionText: "ماذا يقصد بتكنيك 'La Pausa' في المنهجية التكتيكية؟",
        options: [
          { id: "a", text: "التوقف بالكرة لجزء من الثانية لجذب المدافع وتفريغ المساحة خلفه قبل التمرير", isCorrect: true, explanation: "إجابة صحيحة! La Pausa هي التريث الذكي لاستفزاز ضغط المنافس." },
          { id: "b", text: "التوقف لإعادة ربط حذاء اللاعب", isCorrect: false, explanation: "غير صحيح." }
        ]
      }
    ]
  },
  {
    id: "m1-mod-4",
    monthId: 1,
    numberStr: "04",
    title: "التغطية الوقائية وضغط الـ 5 ثواني العكسي",
    subtitle: "Rest Defense & Gegenpressing in Transition",
    positionRole: "Interiors & Wingers - لاعبو الوسط والأجنحة",
    pitchPosition: { x: 70, y: 35 },
    summary: "كيف تدافع وأنت تهاجم (Rest Defense)، والتكتل السريع لإعادة الاستحواذ في خلال 5 ثوانٍ بعد فقدان الكرة.",
    bentoItems: [
      {
        title: "التغطية الوقائية (Rest Defense Structure)",
        subtitle: "الدفاع أثناء مرحلة الاستحواذ",
        description: "تمركُز قلبي الدفاع والارتكاز في قنوات الهجمات المرتدة أثناء استحواذ فريقك على الكرة في الثلث الهجومي لمنع الانطلاق الخاطف.",
        iconName: "ShieldAlert",
        highlightText: "Defend While Attacking"
      },
      {
        title: "قانون الـ 5 ثواني (5-Second Gegenpress Rule)",
        subtitle: "الضغط العكسي الشرس",
        description: "عند فقدان الكرة، الانقضاض الفوري لأقرب 3 لاعبين خلال أول ثانيتين لإعادة الاستحواذ قبل أن يرتب الخصم هجمته.",
        iconName: "Clock",
        highlightText: "Press Instantly"
      },
      {
        title: "حصر الخصم على التماس (Touchline Trap)",
        subtitle: "تقليل زوايا التمرير",
        description: "توجيه حامل الكرة من الخصم فور استخلاصها نحو خط التماس لتقليل خيارات تمريره بزاوية 180 درجة فقط.",
        iconName: "Compass",
        highlightText: "Touchline Trap"
      }
    ],
    fiveTacticalRules: [
      "التغطية الوقائية (Rest Defense) تبدأ أثناء هجوم فريقك، وليس بعد فقدان الكرة.",
      "سرعة رد الفعل في أول ثانيتين تحسم نجاح عملية الضغط العكسي.",
      "اضغط على حامل الكرة واغلق خط التمرير للاعب القريب في نفس الوقت.",
      "إذا فشل الضغط العكسي في خلال 5 ثوانٍ، ارتد فوراً لتشكيل التكتل المترابط.",
      "التواصل اللفظي والتوجيه بين المدافعين يقلل خطورة الكرات الطولية."
    ],
    challenge: {
      id: "ch-m1-4",
      title: "موقف تكتيكي: فقدان الكرة في ثلث الخصم",
      scenarioDescription: "فقد الجناح الكرة على حدود منطقة جزاء الخصم. ارتكاز الخصم استلم الكرة ويحاول التمرير لمرتدة. ماذا تفعل؟",
      pitchState: {
        ballPosition: { x: 75, y: 30 },
        players: [
          { id: "rw", role: "RW", x: 75, y: 30, team: "home", label: "الجناح (أنت)", highlighted: true },
          { id: "opp", role: "DM", x: 72, y: 32, team: "away", label: "خصم معه الكرة" }
        ],
        passLines: []
      },
      options: [
        {
          id: "opt-1",
          text: "الانقراض الفوري الشرس نحو حامل الكرة وتضييق زاوية التمرير بمساندة لاعب الوسط",
          isCorrect: true,
          tacticalExplanation: "رائع! هذا هو تطبيق ضغط الـ 5 ثواني لمنع المرتدة في مهدها.",
          targetPlayerId: "opp"
        },
        {
          id: "opt-2",
          text: "التراجع الركضي لمنطقة جزائك وانتظار هجوم الخصم",
          isCorrect: false,
          tacticalExplanation: "التراجع يعطي الخصم المساحة والوقت لتنظيم مرتدة خطيرة."
        }
      ]
    },
    examQuestions: [
      {
        id: "q1",
        questionText: "ما هو المفهوم الجوهري للـ Rest Defense (التغطية الوقائية)؟",
        options: [
          { id: "a", text: "تمركُز المدافعين والارتكاز خلف خط الهجوم أثناء استحواذ فريقك على الكرة لمنع المرتدات فوراً عند فقدانها", isCorrect: true, explanation: "إجابة صحيحة! التغطية الوقائية هي التأمين المبكر أثناء الهجوم." },
          { id: "b", text: "إراحة المدافعين وعدم مشاركتهم في أي عمل هجومي", isCorrect: false, explanation: "غير صحيح." }
        ]
      }
    ]
  },

  // --- MONTH 2: Opponent Analysis ---
  {
    id: "m2-mod-1",
    monthId: 2,
    numberStr: "05",
    title: "تحليل هياكل بناء اللعب للمنافس",
    subtitle: "Reading 1: Opponent Build-up & Defensive Structures",
    positionRole: "Scout & Analyst - محلل الأداء التكتيكي",
    pitchPosition: { x: 50, y: 70 },
    summary: "كيف تصنف وتحدد هيكل بناء المنافس (4 في الخلف أم 3 أم 2)، وكيف تكتشف خط البناء البطيء أو نقطة الضعف التموقعية.",
    bentoItems: [
      {
        title: "تصنيف خطوط البناء (4-Player vs 3-Player)",
        subtitle: "تحليل بنية الخصم البنائية",
        description: "ملاحظة ما إذا كان الخصم يبني بحظوة 4 مدافعين صريحين أم ينزل ارتكازه لإنشاء خط بناء ثلاثي.",
        iconName: "Search",
        highlightText: "Detect Build-up Shape"
      },
      {
        title: "كشف الثغرة في التمرير (Passing Trap)",
        subtitle: "تحديد المدافع الأقل مهارة",
        description: "تحديد المدافع الضعيف في التمرير لتوجيه الضغط نحوه وإجباره على ارتكاب الأخطاء تحت الضغط العالي.",
        iconName: "Target",
        highlightText: "Press Weak Link"
      }
    ],
    fiveTacticalRules: [
      "حلل شكل خط بناء الخصم خلال أول 10 دقائق من المباراة.",
      "حدد هل يبني الخصم عبر العمق أم يفرغ منتصف الملعب للأطراف.",
      "وجه مهاجمك لإغلاق التمرير نحو صانع ألعاب الخصم الرئيسي.",
      "اقرأ ارتفاع أظهرة المنافس لملاحظة ثغرات المرتدات خلفهم.",
      "دون إحصائيات زوايا التمرير الخاطئة لإبلاغ المدرب في الاستراحة."
    ],
    challenge: {
      id: "ch-m2-1",
      title: "موقف تكتيكي: كشف بناء الخصم الثلاثي",
      scenarioDescription: "الخصم يبدأ الهجمة بنزول الارتكاز بين المدافعين (Lavolpiana). كيف توجه خط ضغطك؟",
      pitchState: {
        ballPosition: { x: 50, y: 80 },
        players: [
          { id: "opp_cdm", role: "DM", x: 50, y: 80, team: "away", label: "ارتكاز الخصم" },
          { id: "st", role: "ST", x: 50, y: 65, team: "home", label: "مهاجمك (أنت)", highlighted: true }
        ],
        passLines: []
      },
      options: [
        {
          id: "opt-1",
          text: "إغلاق عمق الملعب وتوجيه الارتكاز نحو التماس الجانبي حيث يسهل حصره",
          isCorrect: true,
          tacticalExplanation: "ممتاز! توجيه المنافس للتمس يقلل خيارات تمريره بزاوية 180 درجة.",
          targetPlayerId: "opp_cdm"
        },
        {
          id: "opt-2",
          text: "الاندفاع المباشر نحو الارتكاز وترك قلب الدفاع حراً",
          isCorrect: false,
          tacticalExplanation: "اندفاع خاطئ يفتح زاوية التمرير لقلب الدفاع الحر."
        }
      ]
    },
    examQuestions: [
      {
        id: "q1",
        questionText: "ما هو مؤشر النجاح الأول في تحليل بناء الخصم؟",
        options: [
          { id: "a", text: "تحديد خط البناء واستغلال نقطة الضعف التموقعية لإجباره على التمرير الخاطئ", isCorrect: true, explanation: "إجابة صحيحة! تحليل بناء الخصم كاشف للثغرات." },
          { id: "b", text: "حساب عدد أخطاء الحكم", isCorrect: false, explanation: "غير صحيح." }
        ]
      }
    ]
  },
  {
    id: "m2-mod-2",
    monthId: 2,
    numberStr: "06",
    title: "تفكيك كتل الضغط (Pressing Blocks)",
    subtitle: "Reading 2: Pressing Blocks & Weakness Identification",
    positionRole: "Tactical Analyst - محلل الخصم",
    pitchPosition: { x: 50, y: 40 },
    summary: "دراسة مستويات ضغط الخصم: High Block, Mid Block, Low Block، وكيفية تصمم الخطة المناسبة لكل تكتل.",
    bentoItems: [
      {
        title: "الكتلة المرتفعة (High Block)",
        subtitle: "المجازفة والمساحة الخلفية",
        description: "عندما يضغط الخصم في ثلثك الدفاعي، تظهر مساحة هائلة خلف خط دفاعه المرتفع يمكن استغلالها بالتمرير المباشر.",
        iconName: "Flame",
        highlightText: "Exploit High Line"
      },
      {
        title: "التكتل المنخفض (Low Block)",
        subtitle: "تفكيك الحافلة الدفاعية",
        description: "عندما يتكتل الخصم في منطقته، يجب الاعتماد على الاتساع الأقصى، التسديد البعيد، والتمريرات القطرية لخلخلة الخطوط.",
        iconName: "Shield",
        highlightText: "Unlock Low Block"
      }
    ],
    fiveTacticalRules: [
      "ضد الـ High Block: جذب المدافعين ثم التمرير العميق خلف المدافعين.",
      "ضد الـ Low Block: تدوير الكرة بسرعة من جهة لأخرى لفتح الفجوات.",
      "استخدم التمرير المستعرض لجعل دفاع الخصم يتحرك أفصل باستمرار.",
      "راقب الفجوة بين خط وسط الخصم وخط دفاعه واستغل مساحة الـ Half-Space.",
      "لا تستعجل التمرير المباشر عندما يكون الخصم متكتلاً بـ 10 لاعبين."
    ],
    challenge: {
      id: "ch-m2-2",
      title: "موقف تكتيكي: كسر التكتل المنخفض (Low Block)",
      scenarioDescription: "الخصم يلعب بـ 5 مدافعين متكتلين داخل منطقة الجزاء. كيف تخلق الثغرة؟",
      pitchState: {
        ballPosition: { x: 50, y: 35 },
        players: [
          { id: "cm", role: "CM", x: 50, y: 35, team: "home", label: "CM (أنت)", highlighted: true },
          { id: "rw", role: "RW", x: 88, y: 25, team: "home", label: "RW الجناح" }
        ],
        passLines: []
      },
      options: [
        {
          id: "opt-1",
          text: "نقل الكرة فوراً للجناح الأيمن على التماس لإجبار المدافع على الخروج وتفريغ عمق المنطقة",
          isCorrect: true,
          tacticalExplanation: "ممتاز! الاتساع الأقصى يفتح الفجوات الداخلية في التكتل المنخفض.",
          targetPlayerId: "rw"
        },
        {
          id: "opt-2",
          text: "التسديد الضعيف من مسافة 35 متراً على التكتل المغلق",
          isCorrect: false,
          tacticalExplanation: "تسديد غير مدروس يفقد الفريق الكرة."
        }
      ]
    },
    examQuestions: [
      {
        id: "q1",
        questionText: "كيف تتعامل منهجية برشلونة مع فريق يلعب بتكتل منخفض (Low Block)؟",
        options: [
          { id: "a", text: "توسيع الملعب لأقصى اتساع وتدوير الكرة بسرعة لخلخلة التكتل وتفريغ مسافات بين المدافعين", isCorrect: true, explanation: "إجابة صحيحة! التدوير السريع يفكك التكتلات المغلقة." },
          { id: "b", text: "التراجع للخلف وترك الكرة للخصم", isCorrect: false, explanation: "غير صحيح." }
        ]
      }
    ]
  },

  // --- MONTH 3: Match Analysis ---
  {
    id: "m3-mod-1",
    monthId: 3,
    numberStr: "09",
    title: "تحليل الأداء الحي أثناء المباراة",
    subtitle: "Reading Module 1: In-Game Performance Analysis",
    positionRole: "Match Analyst - محلل المباراة المباشر",
    pitchPosition: { x: 50, y: 20 },
    summary: "تتبع الأداء البصري التكتيكي في الوقت الفعلي أثناء المباراة، رصد التغيرات التكتيكية وتجهيز التقرير الفني بين الشوطين.",
    bentoItems: [
      {
        title: "الرصد الحي للمساحات (Live Spatial Tracking)",
        subtitle: "قراءة الملعب من المقصورة",
        description: "متابعة المسافات بين الخطوط ورصد اللحظة التي يفقد فيها الفريق توازنه التموقعي لتعديل التعليمات فوراً.",
        iconName: "Activity",
        highlightText: "Real-time Tracking"
      },
      {
        title: "مؤشرات الأداء التكتيكي (Tactical KPIs)",
        subtitle: "قياس كفاءة البناء",
        description: "حساب نسبة النجاح في كسر خطوط ضغط المنافس وعدم الاكتفاء بنسبة الاستحواذ السلبي.",
        iconName: "BarChart2",
        highlightText: "Line-Breaking Passes"
      }
    ],
    fiveTacticalRules: [
      "حلل المباراة من زاوية علوية مرتفعة لرؤية تشكيل الفريقين كاملاً.",
      "سجل الدقائق التي شهدت خللاً في التغطية الوقائية Rest Defense.",
      "راقب هل يطبق الفريق القواعد الخمس في البناء أم يقع في التمرير العشوائي.",
      "جهز 3 مقاطع فيديو حاسمة لعرضها على اللاعبين بين الشوطين.",
      "التكيف السريع مع تعديلات مدرب الخصم يحسم النصف الثاني من المباراة."
    ],
    challenge: {
      id: "ch-m3-1",
      title: "موقف تكتيكي: تحليل الخلل التكتيكي بين الشوطين",
      scenarioDescription: "لاحظت أن الخصم يقطع الكرة دائماً من الظهير الأيسر عندما يمرر لوسط الملعب. ما هو تعديلك؟",
      pitchState: {
        ballPosition: { x: 20, y: 50 },
        players: [
          { id: "lb", role: "LB", x: 20, y: 50, team: "home", label: "LB (تحت الضغط)" },
          { id: "analyst", role: "Analyst", x: 50, y: 10, team: "home", label: "المحلل (أنت)", highlighted: true }
        ],
        passLines: []
      },
      options: [
        {
          id: "opt-1",
          text: "توجيه لاعب الارتكاز للنزول كقناة تمرير وسيطة (الرجل الثالث) لمنع انقضاض جناح الخصم على الظهير",
          isCorrect: true,
          tacticalExplanation: "ممتاز! استخدام الرجل الثالث يفك المصيدة التي نصبها الخصم لظهيرك.",
          targetPlayerId: "lb"
        },
        {
          id: "opt-2",
          text: "الطلب من الظهير التمرير الطويل العالي دائماً",
          isCorrect: false,
          tacticalExplanation: "تعديل سلبي يفقد الفريق أسلوب اللعب الموضعي."
        }
      ]
    },
    examQuestions: [
      {
        id: "q1",
        questionText: "ما هو الأهم بالنسبة لمحلل المباراة أثناء الشوط الأول؟",
        options: [
          { id: "a", text: "رصد ثغرات الخصم التموقعية وتحديد التعديل التكتيكي السريع لنقله للمدرب بين الشوطين", isCorrect: true, explanation: "إجابة صحيحة! هذا هو الدور الجوهري لمحلل الأداء الحي." },
          { id: "b", text: "إحصاء عدد التماس فقط", isCorrect: false, explanation: "غير صحيح." }
        ]
      }
    ]
  },

  // --- MONTH 4: Implem. and Tech Processes ---
  {
    id: "m4-mod-1",
    monthId: 4,
    numberStr: "13",
    title: "التكنولوجيا والتطبيق وصناعة التمارين التدريبية",
    subtitle: "Reading 1: Technological Tools & Training Design",
    positionRole: "Head of Methodology - مدير المنهجية والتطوير",
    pitchPosition: { x: 50, y: 10 },
    summary: "استخدام البرمجيات الحديثة (Software & Video Analysis)، وتحويل التحليل التكتيكي للمباريات إلى تمارين تدريبية تكتيكية حية على الملعب.",
    bentoItems: [
      {
        title: "التحليل التكنولوجي المتقدم (Tech Video Tools)",
        subtitle: "الدمج الرقمي التكتيكي",
        description: "دمج أنظمة الفيديو والتتبع الرقمي لتزويد اللاعبين بمقاطع تفاعلية قصيرة ترفع من سرعة اتخاذ القرار التكتيكي.",
        iconName: "Cpu",
        highlightText: "Video Analytics"
      },
      {
        title: "تصميم التمارين التكتيكية (Rondo & Positional Games)",
        subtitle: "من التحليل إلى الملعب",
        description: "تصميم تمارين الـ Rondo والـ Position Games بحدود وأبعاد تحاكي مواقف المباراة الحقيقية المعالجة بالتحليل.",
        iconName: "Grid",
        highlightText: "Tactical Rondos"
      }
    ],
    fiveTacticalRules: [
      "كل تمرين تدريبي يجب أن يحتوي على هدف تكتيكي مرتبط باللعب الموضعي.",
      "استخدم تمارين الـ Rondo لتطوير السرعة في اختيار التمريرة والرجل الثالث.",
      "اجعل مساحة التمرين محاكية للواقع: أبعاد تضغط وقت اتخاذ القرار.",
      "الفيديو التكتيكي يجب أن يكون قصيراً ومباشراً (لا يتجاوز 5 دقائق للاعب).",
      "قس مدى استجابة اللاعبين للتعديلات التكتيكية في المباريات الرسمية."
    ],
    challenge: {
      id: "ch-m4-1",
      title: "موقف تكتيكي: تصميم تمرين لعلاج مشكلة البناء",
      scenarioDescription: "فريقك يعاني من صعوبة الخروج بالكرة تحت الضغط العالي. ما هو التمرين الأكثر فاعلية لعلاج هذه المشكلة؟",
      pitchState: {
        ballPosition: { x: 50, y: 50 },
        players: [
          { id: "coach", role: "Coach", x: 50, y: 50, team: "home", label: "المدرب (أنت)", highlighted: true }
        ],
        passLines: []
      },
      options: [
        {
          id: "opt-1",
          text: "تصميم تمرين Positional Game (4v4 + 3 Joker) بمساحة ضيقة مع الاشتراط على الاستلام الموجه والتمرير للرجل الثالث",
          isCorrect: true,
          tacticalExplanation: "ممتاز! تمارين الـ Positional Games تطور سرعة التفكير والحلول التموقعية تحت الضغط الفعلي.",
          targetPlayerId: "coach"
        },
        {
          id: "opt-2",
          text: "جعل اللاعبين يركضون حول الملعب بدون كرة",
          isCorrect: false,
          tacticalExplanation: "تمرين بدني لا يطور أي جانب تكتيكي أو مهاري مرتبط بالبناء."
        }
      ]
    },
    examQuestions: [
      {
        id: "q1",
        questionText: "ما هي الفلسفة التدريبية الأولى لبرشلونة في تصميم التمارين؟",
        options: [
          { id: "a", text: "دمج الكرة، التكتيك، وسرعة اتخاذ القرار التموقعي في كل تمرين عبر الـ Rondos والـ Position Games", isCorrect: true, explanation: "إجابة صحيحة! الكرة والتكتيك هما جوهر تدريبات برشلونة." },
          { id: "b", text: "التدريب البدني المنفصل بدون كرة معظم الوقت", isCorrect: false, explanation: "غير صحيح." }
        ]
      }
    ]
  }
];
