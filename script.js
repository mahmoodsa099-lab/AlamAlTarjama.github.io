// ====== ملف script.js الكامل ======

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
                if(menuToggle.querySelector('i')) {
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }
    
    // 2. إضافة سنة حقوق النشر الحالية تلقائياً
    const yearSpan = document.getElementById('currentYear');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // 3. تحميل المقالات من localStorage
    loadArticles();
    
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

// دالة لتحميل وعرض المقالات
function loadArticles() {
    const articlesContainer = document.getElementById('articlesContainer');
    if (!articlesContainer) return;
    
    // جلب المقالات من localStorage (من لوحة التحكم)
    let articles = JSON.parse(localStorage.getItem('alamArticles')) || [];
    
    // إذا لم توجد مقالات، عرض رسالة
    if (articles.length === 0) {
        articlesContainer.innerHTML = `
            <div class="article-card-main" style="text-align: center; padding: 40px; grid-column: 1 / -1;">
                <div class="article-image" style="background: linear-gradient(135deg, var(--primary-blue), var(--primary-dark));">
                    <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-newspaper" style="font-size: 3rem; color: white;"></i>
                    </div>
                </div>
                <div class="article-content">
                    <h3 class="article-title">لا توجد مقالات بعد</h3>
                    <p class="article-excerpt">سيتم إضافة مقالات أكاديمية قيمة قريباً. يمكنك زيارة لوحة التحكم لإضافة المقالات.</p>
                    <a href="admin.html" class="read-more">اذهب إلى لوحة التحكم <i class="fas fa-arrow-left"></i></a>
                </div>
            </div>
        `;
        return;
    }
    
    // عرض المقالات (أحدث 6 مقالات فقط)
    const recentArticles = articles.slice(0, 6);
    
    articlesContainer.innerHTML = recentArticles.map((article, index) => `
        <div class="article-card-main">
            <div class="article-image" style="background-image: url('${article.image || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'}');">
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span><i class="fas fa-calendar"></i> ${article.date}</span>
                    ${article.updated ? `<span><i class="fas fa-history"></i> محدث</span>` : ''}
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.content.substring(0, 120)}...</p>
                <a href="#" class="read-more" onclick="viewArticleInModal(${index}); return false;">
                    اقرأ المزيد <i class="fas fa-book-open"></i>
                </a>
            </div>
        </div>
    `).join('');
}

// دالة لعرض المقال في نافذة منبثقة
function viewArticleInModal(index) {
    let articles = JSON.parse(localStorage.getItem('alamArticles')) || [];
    const article = articles[index];
    
    // إنشاء النافذة المنبثقة
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; border-radius: 15px; padding: 30px; position: relative;">
            <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; left: 15px; top: 15px; background: #dc3545; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 1rem;">×</button>
            
            <h2 style="color: #0A2342; margin-bottom: 20px; padding-left: 30px;">${article.title}</h2>
            
            ${article.image ? `<img src="${article.image}" style="max-width:100%; border-radius:10px; margin-bottom:20px;">` : ''}
            
            <div style="line-height: 1.8; font-size: 1.1rem; margin-top: 20px; white-space: pre-line;">
                ${article.content}
            </div>
            
            <div style="color: #6c757d; margin-top: 30px; border-top: 1px solid #dee2e6; padding-top: 15px; display: flex; justify-content: space-between;">
                <span><i class="fas fa-calendar"></i> نشر في: ${article.date}</span>
                ${article.updated ? `<span><i class="fas fa-history"></i> آخر تحديث: ${article.updated}</span>` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // إضافة أيقونات Font Awesome إذا لم تكن موجودة
    if (!document.querySelector('.fa-calendar')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }
}

// دالة احتياطية لمعالجة الأخطاء العامة
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('خطأ في الموقع:', msg, 'في السطر:', lineNo);
    return false;
};
