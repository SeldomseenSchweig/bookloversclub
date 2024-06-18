
let reviewId = 0;
let reviews = fetch('reviews.json')
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); 
})
.then(data => {
  const reviewsList = document.getElementById('reviews-list');

  data.forEach(item => {
    reviewId++
    let listItem = createReviewElement(item, reviewId)
    reviewsList.appendChild(listItem); 
  })
})
.catch(error => {
  console.error('There was a problem:', error);
});

function createReviewElement(item, reviewId){
  let listItem = document.createElement('div'); 
  listItem.className ="review-item"
  listItem.innerHTML =`<h3> ${item.title} </h3> <h4> ${item.reviewText} </h4> <p> ${item.rating} stars </p> <p> <button id="likeId-${reviewId}" data-liked="false" >${item.likes} likes </button> </p><p> <button id="repostId-${reviewId}"> ${item.reposts} reposts </button> </p> <p> `;
  listItem.querySelector(`#likeId-${reviewId}`).addEventListener('click', () => toggleLike(`likeId-${reviewId}`));
  listItem.querySelector(`#repostId-${reviewId}`).addEventListener('click', () => repostReview(`repostId-${reviewId}`));
    return listItem; 
}

function loadReviews(event){
  console.log("Load Reviews Called!")
  event.preventDefault();
}


function handleReviewSubmit(event){
  
  console.log("Handle Review Submit Called!")
  let form = document.getElementById('review-form')
  let title = form.elements['book-title'].value
  let item = {title:title, reviewText:form.elements['review-text'].value, rating:form.elements['rating'].value,likes:0, reposts:0}
   let newReview = createReviewElement(item)
  const reviewsList = document.getElementById('reviews-list');
  reviewsList.firstChild.before(newReview);
  
  event.preventDefault();
  form.reset()
  
}

window.addEventListener("DOMContentLoaded", loadReviews);


document.getElementById("review-form").addEventListener("submit", handleReviewSubmit);


 function toggleLike(id) {
   
    let num = document.getElementById(id).innerHTML;
   let liked = document.getElementById(id).getAttribute('data-liked');
   if(liked == "false"){
     num = parseInt(num) + 1;
     document.getElementById(id).innerHTML = `${num} likes`;;
     document.getElementById(id).setAttribute('data-liked', 'true');
   }else{
     num = parseInt(num) - 1;
     document.getElementById(id).innerHTML = `${num} likes`;;
     document.getElementById(id).setAttribute('data-liked', 'false');
   }
 }

 function repostReview(id) {
   let num = document.getElementById(id).innerHTML;
   let pattern = /\d+/g; // Regex to find one or more digits
   let matches = num.match(pattern);
   let numInt = parseInt(matches[0]);
   num.replace(matches[0], numInt + 1)
   document.getElementById(id).innerHTML = ` ${numInt + 1} reposts`;
   
 }

