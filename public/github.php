<?php

/**
 * Config file (github-autodeploy.php) should be up one level, and contain the following:
 *
 * return array('branchName' => '', 'secret' => '');
 * optionally, you can add they key/vals repoDir & logDir
 *
 * Where 'branchName' is the branch you want deployed (e.g., master) and 'secret' is the
 * secret key set for the webhook in github.
 */

$configFile = realpath(__DIR__ . '/../github-autodeploy.php');

if ($configFile === false) {
	throw new \Exception('Config file not found.');
}

$config     = require $configFile;
$repoDir    = realpath(isset($config['repoDir']) ? $config['repoDir'] : (__DIR__ . '/../')) . '/';
$logDir     = realpath(isset($config['logDir']) ? $config['logDir'] : (__DIR__ . '/../')) . '/';
$payload    = @file_get_contents("php://input");
$headers    = getallheaders();
$event      = isset($headers['X-GitHub-Event']) ? $headers['X-GitHub-Event'] : null;
$sign       = isset($headers['X-Hub-Signature']) ? $headers['X-Hub-Signature'] : null;
$status     = 'NOSTART';

if (!$payload) {
	gitlog('No payload');
}

if ($event != 'push') {
	gitlog('Not a push');
}

if ($sign == null) {
	gitlog('No signature');
}

// provided signature will be something like sha1=9d2892ffabfe20da4f1cb23fa29220cbe278131c
$signStuff = explode('=', $sign);
// check signature
$confirm = hash_hmac($signStuff[0], $payload, $config['secret']);

// does the github has match our secret key hash?
if ($confirm != $signStuff[1]) {
	gitLog('Signature did not match');
}

if (file_exists($repoDir)) {
	// 2>&1 ensures we capture any error output
	$op = shell_exec(
		"cd $repoDir && git reset --hard origin/" . $config['branchName'] .
		' && git pull origin ' . $config['branchName'] . ' 2>&1'
	);
	gitLog("Shell outout: \n\n$op\n\n");
}
else {
	gitlog('Could not find local repo dir');
}

/**
 * Writes log file
 *
 * @param $msg
 */
function gitLog($msg) {
	global $logDir;
	$msg .= (' ' . mktime() . "\n");
	file_put_contents($logDir . 'git-webhook.log', $msg);
	exit;
}

/**
 * Writes request info
 */
function reqLog() {
	global $logDir;
	$contents = '';
	$contents .= "SERVER\n";
	$contents .= print_r($_SERVER, true);
	$contents .= "\n\n";

	$contents .= "HEADERS\n";
	$contents .= print_r(getallheaders(), true);
	$contents .= "\n\n";

	$contents .= "INPUT\n";
	$contents .= print_r(@file_get_contents("php://input"), true);

	file_put_contents($logDir . 'req.txt', $contents);
}