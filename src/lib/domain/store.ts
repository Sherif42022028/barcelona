import {
  CurriculumStage,
  CurriculumModule,
  Lesson,
  KnowledgeObject,
  TacticalScenario,
  Question,
  Assessment,
  StudentProgress,
  KnowledgeMastery,
  PersonalizedRecommendation,
  SourceDocument
} from './types';

// ==========================================
// 1. INITIAL SOURCE DOCUMENTS REGISTER
// ==========================================
export const INITIAL_DOCUMENTS: SourceDocument[] = [
  {
    id: 'doc-mod-1',
    title: 'Module 1: Definition, Evolution and Comprehension of Positional Play',
    filename: 'Module_1_Definition,_Evolution_and_Comprehension_of_the_General1.pdf',
    fileSize: 4633278,
    fileType: 'PDF',
    source: 'FC Barcelona Methodology Department',
    version: 'v1.0',
    language: 'en',
    uploadedAt: '2026-08-01T10:00:00Z',
    status: 'PROCESSED',
    pageCount: 34
  },
  {
    id: 'doc-mod-2',
    title: 'Module 2: Study of the Structural Elements of the Goal Kick and Build-up',
    filename: 'Module_2_Study_of_the_Structural_Elements_of_the_Goal_Kick_and_Build1.pdf',
    fileSize: 5690989,
    fileType: 'PDF',
    source: 'FC Barcelona Methodology Department',
    version: 'v1.0',
    language: 'en',
    uploadedAt: '2026-08-01T10:05:00Z',
    status: 'PROCESSED',
    pageCount: 42
  },
  {
    id: 'doc-mod-3',
    title: 'Module 3: Study of the Dynamic Elements of the Goal Kick and Build-up',
    filename: 'Module_3_Study_of_the_Dynamic_Elements_of_the_Goal_kick_and_Build1.pdf',
    fileSize: 4785153,
    fileType: 'PDF',
    source: 'FC Barcelona Methodology Department',
    version: 'v1.0',
    language: 'en',
    uploadedAt: '2026-08-01T10:10:00Z',
    status: 'PROCESSED',
    pageCount: 38
  },
  {
    id: 'doc-mod-4',
    title: 'Module 4: Analysis & Implementation Processes',
    filename: 'Module 4-1[1].pdf',
    fileSize: 4912627,
    fileType: 'PDF',
    source: 'FC Barcelona Methodology Department',
    version: 'v1.0',
    language: 'en',
    uploadedAt: '2026-08-01T10:15:00Z',
    status: 'PROCESSED',
    pageCount: 40
  },
  {
    id: 'doc-u23-loss',
    title: 'Chris Hogg U23: Loss of Possession in Build-up Analysis',
    filename: 'Chris Hogg U23 Loss of possession in build-up.pdf',
    fileSize: 132460,
    fileType: 'PDF',
    source: 'FC Barcelona Performance & Analysis Unit',
    version: 'v1.0',
    language: 'en',
    uploadedAt: '2026-08-01T10:20:00Z',
    status: 'PROCESSED',
    pageCount: 12
  }
];

// ==========================================
// 2. KNOWLEDGE LIBRARY (SOURCE TRACEABLE)
// ==========================================
export const INITIAL_KNOWLEDGE: KnowledgeObject[] = [
  {
    id: 'kn-dec-eval',
    title: 'Decision Evaluation and Comprehension',
    type: 'MODEL',
    definition: 'Analytical model evaluating player choices under pressure based on positional context, line-breaking options, and third-man relationships.',
    description: 'Framework to assess whether a player selected the optimal tactical decision during build-up phase execution.',
    sourceEvidences: [
      {
        id: 'ev-1',
        documentId: 'doc-mod-1',
        documentTitle: 'Module 1: Definition & Comprehension',
        pageNumber: 14,
        excerpt: 'Decision evaluation measures the player ability to recognize numerical superiority (11v10) and execute passes that attract opponent pressure before releasing.'
      }
    ],
    confidence: 0.96,
    status: 'APPROVED',
    createdAt: '2026-08-01T12:00:00Z',
    updatedAt: '2026-08-01T12:00:00Z'
  },
  {
    id: 'kn-struct-elem',
    title: 'Study of the Structural Element',
    type: 'MODEL',
    definition: 'Structural framework defining positional relationships, width, depth, and spatial geometry in goal kicks and building from the back.',
    description: 'Defines positioning channels (Corridors), Salida Lavolpiana 3-player structures, and stretch mechanisms.',
    sourceEvidences: [
      {
        id: 'ev-2',
        documentId: 'doc-mod-2',
        documentTitle: 'Module 2: Structural Elements',
        pageNumber: 8,
        excerpt: 'Structural elements require full utilization of width on the touchlines and vertical staggering to stretch opponent block.'
      }
    ],
    confidence: 0.98,
    status: 'APPROVED',
    createdAt: '2026-08-01T12:00:00Z',
    updatedAt: '2026-08-01T12:00:00Z'
  },
  {
    id: 'kn-dyn-elem',
    title: 'Study of the Dynamic Element',
    type: 'MODEL',
    definition: 'Dynamic analysis model studying body orientation, oriented control, movement timing, and La Pausa technique.',
    description: 'Analyzes dynamic changes across time frames, rhythm variations (Slow-Slow-FAST), and space creation.',
    sourceEvidences: [
      {
        id: 'ev-3',
        documentId: 'doc-mod-3',
        documentTitle: 'Module 3: Dynamic Elements',
        pageNumber: 12,
        excerpt: 'La Pausa technique involves freezing momentarily to provoke the defender into stepping out before delivering line-breaking passes.'
      }
    ],
    confidence: 0.95,
    status: 'APPROVED',
    createdAt: '2026-08-01T12:00:00Z',
    updatedAt: '2026-08-01T12:00:00Z'
  },
  {
    id: 'kn-unresolved-model-4',
    title: 'Unresolved Model (Module 4 Structure)',
    type: 'UNRESOLVED_MODEL',
    definition: 'Unresolved methodology model pending source verification from Module 4 documentation analysis.',
    description: 'Requires expert reviewer classification once full section extraction is confirmed.',
    sourceEvidences: [
      {
        id: 'ev-4',
        documentId: 'doc-mod-4',
        documentTitle: 'Module 4-1[1].pdf',
        pageNumber: 1,
        excerpt: 'Module 4 process framework covering implementation, technological tools, and training exercise translation.'
      }
    ],
    confidence: 0.70,
    status: 'IN_REVIEW',
    createdAt: '2026-08-01T12:00:00Z',
    updatedAt: '2026-08-01T12:00:00Z'
  },
  {
    id: 'kn-pos-rules',
    title: 'Rules of Positioning in the Building Process',
    type: 'RULE',
    definition: 'Core positional rules governing distance between players, staggered lines, and touchline width during build-up.',
    description: 'Rules: 1. Never occupy the same horizontal line as direct teammate. 2. Stand on touchline to widen defender press angle. 3. Receive with open body shape.',
    sourceEvidences: [
      {
        id: 'ev-5',
        documentId: 'doc-mod-2',
        documentTitle: 'Module 2: Structural Elements',
        pageNumber: 19,
        excerpt: 'Positioning rules mandate receiving on the back foot away from pressure to maintain a 180-degree field of view.'
      }
    ],
    confidence: 0.97,
    status: 'APPROVED',
    createdAt: '2026-08-01T12:00:00Z',
    updatedAt: '2026-08-01T12:00:00Z'
  },
  {
    id: 'kn-loss-possession',
    title: 'Loss of Possession During Build-up & Rest Defense',
    type: 'CASE',
    definition: 'Analysis case evaluating failure mechanisms during build-up transition and immediate 5-second Gegenpress activation.',
    description: 'Studies structural breakdown causes during turnover and immediate Rest Defense positioning.',
    sourceEvidences: [
      {
        id: 'ev-6',
        documentId: 'doc-u23-loss',
        documentTitle: 'Chris Hogg U23 Analysis',
        pageNumber: 4,
        excerpt: 'Loss of possession in build-up occurs when fullbacks fail to maintain rest defense cover while center-backs expand width.'
      }
    ],
    confidence: 0.94,
    status: 'APPROVED',
    createdAt: '2026-08-01T12:00:00Z',
    updatedAt: '2026-08-01T12:00:00Z'
  }
];

