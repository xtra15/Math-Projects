document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.clickable-section');
    let touchStartTime;
    let touchStartPosition;

    sections.forEach(section => {
        section.addEventListener('touchstart', handleTouch, { passive: false });
        section.addEventListener('touchend', handleTouchEnd, { passive: false });
        section.addEventListener('touchcancel', handleTouchCancel, { passive: false });
        section.addEventListener('click', handleClick);
    });

    function handleTouch(e) {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        touchStartTime = Date.now();
        touchStartPosition = { x: touch.clientX, y: touch.clientY };

        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target.closest('.clickable-section')) {
            const section = target.closest('.clickable-section');
            section.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        }
    }

    function handleTouchEnd(e) {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.changedTouches[0];
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;

        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target.closest('.clickable-section')) {
            const section = target.closest('.clickable-section');
            section.style.backgroundColor = '';

            const touchDistance = Math.sqrt(
                Math.pow(touch.clientX - touchStartPosition.x, 2) +
                Math.pow(touch.clientY - touchStartPosition.y, 2)
            );

            if (touchDuration < 500 && touchDistance < 10) {
                handleSectionClick(section);
            }
        }
    }

    function handleTouchCancel(e) {
        const section = e.currentTarget;
        section.style.backgroundColor = '';
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
