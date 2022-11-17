import 'chai/register-should.js'
import * as utils from '../src/server/utils.js'

describe('server', function () {
    describe('utils', function () {
        describe('computeWKDLocalPart()', function () {
            it('should handle "test"', async function () {
                const local = await utils.computeWKDLocalPart('test')
                local.should.equal('iffe93qcsgp4c8ncbb378rxjo6cn9q6u')
            })
            it('should handle "zaphod"', async function () {
                const local = await utils.computeWKDLocalPart('zaphod')
                local.should.equal('xrea5za9y9auaxq463c9opxt338bnaxu')
            })
        })
        describe('encodeZBase32()', function () {
            it('should handle a Uint8Array', async function () {
                const data = new Uint8Array([
                    169,  74, 143, 229, 204, 177,
                    155, 166,  28,  76,   8, 115,
                    211, 145, 233, 135, 152,  47,
                    187, 211
                ])
                const local = utils.encodeZBase32(data)
                local.should.equal('iffe93qcsgp4c8ncbb378rxjo6cn9q6u')
            })
        })
    })
})