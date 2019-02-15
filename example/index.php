<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Date Countdown</title>
    <link rel="stylesheet" href="../example/dist/css/style.min.css">
</head>
<body>    
    <div class="container">
        <?php include 'pre-code.php'; ?>
        
        <section class="main-section">            
            <div class="row">
                <div class="col-md-8">
                    <div class="content">
                        <h2>Example</h2>
                        <p><pre><?= htmlentities($html_demo, ENT_COMPAT, 'UTF-8')?></pre></p>
                    </div>
                    <div class="example-code">
                        <?= $html_demo ?>
                    </div>                                   
                </div>
            </div>
        </section>
    </div>

    <script src="../dist/date-counter.min.js"></script>
    <script src="dist/js/script.js"></script>
</body>
</html>