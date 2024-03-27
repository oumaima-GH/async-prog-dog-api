const fs = require('fs');
const superagent = require('superagent');

const readDogFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
const writeDogFile = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 
            (error) => {
            if(error) reject(error)
            resolve('message written successfully!')
        })
    })
}

readDogFile(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
      .then((res) => {
        let result = res.body.message;

        return writeDogFile(`${__dirname}/dog-image.txt`, result)
            // .then(console.log('message written successfully!'))
            // .catch(error => console.log(error)) 

      })
      .then(() => console.log('written successfully'))

  .catch((err) => console.log(err));





//  writeDogFile(`${__dirname}/dog.txt`).then((message) => {
//     console.log(message);
//  })
//  .catch(error) 
//  console.log('this is an error: ', error.message);
 

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   if (err) return err;
//   console.log(`Breed ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body);
//       let result = res.body.message;

//       fs.writeFile(`${__dirname}/dog-image.txt`, result, (err) => {
//         if (err) return console.log(err.message);
//         console.log('message writenn succefully!!');
//       });
//     })
//     .catch((err) => {
//       console.log('this is an error!!=>', err.message);
//     });
// });


