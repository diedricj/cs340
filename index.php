<?php 
    $pagetitle="Replace this page title";
    include 'header.html'; 
?>

<!-- Opening article tag is already in the header.html file. -->
<main>
         <aside id="cover" class="lightbrown-bg lightblue alignright fifty boxshadow">
           <figure style="text-align: center" class="alignright fifty">             
              <img style="max-height: 200px; width:auto" src="beginner-wheel.jpg" class="shape"
                   alt="<?php echo $author; ?> self portrait" 
                   title="&copy; <?php echo $author; ?> 2017" 
               />
              <figcaption style="font-size: .75em">Beginning Thrower</figcaption>
              </figure>
              <p class="lightblue">  This site gives beginner wheel throwers the information that they need to start making pottery.  Head to the gallery to see some pieces that I made as an example of how you can put your creativity to use. Give the Video tab a look to see some instructional videos that might inspire you to head over to the clay tab where you can learn about the materials you're gonna use!</p>
          </aside>
          <h1>
            About
          </h1>
         <h2> Contact </h2>
         <address>
          <p><a href="<?php echo $sitepath; ?>"><?php echo $author; ?></a></p>
          <p><i class="material-icons">pin_drop</i>1003 Kelly Engineering Center</p>
          <p><i class="material-icons">location_city</i>Oregon State University</p>
          <p><i class="material-icons">person_pin</i>Corvallis, OR 97331</p>
          <p>
            <i class="material-icons">email</i>
            <a href="#contact">Contact me using the form below. &darr;</a>
          </p>
          </address>
</article>
</main>

<?php include 'footer.html'; ?>