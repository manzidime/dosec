import Chart from 'chart.js'
import dom from './utils/dom';

const data4 = {
    labels: [
        "Taxations non validées",
        "Taxations validées",
        "Taxations attestées"
    ],
    datasets: [{
        data: [30, 30, 40],
        backgroundColor: [
            '#1c7cc6',
            '#0e9e4a',
            '#7267EF'
        ],
        hoverBackgroundColor: [
            '#17C666',
            '#0e9e4a',
            '#7267EF'
        ]
    }]
};

if(dom.chartOne){
    const myPieChart = new Chart(dom.chartOne.getContext('2d'), {
        type: 'pie',
        data: data4,
        responsive: true,
        options: {
            maintainAspectRatio: false,
        }
    });
}
