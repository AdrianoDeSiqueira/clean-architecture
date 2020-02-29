import { AddAccountRepository } from '../../../../data/protocols/add-account-repositpry'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountColection = MongoHelper.getCollection('accounts')
    const result = await accountColection.insertOne(accountData)
    const account = result.ops[0]
    const { _id, ...accountWithoudId } = account
    return Object.assign({}, accountWithoudId, { id: _id })
  }
}