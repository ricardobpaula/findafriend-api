import Photo from './Photo'

describe('Photo entity', () => {
  it('should create a new Photo', () => {
    const photo = Photo.create({
      date: new Date(),
      name: 'photo.png',
      originalName: 'photo.png',
      path: '/home/usr/pictures',
      size: 1024
    })
    expect(!!photo).toBeTruthy()
  })
})
