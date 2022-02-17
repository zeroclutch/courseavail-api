# Unofficial SCU CourseAvail API

Install this using:

```bash
npm i courseavail-api
```

### Example Usage

```js
// main.js
import { Client } from 'courseavail-api'

/** 
Note - does not work:
const { Client } = require('courseavail-api')
*/

const client = new Client()

client.search('math 12', 'Spring 2022')
.then(results => {
    console.log(results[0].instructor)
})
```

See all the properties in [the source](https://github.com/zeroclutch/courseavail-api/blob/d1ca6a290a2d127bd3ecdc210b38b7383158f536/src/courseAvail.ts#L76).
