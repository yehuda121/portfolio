module.exports = [
  {
    questionId: "oop-encapsulation-001",
    category: "oop",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "What is the primary purpose of encapsulation in object-oriented programming?",
      he: "מה המטרה העיקרית של הכמסה (Encapsulation) בתכנות מונחה עצמים?",
    },
    answers: {
      en: [
        "Hide internal state and expose behavior through a controlled public interface",
        "Allow a class to inherit from multiple parent classes simultaneously",
        "Convert all fields to global variables for easier access",
        "Eliminate the need for methods by exposing fields directly",
      ],
      he: [
        "להסתיר מצב פנימי ולחשוף התנהגות דרך ממשק ציבורי מבוקר",
        "לאפשר למחלקה לרשת ממספר מחלקות אב בו-זמנית",
        "להפוך את כל השדות למשתנים גלובליים לגישה קלה יותר",
        "לבטל את הצורך במתודות על ידי חשיפת שדות ישירות",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Encapsulation bundles data with the methods that operate on it and restricts direct access to internal representation. By making fields private and exposing getters, setters, or domain methods, you protect invariants (e.g., a bank balance cannot go negative) and reduce coupling. Consumers depend on the public contract, not on implementation details, which makes refactoring safer.",
      he: "הכמסה מאגדת נתונים יחד עם המתודות שמפעילות עליהם ומגבילה גישה ישירה לייצוג הפנימי. על ידי הגדרת שדות כ-private וחשיפת getters, setters או מתודות דומיין, מגינים על אינווריאנטים (למשל יתרה בבנק שלא יכולה להיות שלילית) ומפחיתים צימוד. הצרכנים תלויים בחוזה הציבורי ולא בפרטי המימוש, מה שמאפשר רפקטורינג בטוח יותר.",
    },
  },
  {
    questionId: "oop-inheritance-002",
    category: "oop",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "What relationship does inheritance model between a subclass and its superclass?",
      he: "איזו יחס מודלת ירושה בין מחלקת בת למחלקת האב שלה?",
    },
    answers: {
      en: [
        "A 'has-a' composition relationship",
        "An 'is-a' specialization relationship",
        "A 'uses-a' temporary dependency",
        "A 'copy-of' duplication relationship",
      ],
      he: [
        "יחס הרכבה מסוג 'יש-לו' (has-a)",
        "יחס התמחות מסוג 'הוא-סוג-של' (is-a)",
        "תלות זמנית מסוג 'משתמש-ב' (uses-a)",
        "יחס שכפול מסוג 'עותק-של' (copy-of)",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Inheritance expresses that a subclass is a specialized form of its superclass—a Dog is an Animal. The subclass inherits fields and methods and can override behavior. This differs from composition ('has-a'), where one object contains another. Overusing inheritance for code reuse often creates fragile hierarchies; composition is frequently preferred.",
      he: "ירושה מבטאת שמחלקת בת היא צורה מותאמת של מחלקת האב—כלב הוא בעל חיים. מחלקת הבת יורשת שדות ומתודות ויכולה לדרוס התנהגות. זה שונה מהרכבה (has-a), שבה אובייקט אחד מכיל אחר. שימוש יתר בירושה לשימוש חוזר בקוד יוצר לעיתים היררכיות שבירות; לעיתים קרובות עדיף להשתמש בהרכבה.",
    },
  },
  {
    questionId: "oop-polymorphism-003",
    category: "oop",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "Which scenario best demonstrates runtime polymorphism?",
      he: "איזה תרחיש מדגים בצורה הטובה ביותר פולימורפיזם בזמן ריצה?",
    },
    answers: {
      en: [
        "Calling an overloaded method resolved at compile time based on parameter types",
        "Declaring two variables with the same name in different scopes",
        "Invoking an overridden method on a superclass reference that points to a subclass instance",
        "Marking a class as final to prevent extension",
      ],
      he: [
        "קריאה למתודה עם עומס יתר (overloading) שנפתרת בזמן קומפילציה לפי סוגי הפרמטרים",
        "הצהרה על שני משתנים באותו שם בתחומי היקף שונים",
        "הפעלת מתודה שנדרסה (overridden) דרך הפניה מסוג מחלקת אב שמצביעה על מופע של מחלקת בת",
        "סימון מחלקה כ-final כדי למנוע הרחבה",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Runtime polymorphism (dynamic dispatch) occurs when code written against a superclass type calls a method that is overridden in the actual object type. For example, Shape s = new Circle(); s.draw() invokes Circle's draw(). Method overloading is compile-time polymorphism, not runtime. This mechanism enables open-ended APIs: new subclasses plug in without changing client code.",
      he: "פולימורפיזם בזמן ריצה (dynamic dispatch) מתרחש כאשר קוד שנכתב מול טיפוס של מחלקת אב קורא למתודה שנדרסה בטיפוס האובייקט בפועל. לדוגמה: Shape s = new Circle(); s.draw() מפעיל את draw של Circle. עומס יתר על מתודות הוא פולימורפיזם בזמן קומפילציה, לא בזמן ריצה. מנגנון זה מאפשר API פתוח: מחלקות בת חדשות נכנסות בלי לשנות קוד לקוח.",
    },
  },
  {
    questionId: "oop-abstraction-004",
    category: "oop",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "What role do abstract classes or interfaces play in OOP design?",
      he: "מה התפקיד של מחלקות מופשטות או ממשקים בעיצוב OOP?",
    },
    answers: {
      en: [
        "They define contracts and essential behavior without exposing implementation details",
        "They force every method to contain a concrete implementation",
        "They replace the need for any concrete classes in the system",
        "They are used only for storing static constants",
      ],
      he: [
        "הם מגדירים חוזים והתנהגות מהותית בלי לחשוף פרטי מימוש",
        "הם מכריחים כל מתודה להכיל מימוש קונקרטי",
        "הם מחליפים את הצורך בכל מחלקה קונקרטית במערכת",
        "הם משמשים רק לאחסון קבועים סטטיים",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Abstraction focuses on what an object does, not how it does it. Interfaces and abstract classes declare operations (e.g., PaymentProcessor.charge()) while hiding algorithmic details. Clients depend on the abstraction, enabling multiple implementations (credit card, PayPal) to be swapped. This is a foundation of the Dependency Inversion Principle.",
      he: "הפשטה מתמקדת במה שהאובייקט עושה, לא איך הוא עושה זאת. ממשקים ומחלקות מופשטות מצהירים על פעולות (למשל PaymentProcessor.charge()) תוך הסתרת פרטי אלגוריתם. לקוחות תלויים בהפשטה, מה שמאפשר להחליף מימושים שונים (כרטיס אשראי, PayPal). זהו יסוד של עקרון היפוך התלות (Dependency Inversion).",
    },
  },
  {
    questionId: "oop-constructor-005",
    category: "oop",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "Why is it important for a constructor to establish a valid object state?",
      he: "מדוע חשוב שבנאי (constructor) יקים מצב אובייקט תקין?",
    },
    answers: {
      en: [
        "So the object is always created in a consistent, usable state and invariants hold from birth",
        "So the garbage collector can skip uninitialized objects",
        "Because constructors are optional and rarely executed",
        "To allow fields to remain null until the first method call",
      ],
      he: [
        "כדי שהאובייקט תמיד ייווצר במצב עקבי ושמיש והאינווריאנטים יתקיימו מהרגע הראשון",
        "כדי שמנקה האשפה יוכל לדלג על אובייקטים שלא אותחלו",
        "כי בנאים הם אופציונליים ולעיתים רחוקות מופעלים",
        "כדי לאפשר לשדות להישאר null עד לקריאה הראשונה למתודה",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "A constructor's job is to initialize the object so it cannot exist in an invalid state. For example, a User object should require a non-empty email at construction. Failing to enforce invariants early leads to null-pointer errors and defensive checks scattered across every method. Some languages use factory methods or builders when construction is complex.",
      he: "תפקיד הבנאי הוא לאתחל את האובייקט כך שלא יוכל להתקיים במצב לא תקין. לדוגמה, אובייקט User צריך לדרוש אימייל לא ריק בזמן יצירה. אי-אכיפת אינווריאנטים מוקדם מוביל לשגיאות null-pointer ובדיקות הגנתיות מפוזרות בכל מתודה. בשפות מסוימות משתמשים במתודות factory או ב-builders כשהיצירה מורכבת.",
    },
  },
  {
    questionId: "oop-this-keyword-006",
    category: "oop",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "In most OOP languages, what does the 'this' (or 'self') keyword refer to?",
      he: "ברוב שפות OOP, למה מתייחס המילה 'this' (או 'self')?",
    },
    answers: {
      en: [
        "The parent class of the current object",
        "The current instance on which the method is being invoked",
        "A new object created for each method call",
        "The static class definition shared by all instances",
      ],
      he: [
        "למחלקת האב של האובייקט הנוכחי",
        "למופע הנוכחי שעליו המתודה מופעלת",
        "לאובייקט חדש שנוצר בכל קריאה למתודה",
        "להגדרת המחלקה הסטטית המשותפת לכל המופעים",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "'this' is a reference to the current object instance. It disambiguates instance fields from parameters with the same name (this.name = name), enables method chaining (return this), and allows passing the current object to other methods. In JavaScript, 'this' binding depends on call site, which is a common interview topic; in Java/C#/Python, it consistently refers to the instance.",
      he: "המילה 'this' היא הפניה למופע האובייקט הנוכחי. היא מבהירה בין שדות מופע לפרמטרים באותו שם (this.name = name), מאפשרת שרשור מתודות (return this), ומאפשרת להעביר את האובייקט הנוכחי למתודות אחרות. ב-JavaScript קשירת 'this' תלויה במקום הקריאה—נושא נפוץ בראיונות; ב-Java/C#/Python היא תמיד מתייחסת למופע.",
    },
  },
  {
    questionId: "oop-method-overriding-007",
    category: "oop",
    difficulty: "junior",
    isActive: true,
    questionText: {
      en: "What is required for a subclass method to properly override a superclass method?",
      he: "מה נדרש כדי שמתודה במחלקת בת תדרוס כראוי מתודה במחלקת האב?",
    },
    answers: {
      en: [
        "The subclass method must have a different name and fewer parameters",
        "The subclass method must match the signature and typically preserve or strengthen the contract",
        "The superclass method must be declared private",
        "The subclass must not call super() in its constructor",
      ],
      he: [
        "למתודה במחלקת הבת חייב להיות שם שונה ופחות פרמטרים",
        "למתודה במחלקת הבת חייב להתאים לחתימה ולרוב לשמור או לחזק את החוזה",
        "המתודה במחלקת האב חייבת להיות מוגדרת כ-private",
        "מחלקת הבת לא חייבת לקרוא ל-super() בבנאי שלה",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Overriding replaces superclass behavior with subclass-specific logic while keeping the same method signature (name, parameters, return type—subject to language rules like covariance). The subclass should honor the Liskov Substitution Principle: callers expecting the parent method should not break. Use @Override annotations where available to catch signature mistakes at compile time.",
      he: "דריסה (overriding) מחליפה התנהגות של מחלקת האב בלוגיקה ספציפית למחלקת הבת, תוך שמירה על אותה חתימת מתודה (שם, פרמטרים, טיפוס החזרה—בכפוף לכללי השפה כמו covariance). מחלקת הבת צריכה לכבד את עקרון החלפת ליסקוב: קוד שמצפה למתודת האב לא אמור להישבר. השתמשו ב-@Override היכן שזמין כדי לתפוס טעויות חתימה בזמן קומפילציה.",
    },
  },
  {
    questionId: "oop-composition-over-inheritance-008",
    category: "oop",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "Why do experienced engineers often prefer composition over inheritance?",
      he: "מדוע מהנדסים מנוסים מעדיפים לעיתים קרובות הרכבה (composition) על פני ירושה?",
    },
    answers: {
      en: [
        "Composition avoids deep fragile hierarchies and allows behavior to be changed at runtime by swapping collaborators",
        "Composition eliminates the need for interfaces entirely",
        "Inheritance is not supported in modern languages",
        "Composition always results in fewer lines of code",
      ],
      he: [
        "הרכבה נמנעת מהיררכיות עמוקות ושבירות ומאפשרת לשנות התנהגות בזמן ריצה על ידי החלפת שותפים",
        "הרכבה מבטלת לחלוטין את הצורך בממשקים",
        "ירושה אינה נתמכת בשפות מודרניות",
        "הרכבה תמיד מייצרת פחות שורות קוד",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Inheritance locks you into an is-a relationship and propagates parent API changes to all descendants—the 'fragile base class' problem. Composition models has-a: a Car has an Engine, and you can replace Engine implementations without touching Car's inheritance chain. Design patterns like Strategy and Decorator rely on composition. Inheritance is still appropriate for genuine subtype polymorphism.",
      he: "ירושה נועלת אותך ליחס is-a ומפיצה שינויי API של האב לכל הצאצאים—בעיית 'מחלקת הבסיס השבירה'. הרכבה מודלת has-a: למכונית יש מנוע, ואפשר להחליף מימושי מנוע בלי לגעת בשרשרת הירושה של Car. תבניות עיצוב כמו Strategy ו-Decorator מסתמכות על הרכבה. ירושה עדיין מתאימה לפולימורפיזם של תת-טיפוס אמיתי.",
    },
  },
  {
    questionId: "oop-single-responsibility-009",
    category: "oop",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "According to the Single Responsibility Principle (SRP), a class should:",
      he: "לפי עקרון האחריות היחידה (SRP), מחלקה צריכה:",
    },
    answers: {
      en: [
        "Contain exactly one method",
        "Have only one reason to change—one axis of responsibility",
        "Never collaborate with other classes",
        "Be marked as final or sealed",
      ],
      he: [
        "להכיל בדיוק מתודה אחת",
        "להיות עם סיבה אחת לשינוי—ציר אחריות אחד",
        "לעולם לא לשתף פעולה עם מחלקות אחרות",
        "להיות מסומנת כ-final או sealed",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "SRP states that a module should have one reason to change, meaning it owns a single concern (e.g., persistence, validation, or reporting—not all three). Violating SRP produces god classes that are hard to test and modify. The principle is about cohesion: group what changes together, separate what changes for different reasons.",
      he: "SRP קובע שלמודול צריכה להיות סיבה אחת לשינוי, כלומר הוא אחראי על דאגה אחת (למשל שמירה, ולידציה או דיווח—לא שלושתם). הפרת SRP יוצרת 'מחלקות-אל' שקשה לבדוק ולשנות. העקרון עוסק בלכידות: לקבץ מה שמשתנה יחד, ולהפריד מה שמשתנה מסיבות שונות.",
    },
  },
  {
    questionId: "oop-factory-pattern-010",
    category: "oop",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "What problem does the Factory Method pattern primarily solve?",
      he: "איזו בעיה תבנית Factory Method פותרת בעיקר?",
    },
    answers: {
      en: [
        "Serializing objects to JSON",
        "Decoupling object creation from the code that uses the objects",
        "Making all classes singletons",
        "Enforcing single inheritance in the type system",
      ],
      he: [
        "סיריאליזציה של אובייקטים ל-JSON",
        "ניתוק יצירת אובייקטים מהקוד שמשתמש בהם",
        "הפיכת כל המחלקות ל-singletons",
        "אכיפת ירושה יחידה במערכת הטיפוסים",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Factory Method delegates instantiation to a dedicated creator (often a subclass or factory class), so client code depends on an interface (Product) rather than concrete types (PdfExporter, CsvExporter). This supports Open/Closed: add new product types without modifying clients. It also centralizes construction logic, which helps when creation involves configuration, pooling, or dependency injection.",
      he: "Factory Method מפנה יצירת מופעים ליוצר ייעודי (לעיתים מחלקת בת או מחלקת factory), כך שקוד לקוח תלוי בממשק (Product) ולא בטיפוסים קונקרטיים (PdfExporter, CsvExporter). זה תומך ב-Open/Closed: הוספת סוגי מוצר חדשים בלי לשנות לקוחות. כמו כן מרכז לוגיקת יצירה, מה שעוזר כשהיצירה כוללת קונפיגורציה, pooling או הזרקת תלות.",
    },
  },
  {
    questionId: "oop-abstract-vs-interface-011",
    category: "oop",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "In languages like Java, when is an abstract class typically preferred over an interface?",
      he: "בשפות כמו Java, מתי מחלקה מופשטת מועדפת בדרך כלל על פני ממשק?",
    },
    answers: {
      en: [
        "When you need to share state (fields) and partial default implementation among related subclasses",
        "When you want to allow multiple inheritance of implementation",
        "When you need no contract at all",
        "When performance requires avoiding virtual method dispatch",
      ],
      he: [
        "כשצריך לשתף מצב (שדות) ומימוש ברירת מחדל חלקי בין מחלקות בת קשורות",
        "כשרוצים לאפשר ירושה מרובה של מימוש",
        "כשאין צורך בחוזה כלל",
        "כשביצועים דורשים הימנעות מ-dispatch וירטואלי",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Abstract classes suit a family of related types with shared code—e.g., BaseRepository with common CRUD helpers. Interfaces define pure contracts with no shared state. Since Java allows single inheritance of classes but multiple interfaces, use abstract classes for template-method patterns and interfaces for capability tagging (Serializable, Comparable). Modern Java interfaces can have default methods, blurring the line somewhat.",
      he: "מחלקות מופשטות מתאימות למשפחת טיפוסים קשורים עם קוד משותף—למשל BaseRepository עם עזרי CRUD משותפים. ממשקים מגדירים חוזים טהורים בלי מצב משותף. מכיוון ש-Java מאפשרת ירושה יחידה ממחלקות אך מספר ממשקים, משתמשים במחלקות מופשטות לתבנית template-method ובממשקים לתיוג יכולות (Serializable, Comparable). בממשקי Java מודרניים יש default methods, מה שמטשטש מעט את הגבול.",
    },
  },
  {
    questionId: "oop-dependency-injection-012",
    category: "oop",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "What is the main benefit of Dependency Injection (DI)?",
      he: "מה היתרון העיקרי של הזרקת תלות (Dependency Injection)?",
    },
    answers: {
      en: [
        "It removes the need for unit tests",
        "It makes classes instantiate their own dependencies with new() inside constructors",
        "It inverts control so dependencies are supplied externally, improving testability and flexibility",
        "It converts all dependencies into global singletons",
      ],
      he: [
        "היא מבטלת את הצורך בבדיקות יחידה",
        "היא גורמת למחלקות ליצור את התלויות שלהן עם new() בתוך בנאים",
        "היא הופכת את השליטה כך שתלויות מסופקות מבחוץ, ומשפרת בדיקות וגמישות",
        "היא הופכת את כל התלויות ל-singletons גלובליים",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Without DI, a Service might do this.repo = new SqlRepository(), coupling to SQL forever. DI passes dependencies via constructor, setter, or framework container, so tests can inject mocks and production can swap implementations via configuration. DI implements Dependency Inversion: depend on abstractions (IRepository), not concretions.",
      he: "בלי DI, Service עשוי לעשות this.repo = new SqlRepository(), מה שיוצר צימוד קבוע ל-SQL. DI מעביר תלויות דרך בנאי, setter או מיכל framework, כך שבבדיקות אפשר להזריק mocks ובפרודקשן להחליף מימושים דרך קונפיגורציה. DI מממש Dependency Inversion: תלות בהפשטות (IRepository), לא במימושים קונקרטיים.",
    },
  },
  {
    questionId: "oop-immutable-object-013",
    category: "oop",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "Which design choice best guarantees immutability for a class?",
      he: "איזה בחירת עיצוב מבטיחה בצורה הטובה ביותר אי-שינוי (immutability) של מחלקה?",
    },
    answers: {
      en: [
        "Public mutable fields with synchronized accessors",
        "Private final fields, no setters, and defensive copies of mutable components in constructor and getters",
        "Lazy initialization of all fields on first access",
        "Implementing Cloneable and overriding clone()",
      ],
      he: [
        "שדות ציבוריים הניתנים לשינוי עם accessors מסונכרנים",
        "שדות private final, ללא setters, והעתקים הגנתיים של רכיבים משתנים בבנאי וב-getters",
        "אתחול עצל של כל השדות בגישה הראשונה",
        "מימוש Cloneable ודריסת clone()",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Immutable objects cannot change after construction, making them thread-safe and easier to reason about. Mark fields final, initialize in constructor, expose no mutators, and copy mutable internals (e.g., Date, List) so callers cannot modify state through references. String and Integer in Java are canonical examples. Immutability trades memory/copy cost for safety.",
      he: "אובייקטים בלתי משתנים לא יכולים להשתנות אחרי יצירה, מה שהופך אותם בטוחים לריבוי תהליכונים וקלים יותר להבנה. סמנו שדות כ-final, אתחלו בבנאי, אל תחשפו mutators, והעתיקו מבנים פנימיים משתנים (למשל Date, List) כדי שקוראים לא יוכלו לשנות מצב דרך הפניות. String ו-Integer ב-Java הם דוגמאות קלאסיות. אי-שינוי מחליף עלות זיכרון/העתקה בתמורה לבטיחות.",
    },
  },
  {
    questionId: "oop-delegation-pattern-014",
    category: "oop",
    difficulty: "mid",
    isActive: true,
    questionText: {
      en: "How does the Delegation pattern differ from inheritance for reusing behavior?",
      he: "כיצד תבנית Delegation שונה מירושה בשימוש חוזר בהתנהגות?",
    },
    answers: {
      en: [
        "Delegation forwards requests to a composed object, allowing behavior replacement without subclassing",
        "Delegation requires the delegate to be a superclass",
        "Delegation only works with static methods",
        "Delegation prevents any method calls on the outer object",
      ],
      he: [
        "Delegation מעבירה בקשות לאובייקט מורכב, ומאפשרת החלפת התנהגות בלי ירושה",
        "Delegation דורשת שה-delegate יהיה מחלקת אב",
        "Delegation עובד רק עם מתודות סטטיות",
        "Delegation מונעת כל קריאת מתודה על האובייקט החיצוני",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "In delegation, an object holds a reference to another object that performs the work (e.g., Stack delegating to List). The outer object can swap delegates at runtime. Inheritance statically binds behavior at compile time. Delegation is the basis of the Decorator and Proxy patterns and avoids subclass explosion.",
      he: "ב-delegation, אובייקט מחזיק הפניה לאובייקט אחר שמבצע את העבודה (למשל Stack שמפנה ל-List). האובייקט החיצוני יכול להחליף delegates בזמן ריצה. ירושה קושרת התנהגות סטטית בזמן קומפילציה. Delegation הוא בסיס לתבניות Decorator ו-Proxy ומונע פיצוץ של מחלקות בת.",
    },
  },
  {
    questionId: "oop-liskov-substitution-015",
    category: "oop",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "Which violation best illustrates a breach of the Liskov Substitution Principle (LSP)?",
      he: "איזו הפרה מדגימה בצורה הטובה ביותר הפרה של עקרון החלפת ליסקוב (LSP)?",
    },
    answers: {
      en: [
        "A Square subclass of Rectangle that overrides setWidth/setHeight independently, breaking area invariants expected by Rectangle clients",
        "A class with too many private methods",
        "Using an interface with five methods instead of one",
        "A final class that cannot be extended",
      ],
      he: [
        "Square כמחלקת בת של Rectangle שדורסת setWidth/setHeight בנפרד ושוברת אינווריאנטים של שטח שקוד לקוח של Rectangle מצפה להם",
        "מחלקה עם יותר מדי מתודות private",
        "שימוש בממשק עם חמש מתודות במקום אחת",
        "מחלקה final שלא ניתן להרחיב",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "LSP requires that subtypes be substitutable for their base types without altering correctness. The classic Square/Rectangle example: if client code assumes width and height are independent, Square's coupled setters violate that contract. Other LSP violations include throwing unexpected exceptions, returning null where the base returns values, or strengthening preconditions in subclasses.",
      he: "LSP דורש שתת-טיפוסים יהיו ניתנים להחלפה בטיפוסי הבסיס בלי לפגוע בנכונות. דוגמת Square/Rectangle הקלאסית: אם קוד לקוח מניח שרוחב וגובה בלתי תלויים, ה-setters המקושרים של Square מפרים את החוזה. הפרות LSP נוספות כוללות זריקת חריגות בלתי צפויות, החזרת null כשהבסיס מחזיר ערכים, או חיזוק תנאים מקדימים במחלקות בת.",
    },
  },
  {
    questionId: "oop-diamond-problem-016",
    category: "oop",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "What is the Diamond Problem in multiple inheritance?",
      he: "מהי בעיית היהלום (Diamond Problem) בירושה מרובה?",
    },
    answers: {
      en: [
        "Ambiguity when two parent classes inherit the same method from a common ancestor and a child inherits both parents",
        "A performance issue caused by too many virtual tables",
        "The inability to create objects from abstract classes",
        "A bug in garbage collection when objects form cycles",
      ],
      he: [
        "עמימות כששתי מחלקות אב יורשות אותה מתודה מאב קדמון משותף ומחלקת בת יורשת את שתי האבות",
        "בעיית ביצועים שנגרמת מיותר מדי טבלאות וירטואליות",
        "חוסר יכולת ליצור אובייקטים ממחלקות מופשטות",
        "באג ב-garbage collection כשאובייקטים יוצרים מחזורים",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "If class D inherits B and C, both inheriting A, which copy of A's method does D.get() call? Languages resolve this differently: C++ requires virtual inheritance; Java forbids multiple class inheritance but allows multiple interfaces with default methods (still ambiguous without rules); Python uses MRO (Method Resolution Order). Understanding this explains why many languages limit multiple inheritance.",
      he: "אם מחלקה D יורשת B ו-C, ששתיהן יורשות A, איזו עותק של מתודת A יקרא D.get()? שפות פותרות זאת אחרת: C++ דורש virtual inheritance; Java אוסרת ירושה מרובה ממחלקות אך מאפשרת מספר ממשקים עם default methods (עדיין עמום בלי כללים); Python משתמשת ב-MRO. הבנת זה מסבירה מדוע שפות רבות מגבילות ירושה מרובה.",
    },
  },
  {
    questionId: "oop-virtual-dispatch-017",
    category: "oop",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "How does virtual (dynamic) method dispatch typically work at runtime?",
      he: "כיצד dispatch וירטואלי (דינמי) של מתודות עובד בדרך כלל בזמן ריצה?",
    },
    answers: {
      en: [
        "The compiler inlines all method calls at build time",
        "A vtable (virtual method table) on each object is consulted to find the actual implementation for the call",
        "Method names are resolved by string comparison on every call without caching",
        "Only static methods participate in polymorphism",
      ],
      he: [
        "הקומפיילר מבצע inline לכל קריאות המתודות בזמן בנייה",
        "vtable (טבלת מתודות וירטואליות) על כל אובייקט נבדקת כדי למצוא את המימוש בפועל לקריאה",
        "שמות מתודות נפתרים בהשוואת מחרוזות בכל קריאה בלי מטמון",
        "רק מתודות סטטיות משתתפות בפולימורפיזם",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "In C++/Java/C#, each object carries a pointer to a vtable mapping method slots to implementations. A call through a base reference indexes the vtable at compile-known offset, then jumps to the runtime type's function. This adds indirection cost but enables polymorphism. JIT compilers (JVM, .NET) often devirtualize hot calls when the concrete type is provably known.",
      he: "ב-C++/Java/C#, כל אובייקט נושא מצביע ל-vtable שממפה משבצות מתודות למימושים. קריאה דרך הפניה לבסיס מאנדקסת את ה-vtable במיקום ידוע בקומפילציה, ואז קופצת לפונקציה של הטיפוס בזמן ריצה. זה מוסיף עלות indirection אך מאפשר פולימורפיזם. קומפיילרי JIT (JVM, .NET) לעיתים מבצעים devirtualization לקריאות חמות כשהטיפוס הקונקרטי ידוע בוודאות.",
    },
  },
  {
    questionId: "oop-identity-vs-equality-018",
    category: "oop",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "When overriding equals() in Java, why must hashCode() typically be overridden as well?",
      he: "כשדורסים equals() ב-Java, מדוע צריך בדרך כלל לדרוס גם hashCode()?",
    },
    answers: {
      en: [
        "hashCode() improves string concatenation performance",
        "The equals/hashCode contract requires equal objects to produce the same hash code, which HashMap and HashSet rely on",
        "hashCode() is called before every garbage collection cycle",
        "Without hashCode(), equals() always returns false",
      ],
      he: [
        "hashCode() משפר ביצועי שרשור מחרוזות",
        "חוזה equals/hashCode דורש שאובייקטים שווים יפיקו אותו hash code, ו-HashMap ו-HashSet מסתמכים על כך",
        "hashCode() נקרא לפני כל מחזור garbage collection",
        "בלי hashCode(), equals() תמיד מחזיר false",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Java's contract: if a.equals(b), then a.hashCode() == b.hashCode(). Hash-based collections bucket by hashCode first, then compare equals. Breaking the contract causes 'equal' objects to land in different buckets, breaking Set uniqueness and Map lookups. equals() should compare meaningful fields; hashCode() should combine those fields consistently (Objects.hash is a common helper).",
      he: "החוזה ב-Java: אם a.equals(b), אז a.hashCode() == b.hashCode(). מבני נתונים מבוססי hash ממיינים לדלי לפי hashCode תחילה, ואז משווים equals. הפרת החוזה גורמת לאובייקטים 'שווים' לנחות בדליים שונים, מה ששובר ייחודיות ב-Set וחיפושים ב-Map. equals() צריך להשוות שדות משמעותיים; hashCode() צריך לשלב אותם באופן עקבי (Objects.hash הוא עזר נפוץ).",
    },
  },
  {
    questionId: "oop-mixin-vs-inheritance-019",
    category: "oop",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "What distinguishes a mixin from classical single inheritance?",
      he: "מה מבדיל mixin מירושה קלאסית יחידה?",
    },
    answers: {
      en: [
        "Mixins are only available in functional languages",
        "Mixins compose orthogonal behaviors into a class without forming a strict is-a hierarchy, often at compile or load time",
        "Mixins replace the need for any encapsulation",
        "Mixins always use multiple inheritance of stateful parent classes",
      ],
      he: [
        "Mixins זמינים רק בשפות פונקציונליות",
        "Mixins מרכיבים התנהגויות אורתוגונליות למחלקה בלי ליצור היררכיית is-a קשיחה, לעיתים בזמן קומפילציה או טעינה",
        "Mixins מחליפים את הצורך בכל הכמסה",
        "Mixins תמיד משתמשים בירושה מרובה ממחלקות אב עם מצב",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Mixins (Ruby modules, Scala traits, TypeScript mixins) inject methods into classes to share cross-cutting behavior (logging, serialization) without claiming subtype relationship. Unlike inheritance, mixins are often explicit and composable, reducing hierarchy depth. Traits in Scala can have concrete methods but avoid constructor parameters, addressing some diamond-problem concerns.",
      he: "Mixins (מודולים ב-Ruby, traits ב-Scala, mixins ב-TypeScript) מזריקים מתודות למחלקות לשיתוף התנהגות חוצת-חתכים (לוגים, סיריאליזציה) בלי לטעון ליחס תת-טיפוס. בניגוד לירושה, mixins לעיתים מפורשים וניתנים להרכבה, מה שמפחית עומק היררכיה. Traits ב-Scala יכולים להכיל מתודות קונקרטיות אך נמנעים מפרמטרי בנאי, ומטפלים בחלק מדאגות בעיית היהלום.",
    },
  },
  {
    questionId: "oop-fragile-base-class-020",
    category: "oop",
    difficulty: "senior",
    isActive: true,
    questionText: {
      en: "What is the 'fragile base class' problem?",
      he: "מהי בעיית 'מחלקת הבסיס השבירה' (fragile base class)?",
    },
    answers: {
      en: [
        "Base classes cannot be unit tested",
        "Changes to a base class can unintentionally break subclasses even when subclass code is unchanged",
        "Base classes always have higher memory usage than subclasses",
        "Subclasses cannot access protected members",
      ],
      he: [
        "לא ניתן לבדוק מחלקות בסיס בבדיקות יחידה",
        "שינויים במחלקת בסיס יכולים לשבור בטעות מחלקות בת גם כשקוד מחלקת הבת לא השתנה",
        "למחלקות בסיס תמיד צריכת זיכרון גבוהה יותר ממחלקות בת",
        "מחלקות בת לא יכולות לגשת לחברים protected",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "When subclasses depend on base class internals (protected fields, hook method call order, constructor side effects), a seemingly safe base change—adding a field, reordering template method steps—can break descendants. Mitigations: favor composition, document extension points, use final/sealed where extension is not intended, and follow the Hollywood Principle ('don't call us, we'll call you') in framework design.",
      he: "כשמחלקות בת תלויות בפרטים פנימיים של מחלקת הבסיס (שדות protected, סדר קריאות hook methods, תופעות לוואי בבנאי), שינוי 'בטוח' לכאורה בבסיס—הוספת שדה, שינוי סדר של template method—יכול לשבור צאצאים. פתרונות: העדפת הרכבה, תיעוד נקודות הרחבה, שימוש ב-final/sealed כשאין כוונה להרחבה, ועקרון הוליווד ('אל תקראו אלינו, אנחנו נקרא אליכם') בעיצוב frameworks.",
    },
  },
];
