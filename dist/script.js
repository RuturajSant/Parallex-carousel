//all elements
 let i = 1;
 const container= document.querySelector('.carousel');//wrapper div
 const slidesContent=container.querySelectorAll('.slide-content');//text and images inside all slides
 const slides=container.querySelectorAll('.slide');//li slides
 const carouselSlide = container.querySelector('.slider')//ul container
 const btns = container.querySelectorAll('.btn');//navigation buttons
 const left=document.querySelector('.left');//arrow btns
 const right=document.querySelector('.right');

//changing to original first slide from cloned slide
 var size = slides[0].getBoundingClientRect().width;
 carouselSlide.style.transform='translateX(' + (-size * i) + 'px)';

//  to updateslides and add active to button logic
const updateSlide = (n) =>{
     i = i + n;//i =1 here
     var size = slides[i].getBoundingClientRect().width;
     carouselSlide.style.transition="all 0.4s ease-in-out";
     carouselSlide.style.transform='translateX(' + (-size * i) + 'px)';
     btns.forEach(btn=>{btn.classList.remove("active");});//this remove active is here because we are also using arrow buttons to navigate,so this removes active class on btns anyways
     if(i>0 && i<6){
       btns[i-1].classList.add("active");//if i=1 this makes btn 0 ie first btn active
      }
     if(i==0){
      btns[4].classList.add("active");//this condition for last-clone 
     }
     if(i==6){
      btns[0].classList.add("active");//this condition for first-clone 
     }
}

// if navigations are clicked
btns.forEach((btn, m) => {
  btn.addEventListener("click",() =>{
    btn.classList.add('active');
    i = 1;
    updateSlide(m);
  });
});

// left click listener 
left.addEventListener('click', moveLeft=() => {
    if(i <= 0) return;//if we click fast enough the counter crosses 0 this condition prevents updateslide in this condition
    updateSlide(-1);
});

// right click listener 
right.addEventListener('click', moveRight=()=>{ 
    if(i >= slides.length - 1) return;//if we click fast enough the counter crosses 6 this condition prevents updateslide in this condition
    updateSlide(1);
});

// logic for implementing infinite carousel 
carouselSlide.addEventListener('transitionend',()=>{    
    slides.forEach(slide => {
      slide.classList.remove("active"); 
    });
    slides[i].classList.add("active");
 
    if(slides[i].id === "last-clone"){
        carouselSlide.style.transition = "none";
        i = slides.length - 2;//7-2=5 ie last true slide
        var size = slides[i].getBoundingClientRect().width;
        carouselSlide.style.transform='translateX(' + (-size * i) + 'px)';
    }
    if(slides[i].id === "first-clone"){
        carouselSlide.style.transition = "none";
      console.log(i);
        i = slides.length - i;//7-6=1 ie first true slide
        var size = slides[i].getBoundingClientRect().width;
        carouselSlide.style.transform='translateX(' + (-size * i) + 'px)';
    }
});

//logic for automatic play
// var int;
// //when mouse is on the slides ,the automatic loop will stop,and play again when off the carousel
// slidesContent.forEach((slide) => {
//   slide.addEventListener('mouseover',(e) => {
//     e.stopPropagation();//to stop event bubbling
//     clearInterval(int);  
// });
//   slide.addEventListener('mouseout',(e) => {
//     e.stopPropagation();
//     auto(); 
// });
// });

// const repeater = () => {
//   updateSlide(1);
// };

// const auto = () => {
//   int = setInterval(repeater,5000);
// };

// auto();