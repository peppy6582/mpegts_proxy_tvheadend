/*
 * Require libraries
 */
var yargs = require('yargs');
var winston = require('winston');
var http = require("http");
var spawn = require('child_process').spawn;
var avconv = require('avconv');
var sources = require('./libs/sources');
var options = require('./libs/options');

/*
 * Read command line options
 */
var argv = yargs
		.usage('Usage: $0 -p <port> -s <sources> [-a <avconv>] [-q | -v]')
		.alias('p', 'port')
		.alias('a', 'avconv')
		.alias('s', 'sources')
		.alias('q', 'quiet')
		.alias('v', 'verbose')
		.demand(['p', 's'])
		.default('a', 'avconv')
		.describe('p', 'The port the HTTP server should be listening on')
		.describe('a', 'The path to avconv, defaults to just "avconv"')
		.describe('s', 'The path to sources.json, defaults to "data/sources.json"')
		.describe('q', 'Disable all logging to stdout')
		.describe('v', 'Enable verbose logging (shows the output from avconv)')
		.argv;

/*
 * Configure logger
 */
winston.remove(winston.transports.Console);

if (!argv.quiet)
{
	winston.add(winston.transports.Console, {
		timestamp: true,
		colorize: true,
		level: argv.verbose ? 'silly' : 'debug'
	});
}

/**
 * Configure the sources module
 */
sources.setLogger(winston);
var sourceDefinitions = sources.load(argv.sources);

/**
 * The main HTTP server process
 * @type @exp;http@call;createServer
 */
var server = http.createServer(function (request, response) {
	var remoteAddress = request.connection.remoteAddress;
	winston.debug('Got request for %s from %s', request.url, remoteAddress);

	// Find the source definition
	var source = sources.getByUrl(request.url);

	if (source === null)
	{
		winston.error('Unknown source %s', request.url);

		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not Found\n");
		response.end();

		return;
	}

	// Tell the client we're sending MPEG-TS data
	response.writeHead(200, {
		'Content-Type': 'video/mp2t'
	});

	// Define options for the child process
	var avconvOptions = options.getAvconvOptions(source);
	winston.silly("Options passed to avconv: " + avconvOptions);
	
	// Indicates whether avconv should be restarted on failure
	var shouldRestart = true;
	var stream = null;
	
	/**
	 * Spawns an avconv process and pipes its output to the response input
	 * @returns {undefined}
	 */
	var streamingLoop = function() {
		stream = avconv(avconvOptions);
		stream.pipe(response);

		// Output debug information about the input stream
		stream.on('meta', function(meta) {
			winston.debug('Input stream metadata: ', meta);
		});

		// Kill the process on error
		stream.on('error', function() {
			stream.kill();
		});
		
		// Print avconv status messages
		stream.on('message', function(message) {
			winston.silly(message);
		});

		// Respawn on exit
		stream.on('exit', function(code) {
			winston.error('avconv exited with code %d', code);
			
			if (shouldRestart)
			{
				winston.info('%s still connected, restarting avconv ...', remoteAddress);
				streamingLoop();
			}
		});
	};
	
	// Start serving data
	streamingLoop();
	
	// Kill avconv when client closes the connection
	request.on('close', function () {
		winston.info('%s disconnected, stopping avconv', remoteAddress);
		
		shouldRestart = false;
		stream.kill();
	});
});

// Start the server
server.listen(argv.port, '::'); // listen on both IPv4 and IPv6
winston.info('Server listening on port %d', argv.port);
