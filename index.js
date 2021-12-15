const customCarouselImg = document.querySelector('[data-selected]')

const customCarouselBtnLeft = document.getElementById('ccarouselleft')
const customCarouselBtnRight = document.getElementById('ccarouselright')

// Array of urls.
const customCarouselSelections = customCarouselImg.dataset.selections.split(',')

// Array of strings.
const customCarouselAlts = customCarouselImg.dataset.alts.split(',')

customCarouselBtnLeft.onclick = function () {
  customCarouselImg.src = getSelection(1)
}

customCarouselBtnRight.onclick = function () {
  customCarouselImg.src = getSelection(-1)
}

// Num can be 1 or -1
function getSelection(num) {
  const currentSelection = customCarouselImg.dataset.selected

  let selection = Number(currentSelection) + num

  if (selection > (customCarouselSelections.length - 1)) {
    selection = 0
  } else if (selection < 0) {
    selection = customCarouselSelections.length - 1
  }

  customCarouselImg.dataset.selected = selection
  customCarouselImg.alt = customCarouselAlts[selection]
  customCarouselImg.title = customCarouselAlts[selection]

  return customCarouselSelections[selection]
}

const colors = [['bg-primary', 'text-black'], ['bg-secondary', 'text-black'], ['bg-success', 'text-black'], ['bg-danger', 'text-white'], ['bg-warning', 'text-black'], ['bg-dark', 'text-white'], ['bg-black', 'text-white']]
const opacity = ['75', '50', '100']

const cols = document.querySelectorAll('#buzzwords .col')

function randomizeBuzzwordsColor() {
  for (let index = 0; index < cols.length; index++) {
    const col = cols[index]

    col.setAttribute('class', 'col d-flex justify-content-center')

    const color = colors[Math.floor(Math.random() * colors.length)]

    col.classList.add(
      ...color,
      'bg-opacity-' + opacity[Math.floor(Math.random() * opacity.length)]
    )
  }
}

document.getElementById('buzzwords').addEventListener('click', () => randomizeBuzzwordsColor())

randomizeBuzzwordsColor()

setInterval(() => randomizeBuzzwordsColor(), 3000)
