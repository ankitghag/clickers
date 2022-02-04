$(document).ready(function () {
  imageWidth=0;
  imageHeight=0;

/* $(".selectImage label").on("click",()=>{
 
  $(".uploadFormleft").css("display","none")
  $(".cancelform").css("display","flex")
  
  
  $(".uploadFormRight").css("display","block")
}) */

$(".cancelform").on("click",()=>{
  $(".cancelform").css("display","none");
  $(".uploadFormleft").css("display","flex")
  $(".uploadFormRight").css("display","none");
  $("#displayImages").empty();
})



  $("#myfile").change((e) => {
    $(".uploadFormleft").css("display","none")
    $(".cancelform").css("display","flex")
    
    
    $(".uploadFormRight").css("display","block");
    console.log("here is the value for :L", e.target.files);
    var url = URL.createObjectURL(e.target.files[0]);

    $(`<div  class="imagetagContainer">
    <div id="imageContainer"><img src='${url}' ></div>
   <div class="imageMetadata"> <div id="relatedtags">
    <p>Tags :</p>   
    <input type="text" name="tags"></input>
     </div></div></div>`).appendTo('#displayImages');

     $(`<div class="Imagecategories">
    <div> <p>Select One Categories :</p></div>
    
     <div class="categorieslabel"><input type="radio" id="animalAndBird" name="categories" value="Animal and Birds" />
     <label class="e-btn" for="animalAndBird">Aniaml and Birds</label>

     <input type="radio" id="Art" name="categories" value="Arts" />
     <label class="e-btn" for="Art">Art</label>

     
     <input type="radio" id="lifestyle" name="categories" value="Lifestyle" />
     <label class="e-btn" for="lifestyle">Lifetyle</label>

     
     <input type="radio" id="BeautyAndFashion" name="categories" value="Beauty and Fashion" />
     <label class="e-btn" for="BeautyAndFashion">Beauty and Fashion</label>

     
     <input type="radio" id="HealthAndFitness" name="categories" value="Health And Fitness" />
     <label class="e-btn" for="HealthAndFitness">Health And Fitness</label>

     
     <input type="radio" id="EducationAndLearning" name="categories" value="Education and Learning" />
     <label class="e-btn" for="EducationAndLearning">Education and Learning</label>

     
     <input type="radio" id="FestivalAndOccassions" name="categories" value="Festival and Occassions" />
     <label class="e-btn" for="FestivalAndOccassions">Festival and Occassions</label>

     
     <input type="radio" id="foodAndDrink" name="categories" value="Food And Drink" />
     <label class="e-btn" for="foodAndDrink">Food And Drink</label>

     
     <input type="radio" id="sportAndLeisure" name="categories" value="Sports and Leisure" />
     <label class="e-btn" for="sportAndLeisure">Sports and Leisure</label>

     
     <input type="radio" id="scienceAndTechnology" name="categories" value="Science and Technology" />
     <label class="e-btn" for="scienceAndTechnology">Science and Technology</label>

     
     <input type="radio" id="VaciationAndHolidays" name="categories" value="Vaccination and Holidays" />
     <label class="e-btn" for="VaciationAndHolidays">Vaccination and Holidays</label>

     
     <input type="radio" id="businessAndCorporate" name="categories" value="Business and Corporate" />
     <label class="e-btn" for="businessAndCorporate">Business and Corporate</label>

     <input type="radio" id="architecture" name="categories" value="Architecture" />
     <label class="e-btn" for="architecture">Architecture</label>

     <input type="radio" id="weddings" name="categories" value="Wedding" />
     <label class="e-btn" for="weddings">Wedding</label>
     
     <input type="radio" id="natureAndLandscape" name="categories" value="Nature and Landscape" />
     <label class="e-btn" for="natureAndLandscape">Nature and Landscape</label>
     </div></div><div class="errormessage"></div>`).appendTo('.imageMetadata');

     

    $('[name=removeImage]').on('click', () => {
      $('#displayImages').empty()
    })

    $("<img/>").attr('src', url)
      .on('load', function () {
        //console.log(jQuery.type(this.width))
       // console.log(`${this.width} x ${this.height} `,jQuery.type(`${this.width}`));
       imageWidth=this.width;
       imageHeight=this.height;
       //console.log(jQuery.type(imageWidth))
       $("<img/>").attr('src')
       console.log(imageHeight)
       console.log(imageWidth)
       console.log(imageWidth*imageHeight)
      });

   $('[name=submitPhoto]').on('click',(e)=>{
    e.preventDefault();
        if(imageWidth*imageHeight<4000000){
          $('.errormessage').html("<p>Images should be Greater then 4mp (mega pixel)</p>")
         /*  $(`<p>Images should be Greater then 4mp (mega pixel)</p>`).appendTo('.errormessage') */
        }
        else{
          $("#formphotoupload").submit();
        }
      })
     /*  $('.uploadFormRight input[type="submit"]').css("display","block") */

      $('input[name="tags"]').tagify({ duplicates: false });
})
   /*  $("#displayImages").on("click",(event)=>{
      if(event.target.checked){
        var slabel= $(event.target).attr("id");
        console.log(slabel)
    }
    }) */

})