// ==========================================
// 3. CURRICULUM STAGES & MODULES
// ==========================================
export const STAGES_DATA: CurriculumStage[] = [
  {
    id: 'stage-01',
    stageNumber: 1,
    title: 'Building from the Back',
    subtitle: 'Positional Foundations & Structural Elements',
    description: 'Master 11v10 numerical superiority, Salida Lavolpiana 3-player structures, third-man concepts, and open body orientation.',
    objectives: [
      'Identify 11v10 numerical superiority using goalkeeper in build-up',
      'Apply Salida Lavolpiana structural adjustments to stretch opponent block',
      'Execute third-man pass combinations (A -> B -> C)',
      'Recognize and correct structural positioning errors during build-up'
    ],
    moduleIds: ['mod-101', 'mod-102', 'mod-103', 'mod-104'],
    status: 'AVAILABLE'
  },
  {
    id: 'stage-02',
    stageNumber: 2,
    title: 'Phase Analysis',
    subtitle: 'Opponent Structure & Pressing Block Deconstruction',
    description: 'Analyze opponent pressing blocks (High Block, Mid Block, Low Block) and exploit half-spaces and wide corridor overloads.',
    objectives: [
      'Deconstruct opponent pressing block height and triggers',
      'Exploit opponent high line through timed depth runs',
      'Unlock Low Block defenses using maximum touchline width and rapid switching'
    ],
    moduleIds: ['mod-201', 'mod-202'],
    status: 'AVAILABLE'
  },
  {
    id: 'stage-03',
    stageNumber: 3,
    title: 'Match Analysis',
    subtitle: 'Live Performance Tracking & Spatial Metrics',
    description: 'Conduct live visual tactical tracking, spatial relationship measurement, and halftime tactical correction formulation.',
    objectives: [
      'Track live spatial distances between lines during match execution',
      'Identify line-breaking KPI metrics and turnover risk factors',
      'Formulate halftime video adjustment reports'
    ],
    moduleIds: ['mod-301'],
    status: 'AVAILABLE'
  },
  {
    id: 'stage-04',
    stageNumber: 4,
    title: 'Implementation, Tactics & Positioning',
    subtitle: 'Training Design & Tech Integration',
    description: 'Translate tactical match analysis into Rondos, Positional Games, and video feedback routines.',
    objectives: [
      'Design targeted Positional Games solving identified build-up failures',
      'Integrate video technology tools for individual player feedback'
    ],
    moduleIds: ['mod-401'],
    status: 'AVAILABLE'
  }
];

