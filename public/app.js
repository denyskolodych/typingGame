
let level = 1
let max_time = 120
let point = 0
let interval
let sproby = 4
score = document.getElementById('points')

  
function get_words(level){
   fetch(`http://localhost:3000/words/${level}`).then(response => response.json()).then(data => {
      text = document.getElementById('text1')
      console.log(data[0])
      text.textContent = data.join(' ')
       if (level > 3){
      max_time -= 5
   }
      start1 = Date.now()
   })

}
 function start_timer(){
   let max1_time = max_time
   clock = document.getElementById('clock')
   clock.textContent = "Часу залишилось: " + max1_time-- + " секунд"
   
 
      clearInterval(interval)
      interval = setInterval(()=>{
         
         clock.textContent = "Часу залишилось: " + max1_time-- + " секунд"
         if (max1_time < 0){
   clearInterval(interval)
   clock.textContent = 'Час вийшов'
   clock.classList.add('not_good')
}
      },1000)
   }
get_words(level)
start_timer()
let textarea = document.getElementById('text')
textarea.addEventListener('keydown', function(event) {
   if (event.key === 'Enter'){
      let res1 = document.getElementById("res");
      end = Date.now();
      time = (end - start1) / 1000;
      if (time > max_time){
          console.log(time)
          res1.classList.add('not_good')
          res1.textContent = "Час вийшов"
      }
      else{
      fetch('http://localhost:3000/isCorrect/',{
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ message: textarea.value
         })}
      ).then(response => response.text()).then(data => {
        
         
        if (data === 'Good Work'){
         res1.classList.add('good')
         point ++;
         score.textContent = "Score: " + point
         clearInterval(interval)
         level ++
      
         setTimeout(() => {
            textarea.value = ''
            res1.textContent = ''
            res1.classList.remove('good')
            
            get_words(level)
            start_timer()

            
         },3000)
        }
        else {
         res1.classList.add('not_good')
         sproby--;
         if(sproby === 0){
         score.textContent = "Ви програли з рахунком: " + point
         res1.textContent = data
        clearInterval(interval)
         }
         else{
             setTimeout(() => {
            textarea.value = ''
            res1.textContent = ''
            res1.classList.remove('not_good')
            
            get_words(level)
            start_timer()

            
         },3000)
         }

        }
        res1.textContent = data
        clearInterval(interval)
      
      })
   }
}

})
