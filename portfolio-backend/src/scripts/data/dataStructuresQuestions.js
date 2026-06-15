module.exports = [
  {
    questionId: "ds-array-vs-linked-list-001",
    category: "data_structures",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "What is the main trade-off between a dynamic array and a singly linked list?",
      he: "מה הפשרה העיקרית בין מערך דינמי לרשימה מקושרת חד-כיוונית?",
    },
    answers: {
      en: [
        "Arrays offer O(1) indexed access; linked lists offer O(1) insertion/deletion at a known node position but O(n) random access",
        "Linked lists always use less memory than arrays",
        "Arrays cannot resize; linked lists cannot shrink",
        "Linked lists support binary search natively in O(log n)",
      ],
      he: [
        "מערכים מציעים גישה מאונדקסת ב-O(1); רשימות מקושרות מציעות הוספה/מחיקה ב-O(1) במיקום ידוע אך גישה אקראית ב-O(n)",
        "רשימות מקושרות תמיד צורכות פחות זיכרון ממערכים",
        "מערכים לא יכולים להתרחב; רשימות מקושרות לא יכולות להתכווץ",
        "רשימות מקושרות תומכות בחיפוש בינארי באופן מובנה ב-O(log n)",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Dynamic arrays store elements contiguously, giving cache-friendly O(1) random access but costly middle insertions (O(n) shifts). Linked lists scatter nodes with pointers, making indexed access O(n) but allowing O(1) splices once the node is located. Choose arrays for iteration and indexing; linked lists for frequent insert/delete at iterators or when size fluctuates wildly.",
      he: "מערכים דינמיים מאחסנים אלמנטים ברצף, מה שנותן גישה אקראית ב-O(1) ידידותית למטמון אך הוספות באמצע יקרות (הזזות ב-O(n)). רשימות מקושרות מפזרות צמתים עם מצביעים, מה שהופך גישה מאונדקסת ל-O(n) אך מאפשר חיתוכים ב-O(1) אחרי שמצאנו את הצומת. בחרו מערכים לאיטרציה ואינדוקס; רשימות מקושרות להוספה/מחיקה תכופה באיטרטורים או כשהגודל משתנה מאוד.",
    },
  },
  {
    questionId: "ds-stack-operations-002",
    category: "data_structures",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "Which operations define a stack abstract data type?",
      he: "אילו פעולות מגדירות מבנה נתונים מופשט מסוג מחסנית (Stack)?",
    },
    answers: {
      en: [
        "enqueue and dequeue at both ends",
        "push, pop, and peek at the top in LIFO order",
        "insert and extract-min in O(log n)",
        "get, put, and remove with LRU eviction",
      ],
      he: [
        "enqueue ו-dequeue בשני הקצוות",
        "push, pop ו-peek בראש המחסנית בסדר LIFO",
        "insert ו-extract-min ב-O(log n)",
        "get, put ו-remove עם פינוי LRU",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "A stack is Last-In-First-Out: push adds to the top, pop removes the top, peek inspects without removal. Stacks model call frames, undo history, DFS traversal, and bracket matching. They are typically implemented with a dynamic array or linked list; both achieve O(1) amortized push/pop at one end.",
      he: "מחסנית היא Last-In-First-Out: push מוסיף לראש, pop מסיר מהראש, peek בודק בלי להסיר. מחסניות מייצגות מסגרות קריאה, היסטוריית undo, מעבר DFS והתאמת סוגריים. מממשים אותן בדרך כלל עם מערך דינמי או רשימה מקושרת; שניהם משיגים push/pop ב-O(1) ממוצע בקצה אחד.",
    },
  },
  {
    questionId: "ds-queue-fifo-003",
    category: "data_structures",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "A queue processes elements in which order?",
      he: "באיזה סדר תור (Queue) מעבד אלמנטים?",
    },
    answers: {
      en: [
        "Last-In-First-Out (LIFO)",
        "First-In-First-Out (FIFO)",
        "Smallest element first always",
        "Random order for fairness",
      ],
      he: [
        "Last-In-First-Out (LIFO)",
        "First-In-First-Out (FIFO)",
        "תמיד האלמנט הקטן ביותר קודם",
        "סדר אקראי לצורך הוגנות",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Queues are FIFO: enqueue at the rear, dequeue from the front. They model job schedulers, BFS graph traversal, message buffers, and print spoolers. A circular buffer array implementation avoids shifting elements; linked lists also work. Priority queues are a different ADT that orders by priority, not arrival time.",
      he: "תורים הם FIFO: enqueue בסוף, dequeue מההתחלה. הם מייצגים מתזמני עבודות, מעבר BFS בגרפים, מאגרי הודעות ותורי הדפסה. מימוש במערך מעגלי מונע הזזת אלמנטים; גם רשימות מקושרות עובדות. תורי עדיפות הם ADT שונה שממיין לפי עדיפות, לא לפי זמן הגעה.",
    },
  },
  {
    questionId: "ds-hash-table-basics-004",
    category: "data_structures",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "What is the average-case time complexity of lookup in a well-implemented hash table?",
      he: "מה מורכבות הזמן במקרה הממוצע של חיפוש בטבלת גיבוב (hash table) ממומשת היטב?",
    },
    answers: {
      en: [
        "O(1) average with a good hash function and load factor control",
        "O(log n) because buckets are always binary searched",
        "O(n) in all cases including average",
        "O(n²) due to rehashing on every insert",
      ],
      he: [
        "O(1) בממוצע עם פונקציית גיבוב טובה ושליטה ב-load factor",
        "O(log n) כי דליים תמיד נסרקים בחיפוש בינארי",
        "O(n) בכל המקרים כולל ממוצע",
        "O(n²) בגלל rehashing בכל הוספה",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Hash tables map keys to buckets via hash(key) mod capacity. With uniform hashing and load factor kept below a threshold (often 0.75), average insert/lookup/delete is O(1). Worst case degrades to O(n) if all keys collide. Java HashMap, Python dict, and JavaScript Map are hash-based associative structures.",
      he: "טבלאות גיבוב ממפות מפתחות לדליים דרך hash(key) mod capacity. עם גיבוב אחיד ו-load factor מתחת לסף (לעיתים 0.75), הוספה/חיפוש/מחיקה ממוצעים הם O(1). במקרה הגרוע הכל מתדרדר ל-O(n) אם כל המפתחות מתנגשים. HashMap ב-Java, dict ב-Python ו-Map ב-JavaScript מבוססים על גיבוב.",
    },
  },
  {
    questionId: "ds-big-o-array-access-005",
    category: "data_structures",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "Why is random access by index O(1) in a contiguous array?",
      he: "מדוע גישה אקראית לפי אינדקס היא O(1) במערך רציף?",
    },
    answers: {
      en: [
        "Because the memory address is base + index × element_size, computed in constant time",
        "Because the array is always sorted",
        "Because each element stores a pointer to every other element",
        "Because the CPU scans from index 0 until the target",
      ],
      he: [
        "כי כתובת הזיכרון היא base + index × element_size, שמחושבת בזמן קבוע",
        "כי המערך תמיד ממוין",
        "כי כל אלמנט שומר מצביע לכל אלמנט אחר",
        "כי המעבד סורק מאינדקס 0 עד ליעד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Contiguous allocation means elements are evenly spaced in memory. Given a base pointer and fixed element size, any index i maps to an address with simple arithmetic—no traversal. This cache locality also speeds sequential access. Linked lists lack this because nodes may be scattered and require following pointers.",
      he: "הקצאה רציפה פירושה שאלמנטים מרווחים באופן אחיד בזיכרון. נתון מצביע בסיס וגודל אלמנט קבוע, כל אינדקס i ממופה לכתובת באריתמטיקה פשוטה—בלי מעבר. Locality למטמון גם מאיץ גישה סדרתית. לרשימות מקושרות אין זאת כי צמתים מפוזרים ודורשים מעקב אחר מצביעים.",
    },
  },
  {
    questionId: "ds-tree-root-leaf-006",
    category: "data_structures",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "In a rooted tree data structure, what is a leaf node?",
      he: "במבנה נתונים מסוג עץ עם שורש, מהו צומת עלה (leaf)?",
    },
    answers: {
      en: [
        "The node with no parent",
        "A node with zero children",
        "The node at maximum depth that has exactly two children",
        "Any node that stores a key-value pair",
      ],
      he: [
        "הצומת ללא הורה",
        "צומת ללא ילדים",
        "הצומת בעומק המקסימלי שיש לו בדיוק שני ילדים",
        "כל צומת שמאחסן זוג מפתח-ערך",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "The root is the unique node without a parent. Leaf nodes have no children and often represent terminal data (file system files, expression operands). Internal nodes have at least one child. Tree height, traversal (pre/in/post-order), and properties like balance are defined relative to this parent-child structure.",
      he: "השורש הוא הצומת היחיד ללא הורה. עלים אין להם ילדים ולעיתים מייצגים נתוני קצה (קבצים במערכת קבצים, אופרנדים בביטוי). צמתים פנימיים יש להם לפחות ילד אחד. גובה עץ, מעבר (pre/in/post-order) ותכונות כמו איזון מוגדרים יחסית למבנה הורה-ילד.",
    },
  },
  {
    questionId: "ds-dictionary-map-007",
    category: "data_structures",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "What does a Map/Dictionary abstract data type associate?",
      he: "מה מבנה נתונים מופשט Map/Dictionary מקשר?",
    },
    answers: {
      en: [
        "Keys to values, with each key typically appearing at most once",
        "Array indices to heap pointers only",
        "Threads to CPU cores",
        "Vertices to edges in undirected graphs only",
      ],
      he: [
        "מפתחות לערכים, כאשר כל מפתח מופיע לכל היותר פעם אחת",
        "אינדקסי מערך למצביעי heap בלבד",
        "תהליכונים לליבות CPU",
        "קודקודים לקשתות בגרפים לא מכוונים בלבד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Maps store unique keys mapped to values: userId → profile, word → count. Operations include put, get, remove, and sometimes containsKey. Hash maps, tree maps (sorted keys), and trie-based maps are common implementations with different complexity trade-offs. Multimaps allow duplicate keys; maps generally do not.",
      he: "Maps מאחסנים מפתחות ייחודיים הממופים לערכים: userId → profile, מילה → ספירה. הפעולות כוללות put, get, remove ולעיתים containsKey. Hash maps, tree maps (מפתחות ממוינים) ו-maps מבוססי trie הם מימושים נפוצים עם פשרות מורכבות שונות. Multimaps מאפשרים מפתחות כפולים; maps בדרך כלל לא.",
    },
  },
  {
    questionId: "ds-hash-collision-008",
    category: "data_structures",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "What is a hash collision?",
      he: "מהו התנגשות גיבוב (hash collision)?",
    },
    answers: {
      en: [
        "When two different keys produce the same bucket index after hashing",
        "When a hash table runs out of CPU cache",
        "When a key equals null in a Map",
        "When rehashing deletes existing entries",
      ],
      he: [
        "כששני מפתחות שונים מייצרים אותו אינדקס דלי אחרי גיבוב",
        "כשטבלת גיבוב נגמרת ממטמון CPU",
        "כשמפתח שווה ל-null ב-Map",
        "כש-rehashing מוחק רשומות קיימות",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Collisions are inevitable by the pigeonhole principle when keys outnumber buckets. Resolution strategies: chaining (bucket holds a list/tree of entries) or open addressing (probe for next slot: linear, quadratic, double hashing). Good hash functions spread keys uniformly; poor ones cluster keys and degrade performance toward O(n).",
      he: "התנגשויות בלתי נמנעות לפי עקרון שובך היונים כשיש יותר מפתחות מדליים. אסטרטגיות פתרון: chaining (דלי מחזיק רשימה/עץ של רשומות) או open addressing (חיפוש משבצת הבאה: linear, quadratic, double hashing). פונקציות גיבוב טובות מפזרות מפתחות באחידות; גרועות יוצרות צבירה ומדרדרות ביצועים לכיוון O(n).",
    },
  },
  {
    questionId: "ds-bst-property-009",
    category: "data_structures",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "Which invariant defines a Binary Search Tree (BST)?",
      he: "איזה אינווריאנט מגדיר עץ חיפוש בינארי (BST)?",
    },
    answers: {
      en: [
        "Every node has exactly two children",
        "For each node, all keys in the left subtree are less and all keys in the right subtree are greater (or equal per convention)",
        "The tree is perfectly balanced after every insert",
        "Leaves store hash codes of internal nodes",
      ],
      he: [
        "לכל צומת יש בדיוק שני ילדים",
        "לכל צומת, כל המפתחות בתת-עץ שמאל קטנים יותר וכל המפתחות בתת-עץ ימין גדולים יותר (או שווים לפי המוסכמה)",
        "העץ מאוזן לחלוטין אחרי כל הוספה",
        "עלים מאחסנים hash codes של צמתים פנימיים",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "BST ordering enables search, insert, and delete in O(h) where h is height. In a balanced tree h = O(log n); a skewed BST degrades to a linked list with O(n) operations. In-order traversal visits nodes in sorted key order. Self-balancing variants (AVL, Red-Black) restore logarithmic height.",
      he: "סדר ה-BST מאפשר חיפוש, הוספה ומחיקה ב-O(h) כאשר h הוא הגובה. בעץ מאוזן h = O(log n); BST משובש מתדרדר לרשימה מקושרת עם פעולות O(n). מעבר in-order מבקר בצמתים לפי סדר מפתחות ממוין. גרסאות self-balancing (AVL, Red-Black) משחזרות גובה לוגריתמי.",
    },
  },
  {
    questionId: "ds-heap-min-max-010",
    category: "data_structures",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "What property does a min-heap maintain?",
      he: "איזו תכונה שומרת min-heap?",
    },
    answers: {
      en: [
        "Every parent key is less than or equal to its children's keys (heap order), stored in a complete binary tree",
        "The tree is sorted left-to-right in-order",
        "All leaves are at the same depth in every heap",
        "Each node stores the sum of its subtree",
      ],
      he: [
        "כל מפתח הורה קטן או שווה למפתחות הילדים (סדר heap), מאוחסן בעץ בינארי שלם",
        "העץ ממוין משמאל לימין בסדר in-order",
        "כל העלים באותו עומק בכל heap",
        "כל צומת שומר את סכום תת-העץ שלו",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Heaps are complete binary trees with heap-order: min-heap root is minimum. They support O(log n) insert/extract and O(1) peek min, typically backed by an array (parent at i, children at 2i+1, 2i+2). Used in priority queues, Dijkstra, and heap sort. Max-heaps invert the comparison.",
      he: "Heaps הם עצים בינאריים שלמים עם סדר heap: בשורש min-heap נמצא המינימום. הם תומכים בהוספה/חילוץ ב-O(log n) וב-peek ל-O(1), בדרך כלל מגובים במערך (הורה ב-i, ילדים ב-2i+1, 2i+2). משמשים בתורי עדיפות, Dijkstra ו-heap sort. Max-heaps הופכים את ההשוואה.",
    },
  },
  {
    questionId: "ds-graph-directed-011",
    category: "data_structures",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "How does a directed graph differ from an undirected graph?",
      he: "כיצד גרף מכוון שונה מגרף לא מכוון?",
    },
    answers: {
      en: [
        "Directed edges have orientation; an edge u→v does not imply v→u",
        "Directed graphs cannot have cycles",
        "Undirected graphs cannot be represented with adjacency lists",
        "Directed graphs always have fewer edges",
      ],
      he: [
        "לקשתות מכוונות יש כיוון; קשת u→v לא מרמזת על v→u",
        "גרפים מכוונים לא יכולים להכיל מחזורים",
        "גרפים לא מכוונים לא ניתנים לייצוג עם רשימות שכנות",
        "לגרפים מכוונים תמיד פחות קשתות",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Directed graphs model asymmetric relationships: web links, dependencies, one-way streets. Reachability and shortest paths respect edge direction. Representations include adjacency lists (sparse), adjacency matrices (dense), or edge lists. Converting undirected edge {u,v} often stores two directed edges or sorts endpoints consistently.",
      he: "גרפים מכוונים מייצגים יחסים אסימטריים: קישורי אינטרנט, תלויות, רחובות חד-סטריים. הגעה ומסלולים קצרים מכבדים כיוון קשת. ייצוגים כוללים רשימות שכנות (דליל), מטריצות שכנות (דחוס) או רשימות קשתות. המרת קשת לא מכוונת {u,v} לעיתים שומרת שתי קשתות מכוונות או ממיינת קצוות באופן עקבי.",
    },
  },
  {
    questionId: "ds-trie-use-case-012",
    category: "data_structures",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "For which use case is a trie (prefix tree) especially well suited?",
      he: "לאיזה שימוש trie (עץ קידומות) מתאים במיוחד?",
    },
    answers: {
      en: [
        "Fast prefix lookups and autocomplete over a dictionary of strings",
        "Constant-time random access by numeric index",
        "Sorting floating-point numbers in O(n)",
        "Implementing a LRU cache exclusively",
      ],
      he: [
        "חיפושי קידומת מהירים והשלמה אוטומטית על מילון מחרוזות",
        "גישה אקראית בזמן קבוע לפי אינדקס מספרי",
        "מיון מספרים ממשיים ב-O(n)",
        "מימוש LRU cache בלבד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Tries store characters along paths from root to terminal nodes marking complete words. Prefix queries descend shared paths—efficient for autocomplete, spell check, and IP routing tables (radix trees). Space can be high with sparse alphabets; compressed tries (DAWGs) mitigate overhead. Lookup is O(m) in key length m.",
      he: "Tries מאחסנים תווים לאורך מסלולים משורש לצמתים סופיים המסמנים מילים שלמות. שאילתות קידומת יורדות במסלולים משותפים—יעיל להשלמה אוטומטית, בדיקת איות וטבלאות ניתוב IP (radix trees). השטח יכול להיות גבוה באלפבית דליל; tries דחוסים (DAWGs) מפחיתים תקורה. חיפוש הוא O(m) באורך מפתח m.",
    },
  },
  {
    questionId: "ds-avl-balance-013",
    category: "data_structures",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "What balance condition do AVL trees enforce?",
      he: "איזה תנאי איזון עצי AVL אוכפים?",
    },
    answers: {
      en: [
        "The heights of left and right subtrees differ by at most 1 at every node",
        "Every node has exactly two children",
        "All leaves must be red",
        "Root key is always the median of all keys",
      ],
      he: [
        "גובה תת-העץ השמאלי והימני שונה בכל היותר ב-1 בכל צומת",
        "לכל צומת יש בדיוק שני ילדים",
        "כל העלים חייבים להיות אדומים",
        "מפתח השורש תמיד החציון של כל המפתחות",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "AVL trees are strictly balanced BSTs: balance factor ∈ {-1,0,1}. Inserts/deletes may trigger rotations (single/double) to restore balance, guaranteeing O(log n) height. They offer faster lookups than Red-Black trees (stricter balance) but more rotations on writes. Useful when reads dominate.",
      he: "עצי AVL הם BST מאוזנים בקפדנות: balance factor ∈ {-1,0,1}. הוספות/מחיקות עלולות להפעיל סיבובים (יחיד/כפול) לשחזור איזון, ומבטיחים גובה O(log n). הם מציעים חיפושים מהירים יותר מ-Red-Black (איזון קפדני יותר) אך יותר סיבובים בכתיבה. שימושיים כשקריאות שולטות.",
    },
  },
  {
    questionId: "ds-doubly-linked-list-014",
    category: "data_structures",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "What advantage does a doubly linked list have over a singly linked list?",
      he: "מה היתרון של רשימה מקושרת דו-כיוונית על פני חד-כיוונית?",
    },
    answers: {
      en: [
        "O(1) deletion of a node given a pointer to it, without traversing from the head",
        "Half the memory usage per node",
        "Better cache locality than arrays",
        "Guaranteed O(1) indexed access",
      ],
      he: [
        "מחיקה ב-O(1) של צומת כשניתנה הפניה אליו, בלי מעבר מהראש",
        "חצי מצריכת זיכרון לצומת",
        "locality למטמון טובה יותר ממערכים",
        "גישה מאונדקסת מובטחת ב-O(1)",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Doubly linked nodes store prev and next pointers, enabling removal and insertion before a known node in O(1) by rewiring neighbors. This powers LRU caches (move node to front on access, evict tail). Cost: extra pointer per node and more pointer maintenance. Singly linked lists need the predecessor to delete, costing O(n) without extra structure.",
      he: "צמתים מקושרים דו-כיוונית שומרים מצביעי prev ו-next, ומאפשרים הסרה והוספה לפני צומת ידוע ב-O(1) על ידי חיווט מחדש של שכנים. זה מניע LRU caches (העברת צומת לראש בגישה, פינוי מהזנב). מחיר: מצביע נוסף לצומת ותחזוקת מצביעים רבה יותר. ברשימה חד-כיוונית צריך את הקודם למחיקה, O(n) בלי מבנה נוסף.",
    },
  },
  {
    questionId: "ds-red-black-tree-015",
    category: "data_structures",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "Why are Red-Black trees widely used in standard library map/set implementations?",
      he: "מדוע עצי Red-Black נפוצים במימושי map/set בספריות סטנדרטיות?",
    },
    answers: {
      en: [
        "They guarantee O(log n) operations with fewer rotations than AVL on average, balancing read/write performance",
        "They store keys in hash buckets for O(1) lookup",
        "They require no extra metadata per node",
        "They keep all nodes in a single sorted array",
      ],
      he: [
        "הם מבטיחים פעולות O(log n) עם פחות סיבובים מ-AVL בממוצע, ומאזנים בין קריאה לכתיבה",
        "הם מאחסנים מפתחות בדלי hash לחיפוש O(1)",
        "הם לא דורשים מטא-דאטה נוסף לצומת",
        "הם שומרים את כל הצמתים במערך ממוין יחיד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Red-Black trees maintain approximate balance via coloring rules and rotations, ensuring height ≤ 2 log(n+1). They perform fewer rebalancing steps than AVL on inserts/deletes, making them practical for TreeMap/TreeSet in Java and std::map in many C++ implementations. They provide ordered iteration unlike hash tables.",
      he: "עצי Red-Black שומרים איזון משוער באמצעות כללי צביעה וסיבובים, ומבטיחים גובה ≤ 2 log(n+1). הם מבצעים פחות שלבי איזון מ-AVL בהוספות/מחיקות, מה שהופך אותם מעשיים ל-TreeMap/TreeSet ב-Java ו-std::map ביישומי C++ רבים. הם מספקים איטרציה ממוינת בניגוד לטבלאות גיבוב.",
    },
  },
  {
    questionId: "ds-skip-list-016",
    category: "data_structures",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "What is the expected time complexity of search in a skip list?",
      he: "מה מורכבות הזמן הצפויה לחיפוש ב-skip list?",
    },
    answers: {
      en: [
        "O(log n) expected, using probabilistic multi-level forward pointers",
        "O(1) worst case",
        "O(n log n) due to sorting on each insert",
        "O(√n) always",
      ],
      he: [
        "O(log n) צפוי, באמצעות מצביעים קדימה מרובי רמות הסתברותיים",
        "O(1) במקרה הגרוע",
        "O(n log n) בגלל מיון בכל הוספה",
        "O(√n) תמיד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Skip lists layer linked lists with express lanes: higher levels skip over ranges, mimicking balanced tree search probabilistically. Expected insert/search/delete is O(log n) with simpler lock-free concurrency than tree rotations (used in Redis sorted sets). Worst case can be O(n) with bad randomness, but is rare with proper level promotion probability (often 0.5).",
      he: "Skip lists משכבות רשימות מקושרות עם נתיבים מהירים: רמות גבוהות מדלגות על טווחים, ומחקות חיפוש בעץ מאוזן הסתברותית. הוספה/חיפוש/מחיקה צפויים O(log n) עם concurrency lock-free פשוט יותר מסיבובי עץ (בשימוש ב-Redis sorted sets). מקרה גרוע יכול להיות O(n) עם אקראיות גרועה, אך נדיר עם הסתברות קידום רמה נכונה (לעיתים 0.5).",
    },
  },
  {
    questionId: "ds-bloom-filter-017",
    category: "data_structures",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "What guarantee does a Bloom filter provide?",
      he: "איזו הבטחה Bloom filter מספק?",
    },
    answers: {
      en: [
        "No false negatives for inserted elements; false positives are possible",
        "Exact membership with zero memory overhead",
        "Sorted iteration of all inserted keys",
        "O(1) deletion of arbitrary elements without rehashing",
      ],
      he: [
        "אין false negatives לאלמנטים שהוכנסו; false positives אפשריים",
        "חברות מדויקת ללא תקורת זיכרון",
        "איטרציה ממוינת של כל המפתחות שהוכנסו",
        "מחיקה ב-O(1) של אלמנטים שרירותיים בלי rehashing",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "A Bloom filter is a compact bit array with k hash functions. Insert sets bits; query checks all bits—if any is 0, the element was definitely not inserted. If all 1, it might be present (false positive). Used as a first-pass filter in databases, CDNs, and cryptocurrency nodes. Counting Bloom filters support deletion at extra cost.",
      he: "Bloom filter הוא מערך ביטים קומפקטי עם k פונקציות גיבוב. הוספה מגדירה ביטים; שאילתה בודקת את כולם—אם ביט 0, האלמנט בוודאי לא הוכנס. אם כולם 1, ייתכן שהוא קיים (false positive). משמש כמסנן ראשון במסדי נתונים, CDN וצמתי מטבעות קריפטו. Counting Bloom filters תומכים במחיקה במחיר נוסף.",
    },
  },
  {
    questionId: "ds-union-find-018",
    category: "data_structures",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "Union-Find (Disjoint Set Union) with path compression and union by rank achieves what amortized complexity per operation?",
      he: "Union-Find (Disjoint Set Union) עם path compression ו-union by rank משיג איזו מורכבות ממוצעת לפעולה?",
    },
    answers: {
      en: [
        "Nearly O(1) amortized (inverse Ackermann α(n)), effectively constant for practical n",
        "O(n) per find operation",
        "O(log n) worst case without any optimizations",
        "O(n²) due to rebuilding the structure each union",
      ],
      he: [
        "כמעט O(1) ממוצע (Ackermann הפוך α(n)), בפועל קבוע עבור n מעשי",
        "O(n) לכל פעולת find",
        "O(log n) במקרה הגרוע בלי אופטימיזציות",
        "O(n²) בגלל בנייה מחדש של המבנה בכל union",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Union-Find tracks disjoint sets with parent pointers. find(x) locates the representative; union merges sets. Path compression flattens trees during find; union by rank attaches smaller tree under larger. Together they yield α(n) amortized time—so slow it is effectively constant. Classic applications: Kruskal's MST, connected components, percolation.",
      he: "Union-Find עוקב אחר קבוצות זרות עם מצביעי הורה. find(x) מוצא נציג; union מאחד קבוצות. Path compression משטח עצים בזמן find; union by rank מחבר עץ קטן מתחת לגדול. יחד הם נותנים זמן ממוצע α(n)—כה איטי שבפועל קבוע. יישומים קלאסיים: Kruskal MST, רכיבים קשורים, percolation.",
    },
  },
  {
    questionId: "ds-b-plus-tree-019",
    category: "data_structures",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "Why do B+ trees dominate database and file system indexing?",
      he: "מדוע עצי B+ שולטים באינדוקס של מסדי נתונים ומערכות קבצים?",
    },
    answers: {
      en: [
        "High fanout reduces tree height and disk I/O; leaf nodes are linked for efficient range scans",
        "They store data only in internal nodes to maximize height",
        "They require no locking in concurrent environments",
        "They guarantee O(1) point lookups in RAM",
      ],
      he: [
        "Fanout גבוה מפחית גובה עץ ו-I/O לדיסק; עלים מקושרים לסריקות טווח יעילות",
        "הם מאחסנים נתונים רק בצמתים פנימיים כדי למקסם גובה",
        "הם לא דורשים נעילה בסביבות מקביליות",
        "הם מבטיחים חיפוש נקודתי O(1) ב-RAM",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "B+ trees are wide, shallow trees tuned for block-oriented storage. Keys in internal nodes guide search; all records live in linked leaves, enabling sequential range queries with minimal seeks. A node fits one disk page (often hundreds of keys). This minimizes random I/O compared to binary BSTs—critical when memory hierarchy spans RAM and SSD/HDD.",
      he: "עצי B+ הם עצים רחבים ורדודים המותאמים לאחסון מבוסס בלוקים. מפתחות בצמתים פנימיים מנחים חיפוש; כל הרשומות בעלים מקושרים, ומאפשרים שאילתות טווח סדרתיות עם מינימום seek. צומת נכנס לדף דיסק (לעיתים מאות מפתחות). זה ממזער I/O אקראי לעומת BST בינאריים—קריטי כשהיררכיית הזיכרון כוללת RAM ו-SSD/HDD.",
    },
  },
  {
    questionId: "ds-amortized-dynamic-array-020",
    category: "data_structures",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "Why is append to a dynamic array amortized O(1) despite occasional O(n) resizing?",
      he: "מדוע append למערך דינמי הוא O(1) ממוצע למרות resize מדי פעם ב-O(n)?",
    },
    answers: {
      en: [
        "Capacity doubles (or grows by a constant factor), spreading copy cost over many inserts so average cost per append is constant",
        "The array never actually copies elements on resize",
        "Resizing happens on every insert to keep capacity equal to size",
        "Append is only O(1) for the first 100 elements",
      ],
      he: [
        "הקיבולת מוכפלת (או גדלה בפקטור קבוע), ומפזרת עלות העתקה על פני הוספות רבות כך שעלות ממוצעת ל-append היא קבועה",
        "המערך בפועל לא מעתיק אלמנטים ב-resize",
        "resize קורה בכל הוספה כדי לשמור קיבולת שווה לגודל",
        "append הוא O(1) רק ל-100 האלמנטים הראשונים",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "When a dynamic array fills, allocating a larger buffer and copying n elements costs O(n) for that insert—but subsequent n/2 (or more) appends are cheap. Aggregate analysis: n inserts with doubling cost n + n/2 + n/4 + ... = O(n), so amortized O(1) per push. Java ArrayList and C++ vector use this strategy; geometric growth is key.",
      he: "כשמערך דינמי מתמלא, הקצאת buffer גדול יותר והעתקת n אלמנטים עולה O(n) לאותה הוספה—אך n/2 (או יותר) הוספות הבאות זולות. ניתוח מצטבר: n הוספות עם הכפלה עולות n + n/2 + n/4 + ... = O(n), כלומר O(1) ממוצע ל-push. ArrayList ב-Java ו-vector ב-C++ משתמשים באסטרטגיה זו; גדילה גיאומטרית היא המפתח.",
    },
  },
];
