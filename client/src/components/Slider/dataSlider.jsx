import { v4 as uuidv4 } from 'uuid';

import image1 from '../../assets/images/slider/1.jpeg'
import image2 from '../../assets/images/slider/2.jpeg'
import image3 from '../../assets/images/slider/3.jpeg'
import image4 from '../../assets/images/slider/4.jpeg'
import image5 from '../../assets/images/slider/5.jpeg'

const dataSlider = [
  {
    id: uuidv4(),
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
    urls: image1
  },
  {
    id: uuidv4(),
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
    urls: image2
  },
  {
    id: uuidv4(),
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
    urls: image3
  },
  {
    id: uuidv4(),
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
    urls: image4
  },
  {
    id: uuidv4(),
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
    urls: image5
  },
];

export default dataSlider;
