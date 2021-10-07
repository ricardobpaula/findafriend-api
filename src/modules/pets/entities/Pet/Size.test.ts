import Size from './Size'

describe('Size Attribute', () => {
  it('Should be a valid size', () => {
    const sizeOrError = Size.create('small')
    expect(sizeOrError.isRight()).toBeTruthy()
  })
  it('Should be not a valid size', () => {
    const sizeOrError = Size.create('smal')
    expect(sizeOrError.isRight()).toBeFalsy()
  })
})
