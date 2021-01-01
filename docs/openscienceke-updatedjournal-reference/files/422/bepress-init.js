/**
	Script: bepress-init.js
	
	Creates the global 'Bepress' namespace and provides some basic information
	and static utility methods.	
	
	Dependancies:
	
		YAHOO.util.Element
		YAHOO.util.Event
	
*/
var Bepress, yuiObj;

// Setup the Bepress namespace if it's not already done.
// If it's already done then this won't overwrite it and any namespaces
// already defined under it.
if ( typeof Bepress === 'undefined' || ! Bepress )
{
(function(){
	Bepress = {
		
		// Bepress environment settings
		env: {
			// Is the YAHOO namespace/package available?
			yahoo: (typeof YAHOO !== 'undefined' && YAHOO ),
			
			// Is the YUI namespace/package available?
			yui: (typeof YUI !== 'undefined' && YUI )
			},
		
		// A namespace for functions and data that are private to the Bepress
		// tools and that don't belong anywhere else.
		_priv: {}
		
		};

	Bepress.toString = function()
	{
		return "[object Bepress]";
	}
	
	/*
		Method: log
		
		Attempts to accept log messages and dispatch them to the most 
		appropriate log handler that exists in the environment.  If none
		exist then this method will attempt to dynamically load the Bepress
		custom console object and send the log messages there.
	
	*/
	Bepress.log = function()
	{
		var 
			args = arguments,
			dynDiv,
			code;
		
		if ( Bepress.env.yahoo || Bepress.env.yui )
		{
			// Sends to one or both
			if ( Bepress.env.yahoo )
			{
				// intentional line break to thwart jspp 'quieting'
				YAHOO
					.log( args[ 0 ], args[ 1 ], args[ 2 ] );
			}
			if ( Bepress.env.yui )
			{
				// intentional line break to thwart jspp 'quieting'
				// TODO: verify that this is the best way here...
				YUI
					.log(  args[ 0 ], args[ 1 ], args[ 2 ] );
			}			
		}
		else if ( typeof console !== 'undefined' )
		{
			// intentional line break to thwart jspp 'quieting'
			console
				.log( args[ 0 ], args[ 1 ], args[ 2 ] );
		}
		else
		{
			// try to load our fake one...
			try
			{
				if ( typeof Bepress._priv.conWaitTC === 'undefined' )
				{
					
					
					Bepress._priv.logBuffer = [ ["Loading Console.js", "debug", "bepress-init.js"] ];
					Bepress._priv.logBuffer.push( [args[ 0 ], args[ 1 ], args[ 2 ]] );


					dynDiv = document.createElement( 'script' );
					dynDiv.setAttribute( 'src', '/assets/scripts/Console.js' );
					dynDiv.setAttribute( 'type', 'text/javascript' );
					dynDiv.setAttribute( 'id', '_fakeconsole_loader' );
					
					document.getElementsByTagName
							( 'head' )[ 0 ].appendChild( dynDiv );
						
					Bepress._priv.conWaitStart = new Date().getTime();
					Bepress._priv.conWaitTC = setTimeout( 'Bepress._priv.logOnLoad()', 200 );
				}
				else
				{
					Bepress._priv.logBuffer.push( [args[ 0 ], args[ 1 ], args[ 2 ]] );
				}
			}
			catch ( inException )
			{
				// alert( "Error: Bepress.log() threw " + inException.message );
				throw inException;
			}
		}
	}
	
	// private function
	Bepress._priv.logOnLoad = function()
	{
		var 
			logRecord,
			i;
		
		if ( typeof console !== "undefined" )
		{
			if ( typeof console.containerCreated === 'function' )
			{
				// The console is the bare bones Console.js one
				if ( ! console.containerCreated() )
				{
					console.createContainer();
				}
			}
			
			clearTimeout( Bepress._priv.conWaitTC );
			for ( i = 0; i < Bepress._priv.logBuffer.length; i++ )
			{
				var logRecord = Bepress._priv.logBuffer[ i ];
				// intentional line break to thwart jspp 'quieting'
				console
					.log( logRecord[ 0 ], logRecord[ 1 ], logRecord[ 2 ] );
			}
		}
		else if ( new Date().getTime() - Bepress._priv.conWaitStart > 10000 )
		{
			clearTimeout( Bepress.conWaitTC );
			Bepress._priv.logBuffer = null;
		}
		else{
			Bepress.log("waiting");
			Bepress.conWaitTC = setTimeout( 'Bepress._priv.logOnLoad()', 200 );
		}		
	}
	
	/**
		Method: namespace
		
		Static method.  Returns the namespace specified and creates it if it 
		doesn't exist
		<pre>
		Bepress.namespace("property.package");
		Bepress.namespace("Bepress.property.package");
		</pre>
		Either of the above would create Bepress.property, then
		Bepress.property.package

		Be careful when naming packages. Reserved words may work in some browsers
		and not others. For instance, the following will fail in Safari:
		<pre>
		Bepress.namespace("really.long.nested.namespace");
		</pre>
		This fails because "long" is a future reserved word in ECMAScript
		
		This method is shamelessly adapted from the YUI toolkit.  It is available
		via http://developer.yahoo.com/yui/license.html
		
		Arguments:
			{String*} arguments 1-n namespaces to create 
		
		Returns:
			{Object}  A reference to the last namespace object created
	*/
	Bepress.namespace = function() 
	{
		var a=arguments, o=null, i, j, d;
		for (i=0; i<a.length; i=i+1) {
			d=(""+a[i]).split(".");
			o=Bepress;
	
			// Bepress is implied, so it is ignored if it is included
			for (j=(d[0] == "Bepress") ? 1 : 0; j<d.length; j=j+1) {
				o[d[j]]=o[d[j]] || {};
				o=o[d[j]];
			}
		}
	
		return o;
	}
	
	Bepress.namespaceExists = function( inNS, logMsg ) 
	{
	//console.log( 'find ns "' + inNS + '" ' + logMsg );
	
		var o=Bepress, i, j, d, exists = false;

		d=("" + inNS).split(".");

		// Bepress is implied, so it is ignored if it is included
		for (j=(d[0] == "Bepress") ? 1 : 0; j<d.length; j=j+1) {
			exists = o[d[j]] ? true : false;
			
			//console.log( d[j] + ' ' + ( exists ? ' exists' : ' does not exist' ) + ' ' + logMsg);
			
			if ( exists )
			{
				o[d[j]]=o[d[j]];
				o=o[d[j]];
			}
			else
			{
				break;
			}
		}
	
		return exists;
	}

	/*
		Method: Bepress.setupDefaultSkin
		
		Does any initial setup necessary to enable the default 'skin' classes
		within the document.
		
	*/
	Bepress.setupDefaultSkin = function()
	{
		var 
			// a YAHOO.util.Element wrapper around the body element
			body, 
			inException;
		
		if ( Bepress.env.yahoo )
		{
			try
			{
				body = new YAHOO.util.Element( 
							document.getElementsByTagName( 'body' )[ 0 ] );
				
				if ( ! body.hasClass( 'yui-skin-sam' ) )
				{
					body.addClass( 'yui-skin-sam' );
				}
			}
			catch ( inException )
			{
				// just log or do nothing
				Bepress.log( "Caught " + inException, 'error', 'Bepress.setupDefaultSkin' );
			}
		}
		else if ( Bepress.env.yui )
		{
			if ( typeof yuiObj === 'undefined' || ! yuiObj )
			{
				yuiObj = YUI();
			}
			
			yuiObj.use( 'node', function( Y ) {
				
					// the YUI widgets need a parent class on the body
					body = Y.get( "body" );
					if ( ! body.hasClass( 'yui-skin-sam' ) )
					{
						Y.log( "Adding class yui-skin-sam to body tag", "debug", "Bepress.setupDefaultSkin" );
						
						body.addClass( "yui-skin-sam" );
					}
				} );
		}
		// single-line to let jspp take the logging-only block out entirely
		else { Bepress.log( "Neither YAHOO nor YUI are available!", 'error', 'Bepress.setupDefaultSkin' ); }

	}
	
	Bepress.objectToString = function ( inObj, inIndent )
	{
		var result = '',
			pad = '',
			indent = ( typeof inIndent !== 'undefined' ? inIndent : 0 ),
			i;
		
		for ( i = 0; i < indent; i++ )
		{
			pad += ' ';
		}
		
		result = pad + '{\n';
		
		for( p in inObj )
		{
			//if ( inObj.hasOwnProperty( p ) )
			//{
				if ( typeof inObj[ p ] === 'object' )
				{
					if ( typeof inObj[ p ].length !== 'undefined'
						&& typeof inObj[ p ].join === 'function' )
					{
						result += pad + ' [ ' + inObj[ p ].join( ', ' ) + ' ]\n' ;
						
					}
					else
					{
						result += Bepress.objectToString( inObj[ p ], ++inIndent );
					}
				}
				else
				{
					result += pad + ' ' + p + ' : ' + inObj[ p ] + '\n';
				}
			//}
		}
		
		result += pad + '}\n';
		
		return result;
	}

	
	Bepress._loader = null;
	var 
		httpProtocolString = 'https:' == document.location.protocol ? 'https:' : 'http:',
		jsPath = httpProtocolString + '//' + document.domain + '/assets/cgi/js/',
		cssPath = httpProtocolString + '//' + document.domain + '/assets/cgi/css/',

		defaultConfigs = {
			// not using combine here because YUILoader fails to fire 
			// ContentReady and Available events when it is enabled
			// see http://yuilibrary.com/projects/yui2/ticket/2529127
			combine: false,
			base: 'https://cdnjs.cloudflare.com/ajax/libs/yui/2.9.0/',
			
			// filter: 'debug',
/*			
			skin: {
				'defaultSkin': 'sam',
				'base': 'assets/skins/',
				'path': 'skin.css',
				'after': [ 'base' ],
				'rollup': 3

			},
*/
			onProgress: function( o )
			{
				YAHOO.log( "Progress: " + YAHOO.lang.dump( o ) );
			},
			onError: function( o )
			{
				YAHOO.log( "Error: " + YAHOO.lang.dump( o ) );
				Bepress._loader.isLoading = false;
			},
			onFailure: function( o )
			{
				YAHOO.log( "Failure: " + YAHOO.lang.dump( o ) );
				Bepress._loader.isLoading = false;
			},
			onTimeout: function( o )
			{
				YAHOO.log( "Timeout: " + YAHOO.lang.dump( o ) );
				Bepress._loader.isLoading = false;
			}
		},
		
		modules = [
		{
			name: 'scriptenabled',
			type: 'css',
			fullpath: httpProtocolString + '//' + document.domain + '/assets/styles/scriptenabled.min.css',
			after: [ 'disciplinescss', 'institutionscss', 'authoreditcss', 'multiselectcss' ]
		},
		{
			name: 'multiselectcss',
			type: 'css',
			fullpath: cssPath + 'multiselect.min.css',
			requires: [ 'treeview' ]
		},
		{
			name: 'multiselect',
			type: 'js',
			fullpath: jsPath + 'multiSelectYUI.pack.js',
			requires: [ 'element', 'dom', 'selector', 'treeview', 'logger', 
				'event', 'multiselectcss' ]
		},
		{
			name: 'disciplines',
			type: 'js',
			fullpath: jsPath + 'disciplineYUI.pack.js',
			requires: [ 'datasource', 'connection', 'treeview', 'multiselect' ]
		},
		{
			name: 'institutionscss',
			type: 'css',
			fullpath: cssPath + 'institutions.min.css',
			requires: [ 'autocomplete' ]
		},
		{
			name: 'institutions',
			type: 'js',
			fullpath: jsPath + 'institutionsYUI.pack.js',
			requires: [ 'element', 'dom', 'selector', 'datasource', 
				'connection', 'autocomplete', 'logger', 'event', 'institutionscss' ]
		},
		{
			name: 'authoreditcss',
			type: 'css',
			fullpath: cssPath + 'authoredit.min.css',
			requires: [ 'institutions' ]
		},
		{
			name: 'authoredit',
			type: 'js',
			fullpath: jsPath + 'authoreditYUI.pack.js',
			requires: [ 'element', 'dom', 'event-delegate', 'selector', 'animation', 'datasource', 
				'logger', 'event', 'authoreditcss', 'institutions' ]
		}
	];
	
	// YUI 2.8.2r1 has a bug in it that causes the loader to stall under certain
	// conditions.  This is a fixed version of the loader's _combine method that
	// I'm going to have to apply to our loader singleton to get around the problem.
	// see THE FOLLOWING LINE IS THE FIX below
	var crapola = function() {

                this._combining = []; 

                var self = this,
                    s=this.sorted,
                    len = s.length,
                    js = this.comboBase,
                    css = this.comboBase,
                    target, 
                    startLen = js.length,
                    i, m, type = this.loadType;

                YAHOO.log('type ' + type);

                for (i=0; i<len; i=i+1) {

                    m = this.moduleInfo[s[i]];

                    if (m && !m.ext && (!type || type === m.type)) {

                        target = this.root + m.path;

                        // if (i < len-1) {
                        target += '&';
                        // }

                        if (m.type == 'js') {
                            js += target;
                        } else {
                            css += target;
                        }

                        // YAHOO.log(target);
                        this._combining.push(s[i]);
                    }
                }

                if (this._combining.length) {

					YAHOO.log('Attempting to combine: ' + this._combining, "info", "loader");

                    var callback=function(o) {
                         YAHOO.log('Combo complete: ' + o.data, "info", "loader");
                        // this._combineComplete = true;

                        var c=this._combining, len=c.length, i, m;
                        for (i=0; i<len; i=i+1) {
                            this.inserted[c[i]] = true;
                        }

                        this.loadNext(o.data);
                    }, 
                    
                    loadScript = function() {
                         YAHOO.log('combining js: ' + js);
                        if (js.length > startLen) {
                        	YAHOO.log( 'Needs Get' );
                            YAHOO.util.Get.script(self._filter(js), {
                                data: self._loading,
                                onSuccess: callback,
                                onFailure: self._onFailure,
                                onTimeout: self._onTimeout,
                                insertBefore: self.insertBefore,
                                charset: self.charset,
                                timeout: self.timeout,
                                scope: self 
                            });
                        }
                        {
                        	YAHOO.log( "no js needs Get" );
                        	// THE FOLLOWING LINE IS THE FIX
                        	this.loadNext(this._loading)
                        }
                    };

                    // load the css first
                    // YAHOO.log('combining css: ' + css);
                    if (css.length > startLen) {
                    	YAHOO.log('combining css: ' + css);
                        YAHOO.util.Get.css(this._filter(css), {
                            data: this._loading,
                            onSuccess: loadScript,
                            onFailure: this._onFailure,
                            onTimeout: this._onTimeout,
                            insertBefore: this.insertBefore,
                            charset: this.charset,
                            timeout: this.timeout,
                            scope: self 
                        });
                    } else {
                        loadScript();
                        YAHOO.log( "loadScript finished" );
                    }

                    return;

                } else {
                    // this._combineComplete = true;
                    this.loadNext(this._loading);
                }
        };
	
	/*
		Function: getLoader
		
		Returns a YUILoader-like object that provides a simple facade in front
		of a singletone YUILoader instance.  This facade provides a single 
		public insert() method that has the same signature as the YUILoader's
		insert method.
		
		Use this facade to safely load dependencies onto the page like so:
		
		Bepress.getLoader().insert( { 
				require: [ 'event' ],
				onTimeout: doTimeoutHandle,
				onSuccess: doSuccessHandle
			} );
		
		// more stuff and then again, later on the page:
		
		Bepress.getLoader().insert( { 
				require: [ 'anim' ],
				onFailure: doFailureHandle,
				onSuccess: doRunAnim
			} );
		
		The YUILoader on its own does not provide reliable handling of multiple
		asynchronous loading operations.
		
		See YUILoader bug: http://yuilibrary.com/projects/yui2/ticket/2529127

        PLEASE NOTE: in some cases (i.e. with SSL turned on) this file and the
        files that actually call Bepress.getLoader are loaded at the same time
        and there is no guarantee which file will finish loading first. If you
        are seeing this you should use Bepress.getCallbackLoader instead:

        YAHOO.util.Event.onDOMReady( function() {
            Bepress.getLogWriter( function() {
                Bepress.getCallbackLoader(function() {
                    Bepress._loader.insert( {
                        require: [ 'disciplines', 'scriptenabled' ],
                        onSuccess: doSuccessHandle
                    } );
                } );
             } );
        } );
	*/
	Bepress.getCallbackLoader = function(cb)
	{
		if ( Bepress._loader === null )
		{
            var
                logger = new YAHOO.widget.LogWriter( 'Bepress.loader' ),
                useConfigs = YAHOO.lang.merge( {}, defaultConfigs ),
                theLoader
                ;
		
			theLoader = new YAHOO.util.YUILoader( useConfigs );
			theLoader._combine = crapola;
			
			for ( i = 0; i < modules.length; i++ )
			{
				theLoader.addModule( modules[ i ] );
			}

			Bepress._loader = {
					/*
						The YUILoader singleton
					*/
					yuiLoader: theLoader,
					
					/*
						Is the YUILoader currently loading?
					*/
					isLoading: false,
					
					/*
						When the YUILoader is currently loading, all calls to
						insert will append the desired configurations onto this
						list to be dealt with in turn.
					*/
					deferredConfigs: [],
					
					/*
						Adds the configs to the list of configs to load.
						Replaces any event handlers for terminating conditions 
						with a wrapper handler that creates a closure around the
						original function so that it may perform certain actions
						and still call the original handler:
							
							sets Bepress._loader.isLoading = false
							calls wrapped function

					*/
					insert: function( inConfigs )
					{
						var
							self = this,
							
							loader = Bepress._loader,
							
							yuiLoader = loader.yuiLoader,
							// the names of the terminal handlers, i.e. those 
							// that represent the end of the YUILoader's asynch
							// loading activity, whether it succeeded or not.
							//
							// these must be wrapped.
							//
							termFunctions = { 
									'onSuccess':true,
									'onTimeout':true,
									'onError':true,
									'onFailure':true
								},
								
							// one of the termFunctions key names, used in loop
							configKey,
							
							// We will use this variable to create a closure 
							// around any termFunctions that came in inConfigs
							// allowing us to wrap it.
							configFunction
							;
						
						// Go through all the termFunctions keys and look for
						// a function passed in via inConfigs.  For each one
						// wrap via closure in a function that sets 
						// Bepress._loader.isLoading = false so that our 
						// periodic timer can process the next set of configs
						// and then executes the wrapped handler function
						
						for ( configKey in inConfigs )
						{
							if ( termFunctions[ configKey ]
									&& inConfigs.hasOwnProperty( configKey )
								)
							{
								// alias the function to a variable so we can
								// create a closure around it
								configFunction = inConfigs[ configKey ];
								
								// wrap that function and perform our managment
								// tasks, which is to note that we're no longer
								// loading...
								inConfigs[ configKey ] = function( o )
								{
									logger.log( "running " + configKey + " of "
											+ YAHOO.lang.dump( inConfigs ) );

									configFunction.call( yuiLoader, o );

									logger.log( "setting loading to false" );
									loader.isLoading = false;
								}
								
							}
						}
						
						// Now push the adjusted configs onto the end of our list
						loader.deferredConfigs.push( inConfigs );
						logger.log( "Recorded config " 
								+ loader.deferredConfigs.length + " " 
								+ YAHOO.lang.dump( inConfigs ) );
						
						// DEBUG-START
						for ( configKey in inConfigs )
						{
							if ( termFunctions[ configKey ]
									&& inConfigs.hasOwnProperty( configKey )
								)
							{
								logger.log( configKey + " is " 
										+ inConfigs[ configKey ] );
							}
						}
						// DEBUG-END
						
						loader.processConfigs();
					},
					
					processTimer: null,
					
					processConfigs: function()
					{
						var
							loader = Bepress._loader,
							configCount = loader.deferredConfigs.length,
							nextConfigs
							;
						
						if ( ! loader.isLoading )
						{
							loader.isLoading = true;

							nextConfigs = loader.deferredConfigs.shift();
							configCount = loader.deferredConfigs.length;
							
							logger.log( "loader not loading. run insert for" 
									+ YAHOO.lang.dump( nextConfigs ) );
							logger.log( "onSuccess = "
									+ nextConfigs[ 'onSuccess' ] );
							
							loader.yuiLoader.insert( nextConfigs );

							if ( configCount === 0 )
							{
								logger.log( "no more configs to process" );
								if ( loader.processTimer !== null )
								{
									YAHOO.log( "canceling timer" );
									loader.processTimer.cancel();
									loader.processTimer = null;
								}
							}
							else
							{
								logger.log( configCount 
										+ " more configs to process, waiting with timer" );
							}

						}
						else if ( configCount > 0 
								&& loader.processTimer === null )
						{
							logger.log( "loader is loading and has " + configCount + " more configs. wait with timer" );
							loader.processTimer = YAHOO.lang.later( 50, null,
									loader.processConfigs, null, true );
						}
						else
						{
							// DEBUG-START
							if ( configCount > 0 )
							{
								if ( new Date().getTime() % 10 === 0 )
								{
									logger.log( "waiting with " + configCount + " " + loader.yuiLoader.loading );
								}
							}
							else
							{
								logger.log( "no more configs. done" );
							}
							// DEBUG-END
							
							if ( configCount === 0 && loader.processTimer !== null )
							{
								logger.log( "no configs left. canceling timer" );
								loader.processTimer.cancel();
								loader.processTimer = null;
							}
						}
					}
				};
		}
        if (cb) {
            cb();
        }
		
		return Bepress._loader;
	};
	
    Bepress.getLoader = function()
    {
        Bepress.getCallbackLoader(function(){});
    };


    Bepress.getLogWriter = function(cb)
    {
        if (!YAHOO.widget.LogWriter) {
            Y.use('yui2-logger', function(Y) {
                cb();
            });
        } else {
            cb();
        }
    };

})(); // end line anon function execution	
} // if ( typeof Bepress === 'undefined' || ! Bepress )