export const MODULES_DATA: CurriculumModule[] = [
  {
    id: 'mod-101',
    stageId: 'stage-01',
    order: 1,
    numberStr: '01',
    title: 'Positional Play Foundations & 11v10 Superiority',
    subtitle: 'Definition & Comprehension of Positional Superiority',
    description: 'Master numerical superiority (11v10) using the goalkeeper, fixing opponents, and third-man combinations.',
    positionRole: 'GK & CBs',
    pitchPosition: { x: 50, y: 88 },
    learningObjectives: [
      {
        id: 'obj-101-1',
        moduleId: 'mod-101',
        statement: 'Identify 11v10 numerical superiority using goalkeeper in build-up',
        cognitiveLevel: 'RECALL',
        targetKnowledgeIds: ['kn-dec-eval']
      },
      {
        id: 'obj-101-2',
        moduleId: 'mod-101',
        statement: 'Execute third-man pass combinations (A -> B -> C)',
        cognitiveLevel: 'APPLY',
        targetKnowledgeIds: ['kn-dec-eval']
      }
    ],
    prerequisites: [],
    knowledgeIds: ['kn-dec-eval'],
    lessonIds: ['les-101-1'],
    practiceScenarioIds: ['scen-101-1'],
    assessmentId: 'ass-mod-101',
    status: 'PUBLISHED'
  },
  {
    id: 'mod-102',
    stageId: 'stage-01',
    order: 2,
    numberStr: '02',
    title: 'Structural Elements & Salida Lavolpiana',
    subtitle: '3-Player & 4-Player Build-ups',
    description: 'Study Salida Lavolpiana 3-player build-up, fullback touchline width, and qualitative superiority isolated 1v1s.',
    positionRole: 'CBs, FBs & Pivote',
    pitchPosition: { x: 30, y: 72 },
    learningObjectives: [
      {
        id: 'obj-102-1',
        moduleId: 'mod-102',
        statement: 'Apply Salida Lavolpiana structural adjustments to stretch opponent block',
        cognitiveLevel: 'ANALYZE',
        targetKnowledgeIds: ['kn-struct-elem', 'kn-pos-rules']
      }
    ],
    prerequisites: ['mod-101'],
    knowledgeIds: ['kn-struct-elem', 'kn-pos-rules'],
    lessonIds: ['les-102-1'],
    practiceScenarioIds: ['scen-102-1'],
    assessmentId: 'ass-mod-102',
    status: 'PUBLISHED'
  },
  {
    id: 'mod-103',
    stageId: 'stage-01',
    order: 3,
    numberStr: '03',
    title: 'Dynamic Elements, Body Shape & La Pausa',
    subtitle: 'Dynamic Control & Rhythm Variation',
    description: 'Master open body orientation, oriented first touch, and La Pausa timing techniques to bait opponent pressure.',
    positionRole: 'CDM & Interiors',
    pitchPosition: { x: 50, y: 52 },
    learningObjectives: [
      {
        id: 'obj-103-1',
        moduleId: 'mod-103',
        statement: 'Evaluate body shape and La Pausa timing to break opponent pressing line',
        cognitiveLevel: 'EVALUATE',
        targetKnowledgeIds: ['kn-dyn-elem']
      }
    ],
    prerequisites: ['mod-102'],
    knowledgeIds: ['kn-dyn-elem'],
    lessonIds: ['les-103-1'],
    practiceScenarioIds: ['scen-103-1'],
    assessmentId: 'ass-mod-103',
    status: 'PUBLISHED'
  },
  {
    id: 'mod-104',
    stageId: 'stage-01',
    order: 4,
    numberStr: '04',
    title: 'Rest Defense Structure & 5-Second Counter-Press',
    subtitle: 'Rest Defense & Gegenpressing Transition',
    description: 'Learn Rest Defense positioning during attack and 5-second counter-pressing upon turnover in enemy half.',
    positionRole: 'Interiors & Wingers',
    pitchPosition: { x: 70, y: 35 },
    learningObjectives: [
      {
        id: 'obj-104-1',
        moduleId: 'mod-104',
        statement: 'Deconstruct Rest Defense structure and apply immediate counter-press trigger',
        cognitiveLevel: 'APPLY',
        targetKnowledgeIds: ['kn-loss-possession']
      }
    ],
    prerequisites: ['mod-103'],
    knowledgeIds: ['kn-loss-possession'],
    lessonIds: ['les-104-1'],
    practiceScenarioIds: ['scen-104-1'],
    assessmentId: 'ass-mod-104',
    status: 'PUBLISHED'
  },
  {
    id: 'mod-201',
    stageId: 'stage-02',
    order: 1,
    numberStr: '05',
    title: 'Opponent Build-up Analysis & Press Triggers',
    subtitle: 'Reading Opponent Build-up Structures',
    description: 'Classify opponent build-up shapes (4-back vs 3-back) and direct high pressing towards weak passing links.',
    positionRole: 'Tactical Analyst',
    pitchPosition: { x: 50, y: 70 },
    learningObjectives: [
      {
        id: 'obj-201-1',
        moduleId: 'mod-201',
        statement: 'Deconstruct opponent pressing block height and triggers',
        cognitiveLevel: 'ANALYZE',
        targetKnowledgeIds: ['kn-struct-elem']
      }
    ],
    prerequisites: ['mod-104'],
    knowledgeIds: ['kn-struct-elem'],
    lessonIds: ['les-201-1'],
    practiceScenarioIds: ['scen-201-1'],
    assessmentId: 'ass-mod-201',
    status: 'PUBLISHED'
  },
  {
    id: 'mod-202',
    stageId: 'stage-02',
    order: 2,
    numberStr: '06',
    title: 'Deconstructing Pressing Blocks (High vs Low Block)',
    subtitle: 'Exploiting High Lines & Unlocking Low Blocks',
    description: 'Formulate tactics against High Pressing Lines and dense Low Block 5-back defensive buses.',
    positionRole: 'Tactical Analyst',
    pitchPosition: { x: 50, y: 40 },
    learningObjectives: [
      {
        id: 'obj-202-1',
        moduleId: 'mod-202',
        statement: 'Unlock Low Block defenses using maximum touchline width and rapid switching',
        cognitiveLevel: 'EVALUATE',
        targetKnowledgeIds: ['kn-struct-elem', 'kn-dyn-elem']
      }
    ],
    prerequisites: ['mod-201'],
    knowledgeIds: ['kn-struct-elem', 'kn-dyn-elem'],
    lessonIds: ['les-202-1'],
    practiceScenarioIds: ['scen-202-1'],
    assessmentId: 'ass-mod-202',
    status: 'PUBLISHED'
  },
  {
    id: 'mod-301',
    stageId: 'stage-03',
    order: 1,
    numberStr: '07',
    title: 'In-Game Performance Analysis & Live Spatial Metrics',
    subtitle: 'Live Tracking & Halftime Report Formulation',
    description: 'Track spatial inter-line distances live during matches and produce 3-clip halftime video adjustments.',
    positionRole: 'Match Analyst',
    pitchPosition: { x: 50, y: 20 },
    learningObjectives: [
      {
        id: 'obj-301-1',
        moduleId: 'mod-301',
        statement: 'Formulate halftime video adjustment reports based on live spatial breakdowns',
        cognitiveLevel: 'EVALUATE',
        targetKnowledgeIds: ['kn-dec-eval']
      }
    ],
    prerequisites: ['mod-202'],
    knowledgeIds: ['kn-dec-eval'],
    lessonIds: ['les-301-1'],
    practiceScenarioIds: ['scen-301-1'],
    assessmentId: 'ass-mod-301',
    status: 'PUBLISHED'
  },
  {
    id: 'mod-401',
    stageId: 'stage-04',
    order: 1,
    numberStr: '08',
    title: 'Technological Integration & Training Exercise Design',
    subtitle: 'Rondo & Positional Game Translation',
    description: 'Translate match tactical breakdowns into customized Rondos and Positional Games (4v4+3 Jokers).',
    positionRole: 'Head of Methodology',
    pitchPosition: { x: 50, y: 10 },
    learningObjectives: [
      {
        id: 'obj-401-1',
        moduleId: 'mod-401',
        statement: 'Design targeted Positional Games solving identified build-up failures',
        cognitiveLevel: 'APPLY',
        targetKnowledgeIds: ['kn-unresolved-model-4']
      }
    ],
    prerequisites: ['mod-301'],
    knowledgeIds: ['kn-unresolved-model-4'],
    lessonIds: ['les-401-1'],
    practiceScenarioIds: ['scen-401-1'],
    assessmentId: 'ass-mod-401',
    status: 'PUBLISHED'
  }
];

