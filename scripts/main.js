(function() {
  const userName = (document.getElementById(
    'userName'
  ).innerHTML = window.location.search.substr(
    window.location.search.indexOf('=') + 1
  ));
  getIssues();

  async function getIssues() {
    const url = 'https://api.github.com/search/issues?q=author:' + userName;
    const response = await fetch(url, {
      method: 'GET',
    });
    const result = await response.json();
    document.getElementById('userAvatar').src = result.items[0].user.avatar_url;
  }
})();

const themeSwitcher = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem('theme');
const colorPickerBox = document.getElementById('color-picker');
const paletteBtn = document.getElementById('btn-palette');
var span = document.getElementById('close');
const karmaBtn = document.getElementById('karma-pink');
const earthlyBtn = document.getElementById('earthly-hues');
const huggingBtn = document.getElementById('hugging-trees');
const winterBtn = document.getElementById('winter-blues');
const autumnBtn = document.getElementById('autumn-purples');
var $animation_elements = $('.animation-element');
var $window = $(window);

function openGithub() {
  window.location = 'https://github.com/' + userName.innerHTML;
  console.log(userName.innerHTML);
}

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    themeSwitcher.checked = true;
  }
}

function switchLightDarkTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

function openPicker() {
  // document.documentElement.setAttribute('data-theme', 'yellow');
  // localStorage.setItem('theme', 'yellow');
  colorPickerBox.style.display = 'block';
}

function changeTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function closeBox() {
  colorPickerBox.style.display = 'none';
}

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = window_top_position + window_height + 15;

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = element_top_position + element_height;

    //check to see if this current container is within viewport
    if (
      element_bottom_position >= window_top_position &&
      element_top_position <= window_bottom_position
    ) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

themeSwitcher.addEventListener('change', switchLightDarkTheme, false);
paletteBtn.addEventListener('click', openPicker);
span.addEventListener('click', closeBox);
earthlyBtn.addEventListener('click', function() {
  changeTheme('earthly');
});
karmaBtn.addEventListener('click', function() {
  changeTheme('karma');
});
huggingBtn.addEventListener('click', function() {
  changeTheme('hugging');
});
winterBtn.addEventListener('click', function() {
  changeTheme('winter');
});
autumnBtn.addEventListener('click', function() {
  changeTheme('autumn');
});

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');
