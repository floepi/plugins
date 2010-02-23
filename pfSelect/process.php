<?php
	switch ($HTTP_POST_VARS['id']) {
		case 1:
			echo "<img src='img/1.jpg'>
					<h3>Data for id:1</h3>
					<ol>
					   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
					   <li>Aliquam tincidunt mauris eu risus.</li>
					   <li>Vestibulum auctor dapibus neque.</li>
					</ol>";
		break;
		case 2:
			echo "<img src='img/2.jpg'><h3>Data for id:2</h3> <ul>
   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
   <li>Aliquam tincidunt mauris eu risus.</li>
   <li>Vestibulum auctor dapibus neque.</li>
</ul> ";
		break;
		case 3:
			echo "<img src='img/3.jpg'><h3>Data for id:3</h3> <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p> ";
		break;
		default:
			echo "No id was found and therefore no data";
	}
?>