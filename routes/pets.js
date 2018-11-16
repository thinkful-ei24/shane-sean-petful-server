const express = require('express');
const petRouter = express.Router();
const index = require('../index');
const Queue = require('../Queue');

let catQ = new Queue();
let dogQ = new Queue();

const catArr = [{
  imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
},{
  imageURL:'http://3.bp.blogspot.com/-5O65xaCBTl4/USlKYAX52rI/AAAAAAAABaY/TPso6EBZPCQ/s1600/24359966_819581de1c_z.jpg',
  imageDescription: 'grey cat',
  name: 'Snuggles',
  sex: 'Female',
  age: 5,
  breed: 'Grey',
  story: 'Pooped on couch'
},{
  imageURL:'https://tse1.explicit.bing.net/th?id=OIP.QpbVRrS-m5Y74YenjcxsjAHaE7&pid=Api&w=800&h=533&rs=1&p=0',
  imageDescription: 'white cat lounging on turf.',
  name: 'Ricky',
  sex: 'Male',
  age: 8,
  breed: 'White',
  story: 'Thrown on the street'
},{
  imageURL:'https://usercontent2.hubstatic.com/8617713_f520.jpg',
  imageDescription: `Caracal chillin' in the desert.`,
  name: 'Fluffy',
  sex: 'Female',
  age: 4,
  breed: 'Caracal',
  story: 'Thrown on the street'
}];

catArr.forEach(cat => { catQ.enqueue(cat) });

const dogArr = [{
  imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'
},{
  imageURL: 'http://i.ebayimg.com/00/s/ODQ5WDU2Ng==/z/eAUAAOSwpDdVPLBK/$_32.JPG?set_id=880000500F',
  imageDescription: 'A smiling black-white border collie.',
  name: 'Max',
  sex: 'Male',
  age: 3,
  breed: 'Border Collie',
  story: 'Lost'
},{
  imageURL: 'http://pethealthnetwork.com/sites/default/files/styles/large/public/article-image-horiz_115.jpg?itok=4BGyxJmh',
  imageDescription: 'boxer looking at the camera',
  name: 'Sheba',
  sex: 'Female',
  age: 5,
  breed: 'Boxer',
  story: 'Owner Passed away'
},{
  imageURL: 'https://s-media-cache-ak0.pinimg.com/736x/c3/01/23/c30123472679af6128188b09a3a62cfd.jpg',
  imageDescription: 'A smiling pitbull',
  name: 'Dolly',
  sex: 'Female',
  age: 4,
  breed: 'Pittbull',
  story: 'Owner Passed away'
}];

dogArr.forEach(dog => { dogQ.enqueue(dog) });

petRouter.get('/cat', (req, res, next) => {
  return res.json(catQ.peek());
})

petRouter.get('/dog', (req, res, next) => {
  return res.json(dogQ.peek());
})

petRouter.delete('/cat', (req, res, next) => {
  if(!catQ.next) {
    catArr.forEach(cat => { catQ.enqueue(cat) });
    res.sendStatus(204);
  }
  catQ.dequeue();
})

petRouter.delete('/dog', (req, res, next) => {
  if(!dogQ.next) {
    dogArr.forEach(dog => { dogQ.enqueue(dog) });
    res.sendStatus(204);
  }
  dogQ.dequeue();
})

module.exports = petRouter;