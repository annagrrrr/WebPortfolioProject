document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const requestItems = document.querySelectorAll('.requests-list li');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            const nowUTC = Date.now();
            requestItems.forEach(item => {
                const createdAtStr = item.getAttribute('data-created-at');
                if (!createdAtStr) {
                    item.hidden = true;
                    return;
                }

                const createdAtUTC = new Date(createdAtStr).getTime();
                let show = true;

                if (filter === 'day') {
                    const oneDayAgoUTC = nowUTC - 24 * 60 * 60 * 1000;
                    show = createdAtUTC >= oneDayAgoUTC;
                } else if (filter === 'week') {
                    const oneWeekAgoUTC = nowUTC - 7 * 24 * 60 * 60 * 1000;
                    show = createdAtUTC >= oneWeekAgoUTC;
                } else if (filter === 'all') {
                    show = true;
                }
                item.hidden = !show;
            });
        });
    });
});