// ==========================================
// 4. LESSON DATA (BLOCK-BASED)
// ==========================================
export const LESSONS_DATA: Lesson[] = [
  {
    id: 'les-101-1',
    moduleId: 'mod-101',
    order: 1,
    title: 'Positional Play Foundations & 11v10 Numerical Superiority',
    subtitle: 'Goalkeeper Engagement & Third Man Concepts',
    description: 'Understand how goalkeeper positioning transforms build-up into an eternal 11v10 overload.',
    estimatedDurationMinutes: 15,
    objectiveIds: ['obj-101-1', 'obj-101-2'],
    knowledgeIds: ['kn-dec-eval'],
    blocks: [
      {
        id: 'blk-1',
        lessonId: 'les-101-1',
        order: 1,
        type: 'TEXT',
        content: {
          title: 'The Core Principle: 11 vs 10 Always',
          text: 'In FC Barcelona methodology, building from the back is not a defensive risk—it is the first offensive maneuver. By incorporating the goalkeeper inside the penalty area as an extra midfield pivot, the team guarantees an 11v10 numerical advantage against any 2-striker high press.'
        }
      },
      {
        id: 'blk-2',
        lessonId: 'les-101-1',
        order: 2,
        type: 'CALLOUT',
        content: {
          calloutType: 'principle',
          title: 'Tactical Rule: Fix & Release',
          highlightText: 'Attract opponent pressure by advancing with the ball until defender commits, then release to the free man.'
        }
      },
      {
        id: 'blk-3',
        lessonId: 'les-101-1',
        order: 3,
        type: 'TACTICAL',
        content: {
          tacticalScenarioId: 'scen-101-1',
          caption: 'Interactive Scenario: Breaking 2-Striker High Press via Goalkeeper & Third Man'
        }
      },
      {
        id: 'blk-4',
        lessonId: 'les-101-1',
        order: 4,
        type: 'SUMMARY',
        content: {
          title: 'Lesson Takeaway',
          text: 'Never pass directly to a heavily marked player. Use the intermediate second man to deliver the ball cleanly to the free third man.'
        }
      }
    ],
    status: 'PUBLISHED'
  },
  {
    id: 'les-102-1',
    moduleId: 'mod-102',
    order: 1,
    title: 'Salida Lavolpiana & Staggered Structural Channels',
    subtitle: '3-Player Build-up Geometry',
    description: 'Master defensive line dropping and fullback touchline width to stretch opponent shape.',
    estimatedDurationMinutes: 18,
    objectiveIds: ['obj-102-1'],
    knowledgeIds: ['kn-struct-elem', 'kn-pos-rules'],
    blocks: [
      {
        id: 'blk-102-1',
        lessonId: 'les-102-1',
        order: 1,
        type: 'TEXT',
        content: {
          title: 'Salida Lavolpiana 3-Player Structure',
          text: 'When opponent strikers press in pairs, the defensive midfielder (Pivote) drops between the two center-backs. This expands both center-backs towards the touchlines and releases the fullbacks high into advanced corridors.'
        }
      },
      {
        id: 'blk-102-2',
        lessonId: 'les-102-1',
        order: 2,
        type: 'TACTICAL',
        content: {
          tacticalScenarioId: 'scen-102-1',
          caption: 'Interactive Scenario: Salida Lavolpiana Execution'
        }
      }
    ],
    status: 'PUBLISHED'
  },
  {
    id: 'les-103-1',
    moduleId: 'mod-103',
    order: 1,
    title: 'Dynamic Control, Body Shape & La Pausa Timing',
    subtitle: 'Oriented Touch & Provoking the Press',
    description: 'Learn open shoulder orientation, far-foot reception, and La Pausa hesitation techniques.',
    estimatedDurationMinutes: 15,
    objectiveIds: ['obj-103-1'],
    knowledgeIds: ['kn-dyn-elem'],
    blocks: [
      {
        id: 'blk-103-1',
        lessonId: 'les-103-1',
        order: 1,
        type: 'TEXT',
        content: {
          title: 'La Pausa: Freezing Time to Bait Pressure',
          text: 'La Pausa is the deliberate pause on the ball. By standing still for a fraction of a second, you tempt the defender out of his line, opening the exact vertical passing corridor needed for your interior midfielder.'
        }
      },
      {
        id: 'blk-103-2',
        lessonId: 'les-103-1',
        order: 2,
        type: 'TACTICAL',
        content: {
          tacticalScenarioId: 'scen-103-1',
          caption: 'Interactive Scenario: Receiving on Back Foot with La Pausa'
        }
      }
    ],
    status: 'PUBLISHED'
  },
  {
    id: 'les-104-1',
    moduleId: 'mod-104',
    order: 1,
    title: 'Rest Defense Geometry & 5-Second Gegenpress Rule',
    subtitle: 'Defending While Attacking',
    description: 'Maintain protective rest defense positioning during attacks to extinguish counter-attacks in 5 seconds.',
    estimatedDurationMinutes: 15,
    objectiveIds: ['obj-104-1'],
    knowledgeIds: ['kn-loss-possession'],
    blocks: [
      {
        id: 'blk-104-1',
        lessonId: 'les-104-1',
        order: 1,
        type: 'TEXT',
        content: {
          title: 'Rest Defense Structure',
          text: 'Rest Defense is established while your team is in possession. The center-backs and pivot occupy central counter-attack channels to immediately suffocate opposition transitions upon ball loss.'
        }
      },
      {
        id: 'blk-104-2',
        lessonId: 'les-104-1',
        order: 2,
        type: 'TACTICAL',
        content: {
          tacticalScenarioId: 'scen-104-1',
          caption: 'Interactive Scenario: 5-Second Gegenpress Reaction'
        }
      }
    ],
    status: 'PUBLISHED'
  },
  {
    id: 'les-201-1',
    moduleId: 'mod-201',
    order: 1,
    title: 'Deconstructing Opponent Build-up Shapes',
    subtitle: 'Scouting 4-Back vs 3-Back Pressing Triggers',
    description: 'Classify opponent build-up lines and direct high pressing towards the opponent weak link.',
    estimatedDurationMinutes: 15,
    objectiveIds: ['obj-201-1'],
    knowledgeIds: ['kn-struct-elem'],
    blocks: [
      {
        id: 'blk-201-1',
        lessonId: 'les-201-1',
        order: 1,
        type: 'TEXT',
        content: {
          title: 'Pressing Traps & Weak Link Identification',
          text: 'Identify the opponent defender with lower passing accuracy and direct the pressing angle to force him to receive near the touchline.'
        }
      },
      {
        id: 'blk-201-2',
        lessonId: 'les-201-1',
        order: 2,
        type: 'TACTICAL',
        content: {
          tacticalScenarioId: 'scen-201-1',
          caption: 'Interactive Scenario: Directing Touchline Trap Against 3-Back Build-up'
        }
      }
    ],
    status: 'PUBLISHED'
  },
  {
    id: 'les-202-1',
    moduleId: 'mod-202',
    order: 1,
    title: 'Unlocking Low Block Defensive Buses',
    subtitle: 'Overloading to Isolate & Rapid Switching',
    description: 'Deconstruct dense 5-back Low Blocks through maximum touchline width and overload-to-isolate tactics.',
    estimatedDurationMinutes: 18,
    objectiveIds: ['obj-202-1'],
    knowledgeIds: ['kn-struct-elem', 'kn-dyn-elem'],
    blocks: [
      {
        id: 'blk-202-1',
        lessonId: 'les-202-1',
        order: 1,
        type: 'TEXT',
        content: {
          title: 'Overload to Isolate',
          text: 'Accumulate short passes on one flank to draw opponent defensive block, then deliver a swift diagonal switch to the isolated 1v1 winger.'
        }
      },
      {
        id: 'blk-202-2',
        lessonId: 'les-202-1',
        order: 2,
        type: 'TACTICAL',
        content: {
          tacticalScenarioId: 'scen-202-1',
          caption: 'Interactive Scenario: Touchline Width vs Low Block'
        }
      }
    ],
    status: 'PUBLISHED'
  },
  {
    id: 'les-301-1',
    moduleId: 'mod-301',
    order: 1,
    title: 'Live Halftime Tactical Reports & Spatial Measurement',
    subtitle: 'Real-time Video Analysis',
    description: 'Track spatial inter-line gaps live during match play and prepare 3-clip halftime video corrections.',
    estimatedDurationMinutes: 20,
    objectiveIds: ['obj-301-1'],
    knowledgeIds: ['kn-dec-eval'],
    blocks: [
      {
        id: 'blk-301-1',
        lessonId: 'les-301-1',
        order: 1,
        type: 'TEXT',
        content: {
          title: 'Live Halftime Adjustments',
          text: 'Identify structural breakdowns during first-half play and present 3 video clips to players between halves to rectify positional errors.'
        }
      },
      {
        id: 'blk-301-2',
        lessonId: 'les-301-1',
        order: 2,
        type: 'TACTICAL',
        content: {
          tacticalScenarioId: 'scen-301-1',
          caption: 'Interactive Scenario: Halftime Third-Man Adjustment'
        }
      }
    ],
    status: 'PUBLISHED'
  },
  {
    id: 'les-401-1',
    moduleId: 'mod-401',
    order: 1,
    title: 'Translating Match Analysis into Tactical Positional Games',
    subtitle: 'Rondo & Positional Game Design',
    description: 'Design 4v4+3 Joker Positional Games to fix identified build-up flaws.',
    estimatedDurationMinutes: 20,
    objectiveIds: ['obj-401-1'],
    knowledgeIds: ['kn-unresolved-model-4'],
    blocks: [
      {
        id: 'blk-401-1',
        lessonId: 'les-401-1',
        order: 1,
        type: 'TEXT',
        content: {
          title: 'Positional Game Design Principles',
          text: 'Every training drill must contain tactical decision-making, orientation under pressure, and third-man options.'
        }
      },
      {
        id: 'blk-401-2',
        lessonId: 'les-401-1',
        order: 2,
        type: 'TACTICAL',
        content: {
          tacticalScenarioId: 'scen-401-1',
          caption: 'Interactive Scenario: Designing 4v4+3 Positional Game'
        }
      }
    ],
    status: 'PUBLISHED'
  }
];

