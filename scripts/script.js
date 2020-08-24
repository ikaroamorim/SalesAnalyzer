'use strict'

//total
let totalLabel = document.getElementById('total')

let total = 0;

let vendasArray = [
    {
        data: '2020-01',
        valor: 3000.00,
        tipo: 'Vestuário'
    },
    {
        data: '2020-02',
        valor: 4000.00,
        tipo: 'Alimentação'
    },
    {
        data: '2020-03',
        valor: 6000.00,
        tipo: 'Saúde'
    },
    {
        data: '2020-04',
        valor: 5000.00,
        tipo: 'Vestuário'
    }
];

//Gráficos
let barctx = document.getElementById('vendasMensais').getContext('2d')
let piectx = document.getElementById('vendasDepto').getContext('2d')

desenhaBarGrafico()
desenhaPieGrafico()

function desenhaBarGrafico() {
    let barData = []
    let barLabels = []
    let barColors = []
    vendasArray.forEach(element => {
        barLabels.push(element.data)
        barData.push(element.valor)
        barColors.push(`rgba(${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())},0.7)`)
        total += element.valor
    })

    let barChart = new Chart(barctx, {
        "type": 'bar',
        "data": {
            "labels": barLabels,
            "datasets": [{
                "label": "Valor das vendas",
                "data": barData,
                "fill": false,
                "backgroundColor": barColors,
                "borderColor": barColors,
                "borderWidth": 1
            }
            ]
        },
        "options": {
            "scales": {
                "yAxes": [{
                    "ticks": {
                        "beginAtZero": true
                    }
                }]
            }
        }
    })

    $('#total').html(`<strong>R$${total}</strong>`)
}



function desenhaPieGrafico() {

    let totalVest = 0
    let totalAl = 0
    let totalSaude = 0
    vendasArray.forEach(element => {
        if (element.tipo === 'Alimentação') {
            totalAl += element.valor
        } else if (element.tipo === 'Saúde') {
            totalSaude += element.valor
        } else if (element.tipo === 'Vestuário') {
            totalVest += element.valor
        }
    })
    let pieChart = new Chart(piectx, {
        "type": "doughnut",
        "data": {
            "labels": ["Alimentação", "Saúde", "Vestuário"],
            "datasets": [{
                "label": "Vendas por tipo",
                "data": [totalAl, totalSaude, totalVest],
                "backgroundColor": ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235,0.7)", "rgba(255, 205, 86,0.7)"]
            }]
        }
    });
}

function addVenda() {
    let data = $('#mesRef').val()
    let valor = parseFloat($('#valorRef').val())
    let tipo

    console.log($('#inlineRadio1').prop('checked'))
    if ($('#inlineRadio1').prop('checked')) {
        tipo = 'Alimentação'
    } else if ($('#inlineRadio2').prop('checked')) {
        tipo = 'Saúde'
    } else if ($('#inlineRadio3').prop('checked')) {
        tipo = 'Vestuário'
    }

    vendasArray.push({ data, valor, tipo })

    desenhaBarGrafico()
    desenhaPieGrafico()

    $('#addForm').each (function(){
        this.reset();
      });
}

function calculaTotal(){

}