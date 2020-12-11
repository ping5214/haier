const nameInp = document.querySelector('.username')
const pwdInp = document.querySelector('.password')
const form = document.querySelector('form')
const span = document.querySelector('.log span')
const button = document.querySelector('button')
// console.log(button)
console.log(nameInp, pwdInp, form, span)
form.addEventListener('submit', function (e) {
    e = e || window.event
    e.preventDefault()
    // console.log('1111')

    const username = nameInp.value
    const password = pwdInp.value

    // console.log(username, password)

    if (!username || !password) {
      return
    }

    ajax({
      url: './server/login.php',
      method: 'POST',
      data: `username=${username}&password=${password}`,
      success: function (res) {
        res = JSON.parse(res)
        if (res.code === 0) {
          span.style.display = 'block'
        } else if (res.code === 1) {
          setCookie('nickname', res.nickname)
          window.location.href = './index.html'
        }
      }
    })
  })


