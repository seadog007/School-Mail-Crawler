<?php
echo(shell_exec("nodejs index.js " . escapeshellarg($_GET["domain"]) . ' ' . escapeshellarg($_GET["pages"]) . "| sort | uniq"))
?>
