const startButton = document.querySelector('#start-button')
const stopButton = document.querySelector('#stop-button')
const textContent = document.querySelector('#text-content')

let hasMicPermission = false

const checkMicPermission = () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      // Permission has been granted
      hasMicPermission = true
      stream.getTracks().forEach(track => track.stop())
    })
    .catch(error => {
      // Permission has not been granted
      hasMicPermission = false
    })
}

const recognition = new webkitSpeechRecognition()
recognition.lang = 'en-US'
recognition.interimResults = false
recognition.maxAlternatives = 1
window.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        checkMicPermission()
      if (hasMicPermission) {
        recognition.start()
      } else {
        // Prompt the user for permission
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            hasMicPermission = true
            recognition.start()
          })
          .catch(error => {
            console.error('Permission denied')
          })
      }
    }
  })
  
  window.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      recognition.stop()
    }
  })
recognition.addEventListener('result', (e) => {
  let last = e.results.length - 1
  let text = e.results[last][0].transcript

  textContent.textContent = text
})