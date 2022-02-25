/* 
yêu cầu ứng dụng:
Một thẻ input để nhập xe muốn thêm
Một button add để khi click vào sẽ render list xe bên dưới
*/

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

//sử dụng IIFE để không tạo ra biến toàn cục
const app = (()=>{
    //sử dụng closure để private data
    const cars = ['Sample Car']
    const carList = $('.car-list')
    let carForm = $('.car-form')
    const carInput = $('#car-input')
    const bntAdd = $('#add_btn')
    let btnHidden = $('#hidden-icon')
    let message = ''

    return {
        add(car){
            if(car !== ''){
                let idx = cars.push(car)-1
                message = `thêm thành công "${cars[idx]}"`
            }else{
                message = "Erorr! Bạn chưa nhập tên xe cần thêm"
            }
            this.render()
        },
        delete(idx){
            if(cars.length < 2){
                message = "Erorr! Chỉ còn một xe không thể xóa"
                this.render()
            }else{
                message = `xóa thành công "${cars[idx]}"`
                cars.splice(idx, 1)
                this.render()
            }
        },
        render(){
            carList.innerHTML = `<h3 id="message">${message}</h3>` + cars.map((car, idx)=>{
                return `<li class="car">
                            <p>${car}</p>
                            <i class="fas fa-times delete" data-index=${idx}><span class="tooltiptext">click to delete a car</span></i>
                        </li>`
            }).join('')
        },
        init(){
            this.render()
            carList.addEventListener('click', (e) => {
                if(e.target.classList.contains('delete')){
                    const itemDelete = e.target
                    this.delete(itemDelete.dataset.index)
                }
            })
            bntAdd.addEventListener('click', () => {
                let active = false
                carForm.classList.forEach(s => {if(s==='active'){active = true}})
                if(active){
                    const car = carInput.value
                    this.add(car)

                    carInput.value = ''
                    carInput.focus()
                }
                carForm.classList.add('active')
                carInput.focus()
            })
            
            btnHidden.addEventListener('click', () => {
                carForm.classList.remove('active')
            })
            
            carInput.addEventListener('keyup', (ev) => {
                if(ev.keyCode === 13){
                    const car = carInput.value
                    this.add(car)

                    carInput.value = ''
                    carInput.focus()
                }
            })
        }

    }
})()

app.init()