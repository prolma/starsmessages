document.addEventListener('DOMContentLoaded', () => {
    // الحصول على مراجع لعناصر HTML
    const starsLayer = document.getElementById('stars-layer');
    const contentLayer = document.getElementById('content-layer');
    const wisdomDisplay = document.getElementById('wisdom-display'); // عنصر عرض الحكمة
    const getWisdomButton = document.getElementById('get-wisdom-button'); // زر الحصول على الحكمة

    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle-button');
    const musicIcon = musicToggleButton.querySelector('i');

    // ثوابت لقوة تأثير البارالاكس
    const parallaxStrengthBackground = 15;
    const parallaxStrengthContent = 5;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });

    // --- قائمة الحكم الكونية ---
    const cosmicWisdoms = [
        "نجومك تضيء دربك، لا تتوقف عن السير.",
        "الكون يهمس بأسراره لمن يستمع بقلبه.",
        "كل ذرة في وجودك هي جزء من سيمفونية كونية عظيمة.",
        "كما في الأعلى، فكذلك في الأسفل. عالمك انعكاس لروحك.",
        "اكتشف مجرات جديدة داخلك كل يوم.",
        "لا شيء ثابت في الكون سوى التغيير المستمر.",
        "طاقتك هي صدى للنجوم البعيدة.",
        "كن كالكوكب الذي يدور بثبات حول شمسه، هدفك هو نورك.",
        "الفراغ ليس فراغاً، بل هو مليء بالإمكانيات اللانهائية.",
        "تذكر، أنت غبار النجوم الذي يحلم.",
        "كل نهاية هي بداية لمدار جديد.",
        "الضوء الذي تبحث عنه، يكمن في داخلك بالفعل.",
        "لا تخف من الظلام، فالنجوم لا تضيء إلا فيه.",
        "أحلامك هي النيازك التي ستضيء سماء حياتك.",
        "استمع إلى صمت الفضاء، فيه تكمن الإجابات.",
        "أنت نسيج من النجوم، ومستقبلك فضاء لا نهاية له.",
        "العلم هو رحلتنا لاكتشاف عظمة الكون، والاكتشاف هو رحلتنا لاكتشاف أنفسنا.",
        "كل ومضة نجم في السماء تحمل قصة، وقصتك هي أعظمها."
    ];
    // --- نهاية قائمة الحكم الكونية ---


    // --- وظيفة لعرض حكمة عشوائية ---
    let currentWisdomIndex = -1; // لتجنب تكرار الحكمة مباشرة
    function displayRandomWisdom() {
        // إخفاء الحكمة الحالية أولاً (إذا كانت معروضة)
        wisdomDisplay.classList.remove('show');

        // تأخير قصير قبل تغيير النص وإظهاره مرة أخرى لخلق تأثير التلاشي/الظهور
        setTimeout(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * cosmicWisdoms.length);
            } while (randomIndex === currentWisdomIndex); // تجنب تكرار نفس الحكمة مرتين متتاليتين

            currentWisdomIndex = randomIndex;
            wisdomDisplay.textContent = cosmicWisdoms[randomIndex];
            wisdomDisplay.classList.add('show'); // إضافة الفئة لإظهار الحكمة
        }, 300); // 300 مللي ثانية (0.3 ثانية) لتأثير التلاشي
    }
    // --- نهاية وظيفة عرض حكمة عشوائية ---


    // تفعيل تأثير البارالاكس عند حركة الماوس
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        const xPercent = (x / windowWidth) - 0.5;
        const yPercent = (y / windowHeight) - 0.5;

        const starsX = -xPercent * parallaxStrengthBackground;
        const starsY = -yPercent * parallaxStrengthBackground;
        starsLayer.style.transform = `translate3d(${starsX}px, ${starsY}px, 0)`;

        const contentX = xPercent * parallaxStrengthContent;
        const contentY = yPercent * parallaxStrengthContent;
        contentLayer.style.transform = `translate3d(${contentX}px, ${contentY}px, 0)`;
        // --- تم حذف جزء جسيمات الماوس المتتبعة من هنا ---
    });

    // منطق تشغيل/إيقاف الموسيقى
    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    musicIcon.classList.remove('fa-play');
                    musicIcon.classList.add('fa-pause');
                })
                .catch(error => {
                    console.warn("Autoplay was prevented (or another error):", error);
                });
        } else {
            backgroundMusic.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-play');
        }
    });

    // ضبط مستوى الصوت الافتراضي عند التحميل (50%)
    backgroundMusic.volume = 0.5;

    // إضافة مستمع حدث لزر "احصل على حكمتي"
    getWisdomButton.addEventListener('click', () => {
        displayRandomWisdom(); // عرض حكمة جديدة عند النقر
    });

    // هذا السطر يضمن أن الحكمة لن تظهر إلا عند النقر على الزر
});