// ==========================================
// 5. REUSABLE TACTICAL SCENARIOS
// ==========================================
export const TACTICAL_SCENARIOS_DATA: TacticalScenario[] = [
  {
    id: 'scen-101-1',
    title: 'Scenario: Breaking 2-Striker High Press via Goalkeeper & Third Man',
    description: 'Opponent strikes press goalkeeper and left center-back. Find the third-man decision to break the line.',
    knowledgeIds: ['kn-dec-eval'],
    initialState: {
      id: 'st-init-1',
      ballPosition: { x: 50, y: 88 },
      players: [
        { id: 'gk', label: 'GK (Ball Carrier)', role: 'GK', team: 'home', x: 50, y: 88, highlighted: true },
        { id: 'cb1', label: 'Left CB', role: 'CB', team: 'home', x: 32, y: 72 },
        { id: 'cb2', label: 'Right CB', role: 'CB', team: 'home', x: 68, y: 72 },
        { id: 'cdm', label: 'CDM (Third Man)', role: 'DM', team: 'home', x: 50, y: 55 },
        { id: 'opp1', label: 'Press Striker 1', role: 'ST', team: 'away', x: 40, y: 78 },
        { id: 'opp2', label: 'Press Striker 2', role: 'ST', team: 'away', x: 60, y: 78 }
      ],
      passLines: [{ fromX: 50, fromY: 88, toX: 50, toY: 55 }]
    },
    options: [
      {
        id: 'opt-101-a',
        text: 'Pass directly to the heavily marked Left Center-Back under touchline trap pressure',
        isCorrect: false,
        tacticalExplanation: 'Incorrect. Passing to a heavily pressed defender near the touchline leads to turnover under pressure.'
      },
      {
        id: 'opt-101-b',
        text: 'Fix the right striker, then release pass to the free CDM (Third Man) operating between lines',
        isCorrect: true,
        tacticalExplanation: 'Excellent! Perfect application of Fix & Release and Third-Man positioning to break the pressing line.',
        targetPlayerId: 'cdm'
      }
    ]
  },
  {
    id: 'scen-102-1',
    title: 'Scenario: Salida Lavolpiana Execution',
    description: 'Execute Salida Lavolpiana 3-player build-up and pass to right fullback stretching touchline width.',
    knowledgeIds: ['kn-struct-elem', 'kn-pos-rules'],
    initialState: {
      id: 'st-init-2',
      ballPosition: { x: 32, y: 72 },
      players: [
        { id: 'cb', label: 'CB (Ball Carrier)', role: 'CB', team: 'home', x: 32, y: 72, highlighted: true },
        { id: 'cdm', label: 'Pivote (Dropping CB)', role: 'DM', team: 'home', x: 50, y: 80 },
        { id: 'rb', label: 'Right Fullback (Touchline)', role: 'RB', team: 'home', x: 12, y: 48 },
        { id: 'rw', label: 'Right Winger (Isolation)', role: 'RW', team: 'home', x: 88, y: 35 }
      ],
      passLines: [{ fromX: 32, fromY: 72, toX: 12, toY: 48 }]
    },
    options: [
      {
        id: 'opt-102-a',
        text: 'Diagonal pass to Right Fullback standing directly on the touchline to stretch opponent block',
        isCorrect: true,
        tacticalExplanation: 'Correct! Stretching width forces the defender to cover a larger distance, creating internal gaps.',
        targetPlayerId: 'rb'
      },
      {
        id: 'opt-102-b',
        text: 'Pass straight into crowded central midfield channel',
        isCorrect: false,
        tacticalExplanation: 'Incorrect. Central channel is blocked by 4 opponent midfielders.'
      }
    ]
  },
  {
    id: 'scen-103-1',
    title: 'Scenario: Receiving on Back Foot with La Pausa',
    description: 'Orient shoulder shape 45 degrees, receive with far foot, and pause before releasing interior midfielder.',
    knowledgeIds: ['kn-dyn-elem'],
    initialState: {
      id: 'st-init-3',
      ballPosition: { x: 50, y: 65 },
      players: [
        { id: 'cdm', label: 'CDM (You)', role: 'DM', team: 'home', x: 50, y: 52, highlighted: true },
        { id: 'cb', label: 'Passing CB', role: 'CB', team: 'home', x: 40, y: 75 },
        { id: 'am', label: 'Interior (Space)', role: 'AM', team: 'home', x: 65, y: 38 }
      ],
      passLines: [{ fromX: 50, fromY: 52, toX: 65, toY: 38 }]
    },
    options: [
      {
        id: 'opt-103-a',
        text: 'Receive back to goal and return pass immediately to center-back',
        isCorrect: false,
        tacticalExplanation: 'Incorrect. Receiving back to goal loses forward vision and forfeits space.'
      },
      {
        id: 'opt-103-b',
        text: 'Open body shape 45 degrees, receive with far right foot, execute La Pausa, and pass to Interior in space',
        isCorrect: true,
        tacticalExplanation: 'Excellent! Open body shape allowed complete field vision to execute La Pausa and break line.',
        targetPlayerId: 'am'
      }
    ]
  },
  {
    id: 'scen-104-1',
    title: 'Scenario: 5-Second Gegenpress Reaction',
    description: 'Turnover near opponent box. Press opponent DM within 2 seconds to recover possession.',
    knowledgeIds: ['kn-loss-possession'],
    initialState: {
      id: 'st-init-4',
      ballPosition: { x: 75, y: 30 },
      players: [
        { id: 'rw', label: 'Winger (You)', role: 'RW', team: 'home', x: 75, y: 30, highlighted: true },
        { id: 'opp', label: 'Opponent DM with Ball', role: 'DM', team: 'away', x: 72, y: 32 }
      ],
      passLines: []
    },
    options: [
      {
        id: 'opt-104-a',
        text: 'Immediate aggressive sprint towards ball carrier cutting off inside pass option',
        isCorrect: true,
        tacticalExplanation: 'Correct! Immediate counter-press suffocates counter-attack before opponent organizes.',
        targetPlayerId: 'opp'
      },
      {
        id: 'opt-104-b',
        text: 'Retreat back to defensive half immediately',
        isCorrect: false,
        tacticalExplanation: 'Incorrect. Retreating gives opponent time and space to launch counter-attack.'
      }
    ]
  },
  {
    id: 'scen-201-1',
    title: 'Scenario: Touchline Trap vs 3-Back Build-up',
    description: 'Direct press angle against 3-back build-up towards touchline.',
    knowledgeIds: ['kn-struct-elem'],
    initialState: {
      id: 'st-init-201',
      ballPosition: { x: 50, y: 80 },
      players: [
        { id: 'st', label: 'Striker (You)', role: 'ST', team: 'home', x: 50, y: 65, highlighted: true },
        { id: 'opp_cdm', label: 'Opponent Pivote', role: 'DM', team: 'away', x: 50, y: 80 }
      ],
      passLines: []
    },
    options: [
      {
        id: 'opt-201-a',
        text: 'Block central corridor and force pass towards touchline where space is constrained',
        isCorrect: true,
        tacticalExplanation: 'Correct! Forcing play to touchline reduces passing angles to 180 degrees.',
        targetPlayerId: 'opp_cdm'
      },
      {
        id: 'opt-201-b',
        text: 'Charge straight ahead leaving center-back completely free',
        isCorrect: false,
        tacticalExplanation: 'Incorrect. Straight charge leaves passing lane open to free center-back.'
      }
    ]
  },
  {
    id: 'scen-202-1',
    title: 'Scenario: Touchline Width vs Low Block',
    description: 'Exploit 5-back Low Block via touchline winger positioning.',
    knowledgeIds: ['kn-struct-elem', 'kn-dyn-elem'],
    initialState: {
      id: 'st-init-202',
      ballPosition: { x: 50, y: 35 },
      players: [
        { id: 'cm', label: 'CM (You)', role: 'CM', team: 'home', x: 50, y: 35, highlighted: true },
        { id: 'rw', label: 'Isolated Winger', role: 'RW', team: 'home', x: 88, y: 25 }
      ],
      passLines: []
    },
    options: [
      {
        id: 'opt-202-a',
        text: 'Swift diagonal switch to isolated touchline winger forcing opponent defender to step out',
        isCorrect: true,
        tacticalExplanation: 'Correct! Maximum width stretches low block defense and opens interior channels.',
        targetPlayerId: 'rw'
      },
      {
        id: 'opt-202-b',
        text: 'Low-percentage long shot into 5-man wall',
        isCorrect: false,
        tacticalExplanation: 'Incorrect. Low-percentage shot wastes possession.'
      }
    ]
  },
  {
    id: 'scen-301-1',
    title: 'Scenario: Halftime Third-Man Adjustment',
    description: 'Correct fullback pressing trap during halftime report.',
    knowledgeIds: ['kn-dec-eval'],
    initialState: {
      id: 'st-init-301',
      ballPosition: { x: 20, y: 50 },
      players: [
        { id: 'lb', label: 'Left Fullback (Pressed)', role: 'LB', team: 'home', x: 20, y: 50, highlighted: true }
      ],
      passLines: []
    },
    options: [
      {
        id: 'opt-301-a',
        text: 'Instruct CDM to drop as third-man support channel between lines',
        isCorrect: true,
        tacticalExplanation: 'Correct! Third-man support bypasses opponent touchline trap.',
        targetPlayerId: 'lb'
      },
      {
        id: 'opt-301-b',
        text: 'Instruct fullback to kick long high balls always',
        isCorrect: false,
        tacticalExplanation: 'Incorrect. Destroys positional play build-up principles.'
      }
    ]
  },
  {
    id: 'scen-401-1',
    title: 'Scenario: Designing 4v4+3 Positional Game',
    description: 'Select drill rules to train build-up orientation under pressure.',
    knowledgeIds: ['kn-unresolved-model-4'],
    initialState: {
      id: 'st-init-401',
      ballPosition: { x: 50, y: 50 },
      players: [
        { id: 'coach', label: 'Coach (You)', role: 'Coach', team: 'home', x: 50, y: 50, highlighted: true }
      ],
      passLines: []
    },
    options: [
      {
        id: 'opt-401-a',
        text: 'Design 4v4+3 Joker Positional Game with constrained space and mandatory far-foot reception rules',
        isCorrect: true,
        tacticalExplanation: 'Correct! Simulates real match spatial pressure and forces oriented control habits.',
        targetPlayerId: 'coach'
      },
      {
        id: 'opt-401-b',
        text: 'Physical running drill around pitch without ball',
        isCorrect: false,
        tacticalExplanation: 'Incorrect. Pure physical running builds zero tactical decision-making.'
      }
    ]
  }
];

