const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // will kick off asynchronous IO operation; won't have access to data right away
    // fetch data and THEN dump response
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})