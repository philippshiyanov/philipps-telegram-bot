<html lang="en">
  <head>
    <title>philipps-telegram-bot</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="css/style.css" rel="stylesheet" />
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <script src="telegram.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>
  </head>
  <body>
    <h1 id="title">Store</h1>
    <!-- <button id="testbtn">testbtn</button> -->
    <!-- Магазин  -->
    <div id="store">
      <!-- предметы -->
      <?php
        $db = new SQLite3('../services/items.db');
        $res = $db->query('SELECT * FROM items');
        $items = array();
        while ($row = $res->fetchArray()) {
          array_push($items,"<div id=" . $row['id'] . " class='item' style = 'display: flex'> \n
          <div class='count'><h5></h5></div> \n
          <div style='min-height: 10vh; max-height: 10vh; display: grid;
          justify-content: center;
          align-content: center;'>
            <img style='display: none; ' class='tap-target itemImage' src=" . stristr($row['image'], '/assets')  . " alt='item didnt load properly' /> 
            <svg class='loading' width='34' height='34' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path style='fill: var(--tg-theme-button-color);' d='M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z'>
            </path></svg>
          </div>\n
          <div class='item-desc'> \n
            <h4 class='item-name'>" . $row['name'] . " </h4> \n
            <h4 class='item-price'>$ <span>" . $row['price'] . " </span></h4> \n
          </div>\n
          <div id='minus-plus'> \n
            <button id='minus'><h5>-</h5></button> \n
            <button id='plus'><h5>+</h5></button> \n
          </div> \n
          <button id='add'>Add</button> 
          \n</div>\n"
          
          );
        }
        foreach ($items as $key=>$item){
          echo $item;
      }
      ?>
    </div>
    <!-- корзина -->
    <div id="cart">
      <div class="cart-item">
        <h3>Amount</h3>
        <h3></h3>
        <h3>Name</h3>

        <h3>Price</h3>
        <h3></h3>
      </div>
    </div>
  </body>
</html>

