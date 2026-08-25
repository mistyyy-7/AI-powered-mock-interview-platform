// Comprehensive dataset of mock interview questions by Role, Type, and Seniority

export const MOCK_QUESTIONS = [
  // --- FRONTEND ENGINEER ---
  {
    id: 'fe-1',
    role: 'Frontend Engineer',
    type: 'Technical',
    difficulty: 'Senior',
    questionText: 'How do you optimize rendering performance in a large React 18 application with thousands of dynamic DOM nodes?',
    hints: 'Mention React.memo, useMemo, useCallback, virtualized lists (react-window/react-virtualized), and concurrent rendering features like useTransition.',
    sampleIdealAnswer: 'To optimize render performance in large React applications, I employ a multi-layered approach: 1) List virtualization using react-window to only render DOM nodes in the active viewport. 2) Fine-grained memoization with React.memo, useMemo, and useCallback to prevent unnecessary re-renders of heavy components. 3) Leveraging React 18 Concurrent Mode features such as useTransition and useDeferredValue to keep user interactions responsive during non-urgent background updates. 4) Code splitting with React.lazy and Suspense to minimize initial bundle size.',
    targetKeywords: ['virtualization', 'memo', 'usememo', 'usecallback', 'usetransition', 'concurrency', 're-render', 'viewport', 'bundle']
  },
  {
    id: 'fe-2',
    role: 'Frontend Engineer',
    type: 'Technical',
    difficulty: 'Senior',
    questionText: 'Explain the difference between Micro-Frontend architecture and Monolithic Frontend architectures. When would you choose one over the other?',
    hints: 'Discuss team autonomy, independent deployment pipelines, shared design systems, bundle duplication overhead, and communication via custom events or state stores.',
    sampleIdealAnswer: 'Micro-frontends decompose a monolithic web application into semi-independent micro-apps managed by autonomous sub-teams. I choose Micro-Frontends for large organizations with 50+ developers where independent CI/CD deployment pipelines and technology stack autonomy outweigh the bundle overhead. For smaller teams, a monolithic repository with clean feature modularity provides better DX and avoids state synchronization complexity.',
    targetKeywords: ['micro-frontend', 'monolith', 'autonomy', 'ci/cd', 'deployment', 'module federation', 'design system', 'state']
  },
  {
    id: 'fe-3',
    role: 'Frontend Engineer',
    type: 'Behavioral',
    difficulty: 'Senior',
    questionText: 'Describe a situation where a critical UI bug slipped into production. How did you handle the incident and what preventative measures did you implement?',
    hints: 'Use the STAR method: Situation, Task, Action, Result. Highlight post-mortem analysis, automated e2e testing, and feature flagging.',
    sampleIdealAnswer: 'Situation: A memory leak in our checkout web app caused browser freezes for 5% of users. Task: I needed to rollback the broken deployment and establish root cause quickly. Action: I leveraged Sentry session replay to isolate an uncleaned WebSocket listener inside useEffect. I immediately deployed a hotfix using our feature flag system, added a regression Cypress E2E test, and established strict linter rules for cleanup functions. Result: Incident resolved within 25 minutes with zero recurring leaks.',
    targetKeywords: ['star', 'useeffect', 'sentry', 'hotfix', 'feature flag', 'e2e', 'cypress', 'post-mortem', 'websocket']
  },
  {
    id: 'fe-4',
    role: 'Frontend Engineer',
    type: 'System Design',
    difficulty: 'Senior',
    questionText: 'How would you design a real-time collaborative document editor (like Google Docs or Figma) on the client side?',
    hints: 'Discuss Operational Transformation (OT) vs CRDTs (Conflict-free Replicated Data Types), WebSockets, Web Workers for background parsing, and optimistic updates.',
    sampleIdealAnswer: 'I would build the client architecture using CRDTs (e.g. Yjs or Automerge) over WebSockets for lock-free peer synchronization. Offloading heavy document reconciliation to a Web Worker keeps the main UI thread at 60 FPS. Rich text rendering is managed via a virtualized Canvas/SVG editor engine, with local IndexedDB storage for offline-first support and optimistic mutation queues.',
    targetKeywords: ['crdt', 'websocket', 'web worker', 'optimistic updates', 'yjs', 'indexeddb', 'canvas', 'concurrency']
  },
  {
    id: 'fe-5',
    role: 'Frontend Engineer',
    type: 'Technical',
    difficulty: 'Mid-Level',
    questionText: 'Walk me through the JavaScript Event Loop, Call Stack, Microtask Queue, and Macrotask Queue.',
    hints: 'Differentiate between Promises/MutationObserver (microtasks) and setTimeout/setInterval/I/O (macrotasks).',
    sampleIdealAnswer: 'The Event Loop manages single-threaded JS execution. The Call Stack executes synchronous code. When async operations complete, microtasks (Promises, process.nextTick) are pushed to the Microtask Queue, while macrotasks (setTimeout, requestAnimationFrame, I/O) go to the Macrotask Queue. The Event Loop completely drains the Microtask Queue after every stack task before processing the next macrotask.',
    targetKeywords: ['event loop', 'call stack', 'microtask', 'macrotask', 'promise', 'settimeout', 'async', 'single-threaded']
  },

  // --- BACKEND ENGINEER ---
  {
    id: 'be-1',
    role: 'Backend Engineer',
    type: 'Technical',
    difficulty: 'Senior',
    questionText: 'How do you design a database indexing strategy for a table with 100 million rows experiencing heavy read and write traffic?',
    hints: 'Discuss B-Tree vs Hash indexes, composite indexes (leftmost prefix rule), covering indexes, write amplification trade-offs, and database partitioning/sharding.',
    sampleIdealAnswer: 'For 100M+ rows, I first analyze query patterns using EXPLAIN ANALYZE. I design composite B-Tree indexes adhering to the selectivity principle and leftmost prefix rule. To mitigate write amplification overhead, I avoid over-indexing frequently updated columns. For massive read volume, I implement covering indexes so queries hit index pages without table lookups, complemented by horizontal table partitioning by date or tenant ID.',
    targetKeywords: ['b-tree', 'composite index', 'covering index', 'write amplification', 'explain analyze', 'partitioning', 'sharding', 'selectivity']
  },
  {
    id: 'be-2',
    role: 'Backend Engineer',
    type: 'System Design',
    difficulty: 'Senior',
    questionText: 'How would you architect a rate limiting middleware system that handles 100,000 requests per second across distributed backend nodes?',
    hints: 'Discuss Sliding Window Log / Token Bucket algorithm, Redis cluster with Lua scripts, HTTP 429 Too Many Requests headers, and fallback circuit breakers.',
    sampleIdealAnswer: 'I would implement a distributed sliding window rate limiter using Redis Cluster and atomic Lua scripts to prevent race conditions. The algorithm tracks client tokens per IP or API Key, returning HTTP 429 with Retry-After headers when thresholds are breached. Local in-memory caching (Guava/LRU) acts as a fallback if Redis experiences latency spikes, ensuring high availability.',
    targetKeywords: ['rate limit', 'redis', 'sliding window', 'token bucket', 'lua script', '429', 'circuit breaker', 'distributed']
  },
  {
    id: 'be-3',
    role: 'Backend Engineer',
    type: 'Behavioral',
    difficulty: 'Senior',
    questionText: 'Tell me about a time you had a technical disagreement with a teammate regarding system architecture. How did you reach alignment?',
    hints: 'Emphasize objective benchmarks, prototype benchmarks (PoC), tradeoff matrices, and prioritizing business goals.',
    sampleIdealAnswer: 'Situation: A teammate proposed GraphQL for our internal microservices, whereas I favored gRPC over Protocol Buffers for high-throughput service-to-service communication. Action: Instead of subjective debating, I set up a quick benchmark PoC testing latency and serialization overhead under load. Results showed gRPC delivered 4x faster response times and 60% smaller payloads. Result: The team agreed on gRPC for internal RPC and GraphQL strictly for client gateway APIs.',
    targetKeywords: ['grpc', 'graphql', 'benchmark', 'tradeoff', 'proto', 'alignment', 'poc', 'microservice']
  },

  // --- SYSTEM DESIGN ARCHITECT ---
  {
    id: 'sd-1',
    role: 'System Design Architect',
    type: 'System Design',
    difficulty: 'Staff / Lead',
    questionText: 'Design a globally scalable URL Shortener service (like bit.ly) capable of serving 10 Billion URLs with 99.999% uptime.',
    hints: 'Estimate QPS & storage, Base62 encoding, KGS (Key Generation Service), distributed caching, and database choice (NoSQL vs Relational).',
    sampleIdealAnswer: 'System Estimates: 10B URLs require ~500 QPS writes & 5,000 QPS reads. I utilize a dedicated Key Generation Service (KGS) pre-generating unique 7-character Base62 keys to eliminate dynamic collision checks. Shortened links are stored in Cassandra/DynamoDB for high write availability, fronted by Redis global caches caching 20% of hot URLs. CDN edge nodes redirect read requests directly, achieving 99.999% availability.',
    targetKeywords: ['base62', 'kgs', 'cassandra', 'redis', 'cdn', 'qps', 'storage estimation', 'availability', 'url shortener']
  },

  // --- PRODUCT MANAGER ---
  {
    id: 'pm-1',
    role: 'Product Manager',
    type: 'Behavioral',
    difficulty: 'Senior',
    questionText: 'How do you prioritize competing feature requests from Sales, Customer Support, and Engineering technical debt?',
    hints: 'Use frameworks like RICE (Reach, Impact, Confidence, Effort) or MoSCoW, align with strategic OKRs, and balance tech debt allocation.',
    sampleIdealAnswer: 'I evaluate all initiatives using the RICE framework aligned with quarterly strategic OKRs. I dedicate 20% of every sprint capacity specifically to technical debt and infrastructure reliability. For customer and sales requests, I measure revenue impact versus engineering effort, communicating transparent roadmaps using data-driven prioritization.',
    targetKeywords: ['rice', 'okr', 'prioritization', 'roadmap', 'tech debt', 'stakeholders', 'capacity']
  },

  // --- BEHAVIORAL & CULTURAL ---
  {
    id: 'beh-1',
    role: 'Behavioral & Cultural',
    type: 'Behavioral',
    difficulty: 'Mid-Level',
    questionText: 'Tell me about a time you failed to meet a deadline. What happened and what did you learn?',
    hints: 'Be honest, take ownership, describe proactive communication with stakeholders, and explain systemic changes made afterwards.',
    sampleIdealAnswer: 'Situation: I underestimated the complexity of integrating a legacy payment gateway, missing our initial launch target by 4 days. Task: I needed to salvage stakeholder trust and deliver securely. Action: As soon as I identified the risk 1 week prior, I immediately notified the product manager, revised the launch plan, and paired with a senior dev to streamline testing. Result: We launched safely with zero security flaws, and I adopted 1.5x story point buffers for legacy codebase tasks.',
    targetKeywords: ['star', 'deadline', 'ownership', 'proactive', 'communication', 'retrospective', 'buffer']
  }
];

// Helper function to query questions matching criteria
export const getMockQuestions = ({ role, type, difficulty, limit = 5 }) => {
  // Filter matching questions
  let filtered = MOCK_QUESTIONS.filter(q => {
    const matchRole = !role || q.role.toLowerCase() === role.toLowerCase();
    return matchRole;
  });

  // If filtered is empty or fewer than limit, fall back to default role/all questions
  if (filtered.length === 0) {
    filtered = [...MOCK_QUESTIONS];
  }

  // Shuffle or slice to limit
  return filtered.slice(0, limit);
};
