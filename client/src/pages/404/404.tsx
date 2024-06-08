import notFoundImage from '../../assets/404.jpg';

const NotFound = () => {
  return (
    <div className='not-found'>
      <img src={notFoundImage} alt="404" className='not-found-image'/>
    </div>
  );
};

export default NotFound;
