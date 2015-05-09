<?php
header('Content-Type:text/plain');
echo(system("node index.js " . escapeshellarg($_POST["domain"]) . ' ' . escapeshellarg($_POST["pages"]) . "| sort | uniq"))
?>
