import {
  movies,
  sayHi
} from './db.js'

let movies_ul = document.querySelector('.promo__interactive-list');
let genres_ul = document.querySelector('.promo__menu-list ul');
let searchInp = document.querySelector('#search');
let promo_bg = document.querySelector('.promo__bg');
let genres = ['All', ...new Set(movies.map(item => item.Genre))]
let rating = document.querySelector('.rating')
searchInp.onkeyup = () => {

  let val = searchInp.value

  let filtered = movies.filter(item => {
    let title = item.Title.toLowerCase().trim()

    if (title.includes(val)) {
      return item
    }
  })

  reload(filtered, movies_ul)
}


function reload(arr, place) {
  place.innerHTML = ""

  setMovie(arr[Math.floor(Math.random() * arr.length)])

  for (let item of arr) {
    let li = document.createElement('li')
    let del = document.createElement('div')
    let modal_bg = document.querySelector('.modal_bg')
    let close = document.querySelector('.close')
    let flex_img_p = document.querySelector('.flex')
    let img_modal = document.querySelector('.img')

    let rated_p = document.querySelector('#hh')
    let block = document.querySelector('.block')

    let title = document.querySelector('#title')
    let relased = document.querySelector('#relased')
    let runtime = document.querySelector('#runtime')
    let genre = document.querySelector('#genre')
    let director = document.querySelector('#director')
    let launguage = document.querySelector('#launguage')
    let country = document.querySelector('#country')


    del.classList.add('delete')
    li.classList.add('promo__interactive-item')
    li.innerHTML = item.Title
    li.id = item.ID

    li.append(del)
    place.append(li)

    li.onclick = () => {
      modal_bg.style.display = 'block'
      // modal_bg.innerHTML = item.Title

      modal_bg.append(close)
      modal_bg.append(img_modal)

      img_modal.style.backgroundImage = `url(${item.Poster})`







      title.innerHTML = 'Title: ' + item.Title
      rated_p.innerHTML = `Year: ${item.Year}`
      relased.innerHTML = `Released: ${item.Released}`
      runtime.innerHTML = `Runtime: ${item.Runtime}`
      genre.innerHTML = `Genre: ${item.Genre}`
      director.innerHTML = `Director: ${item.Director}`
      launguage.innerHTML = `Language: ${item.Language}`
      country.innerHTML = `Country: ${item.Country}`
      star_fun(item, rating)
      modal_bg.append(flex_img_p)
      flex_img_p.append(img_modal, block)
      block.append(rated_p)




    }
    close.onclick = () => {

      modal_bg.style.display = 'none'

    }
  }



}

function reload_genres(arr, place) {
  place.innerHTML = ""

  for (let item of arr) {
    let li = document.createElement('li')
    let a = document.createElement('a')

    if (item === 'All') {
      a.classList.add('promo__menu-item_active')
    }

    a.classList.add('promo__menu-item')
    a.innerHTML = item
    a.href = "#"


    li.append(a)
    place.append(li)

    li.onclick = () => {
      promo_bg.style.backgroundImage = `url(${item.Poster})`

    }
  }

  let lis = place.querySelectorAll('li')

  lis.forEach(li => {
    li.onclick = () => {
      lis.forEach(el => el.querySelector('a').classList.remove('promo__menu-item_active'))
      let a = li.querySelector('a')

      a.classList.add('promo__menu-item_active')



    }
  })

}

function setMovie({ Poster }) {
  promo_bg.style.backgroundImage = `url(${Poster})`
}

function star_fun(item, block) {
  rating.innerHTML = ''
  let a = item.Ratings[0].Value
  let b = Math.round(+a.split('/')[0])


  console.log(b);
  for (let i = 0; i < b; i++) {
    let stars = document.createElement('img')
    stars.classList.add('stars')
    stars.src = "img/star.png"
    block.append(stars,)
  }
  block.append(b)
}





reload(movies, movies_ul)
reload_genres(genres, genres_ul)

