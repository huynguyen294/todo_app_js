/* 
yêu cầu ứng dụng:
Dark-light mode
add task
delete task
completed task

*/

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

//sử dụng IIFE để không tạo ra biến toàn cục
const app = (()=>{
    //sử dụng closure để private data
    const tasks = [
        {
            todo: 'Sample task',
            complete: true
        }
    ]
    const switch_btn = $('.switch_btn')
    const carList = $('.car-list')
    const carInput = $('#car-input')
    const bntAdd = $('#add_btn')
    const html = $('html')
    let carForm = $('.car-form')
    let btnHidden = $('#hidden-icon')
    let message = ''

    return {
        add(task){
            if(task !== ''){
                let idx = tasks.push({todo:task, complete:false})-1
                message = `Add task successfully! - ${tasks[idx].todo}`
            }else{
                message = "Erorr, please enter task!!!"
            }
            console.log(tasks)
            this.render()
        },
        delete(idx){
            message = `delete successfully - ${tasks[idx].todo}`
            tasks.splice(idx, 1)
            this.render()
        },
        handleEnter(ev){
            if(ev.keyCode === 13){
                const car = carInput.value
                this.add(car)

                carInput.value = ''
                carInput.focus()
            }
        },
        handleTask(e){
            if(e.target.classList.contains('delete')){
                const itemDelete = e.target
                this.delete(itemDelete.dataset.index)
            }
            if(e.target.classList.contains('complete')){
                const itemComplete = e.target
                this.handleComplete(itemComplete.dataset.index)
            }
        },
        checkUnCompleted(){
            let count_unComplete = 0
            tasks.forEach((task, idx) => {
                if(!task.complete){
                    count_unComplete++
                }
            })
            if(count_unComplete === 0){
                return `
                    <li class="car" style="padding: 10px">
                    You don't have any tasks here!!
                    </li>
                `
            }else{
                return ''
            }
        },
        checkCompleted(){
            let count_complete = 0
            tasks.forEach((task, idx) => {
                if(task.complete){
                    count_complete++
                }
            })
            if(count_complete === 0){
                return `
                    <li class="car" style="padding: 10px">
                    You didn't have completed tasks here!!
                    </li>
                `
            }else{
                return ''
            }
        },
        handleComplete(idx){
            if(!tasks[idx].complete){
                this.completed(idx)
            }else{
                this.unCompleted(idx)
            }
        },
        completed(idx){
            message = `${tasks[idx].todo} completed`
            tasks[idx].complete = true
            this.render()
        },
        unCompleted(idx){
            message = ``
            tasks[idx].complete = false
            this.render()
        },
        render(){
            carList.innerHTML = 
            `<h3 id="message">${message}</h3>
            ${this.checkUnCompleted()}`
            + tasks.map((task, idx)=>{
                if(!task.complete){
                    return `
                        <li class="car">
                            <p class="todo">
                            <i class="complete far fa-thin fa-circle" data-index=${idx}></i><span>${task.todo}</span>
                            </p>
                            <i class="fas fa-times delete" data-index=${idx}>
                            <span class="tooltiptext">click to delete task</span>
                            </i>
                        </li>
                        `
                }
            }).join('')
            +
            `<hr style="background-color: var(--border-color); border: 1px var(--border-color) solid; margin: 20px 0"/>
            <p>Complete</p>
            ${this.checkCompleted()}`
            + tasks.map((task, idx)=>{
                if(task.complete){
                    return `
                        <li class="car ${task.complete?'yes':'no'}">
                            <p class="todo">
                            <i class="complete fa fa-solid fa-check" data-index=${idx}></i><span>${task.todo}</span>
                            </p>
                            <i class="fas fa-times delete" data-index=${idx}>
                            <span class="tooltiptext">click to delete task</span>
                            </i>
                        </li>`
                }
            }).join('')
        },
        init(){
            this.render()

            switch_btn.addEventListener('click', ()=>{
                switch_btn.classList.toggle('off')
                html.classList.toggle('light')
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

            carList.addEventListener('click', (e) => {
                this.handleTask(e)
            })
            
            btnHidden.addEventListener('click', () => {
                carForm.classList.remove('active')
            })
            
            carInput.addEventListener('keyup', (ev) => {
                this.handleEnter(ev)
            })

        }

    }
})()

app.init()