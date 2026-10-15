// Edit this file to update the portfolio content.

export const DATA = {
  name: 'Nancy',
  role: 'AI/ML Engineer',
  tagline: 'NLP · RAG · Vector Search Systems',
  location: 'Sonipat, Haryana, India',
  email: 'nnydv498@gmail.com',
  linkedin: 'https://linkedin.com/in/nancyy56',
  github: 'https://github.com/Nancyy56',
  resume: '/resume.pdf',
  degree: { start: '2023-09-01', end: '2027-07-31' },
  bio: 'I build RAG pipelines, semantic search and LLM-integrated backends — currently shipping AI flight-ops software at IFOA.',

  metrics: [
    ['~48%', 'lower forecast error'],
    ['<300ms', 'semantic code search'],
    ['25×', 'parallel forecast frames'],
    ['8.32', 'CGPA · B.Tech CSE'],
  ],

  experience: [{
    company: 'International Flight Operations Academy (IFOA) India LLP',
    role: 'AI Integration Developer Intern',
    place: 'New Delhi',
    period: 'Aug 2026 – Present',
    status: 'ACTIVE',
    points: [
      'AI-assisted flight-dispatch features · React/TS + Node.js · India–Switzerland team',
      'Weather-corridor service: 25 forecast frames in parallel, filtered to the great-circle path',
      'Leaking in-memory caches → persistent SQLite TTL cache · sub-second repeat queries',
      'GPT-4o / Gemini parsing for NOTAM, ATIS & MEL/CDL · 3D turbulence, icing & terrain views',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'SQLite', 'GPT-4o', 'Gemini'],
  }],

  // Set `link` to each repo URL once you have it
  projects: [
    {
      name: 'GovLens',
      title: 'Government Document RAG & Citation System',
      stack: ['Python', 'FastAPI', 'Qdrant', 'PostgreSQL', 'Ollama'],
      link: 'https://github.com/Nancyy56',
      highlight: 'citation-grounded answers',
      summary: 'RAG with verifiable citations over government notifications',
      points: [
        'Page-preserving chunking + rule-based metadata for citation-accurate retrieval',
        'bge-small-en-v1.5 embeddings · Qdrant cosine search · FastAPI + PostgreSQL',
        'Deterministic citation engine & supersession tracker grounding qwen3:8b answers',
      ],
    },
    {
      name: 'BizIntel AI',
      title: 'AI-Powered Business Intelligence System',
      stack: ['Python', 'FastAPI', 'RAG', 'Prophet', 'ChromaDB'],
      link: 'https://github.com/Nancyy56',
      highlight: '~48% lower forecast error',
      summary: 'RAG + forecasting + anomaly detection on business KPIs',
      points: [
        '~48% lower forecast error vs moving-average baseline (Prophet, backtested)',
        'Hybrid query router: rules → ML classifier → LLM intent',
        'Z-score & Isolation Forest anomaly detection on KPIs',
      ],
    },
    {
      name: 'DevScope',
      title: 'AI-Powered Codebase Intelligence System',
      stack: ['Python', 'FastAPI', 'SentenceTransformers', 'ChromaDB', 'RAG'],
      link: 'https://github.com/Nancyy56',
      highlight: '<300ms semantic search',
      summary: 'Natural-language search & Q&A over Python codebases',
      points: [
        'AST ingestion — functions & classes indexed as structured units',
        '<300ms semantic code search · SentenceTransformers + ChromaDB',
        'RAG Q&A served as a FastAPI REST service and a CLI',
      ],
    },
  ],

  // Self-assessed proficiency (0–100) — tweak to taste
  skills: [
    ['Python', 92], ['RAG / LLMs', 90], ['NLP', 86], ['Vector DBs', 85],
    ['Machine Learning', 82], ['Backend / APIs', 82], ['C++ / DSA', 75], ['TypeScript', 70],
  ],
  core: [['Python', 92], ['RAG / LLMs', 90], ['NLP', 86], ['ML', 82], ['Backend', 82]],

  stack: {
    'languages': ['Python', 'C++', 'SQL', 'JavaScript', 'TypeScript'],
    'ai & ml': ['Scikit-learn', 'XGBoost', 'PyTorch', 'LLMs', 'Supervised & Unsupervised Learning'],
    'nlp & search': ['Sentence Transformers', 'BERT', 'TF-IDF', 'Tokenization', 'Dense Retrieval', 'spaCy', 'NLTK'],
    'vector dbs & rag': ['ChromaDB', 'Qdrant', 'ANN Search', 'RAG', 'Vector Embeddings'],
    'mlops & backend': ['FastAPI', 'Streamlit', 'Apache Airflow', 'PostgreSQL', 'SQLite', 'REST APIs', 'Model Serving', 'Node.js'],
    'data & tools': ['Pandas', 'NumPy', 'Matplotlib', 'Prophet', 'MySQL', 'Git', 'GitHub', 'Google Colab', 'GCP'],
  },

  achievements: [
    ['Innovation Award', 'Unisys Hackathon 2024'],
    ['ML Lead, GDG DCRUST', '2024–25 · organized AI/ML contests & sessions for 100+ students'],
    ['150+ DSA Problems', 'solved on LeetCode in C++'],
    ['Supervised Machine Learning', 'Stanford Online & DeepLearning.AI (Coursera)'],
  ],

  education: {
    school: 'Deenbandhu Chhotu Ram University of Science and Technology (DCRUST)',
    degree: 'B.Tech — Computer Science and Engineering',
    place: 'Sonipat, Haryana',
    period: 'Sep 2023 – Jul 2027',
    cgpa: '8.32 / 10',
    coursework: ['Data Structures & Algorithms', 'OOP', 'Operating Systems', 'Computer Networks'],
  },
};

export function degreeProgress() {
  const s = new Date(DATA.degree.start), e = new Date(DATA.degree.end);
  return Math.min(1, Math.max(0, (Date.now() - s) / (e - s)));
}

export const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};
