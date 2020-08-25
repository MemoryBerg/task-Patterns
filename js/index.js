function showPass() {
  let input = event.target.parentNode.nextElementSibling;
  input.previousElementSibling.firstElementChild.classList.toggle('show');
  if (input.getAttribute('type') === 'text') {
    input.setAttribute('type', 'password');
    input.previousElementSibling.firstElementChild.innerText = 'show';
  } else {
    input.setAttribute('type', 'text');
    input.previousElementSibling.firstElementChild.innerText = 'Hide';
  }
}

function active() {
  document.getElementById('home').classList = 'header__item active';
}

async function homePostsBuilder() {
  const url = `http://localhost:3000/api/list/`;
  await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(response => {
      return response.json();
    }
    )
    .then(dataArray => {
      dataArray.slice(dataArray.length - 3).forEach(data => {
        const post = new Post(data, postLocation.homePage,
          document.getElementsByClassName('posts__section')[0].getElementsByClassName('row')[0]);
        return post;
      })
    })
}

homePostsBuilder(document.getElementsByTagName('main')[0]);

const parentPortfolio = document.getElementsByClassName('portfolio__wrapper')[0];

const dataPortfolio = [
  {
    title: 'Art Ocean',
    text: 'Photography, art, nature',
    criterionIdenty: 'info__post',
    identy: ['info__post-ocean', 'portfolio__post-ocean', 'portfolio__toolbar'],
    criterionClassList: 'portfolio__title',
    classList: ['info__title-btns', 'portfolio__title-btns']
  },
  {
    title: 'City guide',
    text: 'Photography, city, way',
    criterionIdenty: 'info__post',
    identy: ['info__post-city', 'portfolio__post-city']
  },
  {
    title: 'Mountains',
    text: 'Art, hiking',
    criterionIdenty: 'info__post',
    identy: ['info__post-mountains', 'portfolio__post-mountains']
  },
  {
    title: 'Art Ocean',
    text: 'Photography, art, nature',
    criterionIdenty: 'info__post',
    identy: ['info__post-ocean', 'portfolio__post-ocean', 'portfolio__toolbar'],
    criterionClassList: 'portfolio__title',
    classList: ['info__title-btns', 'portfolio__title-btns']
  },
  {
    title: 'City guide',
    text: 'Photography, city, way',
    criterionIdenty: 'info__post',
    identy: ['info__post-city', 'portfolio__post-city']
  },
  {
    title: 'Mountains',
    text: 'Art, hiking',
    criterionIdenty: 'info__post',
    identy: ['info__post-mountains', 'portfolio__post-mountains']
  }
]

dataPortfolio.forEach(data => {
  new Portfolio(data, null, parentPortfolio);

})
