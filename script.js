// انتظر حتى تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    console.log('موقع عالم الترجمة - جاهز للعمل!');

    // 1. تفعيل القائمة المتنقلة للهواتف
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // تغيير الأيقونة عند التفعيل
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // إغلاق القائمة عند النقر على رابط
        const allNavLinks = document.querySelectorAll('.nav-links a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // 2. إضافة سنة حقوق النشر الحالية تلقائياً
    const yearSpan = document.getElementById('currentYear');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. تأثير سلس للروابط الداخلية (للأقسام)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // استثناء روابط الهاتف والواتساب
            if(href === '#') return;
            if(href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if(targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. تأثير بسيط عند التمرير على بطاقات الخدمات
    const serviceCards = document.querySelectorAll('.service-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // إعداد البطاقات قبل الظهور
    serviceCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // 5. التأكد من أن زر الواتساب يعمل حتى لو كان جافاسكريبت معطلاً
    const whatsappButtons = document.querySelectorAll('[href*="wa.me"]');
    whatsappButtons.forEach(btn => {
        // إضافة سمة `rel` لمنع المشاكل الأمنية
        btn.setAttribute('rel', 'noopener noreferrer');
    });

    // 6. رسالة ترحيب عند التحميل (اختياري)
    setTimeout(() => {
        console.log('مرحبًا بك في موقع عالم الترجمة! نحن هنا لخدمتك.');
    }, 1000);
});

// دالة احتياطية لمعالجة الأخطاء العامة
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('خطأ في الموقع:', msg, 'في السطر:', lineNo);
    // يمكن هنا إرسال البلاغ لخدمة مراقبة الأخطاء إذا أردت
    return false; // منع عرض رسالة الخطأ الافتراضية للمستخدم
};