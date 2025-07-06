import { BlogPost } from "@/types/blogs";

// In a real application, this data would come from a CMS, database, or API.
export const DUMMY_BLOG_POSTS: BlogPost[] = [
  {
    slug: "experience-modern-life-nile",
    title: "تجربة جديدة من الحياة العصرية على ضفاف النيل", // "A New Experience of Modern Life on the Banks of the Nile"
    heroImage:
      "https://egy-mybayut-live.s3.me-south-1.amazonaws.com/mybayut/wp-content/uploads/2024/09/11144544/Staycation_-Best-Hotels-around-Cairo-for-the-Perfect-Weekend-Getaway-2048x1365.jpg", // Placeholder image
    heroImageAlt: "Aerial view of a modern city by the Nile River",
    content: [
      {
        type: "paragraph",
        text: `في قلب القاهرة النابض بالحياة، تتجلى رؤية معمارية فريدة تجمع بين أصالة التاريخ ورفاهية المستقبل. مشروع "جيريان" يقدم مفهومًا جديدًا للمعيشة، حيث يلتقي الفخامة بالهدوء على ضفاف النيل الخالد. هذا المشروع ليس مجرد مجمع سكني، بل هو واحة حضرية مصممة لتوفر لسكانها تجربة حياة لا مثيل لها.`,
      },
      {
        type: "paragraph",
        text: `يتميز "جيريان" بموقعه الاستراتيجي الذي يوفر سهولة الوصول إلى أهم المعالم الحيوية في القاهرة، من مراكز التسوق الفاخرة إلى المؤسسات التعليمية المرموقة والمراكز الثقافية. كل تفصيلة في هذا المشروع صُممت بعناية فائقة لتعكس الرقي والابتكار، بدءًا من التصميمات المعمارية الأنيقة وصولًا إلى المساحات الخضراء الشاسعة التي تضفي لمسة من الطبيعة الساحرة.`,
      },
      { type: "heading", text: "تعدد الوحدات السكنية" }, // "Variety of Residential Units"
      {
        type: "paragraph",
        text: `تعتبر الوحدات السكنية في "جيريان" تحفًا فنية بحد ذاتها، حيث تتنوع بين الشقق الفسيحة والدوبلكس الفاخرة، وكل منها مصمم ليوفر أقصى درجات الراحة والخصوصية. تتميز التصميمات الداخلية بالتشطيبات عالية الجودة والمواد الفاخرة، مع نوافذ بانورامية تطل على مناظر خلابة للنيل وأفق المدينة.`,
      },
      {
        type: "image",
        src: "https://egy-mybayut-live.s3.me-south-1.amazonaws.com/mybayut/wp-content/uploads/2024/09/11145027/where-to-stay-in-cairo-1-1.jpg",
        alt: "صورة داخلية لوحدة سكنية عصرية",
      }, // "Modern Interior Unit Image"
      { type: "heading", text: "مرافق وخدمات متكاملة" }, // "Integrated Facilities and Services"
      {
        type: "paragraph",
        text: `لا يقتصر الأمر على الوحدات السكنية فحسب، بل يمتد ليشمل مجموعة واسعة من المرافق والخدمات التي تلبي جميع احتياجات السكان. يضم المشروع نوادي صحية متكاملة، حمامات سباحة، مناطق مخصصة للأطفال، ومساحات خضراء للمشي والاسترخاء. كما تتوفر خدمات أمن وحراسة على مدار الساعة لضمان راحة البال للسكان.`,
      },
      {
        type: "bold_paragraph",
        text: `مجتمع "جيريان": حيث يلتقي الفخامة بالهدوء`,
      }, // "Jirian Community: Where Luxury Meets Serenity"
      {
        type: "paragraph",
        text: `يعد "جيريان" أكثر من مجرد مكان للعيش؛ إنه مجتمع متكامل يعزز الترابط الاجتماعي ويوفر بيئة مثالية للعائلات والأفراد على حد سواء. كل زاوية في هذا المشروع مصممة بعناية لتشجع على أسلوب حياة صحي ونشيط، مع توفير كل ما يلزم لعيش حياة عصرية ومريحة.`,
      },
      {
        type: "quote",
        text: `"الحياة في جيريان هي تجربة فريدة، تجمع بين رفاهية العيش العصري وجمال الطبيعة الخلاب على ضفاف النيل."`,
      }, // "Life in Jirian is a unique experience, combining the luxury of modern living with the breathtaking beauty of nature on the banks of the Nile."
      {
        type: "paragraph",
        text: `باختصار، "جيريان" هو الوجهة الأمثل لمن يبحثون عن تجربة حياة استثنائية تجمع بين الفخامة والهدوء في قلب القاهرة النابض بالحياة. انضم إلينا واكتشف معنى جديدًا للمعيشة الراقية على ضفاف النيل.`,
      },
      { type: "heading", text: "مميزات رئيسية:" }, // "Key Features:"
      { type: "list_item", text: "موقع استراتيجي على ضفاف النيل." }, // "Strategic location on the banks of the Nile."
      { type: "list_item", text: "وحدات سكنية فاخرة بتصميمات عصرية." }, // "Luxurious residential units with modern designs."
      { type: "list_item", text: "مرافق ترفيهية وصحية متكاملة." }, // "Integrated recreational and health facilities."
      { type: "list_item", text: "مساحات خضراء واسعة وبيئة هادئة." }, // "Vast green spaces and a serene environment."
      { type: "list_item", text: "أمن وحراسة على مدار الساعة." }, // "24/7 security and guard services."
    ],
    relatedPosts: [
      {
        title: "أهمية الاستثمار العقاري في مصر",
        slug: "real-estate-investment-egypt",
        heroImage: "https://images.bayut.eg/thumbnails/25672691-400x300.jpeg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
      {
        title: "نصائح لاختيار منزلك الجديد",
        slug: "tips-new-home",
        heroImage: "https://images.bayut.eg/thumbnails/25672691-400x300.jpeg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
      {
        title: "أفضل المناطق السكنية في القاهرة",
        slug: "best-residential-areas-cairo",
        heroImage: "https://images.bayut.eg/thumbnails/25672691-400x300.jpeg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
    ],
    readingDuration: "3 دقائق للقراءة",
    category: {
      title: "فعاليات واخبار بيوت مصر",
      slug: "فعاليات-واخبار-بيوت-مصر",
    },
    description:
      "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
  },
  {
    slug: "another-blog-post",
    title: "Another Exciting Blog Post: The Future of Urban Living",
    heroImage:
      "https://img.freepik.com/free-photo/complex-aerial-view-city_23-2148975282.jpg",
    heroImageAlt: "City skyline at sunset",
    content: [
      {
        type: "paragraph",
        text: `This post delves into the evolving landscape of urban development and what it means for future generations. We explore innovative concepts and sustainable practices shaping our cities.`,
      },
      { type: "heading", text: "Key Trends in Urban Development" },
      { type: "list_item", text: "Smart City Technologies" },
      { type: "list_item", text: "Green Infrastructure and Sustainability" },
      { type: "list_item", text: "Community-Centric Design" },
      {
        type: "paragraph",
        text: `As populations grow, the demand for efficient, livable, and environmentally friendly urban spaces becomes paramount. Architects and urban planners are constantly seeking new ways to integrate technology and nature.`,
      },
      {
        type: "image",
        src: "https://img.freepik.com/free-photo/complex-aerial-view-city_23-2148975282.jpg",
        alt: "Illustration of a smart city",
      },
      {
        type: "bold_paragraph",
        text: `The integration of IoT, AI, and renewable energy sources is transforming traditional urban models into dynamic, responsive ecosystems.`,
      },
      {
        type: "quote",
        text: `"The city is not a problem; it is a solution. It is where we must go to solve the problems of the future." - Edward Glaeser`,
      },
      {
        type: "paragraph",
        text: `We believe that the cities of tomorrow will be characterized by their adaptability, resilience, and commitment to enhancing the quality of life for all residents.`,
      },
    ],
    relatedPosts: [
      {
        title: "Tech Trends 2025",
        slug: "tech-trends-2025",
        heroImage:
          "https://img.freepik.com/free-photo/complex-aerial-view-city_23-2148975282.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
      {
        title: "Future of Web Development",
        slug: "future-web-dev",
        heroImage:
          "https://img.freepik.com/free-photo/complex-aerial-view-city_23-2148975282.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
      {
        title: "Sustainable Architecture",
        slug: "sustainable-architecture",
        heroImage:
          "https://img.freepik.com/free-photo/complex-aerial-view-city_23-2148975282.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
    ],
    readingDuration: "3 دقائق للقراءة",
    category: {
      title: "نصائح",
      slug: "نصائح",
    },
    description:
      "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
  },
  {
    slug: "exploring-ancient-egypt",
    title: "استكشاف كنوز مصر القديمة: رحلة عبر الزمن", // "Exploring the Treasures of Ancient Egypt: A Journey Through Time"
    heroImage:
      "https://img.freepik.com/free-photo/creative-aerial-view-cityscape_23-2148975295.jpg",
    heroImageAlt: "Pyramids of Giza at sunset",
    content: [
      {
        type: "paragraph",
        text: `مصر، أرض الفراعنة والأسرار، تدعوك لرحلة لا تُنسى عبر تاريخها العريق. من الأهرامات الشاهقة إلى المعابد المنحوتة بدقة، كل زاوية تحكي قصة حضارة عظيمة تركت بصماتها على البشرية.`,
      },
      { type: "heading", text: "الأهرامات: عظمة البناء" },
      {
        type: "paragraph",
        text: `تعتبر أهرامات الجيزة، بما في ذلك الهرم الأكبر خوفو، من عجائب الدنيا السبع القديمة التي لا تزال قائمة. تقف هذه الهياكل الضخمة كشهادة على براعة الهندسة المصرية القديمة.`,
      },
      {
        type: "image",
        src: "https://img.freepik.com/free-photo/creative-aerial-view-cityscape_23-2148975295.jpg",
        alt: "أهرامات الجيزة",
      },
      {
        type: "bold_paragraph",
        text: `لا تزال كيفية بناء الأهرامات لغزًا يحير العلماء حتى يومنا هذا، مما يضيف إلى سحرها وغموضها.`,
      },
      { type: "heading", text: "المعابد والأساطير" },
      {
        type: "paragraph",
        text: `تنتشر المعابد القديمة على طول نهر النيل، مثل معبد الكرنك والأقصر، والتي كانت مراكز للعبادة والحياة الدينية. جدرانها المزينة بالنقوش والرسومات تحكي قصص الآلهة والفراعنة.`,
      },
      {
        type: "quote",
        text: `"مصر ليست مجرد بلد تزوره، بل هي تجربة تعيشها وتتغلغل في روحك."`,
      },
      { type: "list_item", text: "زيارة المتحف المصري الكبير." },
      { type: "list_item", text: "رحلة نيلية بين الأقصر وأسوان." },
      { type: "list_item", text: "استكشاف وادي الملوك." },
    ],
    relatedPosts: [
      {
        title: "أسرار الفراعنة المنسية",
        slug: "forgotten-pharaohs",
        heroImage:
          "https://img.freepik.com/free-photo/creative-aerial-view-cityscape_23-2148975295.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
      {
        title: "أجمل المدن المصرية السياحية",
        slug: "egyptian-tourist-cities",
        heroImage:
          "https://img.freepik.com/free-photo/creative-aerial-view-cityscape_23-2148975295.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
      {
        title: "الفن والعمارة في مصر القديمة",
        slug: "ancient-egyptian-art",
        heroImage:
          "https://img.freepik.com/free-photo/creative-aerial-view-cityscape_23-2148975295.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
    ],
    readingDuration: "3 دقائق للقراءة",
    category: {
      title: "فعاليات واخبار بيوت مصر",
      slug: "فعاليات-واخبار-بيوت-مصر",
    },
    description:
      "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
  },
  {
    slug: "healthy-eating-guide",
    title: "دليلك الشامل للأكل الصحي: ابدأ اليوم!", // "Your Comprehensive Guide to Healthy Eating: Start Today!"
    heroImage:
      "https://img.freepik.com/free-photo/creative-aerial-view-cityscape_23-2148975292.jpg",
    heroImageAlt: "Assortment of fresh fruits and vegetables",
    content: [
      {
        type: "paragraph",
        text: `في عالمنا السريع، غالبًا ما نغفل عن أهمية التغذية السليمة. الأكل الصحي ليس مجرد نظام غذائي، بل هو أسلوب حياة يمنحك الطاقة والحيوية ويحسن صحتك العامة.`,
      },
      { type: "heading", text: "أساسيات التغذية الصحية" },
      { type: "list_item", text: "تناول مجموعة متنوعة من الفواكه والخضروات." },
      { type: "list_item", text: "اختر الحبوب الكاملة بدلاً من المكررة." },
      { type: "list_item", text: "قلل من السكريات المضافة والدهون المشبعة." },
      {
        type: "paragraph",
        text: `ابدأ بتغييرات صغيرة في روتينك اليومي. استبدل المشروبات الغازية بالماء، وأضف حصة إضافية من الخضروات إلى وجباتك.`,
      },
      {
        type: "image",
        src: "https://img.freepik.com/free-photo/creative-aerial-view-cityscape_23-2148975292.jpg",
        alt: "سلة فواكه وخضروات طازجة",
      },
      {
        type: "bold_paragraph",
        text: `تذكر أن الأكل الصحي هو استثمار في صحتك على المدى الطويل.`,
      },
      {
        type: "quote",
        text: `"دع طعامك يكون دوائك ودواءك يكون طعامك." - أبقراط`,
      },
      { type: "heading", text: "نصائح لوجبات صحية:" },
      { type: "list_item", text: "خطط لوجباتك الأسبوعية مسبقًا." },
      { type: "list_item", text: "طهي الطعام في المنزل قدر الإمكان." },
      { type: "list_item", text: "تجنب الأطعمة المصنعة." },
    ],
    relatedPosts: [
      {
        title: "فوائد الرياضة المنتظمة",
        slug: "benefits-of-exercise",
        heroImage:
          "https://img.freepik.com/free-photo/creative-aerial-view-cityscape_23-2148975292.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
      {
        title: "كيف تحافظ على ترطيب جسمك",
        slug: "staying-hydrated",
        heroImage:
          "https://img.freepik.com/free-photo/creative-aerial-view-cityscape_23-2148975292.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
      {
        title: "وصفات صحية وسريعة",
        slug: "healthy-quick-recipes",
        heroImage:
          "https://img.freepik.com/free-photo/creative-aerial-view-cityscape_23-2148975292.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
    ],
    readingDuration: "3 دقائق للقراءة",
    category: {
      title: "نصائح",
      slug: "نصائح",
    },
    description:
      "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
  },
  {
    slug: "future-of-ai",
    title: "مستقبل الذكاء الاصطناعي: الابتكار الذي يغير العالم", // "The Future of AI: Innovation That Changes the World"
    heroImage:
      "https://img.freepik.com/free-photo/complex-aerial-view-city_23-2148975282.jpg",
    heroImageAlt: "Abstract image representing artificial intelligence",
    content: [
      {
        type: "paragraph",
        text: `الذكاء الاصطناعي (AI) لم يعد مجرد مفهوم خيالي من أفلام الخيال العلمي، بل أصبح جزءًا لا يتجزأ من حياتنا اليومية، ويعد بمستقبل مليء بالابتكارات غير المسبوقة.`,
      },
      { type: "heading", text: "تطبيقات الذكاء الاصطناعي اليوم" },
      {
        type: "paragraph",
        text: `من السيارات ذاتية القيادة إلى المساعدين الصوتيين وأنظمة التشخيص الطبي، يغير الذكاء الاصطناعي طريقة عملنا وتفاعلنا مع العالم.`,
      },
      { type: "list_item", text: "التعلم الآلي والشبكات العصبية." },
      { type: "list_item", text: "معالجة اللغة الطبيعية (NLP)." },
      { type: "list_item", text: "الرؤية الحاسوبية." },
      {
        type: "image",
        src: "https://img.freepik.com/free-photo/complex-aerial-view-city_23-2148975282.jpg",
        alt: "رسم بياني لتطبيقات الذكاء الاصطناعي",
      },
      {
        type: "bold_paragraph",
        text: `يتوقع الخبراء أن الذكاء الاصطناعي سيحدث ثورة في قطاعات متعددة، من الرعاية الصحية إلى التعليم والنقل.`,
      },
      {
        type: "quote",
        text: `"الذكاء الاصطناعي هو النار الجديدة التي ستضيء طريق البشرية نحو التقدم."`,
      },
      { type: "heading", text: "التحديات والاعتبارات الأخلاقية" },
      {
        type: "paragraph",
        text: `مع التطور السريع للذكاء الاصطناعي، تبرز تحديات تتعلق بالأخلاق، والخصوصية، وتأثيره على سوق العمل. يتطلب الأمر نقاشًا عالميًا لضمان استخدام مسؤول لهذه التكنولوجيا.`,
      },
    ],
    relatedPosts: [
      {
        title: "تأثير الروبوتات على الصناعة",
        slug: "robots-in-industry",
        heroImage:
          "https://img.freepik.com/free-photo/complex-aerial-view-city_23-2148975282.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
      {
        title: "البيانات الضخمة والتحليلات",
        slug: "big-data-analytics",
        heroImage:
          "https://img.freepik.com/free-photo/complex-aerial-view-city_23-2148975282.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "نصائح",
          slug: "نصائح",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
      {
        title: "الأمن السيبراني في عصر الذكاء الاصطناعي",
        slug: "cybersecurity-ai",
        heroImage:
          "https://img.freepik.com/free-photo/complex-aerial-view-city_23-2148975282.jpg",
        heroImageAlt: "",
        content: [],
        relatedPosts: [],
        readingDuration: "",
        category: {
          title: "فعاليات واخبار بيوت مصر",
          slug: "فعاليات-واخبار-بيوت-مصر",
        },
        description:
          "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
      },
    ],
    readingDuration: "3 دقائق للقراءة",
    category: {
      title: "منوعات",
      slug: "منوعات",
    },
    description:
      "تشتهر مصر بمدنها الصاخبة ومعالمها التاريخية، لكن في بعض الأحيان، يكون الابتعاد عن صخب الحياة الحضرية هو كل ما تحتاجه. إذا كنت تبحث عن ملاذ هادئ دون الابتعاد",
  },
];

export const INSTAGRAM_POSTS = [
  {
    id: 1,
    imageUrl:
      "https://egy-mybayut-live.s3.me-south-1.amazonaws.com/mybayut/wp-content/uploads/2024/09/25144234/FB-cover-14-370x285.png",
    link: "https://www.instagram.com/p/C4f7lOEJ-o8/",
  },
  {
    id: 2,
    imageUrl:
      "https://egy-mybayut-live.s3.me-south-1.amazonaws.com/mybayut/wp-content/uploads/2024/09/25144234/FB-cover-14-370x285.png",
    link: "https://www.instagram.com/p/C4f7lOEJ-o8/",
  },
  {
    id: 3,
    imageUrl:
      "https://www.bayut.eg/mybayut/wp-content/uploads/sb-instagram-feed-images/431199168_314176668336469_930567697610043765_nlow.jpg",
    link: "https://www.instagram.com/p/C4f7lOEJ-o8/",
  },
  // ...add all 9 posts
];
