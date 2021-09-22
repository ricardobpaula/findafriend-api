import Description from './Description'

describe('Attribute description', () => {
  it('Should be a valid description', () => {
    const descriptionOrError = Description.create(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Praesent quis leo in erat pharetra imperdiet.')
    expect(descriptionOrError.isRight()).toBeTruthy()
  })

  it('Should reject value with less than 10 characteres', () => {
    const descriptionOrError = Description.create('Lorem')
    expect(descriptionOrError.isLeft()).toBeTruthy()
  })

  it('Should reject value with more than 255 characteres', () => {
    const descriptionOrError = Description.create('L'.repeat(256))
    expect(descriptionOrError.isLeft()).toBeTruthy()
  })
})
