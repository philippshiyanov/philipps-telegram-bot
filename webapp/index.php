<html lang="en">
  <head>
    <title>philipps-telegram-bot</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="css/style.css" rel="stylesheet" />
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <script src="telegram.js"></script>
  </head>
  <body>
    <h1 id="title">Store</h1>
    <!-- <button id="testbtn">testbtn</button> -->
    <!-- Магазин -->
    <div id="store">
      <!-- предметы -->
      <?php
        $db = new SQLite3('../services/items.db');
        $res = $db->query('SELECT * FROM items');
        while ($row = $res->fetchArray()) {
          echo "<div id=" . $row['id'] . " class='item'> \n
          <div class='count'><h5></h5></div> \n
          <div style='min-height: 10vh; max-height: 10vh; display: grid;
          justify-content: center;
          align-content: center;'><img src=" . stristr($row['image'], '/assets')  . " alt='item didnt load properly' /> </div>\n
          <div class='item-desc'> \n
            <h4 class='item-name'>" . $row['name'] . " </h4> \n
            <h4 class='item-price'>$ <span>" . $row['price'] . " </span></h4> \n
          </div>\n
          <div id='minus-plus'> \n
            <button id='minus'><h5>-</h5></button> \n
            <button id='plus'><h5>+</h5></button> \n
          </div> \n
          <button id='add'>Add</button> \n
        </div> \n";
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

