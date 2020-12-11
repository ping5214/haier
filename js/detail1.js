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



$(function(){

    let info = null

    const id = getCookie('goods_id')
    
    console.log(typeof(id))

    getGoodsInfo()
    async function getGoodsInfo(){

        const goodsInfo = await $.get('./server/getGoodsInfo.php', {goods_id: id}, null, 'json')
    
        console.log(goodsInfo)

        bindHtml(goodsInfo.info)

        info = goodsInfo.info
    
    }

    function bindHtml(info){
        
        $('.box').html(`
            <div class="show">
                <img src="${info.goods_big_logo}" alt="">
                <div class="mask"></div>
            </div>
            <div class="list">
                <p class="active">
                    <img src="${info.goods_small_logo}" alt="">
                </p>
            </div>
            <div class="enlarge" style="background: url(${info.goods_big_logo}) no-repeat ; background-size: 800px,800px; "></div>

        `)

        $('.price').html(`
            <h2>${info.goods_name}</h2>
                <h4>${info.goods_id}</h4>
                <p>参考价:￥<span>${info.goods_price}</span></p>
            <div class="addCart"><a href="./cart.html">在线购买</div>
        
        `)

    }


    $('.box').on('mousemove', '.show', function(e){
        // console.log(e.offsetX)
        // console.log(e.offsetY)
        // console.log(this)
        $(this).on('mouseover', function(){
            // console.log('dddd')
            $('.mask').css('display', 'block')
            $('.enlarge').css('display', 'block')
        })

        $(this).on('mouseout', function(){
            // console.log('dddd')
            $('.mask').css('display', 'none')
            $('.enlarge').css('display', 'none')
        })

        let m_width = ($(this).width() - 0) * ($('.enlarge').width() - 0) / ($('.enlarge').css('background-size').split('px')[0] - 0)
        let m_height = ($(this).height() - 0) * ($('.enlarge').height() - 0) / ($('.enlarge').css('background-size').split('px')[0] - 0)
        // const a = $('.enlarge').css('background-size')
        // console.log(typeof(a))
        // console.log(parseInt(m_width))
        // console.log($(this).width())
        // console.log($('.enlarge').width())
        // console.log($('.enlarge').css('background-size').split('px')[0])
        // console.log(typeof(m_width))
        // console.log(typeof(m_height))
        // console.log(m_height)

        $('.mask').css({
            width: m_width,
            height: m_height
        })

        let x = e.offsetX - m_width / 2
        let y = e.offsetY - m_height / 2

        if(x <= 0) x = 0
        if(y <= 0) y = 0
        if(x >= $(this).width() - m_width) x = $(this).width() - m_width
        if(y >= $(this).height() - m_height) y = $(this).height() - m_height

        $('.mask').css({
            left: x,
            top: y
        })

        const b_left = ($('.enlarge').css('background-size').split('px')[0] - 0) * x / ($(this).width() - 0)
        const b_top = ($('.enlarge').css('background-size').split('px')[0] - 0) * y / ($(this).height() - 0)
        console.log(b_top)
        $('.enlarge').css({
            backgroundPosition: `${-b_left}px ${-b_top}px`
        })
    })



    $('.price').on('click', '.addCart', function () {
      
      const cart = JSON.parse(window.localStorage.getItem('cart')) || []
  
      const flag = cart.some(item => item.goods_id === id)

      if (flag) {
        
        const cart_goods = cart.filter(item => item.goods_id === id)[0]
        cart_goods.cart_number = cart_goods.cart_number - 0 + 1
      } else {
        info.cart_number = 1
        
        cart.push(info)
      }
  
      window.localStorage.setItem('cart', JSON.stringify(cart))
    })

})




  



