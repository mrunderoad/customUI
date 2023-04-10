'use strict'

function $(selector) {
  return document.querySelector(selector)
}

function find(el, selector) {
  let finded
  return (finded = el.querySelector(selector)) ? finded : null
}

function siblings(el) {
  const siblings = []
  for (let sibling of el.parentNode.children) {
    if (sibling !== el) {
      siblings.push(sibling)
    }
  }
  return siblings
}

const showAsideBtn = $('.show-side-btn')
const sidebar = $('.sidebar')
const wrapper = $('#wrapper')
const frame = $('#myframe')
const toggler = $('#toggler')

showAsideBtn.addEventListener('click', function () {
  $(`#${this.dataset.show}`).classList.toggle('show-sidebar')
  wrapper.classList.toggle('fullwidth')
  frame.classList.toggle('flexLeft')
})

if (window.innerWidth < 767) {
  sidebar.classList.add('show-sidebar');
}

window.addEventListener('resize', function () {
  if (window.innerWidth > 767) {
    sidebar.classList.remove('show-sidebar')
  }
})

// dropdown menu in the side nav

var slideNavDropdown = $('.sidebar-dropdown');

$('.sidebar .categories').addEventListener('click', function (event) {

  const item = event.target.closest('.has-dropdown')
  if (!item) {
    return
  }

  const isOpened = item.classList.contains('opened');
  siblings(item).forEach(sibling => {
    sibling.classList.remove('opened')
  })

  if (!isOpened) {
    item.classList.add('opened');

    const toOpen = find(item, '.sidebar-dropdown')
    if (toOpen) {
      toOpen.classList.add('active')
    }

    siblings(item).forEach(sibling => {

      const toClose = find(sibling, '.sidebar-dropdown')
      if (toClose) {
        toClose.classList.remove('active')
      }
    })
  } else {
    find(item, '.sidebar-dropdown', '.sub-menu').classList.toggle('active')
  }
})

$('.sidebar .close-aside').addEventListener('click', function () {
  $(`#${this.dataset.close}`).classList.add('show-sidebar')
  wrapper.classList.remove('margin')
})

// Functions for displaying chosen system

document.addEventListener('DOMContentLoaded', () => {
  const systems = document.querySelectorAll('.system');
  let prevSystem;

  systems.forEach(system => {
    system.addEventListener('click', event => {
      const clickedSystem = event.target;
      if (!clickedSystem) return;

      systems.forEach(system => system.classList.remove('active'));
      clickedSystem.classList.add('active');
      prevSystem = clickedSystem;

      const text = ` - ${clickedSystem.textContent}`;
      document.getElementById('systemName').textContent = text;

      const groups = [
        ['EF', 'Exhaust Fans (EF)'],
        ['AHU', 'Air Handling Units (AHU)'],
        ['MZU', 'Multi Zone Units (MZU)'],
        ['FTR', 'Fin Tube Radiators (FTR)'],
        ['RTU', 'Roof Top Units (RTU)'],
        ['DHW', 'Boiler Systems'],
        ['Boiler', 'Boiler Systems'],
        ['First', 'Floor Plans'],
        ['Second', 'Floor Plans']
      ];

      const displayGroup = document.getElementById('groupName');
      const matchingGroup = groups.find(group => clickedSystem.textContent.includes(group[0]));
      displayGroup.textContent = matchingGroup ? ` - ${matchingGroup[1]}` : '';

    });
  });

  const resetChosen = document.querySelector('.reset');
  resetChosen.addEventListener('click', () => {
    systems.forEach(system => system.classList.remove('active'));
    prevSystem = null;
  });
});

function SetPage(url) {
  const myframe = document.querySelector('#myframe');
  myframe.setAttribute('src', url);
}

function clearDisplay() {
  let text = ' ';
  let systemDisplay = document.getElementById('systemName');
  systemDisplay.textContent = text;
  let groupDisplay = document.getElementById('groupName');
  groupDisplay.textContent = text;
}

//Function for displaying time and date

function displayDateTime() {
  let now = new Date();
  let options = { hour12: true, hour: 'numeric', minute: 'numeric', year: 'numeric', month: 'long', day: 'numeric' };
  let dateTimeString = now.toLocaleTimeString('en-US', options);
  let text = `${dateTimeString}`;
  document.getElementById('dateTime').textContent = text;

  setTimeout(displayDateTime, 7000);
}

window.onload = function () {
  displayDateTime();
};

//Function to toggle arrow next to menu options

function toggleArrow(item) {
  const subMenu = item.querySelector('.sub-menu');
  const arrow = item.querySelector('.arrow');

  subMenu.classList.toggle('opened');

  const menuIncludes = subMenu.classList.contains('active');
  if (!menuIncludes) {
    arrow.classList.remove('arrow-down');
  } else if (menuIncludes) {
    arrow.classList.add('arrow-down');
  }

  document.addEventListener('click', function (event) {
    const isClickInside = item.contains(event.target);
    if (!isClickInside) {
      subMenu.classList.remove('active');
      arrow.classList.remove('arrow-down');
    } else if (isClickInside) {
      subMenu.classList.add('active');
      arrow.classList.add('arrow-down');
    }
  });
}