// ==========================================
// 6. QUESTION BANK
// ==========================================
export const QUESTIONS_DATA: Question[] = [
  {
    id: 'q-101-1',
    type: 'MCQ',
    questionText: 'What is the primary objective of the Third-Man concept (A -> B -> C) in FC Barcelona build-up methodology?',
    knowledgeId: 'kn-dec-eval',
    objectiveId: 'obj-101-2',
    cognitiveLevel: 'UNDERSTAND',
    difficulty: 'MEDIUM',
    status: 'PUBLISHED',
    options: [
      {
        id: 'opt-q1-a',
        text: 'Bypass a closed direct passing lane by utilizing an intermediate second man to deliver the ball cleanly to an un-marked third man',
        isCorrect: true,
        explanation: 'Correct! The third man unlocks closed defensive lines.'
      },
      {
        id: 'opt-q1-b',
        text: 'Execute long aerial clearances towards wingers',
        isCorrect: false,
        explanation: 'Incorrect. Long aerial clearances do not utilize third-man principles.'
      }
    ],
    sourceEvidence: {
      id: 'ev-q1',
      documentId: 'doc-mod-1',
      documentTitle: 'Module 1',
      pageNumber: 14,
      excerpt: 'Third-man combinations pass via an intermediate player to target a free player operating in space.'
    }
  },
  {
    id: 'q-102-1',
    type: 'MCQ',
    questionText: 'What structural movement defines the Salida Lavolpiana build-up mechanism?',
    knowledgeId: 'kn-struct-elem',
    objectiveId: 'obj-102-1',
    cognitiveLevel: 'ANALYZE',
    difficulty: 'HARD',
    status: 'PUBLISHED',
    options: [
      {
        id: 'opt-q2-a',
        text: 'The Pivote drops between the center-backs, expanding center-backs to the touchlines and releasing fullbacks higher upfield',
        isCorrect: true,
        explanation: 'Correct! Lavolpiana creates a 3-player base at the back.'
      },
      {
        id: 'opt-q2-b',
        text: 'Both fullbacks stay inside penalty box while goalkeeper kicks long',
        isCorrect: false,
        explanation: 'Incorrect.'
      }
    ],
    sourceEvidence: {
      id: 'ev-q2',
      documentId: 'doc-mod-2',
      documentTitle: 'Module 2',
      pageNumber: 8,
      excerpt: 'Salida Lavolpiana expands center-backs to touchlines as Pivote drops.'
    }
  },
  {
    id: 'q-103-1',
    type: 'MCQ',
    questionText: 'What does "La Pausa" technique accomplish during build-up under pressure?',
    knowledgeId: 'kn-dyn-elem',
    objectiveId: 'obj-103-1',
    cognitiveLevel: 'EVALUATE',
    difficulty: 'HARD',
    status: 'PUBLISHED',
    options: [
      {
        id: 'opt-q3-a',
        text: 'Freezes momentarily on the ball to attract defender out of his line before releasing into the created gap',
        isCorrect: true,
        explanation: 'Correct! La Pausa baits opponent pressure to vacate key space.'
      },
      {
        id: 'opt-q3-b',
        text: 'Pauses to wait for referee whistle',
        isCorrect: false,
        explanation: 'Incorrect.'
      }
    ],
    sourceEvidence: {
      id: 'ev-q3',
      documentId: 'doc-mod-3',
      documentTitle: 'Module 3',
      pageNumber: 12,
      excerpt: 'La Pausa technique involves deliberate hesitation on the ball.'
    }
  },
  {
    id: 'q-104-1',
    type: 'MCQ',
    questionText: 'What is the core principle of Rest Defense (Tactic in Transition)?',
    knowledgeId: 'kn-loss-possession',
    objectiveId: 'obj-104-1',
    cognitiveLevel: 'APPLY',
    difficulty: 'MEDIUM',
    status: 'PUBLISHED',
    options: [
      {
        id: 'opt-q4-a',
        text: 'Positioning defensive players in counter-attack channels during ball possession so counter-attacks are suffocated within 5 seconds',
        isCorrect: true,
        explanation: 'Correct! Rest defense is active defense during attack.'
      },
      {
        id: 'opt-q4-b',
        text: 'Resting defenders during offensive corners',
        isCorrect: false,
        explanation: 'Incorrect.'
      }
    ],
    sourceEvidence: {
      id: 'ev-q4',
      documentId: 'doc-u23-loss',
      documentTitle: 'Chris Hogg U23 Analysis',
      pageNumber: 4,
      excerpt: 'Rest Defense positions defenders during offensive possession.'
    }
  }
];

