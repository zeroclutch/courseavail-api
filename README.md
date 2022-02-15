# Unofficial SCU CourseAvail API

How to use this in your project:

1. Include the `dist/` directory in your project.
2. `require()` or `import` the `courseAvail.js` file. 
3. Install axios using `npm i axios`

### Example Usage

```js
// main.js
import { Client } from 'courseAvail'

const client = new Client()

client.search('math 12', 'Spring 2022')
.then(results => {
    console.log(results[0].instructor)
})

```

See all the properties in the source.