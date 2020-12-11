
$(function(){

    let list = null

    const list_info = {
        cat_one: 'all',
        sort_type: 'ASC',
        sort_method: '综合',
        current: 1,
        pagesize: 12
    }

    getCateOne()
    async function getCateOne(){
        // console.log('11111')
        const cat_one_list = await $.get('./server/getCateOne.php', null, null, 'json')
        // console.log(cat_one_list)
        let str = ''
        cat_one_list.list.forEach(item => {
            str += `
                <li data-type="${ item.cat_one_id}">${ item.cat_one_id}</li>
            `
        })

        $('.listBox>ul').html(str)

    }

    getTotalPage()
    async function getTotalPage() {
        const totalInfo = await $.get('./server/getTotalPage.php', list_info, null, 'json')
    
        $('.pagination').pagination({
            pageCount: totalInfo.total,
            callback (index) {
                list_info.current = index.getCurrent()
                getGoodsList()
            }
        })
    }


    getGoodsList()
    async function getGoodsList() {
      
      const goodsList = await $.get('./server/getGoodsList.php', list_info, null, 'json')
  
      list = goodsList.list
      console.log(goodsList.list)
  
      let str = ''
      goodsList.list.forEach(item => {
        str += `
          <li>
                <img src="${ item.goods_big_logo }" alt="">
                <div>
                    <h3 data-id="${ item.goods_id }">${ item.goods_name }</h3>
                    <h4>${ item.goods_id }</h4>
                    <p>参考价:￥<span>${ item.goods_price }</span></p>
                    <i>1家电商在售</i>
                </div>
          </li>
        `
      })
      $('.list>ul').html(str)
    }


    $('.listBox').on('click', 'li', function () {
        
        //拿到你点击的是哪一个
        const type = $(this).data('type')
    
        // 让当前页回到第一页
        list_info.current = 1
    
        // 4-4. 修改 list_info
        list_info.cat_one = type
        // 从新渲染分类信息和列表数据
        getTotalPage()
        getGoodsList()
    
    })


    $('.sortBox').on('click', 'p', function () {
        
        const method = $(this).attr('data-method')
        const type = $(this).attr('data-type')
    
        $(this).addClass('active').siblings().removeClass('active')
    
        list_info.sort_method = method
        list_info.sort_type = type
    
        getTotalPage()
        getGoodsList()
    
        $(this)
          .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
          .siblings()
          .attr('data-type', 'ASC')
    })


    $('.list ul').on('click', 'h3', function () {
        
        const id = $(this).data('id')
        
        setCookie('goods_id', id)
        
        window.location.href = './detail.html'
    })

















})




