import Photo from '@core/entities/Photo/Photo'

export default class PhotoMapper {
  static toPersistence (photo: Photo) {
    return {
      name: photo.props.name,
      size: photo.props.size,
      path: photo.props.path,
      date: photo.props.date
    }
  }
}
