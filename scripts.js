document.addEventListener('DOMContentLoaded', function() {
    // Get all clickable sections
    const sections = document.querySelectorAll('.clickable-section');

    sections.forEach(section => {
        // Add touch event listeners
        section.addEventListener('touchstart', handleTouch, { passive: false });
        section.addEventListener('click', handleClick);
    });

    function handleTouch(e) {
        e.preventDefault(); // Prevent default touch behavior
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);

        if (target && target.classList.contains('clickable-section')) {
            handleSectionClick(target);
        }
    }

    function handleClick(e) {
        handleSectionClick(e.currentTarget);
    }

    function handleSectionClick(section) {
        // Get the section's data
        const sectionId = section.getAttribute('data-section');
        const modal = document.getElementById('modal');
        const modalContent = document.querySelector('.modal-content');

        if (modal && modalContent) {
            // Update modal content based on section
            updateModalContent(sectionId);
            modal.style.display = 'block';
        }

        // Add visual feedback
        section.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        setTimeout(() => {
            section.style.backgroundColor = '';
        }, 200);
    }

    function updateModalContent(sectionId) {
        const modalContent = document.querySelector('.modal-content');
        if (!modalContent) return;

        // Add your content update logic here based on sectionId
        modalContent.innerHTML = `<h2>Section ${sectionId}</h2><p>Content for section ${sectionId}</p>`;
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Add touch event for modal closing
    window.addEventListener('touchend', function(e) {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