// ==========================================
// 7. ASSESSMENTS & BLUEPRINTS
// ==========================================
export const ASSESSMENTS_DATA: Assessment[] = [
  {
    id: 'ass-mod-101',
    title: 'Module 01 Assessment: Positional Play & Numerical Superiority',
    type: 'MODULE_ASSESSMENT',
    stageId: 'stage-01',
    moduleId: 'mod-101',
    durationMinutes: 15,
    passingScorePercentage: 70,
    maxAttempts: 3,
    blueprint: {
      id: 'bp-101',
      assessmentId: 'ass-mod-101',
      cognitiveDistribution: {
        RECALL: 20,
        UNDERSTAND: 30,
        APPLY: 30,
        ANALYZE: 20,
        EVALUATE: 0
      },
      totalQuestions: 1
    },
    questionIds: ['q-101-1'],
    status: 'PUBLISHED'
  },
  {
    id: 'ass-mod-102',
    title: 'Module 02 Assessment: Salida Lavolpiana & Structural Channels',
    type: 'MODULE_ASSESSMENT',
    stageId: 'stage-01',
    moduleId: 'mod-102',
    durationMinutes: 15,
    passingScorePercentage: 70,
    maxAttempts: 3,
    questionIds: ['q-102-1'],
    status: 'PUBLISHED'
  },
  {
    id: 'ass-mod-103',
    title: 'Module 03 Assessment: Dynamic Control & La Pausa Timing',
    type: 'MODULE_ASSESSMENT',
    stageId: 'stage-01',
    moduleId: 'mod-103',
    durationMinutes: 15,
    passingScorePercentage: 70,
    maxAttempts: 3,
    questionIds: ['q-103-1'],
    status: 'PUBLISHED'
  },
  {
    id: 'ass-mod-104',
    title: 'Module 04 Assessment: Rest Defense & 5-Second Counter-Press',
    type: 'MODULE_ASSESSMENT',
    stageId: 'stage-01',
    moduleId: 'mod-104',
    durationMinutes: 15,
    passingScorePercentage: 70,
    maxAttempts: 3,
    questionIds: ['q-104-1'],
    status: 'PUBLISHED'
  }
];

