const fs = require('fs')

const getObjectById = id => {
  const filename = id + '.json'

  let target

  if (fs.existsSync(filename)) {
    const json = fs.readFileSync(filename, { encoding: 'utf-8' })
    target = JSON.parse(json)
  } else {
    target = {}
  }

  const save = () => {
    console.log('Saving...')
    fs.writeFileSync(filename, JSON.stringify(target))
  }

  return new Proxy(target, {
    set: (obj, prop, value) => {
      obj[prop] = value
      save()
    }
  })
}

const myObj = getObjectById('my-obj')

console.log(myObj.prop)
myObj.prop = 'hello world'
