import Chart from 'chart.js';
import dom from './utils/dom';

if (dom.chartOne) {
    const data = document.getElementById('data');
    const statAtt = JSON.parse(data.dataset.statatt);
    const statTax = JSON.parse(data.dataset.stattax);

    const data4 = {
        labels: [
            'Taxations non validées',
            'Taxations validées',
            'Taxations attestées',
        ],
        datasets: [{
            data: [statTax.noValid, statTax.valid, statAtt],
            backgroundColor: [
                '#efa003',
                '#009cef',
                '#0c931d',
            ],
            hoverBackgroundColor: [
                '#efa003',
                '#009cef',
                '#0c931d',
            ],
        }],
    };

    const myPieChart = new Chart(dom.chartOne.getContext('2d'), {
        type: 'pie',
        data: data4,
        responsive: true,
        options: {
            maintainAspectRatio: false,
        },
    });
}
