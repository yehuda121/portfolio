module.exports = [
  {
    questionId: "algo-linear-search-001",
    category: "algorithms",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "What is the time complexity of linear search on an unsorted array of n elements?",
      he: "מה מורכבות הזמן של חיפוש לינארי במערך לא ממוין של n אלמנטים?",
    },
    answers: {
      en: [
        "O(n) in the worst and average case",
        "O(log n) because elements are scanned in halves",
        "O(1) when the target is not present",
        "O(n log n) due to implicit sorting",
      ],
      he: [
        "O(n) במקרה הגרוע והממוצע",
        "O(log n) כי אלמנטים נסרקים בחצאים",
        "O(1) כשהיעד לא קיים",
        "O(n log n) בגלל מיון מרומז",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Linear search checks each element sequentially until a match or exhaustion. Worst case examines all n elements; average case is n/2 ≈ O(n). No preprocessing is required, making it suitable for small or unsorted data. Sorted arrays enable faster binary search instead.",
      he: "חיפוש לינארי בודק כל אלמנט ברצף עד התאמה או סיום. במקרה הגרוע בודקים את כל n האלמנטים; בממוצע n/2 ≈ O(n). אין צורך בעיבוד מקדים, מה שמתאים לנתונים קטנים או לא ממוינים. במערכים ממוינים אפשר להשתמש בחיפוש בינארי מהיר יותר.",
    },
  },
  {
    questionId: "algo-binary-search-002",
    category: "algorithms",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "What precondition is required for binary search to work correctly?",
      he: "איזה תנאי מקדים נדרש כדי שחיפוש בינארי יעבוד נכון?",
    },
    answers: {
      en: [
        "The collection must be sorted (or have a total order with comparable elements)",
        "The array must have an even number of elements",
        "All elements must be unique integers",
        "The data must be stored in a linked list",
      ],
      he: [
        "האוסף חייב להיות ממוין (או עם סדר מלא ואלמנטים ניתנים להשוואה)",
        "למערך חייב להיות מספר זוגי של אלמנטים",
        "כל האלמנטים חייבים להיות מספרים שלמים ייחודיים",
        "הנתונים חייבים להיות מאוחסנים ברשימה מקושרת",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Binary search halves the search space by comparing the target to the middle element and discarding the irrelevant half. This requires a monotonic ordering. It runs in O(log n) time and O(1) space (iterative). Common pitfalls: integer overflow in mid = (lo+hi)/2 (use lo + (hi-lo)/2), off-by-one boundaries.",
      he: "חיפוש בינארי חותך את מרחב החיפוש לחצי על ידי השוואת היעד לאלמנט האמצעי וזריקת החצי הלא רלוונטי. זה דורש סדר מונוטוני. הוא רץ ב-O(log n) זמן ו-O(1) מקום (איטרטיבי). מלכודות נפוצות: integer overflow ב-mid = (lo+hi)/2 (השתמשו ב-lo + (hi-lo)/2), גבולות off-by-one.",
    },
  },
  {
    questionId: "algo-bubble-sort-003",
    category: "algorithms",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "What is the worst-case time complexity of Bubble Sort?",
      he: "מה מורכבות הזמן במקרה הגרוע של Bubble Sort?",
    },
    answers: {
      en: [
        "O(n²) comparisons and swaps in the naive implementation",
        "O(n log n) because it uses divide and conquer",
        "O(n) when the input is reverse sorted only",
        "O(1) with a single pass",
      ],
      he: [
        "O(n²) השוואות והחלפות במימוש הנאיבי",
        "O(n log n) כי הוא משתמש בחלק ומשול",
        "O(n) רק כשהקלט ממוין הפוך",
        "O(1) במעבר יחיד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Bubble Sort repeatedly swaps adjacent out-of-order pairs, bubbling the largest toward the end each pass. Naive version does n passes → O(n²). With a 'swapped' flag early exit can reach O(n) on sorted input. It is mainly pedagogical; production sorts use merge sort, quicksort, or timsort.",
      he: "Bubble Sort מחליף שוב ושוב זוגות סמוכים לא ממוינים, ומבהב את הגדול לסוף בכל מעבר. גרסה נאיבית עושה n מעברים → O(n²). עם דגל 'swapped' יציאה מוקדמת יכולה להגיע ל-O(n) בקלט ממוין. הוא בעיקר פדגוגי; מיון בפרודקשן משתמש ב-merge sort, quicksort או timsort.",
    },
  },
  {
    questionId: "algo-recursion-base-case-004",
    category: "algorithms",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "Why is a base case essential in recursive algorithms?",
      he: "מדוע מקרה בסיס (base case) חיוני באלגוריתמים רקורסיביים?",
    },
    answers: {
      en: [
        "It terminates the recursion and prevents infinite self-calls and stack overflow",
        "It makes the algorithm run in O(1) always",
        "It replaces the need for any local variables",
        "It is only required in tail-recursive functions",
      ],
      he: [
        "הוא מסיים את הרקורסיה ומונע קריאות עצמיות אינסופיות ו-stack overflow",
        "הוא הופך את האלגוריתם ל-O(1) תמיד",
        "הוא מחליף את הצורך במשתנים מקומיים",
        "הוא נדרש רק בפונקציות tail-recursive",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Recursion solves a problem by solving smaller subproblems. Without a base case, calls never stop, exhausting the call stack. Example: factorial(n) returns 1 when n ≤ 1. Each recursive path must progress toward the base case (smaller input) to guarantee termination and correctness.",
      he: "רקורסיה פותרת בעיה על ידי פתרון תת-בעיות קטנות יותר. בלי מקרה בסיס, הקריאות לא נעצרות וממלאות את מחסנית הקריאות. דוגמה: factorial(n) מחזיר 1 כש-n ≤ 1. כל מסלול רקורסיבי חייב להתקדם לכיוון מקרה הבסיס (קלט קטן יותר) כדי להבטיח סיום ונכונות.",
    },
  },
  {
    questionId: "algo-time-complexity-o-n-005",
    category: "algorithms",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "An algorithm iterates once through an array of n elements performing O(1) work per element. What is its time complexity?",
      he: "אלגוריתם עובר פעם אחת על מערך של n אלמנטים ומבצע עבודה O(1) לכל אלמנט. מה מורכבות הזמן שלו?",
    },
    answers: {
      en: [
        "O(n) linear time",
        "O(n²) because one loop always means quadratic",
        "O(log n) because n is halved implicitly",
        "O(1) because the loop constant is small",
      ],
      he: [
        "O(n) זמן לינארי",
        "O(n²) כי לולאה אחת תמיד אומרת ריבועי",
        "O(log n) כי n נחצה באופן מרומז",
        "O(1) כי קבוע הלולאה קטן",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Big-O focuses on growth rate as n → ∞, ignoring constant factors. A single pass performing constant work per element totals c·n steps → O(n). Interview tip: nested loops over the same data often indicate O(n²); a single loop is typically linear unless each step does logarithmic work.",
      he: "Big-O מתמקד בקצב הגדילה כש-n → ∞, ומתעלם מקבועים. מעבר יחיד עם עבודה קבועה לכל אלמנט מסתכם ב-c·n צעדים → O(n). טיפ לראיון: לולאות מקוננות על אותם נתונים לעיתים מצביעות על O(n²); לולאה יחידה בדרך כלל לינארית אלא אם כל צעד עושה עבודה לוגריתמית.",
    },
  },
  {
    questionId: "algo-two-pointer-006",
    category: "algorithms",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "When is the two-pointer technique most commonly applied?",
      he: "מתי טכניקת שני המצביעים (two-pointer) מיושמת בדרך כלל?",
    },
    answers: {
      en: [
        "On sorted arrays or linked lists to find pairs or partitions in O(n) with two indices moving toward each other or in tandem",
        "Only on hash tables for collision resolution",
        "Exclusively in graph BFS traversals",
        "When data must be sorted using O(n²) swaps",
      ],
      he: [
        "על מערכים או רשימות מקושרות ממוינות למציאת זוגות או חלוקות ב-O(n) עם שני אינדקסים שנעים זה לזה או יחד",
        "רק בטבלאות גיבוב לפתרון התנגשויות",
        "בלעדי במעברי BFS בגרפים",
        "כשצריך למיין נתונים עם החלפות O(n²)",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Two pointers maintain lo/hi or slow/fast indices. Classic problems: two-sum in sorted array, remove duplicates in-place, palindrome check, container with most water. Each pointer advances based on a condition, ensuring linear scans without nested loops. Floyd's cycle detection uses slow/fast pointers on linked lists.",
      he: "שני מצביעים שומרים אינדקסים lo/hi או slow/fast. בעיות קלאסיות: two-sum במערך ממוין, הסרת כפילויות במקום, בדיקת פלינדרום, container with most water. כל מצביע מתקדם לפי תנאי, ומבטיח סריקות לינאריות בלי לולאות מקוננות. זיהוי מחזור של Floyd משתמש במצביעים slow/fast על רשימות מקושרות.",
    },
  },
  {
    questionId: "algo-iterative-vs-recursive-007",
    category: "algorithms",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "What is a primary drawback of deep recursion compared to an equivalent iterative solution?",
      he: "מה חסרון עיקרי של רקורסיה עמוקה לעומת פתרון איטרטיבי שקול?",
    },
    answers: {
      en: [
        "Risk of stack overflow and higher function call overhead for large depths",
        "Recursion cannot express tree traversals",
        "Iterative code always uses more memory",
        "Recursion is banned in all production languages",
      ],
      he: [
        "סיכון ל-stack overflow ותקורת קריאות פונקציה גבוהה יותר לעומקים גדולים",
        "רקורסיה לא יכולה לבטא מעברי עץ",
        "קוד איטרטיבי תמיד צורך יותר זיכרון",
        "רקורסיה אסורה בכל שפות הפרודקשן",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Each recursive call consumes stack frame space for locals and return addresses. Depth in the thousands can overflow the stack (e.g., DFS on a long chain). Iteration uses explicit heap structures (stack/queue) with controllable memory. Tail-call optimization (in some languages) reuses frames, mitigating but not eliminating limits.",
      he: "כל קריאה רקורסיבית צורכת מקום במסגרת מחסנית עבור משתנים מקומיים וכתובות חזרה. עומק של אלפים יכול לגרום ל-stack overflow (למשל DFS על שרשרת ארוכה). איטרציה משתמשת במבני heap מפורשים (stack/queue) עם זיכרון נשלט. Tail-call optimization (בשפות מסוימות) ממחזר מסגרות, אך לא מבטל מגבלות.",
    },
  },
  {
    questionId: "algo-merge-sort-008",
    category: "algorithms",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "What are the time and space complexities of Merge Sort?",
      he: "מה מורכבויות הזמן והמקום של Merge Sort?",
    },
    answers: {
      en: [
        "O(n log n) time and O(n) auxiliary space for merging",
        "O(n²) time and O(1) space",
        "O(n) time and O(log n) space",
        "O(log n) time and O(n²) space",
      ],
      he: [
        "O(n log n) זמן ו-O(n) מקום עזר למיזוג",
        "O(n²) זמן ו-O(1) מקום",
        "O(n) זמן ו-O(log n) מקום",
        "O(log n) זמן ו-O(n²) מקום",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Merge Sort divides the array in half recursively (log n levels), merging sorted halves in O(n) per level → O(n log n) time. Merging requires temporary buffer space O(n) (in-place variants exist but with trade-offs). It is stable, predictable, and preferred for linked lists and external sorting.",
      he: "Merge Sort מחלק את המערך לחצאים רקורסיבית (log n רמות), וממזג חצאים ממוינים ב-O(n) לכל רמה → O(n log n) זמן. מיזוג דורש buffer זמני O(n) (יש גרסאות in-place עם פשרות). הוא יציב, צפוי ומועדף לרשימות מקושרות ומיון חיצוני.",
    },
  },
  {
    questionId: "algo-quicksort-pivot-009",
    category: "algorithms",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "What causes Quicksort to degrade to O(n²) worst-case time?",
      he: "מה גורם ל-Quicksort להתדרדר ל-O(n²) במקרה הגרוע?",
    },
    answers: {
      en: [
        "Consistently poor pivot choices (e.g., always min/max) producing highly unbalanced partitions",
        "Using too much auxiliary memory during merge",
        "Sorting strings instead of integers",
        "Implementing it iteratively instead of recursively",
      ],
      he: [
        "בחירות pivot גרועות בעקביות (למשל תמיד מינימום/מקסימום) שיוצרות חלוקות לא מאוזנות מאוד",
        "שימוש ביותר מדי זיכרון עזר במיזוג",
        "מיון מחרוזות במקום מספרים שלמים",
        "מימוש איטרטיבי במקום רקורסיבי",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Quicksort partitions around a pivot; ideal split is balanced (≈ n/2 each side). If pivot is always the smallest element, partitions are size 0 and n−1, yielding n recursive levels each doing O(n) work → O(n²). Randomized pivot or median-of-three mitigates this. Average case remains O(n log n) with low constant factors, making it popular in practice.",
      he: "Quicksort מחלק סביב pivot; פיצול אידיאלי מאוזן (≈ n/2 לכל צד). אם ה-pivot תמיד האלמנט הקטן ביותר, החלוקות בגודל 0 ו-n−1, ונוצרות n רמות רקורסיה שכל אחת עושה O(n) עבודה → O(n²). pivot אקראי או median-of-three מפחיתים זאת. הממוצע נשאר O(n log n) עם קבועים נמוכים, מה שהופך אותו לפופולרי בפרקטיקה.",
    },
  },
  {
    questionId: "algo-bfs-graph-010",
    category: "algorithms",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "What does Breadth-First Search (BFS) guarantee on an unweighted graph?",
      he: "מה Breadth-First Search (BFS) מבטיח בגרף לא ממושקל?",
    },
    answers: {
      en: [
        "Shortest path in number of edges from the source to every reachable vertex",
        "A minimum spanning tree",
        "Topological ordering of all vertices",
        "Detection of negative-weight cycles",
      ],
      he: [
        "מסלול קצר ביותר במספר קשתות מהמקור לכל קודקוד נגיש",
        "עץ מסתעף מינימלי (MST)",
        "סידור טופולוגי של כל הקודקודים",
        "זיהוי מחזורי משקל שלילי",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "BFS explores layer by layer using a queue, visiting nodes in nondecreasing distance from the start. First time a node is reached is via a shortest edge-count path. Used in social network degrees, maze solving, and broadcast routing. Time is O(V + E) with adjacency list representation.",
      he: "BFS חוקר שכבה אחר שכבה עם תור, ומבקר בצמתים במרחק לא יורד מההתחלה. הפעם הראשונה שמגיעים לצומת היא דרך מסלול עם מינימום קשתות. משמש במעלות רשתות חברתיות, פתרון מבוכים וניתוב שידור. הזמן O(V + E) עם ייצוג רשימת שכנות.",
    },
  },
  {
    questionId: "algo-dfs-graph-011",
    category: "algorithms",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "Which problem is Depth-First Search (DFS) particularly well suited for?",
      he: "לאיזו בעיה Depth-First Search (DFS) מתאים במיוחד?",
    },
    answers: {
      en: [
        "Detecting cycles and exploring connected components in graphs",
        "Finding shortest paths in unweighted graphs",
        "Computing global all-pairs shortest paths in weighted graphs",
        "Sorting arrays in O(n log n) time",
      ],
      he: [
        "זיהוי מחזורים וחקר רכיבים קשורים בגרפים",
        "מציאת מסלולים קצרים בגרפים לא ממושקלים",
        "חישוב מסלולים קצרים לכל הזוגות בגרפים ממושקלים",
        "מיון מערכים ב-O(n log n)",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "DFS dives deep along edges before backtracking, using a stack (explicit or call stack). It detects cycles (back edges), finds strongly connected components (Kosaraju/Tarjan), and supports topological sort on DAGs. Unlike BFS, DFS does not guarantee shortest paths in unweighted graphs unless augmented.",
      he: "DFS צולל עמוק לאורך קשתות לפני backtracking, עם מחסנית (מפורשת או מחסנית קריאות). הוא מזהה מחזורים (קשתות אחורה), מוצא רכיבים קשורים חזק (Kosaraju/Tarjan), ותומך במיון טופולוגי על DAG. בניגוד ל-BFS, DFS לא מבטיח מסלולים קצרים בגרפים לא ממושקלים אלא אם מחזקים אותו.",
    },
  },
  {
    questionId: "algo-dynamic-programming-012",
    category: "algorithms",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "When is Dynamic Programming (DP) applicable?",
      he: "מתי תכנות דינמי (Dynamic Programming) ישים?",
    },
    answers: {
      en: [
        "When the problem has optimal substructure and overlapping subproblems that can be memoized or tabulated",
        "Only when the input size is below 100 elements",
        "When greedy choice always yields the global optimum",
        "When the problem requires parallel GPU execution",
      ],
      he: [
        "כשלבעיה יש מבנה אופטימלי תת-בעיות חופפות שניתן לשמור ב-memoization או בטבלה",
        "רק כשגודל הקלט מתחת ל-100 אלמנטים",
        "כשבחירה חמדנית תמיד נותנת Optimum גלובלי",
        "כשהבעיה דורשת הרצה מקבילית על GPU",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "DP breaks problems into subproblems whose solutions compose the optimal answer. Overlapping subproblems mean the same subproblem appears many times—cache results (top-down memoization or bottom-up tabulation). Examples: Fibonacci, knapsack, LCS, edit distance. Without overlapping subproblems, divide-and-conquer may suffice without caching.",
      he: "DP מפרק בעיות לתת-בעיות שפתרונן מרכיב את התשובה האופטימלית. תת-בעיות חופפות פירושן אותה תת-בעיה מופיעה פעמים רבות—שמרו תוצאות (memoization מלמעלה או טבלה מלמטה). דוגמאות: Fibonacci, knapsack, LCS, edit distance. בלי תת-בעיות חופפות, divide-and-conquer עשוי להספיק בלי מטמון.",
    },
  },
  {
    questionId: "algo-greedy-algorithm-013",
    category: "algorithms",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "What must be true for a greedy algorithm to produce an optimal solution?",
      he: "מה חייב להתקיים כדי שאלגוריתם חמדן יפיק פתרון אופטימלי?",
    },
    answers: {
      en: [
        "The problem must exhibit the greedy choice property and optimal substructure for that greedy strategy",
        "Greedy always works on any optimization problem",
        "The input must be sorted descending",
        "Greedy requires exponential time to verify correctness",
      ],
      he: [
        "לבעיה חייבת להיות תכונת בחירה חמדנית ומבנה אופטימלי תת-האסטרטגיה החמדנית",
        "חמדן תמיד עובד על כל בעיית אופטימיזציה",
        "הקלט חייב להיות ממוין יורד",
        "חמדן דורש זמן אקספוננציאלי לאימות נכונות",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Greedy makes the locally best choice at each step. It works for activity selection, Huffman coding, and Kruskal/Prim MST when proven safe. Counterexample: coin change with coins {1,3,4} and amount 6—greedy picks 4+1+1=3 coins but optimal is 3+3=2. Always prove or cite the greedy-choice lemma in interviews.",
      he: "חמדן בוחר בכל שלב את הבחירה הטובה ביותר מקומית. הוא עובד לבחירת פעילויות, קידוד Huffman ו-Kruskal/Prim MST כשמוכיחים בטיחות. דוגמת נגד: עודף עם מטבעות {1,3,4} וסכום 6—חמדן בוחר 4+1+1=3 מטבעות אך האופטימלי 3+3=2. בראיונות תמיד הוכיחו או צטטו את greedy-choice lemma.",
    },
  },
  {
    questionId: "algo-topological-sort-014",
    category: "algorithms",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "On which type of graph does topological sorting apply?",
      he: "על איזה סוג גרף מיון טופולוגי חל?",
    },
    answers: {
      en: [
        "A Directed Acyclic Graph (DAG)",
        "Any undirected connected graph",
        "A complete graph with cycles",
        "A bipartite graph only",
      ],
      he: [
        "גרף מכוון ללא מחזורים (DAG)",
        "כל גרף לא מכוון קשור",
        "גרף שלם עם מחזורים",
        "גרף דו-חלקי בלבד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Topological order linearizes vertices so every edge u→v has u before v. Cycles make this impossible. Algorithms: Kahn's (BFS on indegree) or DFS post-order reversal. Applications: build systems (task dependencies), course prerequisites, instruction scheduling. Detecting cycle during topo sort signals invalid dependency graph.",
      he: "סדר טופולוגי מסדר קודקודים כך שכל קשת u→v יש u לפני v. מחזורים הופכים זאת לבלתי אפשרי. אלגוריתמים: Kahn (BFS על indegree) או DFS עם היפוך post-order. יישומים: מערכות build (תלויות משימות), דרישות קורסים, תזמון הוראות. זיהוי מחזור במיון טופולוגי מסמן גרף תלויות לא תקין.",
    },
  },
  {
    questionId: "algo-dijkstra-shortest-path-015",
    category: "algorithms",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "What edge-weight condition is required for Dijkstra's algorithm to be correct?",
      he: "איזה תנאי על משקלי קשתות נדרש כדי שאלגוריתם דייקסטרה יהיה נכון?",
    },
    answers: {
      en: [
        "All edge weights must be nonnegative",
        "The graph must be undirected only",
        "Edge weights must be distinct powers of two",
        "The graph must contain at least one negative cycle",
      ],
      he: [
        "כל משקלי הקשתות חייבים להיות לא שליליים",
        "הגרף חייב להיות לא מכוון בלבד",
        "משקלי קשתות חייבים להיות חזקות שונות של 2",
        "הגרף חייב להכיל לפחות מחזור שלילי אחד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Dijkstra greedily settles the closest unsettled vertex using a min-priority queue. Negative edges can cause settled distances to be suboptimal when a cheaper path is discovered later. With nonnegative weights, once a node is extracted from the queue, its distance is final. Time: O((V+E) log V) with binary heap. Use Bellman-Ford for negative edges.",
      he: "דייקסטרה קובע בחמדנות את הצומת הלא מיושב הקרוב ביותר עם תור עדיפות מינימום. קשתות שליליות יכולות לגרום למרחקים מיושבים להיות לא אופטימליים כשמסלול זול יותר מתגלה מאוחר יותר. עם משקלים לא שליליים, ברגע שצומת נשלף מהתור המרחק שלו סופי. זמן: O((V+E) log V) עם binary heap. השתמשו ב-Bellman-Ford לקשתות שליליות.",
    },
  },
  {
    questionId: "algo-sliding-window-016",
    category: "algorithms",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "What is the sliding window technique used for?",
      he: "למה משמשת טכניקת החלון הזז (sliding window)?",
    },
    answers: {
      en: [
        "Maintaining a contiguous subarray/substring window while expanding or shrinking ends to solve range queries in O(n)",
        "Sorting subarrays independently in parallel",
        "Converting recursion to iteration automatically",
        "Finding maximum flow in networks",
      ],
      he: [
        "שמירה על תת-מערך/מחרוזת רציפה תוך הרחבה או כיווץ קצוות לפתרון שאילתות טווח ב-O(n)",
        "מיון תת-מערכים באופן עצמאי במקביל",
        "המרה אוטומטית של רקורסיה לאיטרציה",
        "מציאת זרימה מקסימלית ברשתות",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Sliding window avoids re-scanning by updating state when moving left/right pointers: longest substring without repeating chars, max sum subarray of size k, minimum window substring. Fixed-window variants keep constant width; variable-window adjusts based on constraints. Typically O(n) when each element enters/exits the window once.",
      he: "חלון זז נמנע מסריקה חוזרת על ידי עדכון מצב כשמזיזים מצביעים שמאל/ימין: מחרוזת משנה הארוכה בלי תווים חוזרים, סכום מקסימלי של תת-מערך בגודל k, מחרוזת משנה מינימלית. גרסאות חלון קבוע שומרות רוחב קבוע; חלון משתנה מתאים לפי אילוצים. בדרך כלל O(n) כשכל אלמנט נכנס/יוצא מהחלון פעם אחת.",
    },
  },
  {
    questionId: "algo-backtracking-nqueens-017",
    category: "algorithms",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "What is the core idea of backtracking?",
      he: "מה הרעיון המרכזי של backtracking?",
    },
    answers: {
      en: [
        "Build candidates incrementally and abandon a path (backtrack) as soon as it violates constraints",
        "Always explore every possible permutation without pruning",
        "Use dynamic programming tables exclusively",
        "Sort the input then apply binary search only",
      ],
      he: [
        "בניית מועמדים בהדרגה ונטישת מסלול (backtrack) ברגע שהוא מפר אילוצים",
        "תמיד לחקור כל פרמוטציה אפשרית בלי גיזום",
        "שימוש בלעדי בטבלאות תכנות דינמי",
        "מיון הקלט ואז חיפוש בינארי בלבד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Backtracking is DFS over a state space: try a choice, recurse, undo if dead end. N-Queens places queens row by row, pruning columns/diagonals under attack. Other examples: Sudoku, subset sum, graph coloring. Pruning exponential search with constraint checks is the key interview insight—without pruning, complexity explodes.",
      he: "Backtracking הוא DFS על מרחב מצבים: נסו בחירה, רקורסיה, בטלו אם מבוי סתום. N-Queens מציב מלכות שורה אחר שורה וגוזם עמודות/אלכסונים תחת התקפה. דוגמאות נוספות: Sudoku, סכום תת-קבוצה, צביעת גרף. גיזום חיפוש אקספוננציאלי עם בדיקות אילוצים הוא תובנת הראיון המרכזית—בלי גיזום המורכבות מתפוצצת.",
    },
  },
  {
    questionId: "algo-knapsack-dp-018",
    category: "algorithms",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "The 0/1 Knapsack problem is commonly solved with DP in what time complexity?",
      he: "בעיית 0/1 Knapsack נפתרת בדרך כלל עם DP באיזו מורכבות זמן?",
    },
    answers: {
      en: [
        "O(n × W) pseudo-polynomial time where n is items and W is capacity",
        "O(n log n) by sorting items by value",
        "O(2^n) only; DP cannot help",
        "O(1) using a greedy heuristic always",
      ],
      he: [
        "O(n × W) זמן פסאודו-פולינומי כאשר n פריטים ו-W קיבולת",
        "O(n log n) על ידי מיון פריטים לפי ערך",
        "O(2^n) בלבד; DP לא יכול לעזור",
        "O(1) עם heuristic חמדן תמיד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "DP table dp[i][w] = max value using first i items with capacity w. Transition: skip item i or take it if weight fits. Fills n×W table → O(nW). This is pseudo-polynomial (polynomial in numeric value W, not bit length). NP-hard in general. Space can be optimized to O(W) with 1D rolling array.",
      he: "טבלת DP dp[i][w] = ערך מקסימלי עם i פריטים ראשונים וקיבולת w. מעבר: דלג על פריט i או קח אם המשקל מתאים. ממלאים טבלה n×W → O(nW). זה פסאודו-פולינומי (פולינומי בערך המספרי W, לא באורך הביטים). NP-hard באופן כללי. אפשר לייעל מקום ל-O(W) עם מערך 1D מתגלגל.",
    },
  },
  {
    questionId: "algo-master-theorem-019",
    category: "algorithms",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "The recurrence T(n) = aT(n/b) + O(n^d) with a ≥ 1, b > 1 applies to divide-and-conquer. If d = log_b(a), what is T(n)?",
      he: "הנוסחה T(n) = aT(n/b) + O(n^d) עם a ≥ 1, b > 1 חלה על חלק ומשול. אם d = log_b(a), מהו T(n)?",
    },
    answers: {
      en: [
        "Θ(n^d log n)",
        "Θ(n^d)",
        "Θ(n^{d+1})",
        "Θ(log n) only",
      ],
      he: [
        "Θ(n^d log n)",
        "Θ(n^d)",
        "Θ(n^{d+1})",
        "Θ(log n) בלבד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "The Master Theorem compares the split cost O(n^d) to the number of subproblems a at depth log_b n. Case 2 (d = log_b a): work is balanced across levels, adding a log factor → Θ(n^d log n). Merge sort: a=2, b=2, d=1, log_2 2=1 → Θ(n log n). Case 1 (d < log_b a): leaves dominate; Case 3 (d > log_b a): root dominates.",
      he: "משפט האב (Master Theorem) משווה עלות הפיצול O(n^d) למספר תת-הבעיות a בעומק log_b n. מקרה 2 (d = log_b a): העבודה מאוזנת בין הרמות ומוסיפה גורם log → Θ(n^d log n). Merge sort: a=2, b=2, d=1, log_2 2=1 → Θ(n log n). מקרה 1 (d < log_b a): העלים שולטים; מקרה 3 (d > log_b a): השורש שולט.",
    },
  },
  {
    questionId: "algo-floyd-warshall-020",
    category: "algorithms",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "What does the Floyd-Warshall algorithm compute?",
      he: "מה אלגוריתם Floyd-Warshall מחשב?",
    },
    answers: {
      en: [
        "All-pairs shortest paths in O(V³) for a weighted graph, allowing negative edges (no negative cycles)",
        "A minimum spanning tree in O(E log V)",
        "Topological order of a DAG in O(V+E)",
        "Maximum flow between a single source and sink",
      ],
      he: [
        "מסלולים קצרים לכל הזוגות ב-O(V³) בגרף ממושקל, עם קשתות שליליות (ללא מחזורים שליליים)",
        "עץ מסתעף מינימלי ב-O(E log V)",
        "סדר טופולוגי של DAG ב-O(V+E)",
        "זרימה מקסימלית בין מקור ויעד יחידים",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Floyd-Warshall DP considers whether shortest path from i to j passes through an intermediate vertex k. Triple loop over k, i, j updates distances in O(V³). Handles negative weights but detects negative cycles on the diagonal. Simpler than running Dijkstra from every vertex and suitable for dense graphs with small V.",
      he: "Floyd-Warshall DP בודק אם מסלול קצר מ-i ל-j עובר דרך קודקוד ביניים k. לולאה משולשת על k, i, j מעדכנת מרחקים ב-O(V³). מטפל במשקלים שליליים אך מזהה מחזורים שליליים באלכסון. פשוט יותר מהרצת Dijkstra מכל קודקוד ומתאים לגרפים דחוסים עם V קטן.",
    },
  },
];
