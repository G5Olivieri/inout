const fs = require('fs')

fs.readFile("./essencias.csv", (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  fs.writeFile("./essencias.json", JSON.stringify(
    data
      .toString('utf-8')
      .split('\n')
      .filter(line => line !== '')
      .map(line => {
        const [name, price, quantity] = line.split(',')
        return {name, price, quantity}
      })
    ), (err) => {
      if(err) console.error(err)
    })
})
