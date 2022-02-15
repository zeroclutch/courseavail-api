import { Client } from "../dist/courseAvail.js"
import assert from 'assert'

const client = new Client()

assert.strictEqual(client.resolveQuarter('Spring 2022'), 4340)
assert.strictEqual(client.resolveQuarter('Winter 2022'), 4320)
assert.strictEqual(client.resolveQuarter('Fall 2021'), 4300)
assert.strictEqual(client.resolveQuarter('Summer 2021'), 4260)

client.search('math 12', 'Spring 2022')
.then(results => {
    console.log(results[0])
    assert.strictEqual(results[0].strm_descr, 'Spring 2022')
    assert.strictEqual(results[0].instructor, 'Donohoe, Wendy')
})