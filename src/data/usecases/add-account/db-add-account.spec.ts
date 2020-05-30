import { DbAddAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'

interface sutTypes {
  sut: DbAddAccount
  encryptSpyStub: Encrypter
}

const makeSut = (): sutTypes => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return Promise.resolve('hashed_value')
    }
  }
  const encryptSpyStub = new EncrypterStub()
  const sut = new DbAddAccount(encryptSpyStub)
  return {
    sut,
    encryptSpyStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encryptSpyStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptSpyStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
