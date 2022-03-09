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
            todo: 'Sample do not complete task',
            complete: false
        },
        {
            todo: 'Sample completed task',
            complete: true
        },
        {
            todo: 'Sample do not complete task',
            complete: false
        }
    ]
    const switch_btn = $('.switch_btn')
    const carList = $('.car-list')
    const carInput = $('#car-input')
    const bntAdd = $('#add_btn')
    const html = $('html')
    const cAll = $('#c-all')
    const ucAll = $('#uc-all')
    const dAll = $('#d-all')
    const timeBluring = 1500
    let carForm = $('.car-form')
    let btnHidden = $('#hidden-icon')
    let message = ''

    return {
        handleAdd(){
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
        },
        add(task){
            if(task !== ''){
                let idx = tasks.push({todo:task, complete:false})-1
                message = `Add task successfully! - ${tasks[idx].todo}`
            }else{
                message = "Erorr, please enter task!!!"
            }
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
                this.handleComplete(itemComplete.dataset.index, itemComplete)
            }
        },
        handleCompleteAll(){
            tasks.forEach(task => task.complete = true)
            const ListTasks = $$('.car')
            const iconCompletes = $$('.complete')
            // xử lí không chạy khi không có task
            if(ListTasks.length>1 && !ListTasks[0].classList.contains('message')){
                ListTasks.forEach((task, idx) => {
                    if(!task.classList.contains('yes') && !task.classList.contains('message')){
                        iconCompletes[idx].classList.remove('far', 'fa-thin', 'fa-circle')
                        iconCompletes[idx].classList.add('fa', 'fa-solid','fa-check')
                        task.classList.add('yes')
                        task.classList.add('bluring')
                    }
                })
            }
            setTimeout(()=>{
                ListTasks.forEach(task => {
                    if(task.classList.contains('yes')){
                        task.classList.remove('yes')
                        task.classList.remove('bluring')
                    }
                })
                this.render()
            }, timeBluring)
        },
        handleUnCompleteAll(){
            tasks.forEach(task => task.complete = false)
            const ListTasksCompleted = $$('.car.yes')
            // xử lí không chạy khi không có task
            if(ListTasksCompleted.length>0 && !ListTasksCompleted[0].classList.contains('message')){
                ListTasksCompleted.forEach((task) => {
                    if(!task.classList.contains('message')){
                        task.classList.add('bluring')
                    }
                })
            }
            setTimeout(()=>{
                ListTasksCompleted.forEach(task => {
                        task.classList.remove('bluring')
                })
                this.render()
            }, timeBluring)
        },
        handleDeleteAll(){
            message = ``
            tasks.splice(0, tasks.length)
            const ListTasks = $$('.car')
            // xử lí không chạy khi không có task
            if(ListTasks.length>0 && !ListTasks[1].classList.contains('message')){
                ListTasks.forEach((task) => {
                    task.classList.add('bluring')
                })

            }
            setTimeout(()=>{
                ListTasks.forEach(task => {
                    task.classList.remove('bluring')
                })
                this.render()
            }, timeBluring)
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
                    <li class="car message" style="padding: 10px">
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
                    <li class="car message" style="padding: 10px">
                    You didn't have completed tasks here!!
                    </li>
                `
            }else{
                return ''
            }
        },
        handleComplete(idx, itemComplete){
            if(!tasks[idx].complete){
                this.completed(idx, itemComplete)
            }else{
                this.unCompleted(idx)
            }
        },
        completed(idx, itemComplete){   
            message = `${tasks[idx].todo} completed`
            tasks[idx].complete = true
            itemComplete.classList.remove('far', 'fa-thin', 'fa-circle')
            itemComplete.classList.add('fa', 'fa-solid','fa-check')
            itemComplete.parentElement.classList.add('yes')
            itemComplete.parentElement.classList.add('bluring')
            setTimeout(()=>{
                itemComplete.parentElement.classList.remove('bluring')
                this.render()
            }, timeBluring)
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
                            <i class="complete far fa-thin fa-circle" data-index=${idx}></i>
                            <p class="todo">${task.todo}</p>
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
                        <li class="car yes">
                            <i class="complete fa fa-solid fa-check" data-index=${idx}></i>    
                            <p class="todo">
                            ${task.todo}
                            </p>
                            <i class="fas fa-times delete" data-index=${idx}>
                            <span class="tooltiptext">click to delete task</span>
                            </i>
                        </li>`
                }
            }).join('')
        },
        addEvent(){
            switch_btn.addEventListener('click', ()=>{
                switch_btn.classList.toggle('off')
                html.classList.toggle('light')
            })

            bntAdd.addEventListener('click', () => {
                this.handleAdd()
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

            cAll.addEventListener('click', ()=>{
                this.handleCompleteAll()
            })

            ucAll.addEventListener('click', ()=>{
                this.handleUnCompleteAll()
            })

            dAll.addEventListener('click', ()=>{
                this.handleDeleteAll()
            })
        },
        init(){
            this.render()
            this.addEvent()
        }

    }
})()

app.init()