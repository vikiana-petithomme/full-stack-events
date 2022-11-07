// Create a new event 
const addNewButton = document.querySelector('.addNew')

addNewButton.addEventListener('click', showForm)

function showForm(){
  let createForm = document.querySelector('.createEvent')

  createForm.classList.toggle('hide')
}

let addedEvents = document.getElementsByClassName('event')

Array.from(addedEvents).forEach(submission => {
  submission.addEventListener('click', ()=>{

    let front = submission.children[0]
    let back = submission.children[1]

    const eleHeight = front.children[0].clientHeight
    const eleWidth = front.children[0].clientWidth
    console.log(`Front Height: ${eleHeight}`)
    console.log(`Front Width: ${eleWidth}`)
    front.classList.toggle('hide')
    
    back.classList.toggle('hide')
    back.style.height = `${eleHeight}px`
    back.syle.width = `${eleWidth}px`
})
})

document.querySelectorAll('.editBtn').forEach(element => {
  element.addEventListener('click', (event)=>{
    console.log(event.target.parentElement.children[1].children[0])
    console.log(event.target.parentElement.children[1].children[5].innerText)
    let newTitle = prompt('Enter new Event Title')
    console.log(newTitle)
    const eventHost = event.target.parentElement.children[1].children[1].innerText
    const eventDate = event.target.parentElement.children[1].children[2].children[0].innerText
    const eventStartTime = event.target.parentElement.children[1].children[2].children[1].innerText.split("-")[0]
    const eventEndTime = event.target.parentElement.children[1].children[2].children[1].innerText.split("-")[1]
    const eventLocation = event.target.parentElement.children[1].children[3].innerText
    const eventDescription = event.target.parentElement.children[1].children[4].innerText
    const eventId = event.target.parentElement.children[1].children[5].innerText
    
    fetch('updateEvent', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'eventName': newTitle, 
        'eventHost': eventHost,
        'eventDate': eventDate,
        'eventStartTime': eventStartTime, 
        'eventEndTime': eventEndTime, 
        'eventLocation': eventLocation, 
        'eventDescription': eventDescription,
        '_id': eventId 
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
      })
  })
});

    
/*class events {
  constructor(eventFlier, eventName, eventHost, eventStartTime, eventEndTime, eventLocation, eventDescription) {
    this.eventFlier = eventFlier
    this.eventName = eventName
    this.eventHost = eventHost
    this.eventStartTime = eventStartTime
    this.eventEndTime = eventEndTime
    this.eventLocation = eventLocation
    this.eventDescription = eventDescription
  }

}
console.log(events) */

// shuffle grid 
/*
let eventsContainer = document.querySelector('events')

function shuffle(){
  for (i = eventsContainer[0].children.length; i >= 0; i--) {
      eventsContainer[0].appendChild(eventsContainer[0].children[Math.random() * i | 0]);
  }
}
*/
/*
Array.from(thumbUp).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('messages', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'thumbUp':thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});*/



/*var thumbUp = document.getElementsByClassName("fa-thumbs-up");

var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});*/
