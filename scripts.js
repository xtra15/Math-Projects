document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.clickable-section');

    sections.forEach(section => {
        section.addEventListener('touchstart', handleTouch, { passive: false });
        section.addEventListener('touchend', handleTouchEnd, { passive: false });
        section.addEventListener('click', handleClick);
    });

    function handleTouch(e) {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);

        if (target && (target.classList.contains('clickable-section') || target.closest('.clickable-section'))) {
            const section = target.classList.contains('clickable-section') ? target : target.closest('.clickable-section');
            section.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        }
    }

    function handleTouchEnd(e) {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.changedTouches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);

        if (target && (target.classList.contains('clickable-section') || target.closest('.clickable-section'))) {
            const section = target.classList.contains('clickable-section') ? target : target.closest('.clickable-section');
            section.style.backgroundColor = '';
            handleSectionClick(section);
        }
    }

    function handleClick(e) {
        e.stopPropagation();
        handleSectionClick(e.currentTarget);
    }

    function handleSectionClick(section) {
        const sectionId = section.getAttribute('data-section');
        const modal = document.getElementById('modal');
        const modalContent = document.querySelector('.modal-content');

        if (modal && modalContent) {
            updateModalContent(sectionId);
            modal.style.display = 'block';
        }
    }

    function updateModalContent(sectionId) {
        const modalContent = document.querySelector('.modal-content');
        if (!modalContent) return;
        modalContent.innerHTML = `<h2>Section ${sectionId}</h2><p>Content for section ${sectionId}</p>`;
    }

    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    window.addEventListener('touchend', function(e) {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
