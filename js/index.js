// 头部搜索引擎

const inp = document.querySelector('.search')
// console.log(search)

const search1 = document.querySelector('.search1')
const search2 = document.querySelector('.search2')
// console.log(search1, search2)

const cart = document.querySelector('.cart')
const user = document.querySelector('.user')
const name = document.querySelector('.name')
// console.log(name)
// console.log(cart, user)

const nickname = getCookie('nickname')

if (nickname) {
  user.classList.remove('active')
  name.classList.add('active')
} else {
  name.classList.remove('active')
  user.classList.add('active')
}

const inputBox = document.querySelector('.inputBox')
// console.log(inputBox)
cart.onclick = function(){
    window.location.href = './cart.html'
}

name.onclick = function(){
    window.location.href = './cart.html'
}

user.onclick = function(){
    window.location.href = './login.html'
}



inp.addEventListener('click', function(){
    search1.classList.add('active')
    if(this.value.trim()){
        search2.classList.add('active')
    }
})

// inputBox.addEventListener('mouseout', function(){
//     search1.classList.remove('active')
//     search2.classList.remove('active')
// })

inp.addEventListener('mouseout', function(){
    search1.classList.remove('active')
    // search2.classList.remove('active')
})

inp.addEventListener('input',function(){
    search1.classList.remove('active')

    const value = this.value.trim()
    // console.log(typeof(value))
    if(!value){
        search2.classList.remove('active')
        return
    } 

    const script = document.createElement('script')
    // 原网站的地址请求回来加自己的渲染函数没反应 改用淘宝海尔的搜索引擎数据
    // const url = `https://www.haier.com/igs/front/suggest/term.jhtml?code=3e6bff6304c547dba650d9941aa472c0&searchWord=${value}&siteId=8`
    const url =`https://suggest.taobao.com/sug?code=utf-8&q=${value}&_ksTS=1607484391222_3277&callback=bindHtml&area=b2c&code=utf-8&k=1&src=tmall_pc`

    script.src = url

    document.body.appendChild(script)

    script.remove()
 
})

function bindHtml(res){
    // console.log(res.result)
    // console.log(res.result[0][0])
    // console.log(res[1])

    if(!res.result){
        search2.classList.remove('active')
        return
    }

    let str = ''
    for(let i = 0; i < res.result.length; i++){
        str += `
            <li class="options">${res.result[i][0]}</li>
        `
    }

    search2.innerHTML = str

    search2.classList.add('active')
}

search2.addEventListener('click', function(e){
    e = e || window.event
    var target = e.target || e.srcElement

    if(target.nodeName === 'LI'){
        console.log(target)
        window.location.href = './list.html'
    }
})



// 心选精品选项卡
const opts1 = document.querySelectorAll('.spec>ul>li')
const tabs1 = document.querySelectorAll('.spec>ol>li')

// console.log(tabs, opts)
 for(let i = 0; i < tabs1.length; i++){
    opts1[i].onclick = function(){
        for(let j = 0; j < tabs1.length; j++){
            opts1[j].classList.remove('active')
            tabs1[j].classList.remove('active')
        }
        opts1[i].classList.add('active')
        tabs1[i].classList.add('active')
    }
}


// 人气排行选项卡
const opts2 = document.querySelectorAll('.rank>ul>li')
const tabs2 = document.querySelectorAll('.rank>ol>li')

// console.log(tabs, opts)
 for(let i = 0; i < tabs2.length; i++){
    opts2[i].onclick = function(){
        for(let j = 0; j < tabs2.length; j++){
            opts2[j].classList.remove('active')
            tabs2[j].classList.remove('active')
        }
        opts2[i].classList.add('active')
        tabs2[i].classList.add('active')
    }
}


// 轮播图2

var mySwiper = new Swiper ('.swiper-container', {
    
    autoplay: true,
    loop: true, 
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
})

// mySwiper.el.onmouseover=function(){
//     mySwiper.navigation.$nextEl.removeClass('hide');
//     mySwiper.navigation.$prevEl.removeClass('hide');
// }
// mySwiper.el.onmouseout=function(){
//     mySwiper.navigation.$nextEl.addClass('hide');
//     mySwiper.navigation.$prevEl.addClass('hide');
// }



