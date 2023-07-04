import 'chai/register-should.js'
import esmock from 'esmock'

import * as utils from '../src/server/utils.js'

const _env = Object.assign({},process.env)

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

    // NOTE: This is necessarily brittle. If these tests fail
    // in the future, start looking here for what new behaviour
    // in the implementation is or isn't getting mocked
    // appropriately.
    describe('index', function () {

        describe('generateHKPProfile()', function() {

            let index;
            let fingerprint;

            this.beforeEach(async () => {

                // Common arrangement pieces that don't change per test
                fingerprint = '79895B2E0F87503F1DDE80B649765D7F0DDD9BD5'
                process.env.DOMAIN = "keyoxide.org"

                // mock the appropriate pieces of our dependencies so we
                // can test just the `keyoxide.url` return value.
                index = await esmock('../src/server/index.js', {
                    '../src/server/keys.js': {
                        fetchHKP: () => {
                            return Promise.resolve({
                                publicKey: {
                                    getPrimaryUser: () => {
                                        return {
                                            user: {
                                                userID: {
                                                    email: "example@example.net"
                                                }
                                            }
                                        }
                                    }
                                },
                                fetchURL: 'example.com'
                            })
                        }
                    },
                    'doipjs': {
                        keys: {
                            process: () => {
                                return { 
                                    key: {},
                                    'fingerprint': fingerprint,
                                    users: [] 
                                }
                            }
                        }
                    },
                    'libravatar': {
                        get_avatar_url: () => {
                            return "example.org/avatar.png"
                        }
                    }
                })
            })

            this.afterEach(() => {
                process.env = _env
            })

            it('should handle implicit scheme for keyoxide URL', async function () {

                // Arrange
                // no setting process.env.SCHEME

                // Act
                const local = await index.generateHKPProfile(fingerprint)

                // Assert
                local.keyoxide.url.should.equal(`https://keyoxide.org/hkp/${fingerprint}`)

            })

            it('should handle explicit http scheme for keyoxide URL', async function () {

                // Arrange
                process.env.SCHEME = "http"

                // Act
                const local = await index.generateHKPProfile(fingerprint)

                // Assert
                local.keyoxide.url.should.equal(`http://keyoxide.org/hkp/${fingerprint}`)

            })

            it('should handle explicit https scheme for keyoxide URL', async function () {

                // Arrange
                process.env.SCHEME = "https"

                // Act
                const local = await index.generateHKPProfile(fingerprint)

                // Assert
                local.keyoxide.url.should.equal(`https://keyoxide.org/hkp/${fingerprint}`)

            })

        })
    })
})