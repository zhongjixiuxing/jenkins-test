const {assert} = require('chai');
const Mongoose = require('mongoose');
const Rx = require('rxjs/Rx');
const {map, last} = require('lodash');
const sinon = require('sinon');

/**
 *
 * ServiceUnitTest: 工具class 的单元测试
 * IntegrationTest: 应用层/controller 层的集成测试
 */

let app;

/**
 *  关于钱包resource的测试
 */
describe('Demo', () => {
    let sandbox, Wallet, WalletCoin;
    before(() => {
        return new Promise(async (resolve, reject) => {
            let startupDB = require('../db/mongodb/index');
            startupDB()
                .then(
                    res => {
                        Wallet = Mongoose.model('Wallet');
                        WalletCoin = Mongoose.model('WalletCoin');
                        resolve(true);
                    }
                )
                .catch(
                    err => {
                        console.error(err);
                        reject(err);
                    }
                )
        });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(async () => {
        sandbox.restore();
    });

    describe('ServiceUnitTest', () => {

        it ('work', done => {
            let wallet = new Wallet();
            wallet.id = 'c51c80c2-66a1-442a-91e2-4f55b4256a72';
            wallet.name = 'anxing123';

            Rx.Observable.fromPromise(wallet.save())
                .flatMap(
                    res => {
                        return Wallet.findOne({});
                    }
                )
                .subscribe(
                    res => {
                        assert.isTrue(!!res);
                        assert.deepStrictEqual(res.name, 'anxing123');
                        setTimeout(() => {
                            done();
                        }, 30000);
                    },
                    err => done(err)
                )
        })
    });
});