imagemin();

function imagemin() {
  var fs = require('fs');
  var imageminMozjpeg = require('imagemin-mozjpeg');

  fs.createReadStream('views/images/pizzeria.jpg')
      .pipe(imageminMozjpeg({quality: 80}))
      .pipe(fs.createWriteStream('views/images/pizzeria-opt.jpg'));
}
