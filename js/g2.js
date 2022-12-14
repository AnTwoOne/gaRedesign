(function (a, b, c, d) {
    window
      .fetch("https://www.g2.com/products/getaccept/rating_schema.json")
      .then((e) => e.json())
      .then((f) => {
          console.log(f)
        data = f;
        c = a.createElement(b);
        c.type = "application/ld+json";
        c.text = JSON.stringify(f);
        d = a.getElementsByTagName(b)[0];
        d.parentNode.insertBefore(c, d);
      })
      .then(() => {
        console.log(data.aggregateRating.ratingValue);
        let starRating = document.createElement("div");
        let numberOfReview = data.aggregateRating.reviewCount;
        starRating.id = "g2-star-rating";
        starRating.style.cssText = "display: inline-block; position: relative; background-image: url('./assets/star-empty.svg'); background-size: 30px; background-position: 0 0; background-repeat: repeat-x; aspect-ratio:5/1; height: 30px;";
        let starValue = document.createElement("div");
        starValue.classList.add("g2-star-rating-value");
        starValue.style.cssText = "display: inline-block; height: 101%; position: absolute; top: 0; left: 0; background-image: url('./assets/star.svg'); background-position: 0 0; background-repeat: repeat-x; background-size: 30px;"
        starValue.style.width = `${data.aggregateRating.ratingValue * 10}%`;
        starRating.appendChild(starValue);
        document.querySelector(".g2-stars-and-count").appendChild(starRating);
        let numberOfReviewElement = document.createElement("div");
        numberOfReviewElement.classList.add("g2-number-of-review");
        numberOfReviewElement.classList.add('paragraph-tiny');
        numberOfReviewElement.innerHTML = `(${numberOfReview}) <strong>${data.aggregateRating.ratingValue / 2}</strong> out of <strong>5</strong>`;
        document.querySelector(".g2-stars-and-count").appendChild(numberOfReviewElement);
      });
  })(document, "script");


 const fetchingG2Data =  (element, a, b, c, d) =>{
    window
      .fetch("https://www.g2.com/products/getaccept/rating_schema.json")
      .then((e) => e.json())
      .then((f) => {
          console.log(f)
        data = f;
        c = a.createElement(b);
        c.type = "application/ld+json";
        c.text = JSON.stringify(f);
        d = a.getElementsByTagName(b)[0];
        d.parentNode.insertBefore(c, d);
      })
      .then((element) => {
        console.log(data.aggregateRating.ratingValue);
        let starRating = document.createElement("div");
        let numberOfReview = data.aggregateRating.reviewCount;
        starRating.id = "g2-star-rating";
        starRating.style.cssText = "display: inline-block; position: relative; background-image: url('./assets/star-empty.svg'); background-size: 30px; background-position: 0 0; background-repeat: repeat-x; aspect-ratio:5/1; height: 30px;";
        let starValue = document.createElement("div");
        starValue.classList.add("g2-star-rating-value");
        starValue.style.cssText = "display: inline-block; height: 101%; position: absolute; top: 0; left: 0; background-image: url('./assets/star.svg'); background-position: 0 0; background-repeat: repeat-x; background-size: 30px;"
        starValue.style.width = `${data.aggregateRating.ratingValue * 10}%`;
        starRating.appendChild(starValue);
        element.querySelector(".g2-stars-and-count").appendChild(starRating);
        let numberOfReviewElement = document.createElement("div");
        numberOfReviewElement.classList.add("g2-number-of-review");
        numberOfReviewElement.classList.add('paragraph-tiny');
        numberOfReviewElement.innerHTML = `(${numberOfReview}) <strong>${data.aggregateRating.ratingValue / 2}</strong> out of <strong>5</strong>`;
        element.querySelector(".g2-stars-and-count").appendChild(numberOfReviewElement);
      });
  }

  