// ==========================================
// 8. INITIAL STUDENT PROGRESS & MASTERY
// ==========================================
export const INITIAL_PROGRESS: StudentProgress = {
  studentId: 'student-demo',
  stageProgress: {
    'stage-01': 25,
    'stage-02': 0,
    'stage-03': 0,
    'stage-04': 0
  },
  completedModuleIds: ['mod-101'],
  completedLessonIds: ['les-101-1'],
  lessonProgress: {
    'les-101-1': {
      lessonId: 'les-101-1',
      completed: true,
      completedAt: '2026-08-04T18:00:00Z',
      lastBlockIndex: 4
    }
  },
  assessmentHistory: [],
  updatedAt: new Date().toISOString()
};

export const INITIAL_MASTERY: KnowledgeMastery[] = [
  {
    knowledgeId: 'kn-dec-eval',
    knowledgeTitle: 'Decision Evaluation and Comprehension',
    scorePercentage: 88,
    confidence: 0.95,
    evidenceCount: 4,
    updatedAt: new Date().toISOString()
  },
  {
    knowledgeId: 'kn-struct-elem',
    knowledgeTitle: 'Study of the Structural Element',
    scorePercentage: 75,
    confidence: 0.90,
    evidenceCount: 3,
    updatedAt: new Date().toISOString()
  },
  {
    knowledgeId: 'kn-dyn-elem',
    knowledgeTitle: 'Study of the Dynamic Element',
    scorePercentage: 54,
    confidence: 0.82,
    evidenceCount: 2,
    updatedAt: new Date().toISOString()
  },
  {
    knowledgeId: 'kn-loss-possession',
    knowledgeTitle: 'Loss of Possession & Rest Defense',
    scorePercentage: 70,
    confidence: 0.88,
    evidenceCount: 2,
    updatedAt: new Date().toISOString()
  }
];

export const INITIAL_RECOMMENDATIONS: PersonalizedRecommendation[] = [
  {
    id: 'rec-1',
    studentId: 'student-demo',
    type: 'REVIEW_LESSON',
    targetId: 'les-103-1',
    title: 'Review Dynamic Control & La Pausa Timing',
    reason: 'Dynamic Analysis mastery score is currently at 54%. Review body orientation to improve assessment results.',
    priority: 'HIGH'
  },
  {
    id: 'rec-2',
    studentId: 'student-demo',
    type: 'PRACTICE_SCENARIO',
    targetId: 'scen-102-1',
    title: 'Practice Salida Lavolpiana Width Execution',
    reason: 'Reinforce touchline fullback positioning to stretch opponent high pressing blocks.',
    priority: 'MEDIUM'
  }
];
