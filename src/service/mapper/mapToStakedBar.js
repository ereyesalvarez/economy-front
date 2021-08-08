function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}


export default function processData(data) {

  // let data = categories.value
  let minYear = Math.min(...data.map(value => Math.min(...value.dates.map(value2 => value2.year))))
  let maxYear = Math.max(...data.map(value => Math.max(...value.dates.map(value2 => value2.year))))
  let minMonth = Math.min(...data.map(value => Math.min(...value.dates.filter(value => value.year === minYear).map(value2 => value2.month))))
  let maxMonth = Math.max(...data.map(value => Math.max(...value.dates.filter(value => value.year === maxYear).map(value2 => value2.month))))
  let root = {}
  let labels = []
  let years = range(maxYear - minYear + 1, minYear)
  let dates = [];
  years.forEach(year => {
    let months;
    if (year === minYear) {
      months = range(12 - minMonth + 1, minMonth)
    } else if (year === maxYear) {
      months = range(maxMonth, 1)
    } else {
      months = range(12, 1)
    }
    months.forEach(month => {
      labels.push(year + "-" + month)
      dates.push({
        year: year,
        month: month
      })
    })
  })
  root.labels = labels
  let datasets= []
  data.forEach(cat => {
    let catData = []
    dates.forEach(date => {
      let catValue = cat.dates.find(d => d.year === date.year && d.month === date.month)
      if (catValue === null || catValue === undefined) {
        catValue = 0
      } else {
        catValue = catValue.amount.toFixed(1)
      }

      catData.push(catValue);
    })
    let dataset = {
      data: catData,
      backgroundColor: [
        "#0A2F51",
        "#0E4D64",
        "#137177",
        "#188977",
        "#1D9A6C",
        "#39A96B",
        "#56B870",
        "#74C67A",
        "#99D492",
        "#BFE1B0",
        "#DEEDCF"
      ],
    }
    datasets.push(dataset)
  })
  return {
    labels: labels,
    datasets: datasets
  }
}

console.log(processData(data).datasets)
