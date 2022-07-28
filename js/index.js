const slider = document.querySelector('.slider-container')
const slides = document.querySelectorAll('.slide')


let isDragging = false
let currentIndex = 0
let startXPosition = 0
let currentTranslate = 0
let prevTranslate = 0
let animationID = 0


const animation = () => {
    slider.style.transform = `translateX(${currentTranslate}px)`
    if (isDragging) {
        requestAnimationFrame(animation)
    }
}
const touchStart = (index) => {
    return function(event) {
        // console.log('start')
        isDragging = true
        currentIndex = index
        startXPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
        // console.log(startXPosition)
        // https://css-tricks.com/using-requestanimationframe
        animationID = requestAnimationFrame(animation)
        slider.classList.add('grabbing')
    }
}
const touchMove = (event) => {
    // console.log('move')
    if (isDragging) {
        // console.log('dragging')
        const currentXPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
        currentTranslate = prevTranslate + currentXPosition - startXPosition
    }
}
const touchEnd = () => {
    // console.log('end')
    isDragging = false
    cancelAnimationFrame(animationID)
    const movedBy = currentTranslate - prevTranslate
    if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex += 1
    }
    if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1
    }
    currentTranslate = currentIndex * (- window.innerWidth)
    prevTranslate = currentTranslate
    slider.style.transform = `translateX(${currentTranslate}px)`
    slider.classList.remove('grabbing')
}


slides.forEach((slide, idx) => {
    const slideImage = slide.querySelector('img')
    // Disable dragging the image
    slideImage.addEventListener('dragstart', e => e.preventDefault())
    // Touch events
    slide.addEventListener('touchstart', touchStart(idx))
    slide.addEventListener('touchmove', touchMove)
    slide.addEventListener('touchend', touchEnd)
    // Mouse events
    slide.addEventListener('mousedown', touchStart(idx))
    slide.addEventListener('mousemove', touchMove)
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
})


// Disable context menu 
window.oncontextmenu = function (e) {
    // e.preventDefault()
    // e.stopPropagation()
    // return false
}
