// ===== SPA ROUTING (VIEW SWITCHING) =====
function navigateTo(viewId, e) {
    if (e) e.preventDefault();
    
    // Hide all views
    document.querySelectorAll('.spa-view').forEach(function(view) {
        view.classList.remove('active');
    });

    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.classList.remove('active');
    });

    // Show the targeted view
    var targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
    }

    // Add active class to the clicked nav link (if provided)
    if (e && e.target && e.target.classList.contains('nav-link')) {
        e.target.classList.add('active');
    } else {
        // If navigated via landing card, highlight the corresponding nav link
        var correspondingLink = document.querySelector('.nav-link[onclick*="' + viewId + '"]');
        if (correspondingLink) {
            correspondingLink.classList.add('active');
        }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== PROGRESS BAR ANIMATION ON SCROLL =====
document.addEventListener('DOMContentLoaded', function() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var bar = entry.target;
                var targetWidth = bar.getAttribute('data-width');
                if (targetWidth) {
                    bar.style.width = '0%';
                    requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                            bar.style.width = targetWidth;
                        });
                    });
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.progress-fill').forEach(function(bar) {
        observer.observe(bar);
    });
});
