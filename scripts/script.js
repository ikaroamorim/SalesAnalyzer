'use strict'

//Label e variável total
let totalLabel = document.getElementById('total')
let total = 0;

//Exemplo, array inicial
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
let barChart
let pieChart
let barData = []
let barLabels = []
let barColors = []
let totalVest = 0
let totalAl = 0
let totalSaude = 0

renderGraficos()

//Funções para renderizar os gráficos
function renderGraficos() {
    calculaBarGrafico()
    calculaPieGrafico()
    exibetotal()
    desenhaBarGrafico()
    desenhaPieGrafico()
}



function exibetotal() {
    total = totalVest + totalAl + totalSaude
    $('#total').html(`<strong>R$${total}</strong>`)
}

function calculaBarGrafico() {
    barData = vendasArray.map(venda => { return venda.valor })
    barLabels = vendasArray.map(venda => { return venda.data })
    vendasArray.forEach(element => {
        barColors.push(`rgba(${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())},${Math.floor(256 * Math.random())},0.7)`)
        total += element.valor
    })
}

function desenhaBarGrafico() {
    barChart = new Chart(barctx, {
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

}

function calculaPieGrafico() {
    totalVest = 0
    totalAl = 0
    totalSaude = 0
    vendasArray.forEach(element => {
        if (element.tipo === 'Alimentação') {
            totalAl += element.valor
        } else if (element.tipo === 'Saúde') {
            totalSaude += element.valor
        } else if (element.tipo === 'Vestuário') {
            totalVest += element.valor
        }
    })
}
function desenhaPieGrafico() {
    pieChart = new Chart(piectx, {
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

//Função para adição de nova venda
function addVenda() {
    vendasArray.push(getFormInfo())

    //Elimina o Gráfico já produzido
    barChart.destroy()
    pieChart.destroy()

    //Desenha um novo Gráfico
    renderGraficos()

    //Resetando os valores do Formulário
    resetaForm()
}

//Função que obtém as informações do gráfico
function getFormInfo() {

    let data = $('#mesRef').val()
    let valor = parseFloat($('#valorRef').val())
    let tipo

    if ($('#inlineRadio1').prop('checked')) {
        tipo = 'Alimentação'
    } else if ($('#inlineRadio2').prop('checked')) {
        tipo = 'Saúde'
    } else if ($('#inlineRadio3').prop('checked')) {
        tipo = 'Vestuário'
    }

    return { data, valor, tipo }

}

//Função responsável por resetar os valores do formulário
function resetaForm() {
    $('#addForm').each(function () {
        this.reset();
    });
}

function zerarTabelas(){
    vendasArray = []

     //Elimina o Gráfico já produzido
     barChart.destroy()
     pieChart.destroy()
 
     //Desenha um novo Gráfico
     renderGraficos()
}

function editarVenda(){
    //recebe o mês preenchido
    let data = $('#mesRef').val()

    //obtém a venda daquele mês
    let venda = vendasArray.find(item => item.data === data)

    //preenche os campos com as info do mês obtido

    //identifica o índice do campo a ser editado
    index = vendasArray.findIndex(item => item.data === data )

    //altera as informações com as informações do gráfico


    //substitui as informações no array original
    vendasArray.splice(index,1, venda)

    //Desenha um novo Gráfico
    renderGraficos()
}