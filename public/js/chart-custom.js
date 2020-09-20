import Chart from 'chart.js';
import dom from './utils/dom';

if (dom.chartOne) {
    const data = document.getElementById('data');
    const statAtt = JSON.parse(data.dataset.statatt);
    const statTax = JSON.parse(data.dataset.stattax);

    console.log(statAtt);
    console.log(statTax);

    const data4 = {
        labels: [
            'Taxations non validées CDF',
            'Taxations non validées USD',
            'Taxations validées CDF',
            'Taxations validées USD',
            'Taxations attestées CDF',
            'Taxations attestées USD',
        ],
        datasets: [{
            data: [statTax.sumTaxationNoValidCDF, statTax.sumTaxationNoValidUSD, statTax.sumTaxationValidCDF, statTax.sumTaxationValidUSD, statAtt.sumCDF, statAtt.sumUSD],
            backgroundColor: [
                '#c60600',
                '#232a33',
                '#009cef',
                '#efa003',
                '#d315ab',
                '#0c931d',
            ],
            hoverBackgroundColor: [
                '#c60600',
                '#232a33',
                '#009cef',
                '#efa003',
                '#d315ab',
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
