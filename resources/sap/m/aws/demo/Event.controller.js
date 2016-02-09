sap.ui.define(['sap/m/MessageToast','sap/ui/core/mvc/Controller'],
	function(MessageToast, Controller) {
	"use strict";

	// Anything on load can be set here. 
	var mobileAnalyticsClient 

	var PageController = Controller.extend("sap.m.aws.demo.Event", {


		onPress: function (evt) {
			// MessageToast.show(evt.getSource().getId() + " Pressed");
			// console.log(this.getView().byId());
			if (evt.getSource().getId()=='__xmlview0--refresh'){
				MessageToast.show('Refreshing the app');
				location.reload();
			}
			if (evt.getSource().getId()=='__xmlview0--anonymous'){

				// Initialize AWS code without user identity 
				AWS.config.region = 'us-east-1';  //Make sure region is 'us-east-1'
				AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				    IdentityPoolId: 'us-east-1:234g6h98-45hm-0912-0vbg-09984v985jan' //Amazon Cognito Identity Pool ID
				});
				
				var options = {
					appId: '1c123ac7fc8147cdb13a3b60d9838c83', //Amazon Mobile Analytics App ID
					// appTitle : "Fiori_Test_App2",              //Optional e.g. 'Example App'
					appVersionName: "v1.0", //Optional e.g. '1.4.1'
					appVersionCode: "23", //Optional e.g. '42'
					appPackageName: "com.santanu.test", //Optional e.g. 'com.amazon.example'
					platform: "iPhoneOS",       //Required. Valid values: 'Android', 'iPhoneOS', 'WindowsPhone', 'Blackberry', 'Windows', 'MacOS', 'Linux'
					platformVersion : "6", //Optional e.g. '4.4'
					model : 'iPhone 6S', //Optional
					make : "Apple", //Optional
					sessionLength: 150000, // Optional, timeout of session is set at 2.5 minutes
					logger: console
				};

				mobileAnalyticsClient = new AMA.Manager(options);
				console.log('Analytics initialized with without user ID');
				mobileAnalyticsClient.submitEvents();

			}
			if (evt.getSource().getId()=='__xmlview0--user_id'){
				
				var cognitoidentity = new AWS.CognitoIdentity({
					accessKeyId: "AMIJHNBGRWQ2SZ0H0S5W",
					secretAccessKey: "ijG+HyunGHqwpmn1767okkHop09GHGH1vm098",
					region: 'us-east-1',
					apiVersion: '2014-06-30'
				});

				var params = {
					IdentityPoolId: 'us-east-1:234g6h98-45hm-0912-0vbg-09984v985jan', /* required */
					Logins: {},
					TokenDuration: 1500
				};

				params.Logins['Custom.Directory'] = 'dey.santanu@gmail.com';
				//params.IdentityPoolId = 'us-east-1:8db002de-6b78-4d66-aca8-3a949d3f8c46';

				cognitoidentity.getOpenIdTokenForDeveloperIdentity(params, function(err, data) {
					if (err) console.log(err, err.stack); // an error occurred
					else {
						console.log("IdentityId & Token", data.IdentityId, data.Token); // successful response
						
						// AWS.config.update({region:'us-east-1'});
						AWS.config.region = 'us-east-1';  //Make sure region is 'us-east-1'
						AWS.config.credentials = new AWS.CognitoIdentityCredentials({
						    IdentityPoolId: 'us-east-1:245e0e35-53ed-4805-9ce6-71901a297dec' //Amazon Cognito Identity Pool ID
						});
						// AWS.config.update({region:'us-east-1', accessKeyId: "AKIAJYUE7YL6RG6YNLLQ",
						//	secretAccessKey: "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"});
						var options = {
							appId: '3c123ac7fc8147cdb13a3b60d9838c82', //Amazon Mobile Analytics App ID
							// appTitle : "Fiori_Test_App2",              //Optional e.g. 'Example App'
							appVersionName: "v1.0", //Optional e.g. '1.4.1'
							appVersionCode: "23", //Optional e.g. '42'
							appPackageName: "com.santanu.test", //Optional e.g. 'com.amazon.example'
							platform: "Android",       //Required. Valid values: 'Android', 'iPhoneOS', 'WindowsPhone', 'Blackberry', 'Windows', 'MacOS', 'Linux'
							platformVersion : "6", //Optional e.g. '4.4'
							model : 'Galaxy S6', //Optional
							make : "Samsung", //Optional
							sessionLength: 150000, // Optional, timeout of session is set at 2.5 minutes
							logger: console
						};
					
						mobileAnalyticsClient = new AMA.Manager(options);
						console.log('Analytics initialized with user ID'+data.IdentityId);

					}
					

				})

			} 

			if (evt.getSource().getId()=='__xmlview0--tx_success'){

				mobileAnalyticsClient.recordEvent('FioriAppEvent', {
					'AppName': 'Notification',
					'Transaction': 'Success',
		            'Location': 'Plant3',
		            'Devices': 'Android',
		            'Model': 'Samsung'
		            /* ... */
	        	}, {
		            'USD_Value': 2,
		            'Transaction_Time': 25
		            /* ... */
	        	});
	        	mobileAnalyticsClient.submitEvents();

			}

			if (evt.getSource().getId()=='__xmlview0--tx_error'){

				mobileAnalyticsClient.recordEvent('FioriAppEvent', {
		            'AppName': 'Notification',
		            'Transaction': 'Fail',
		            'Location': 'Plant1',
		            'Devices': 'iPhone',
		            'Model': 'Apple'
		            /* ... */
	        	}, {
		            'USD_Value': 5,
		            'Transaction_Time': 40
		            /* ... */
	        	});
	        	mobileAnalyticsClient.submitEvents();

			}

			if (evt.getSource().getId()=='__xmlview0--device_info'){

				mobileAnalyticsClient.recordEvent('FioriAppEvent', {
					'AppName': 'Payroll',
		            'Transaction': 'View',
		            'Location': 'Plant2',
		            'Devices': 'iPhone',
		            'Model': 'Apple'
		            /* ... */
	        	}, {
		            'USD_Value': 0,
		            'Transaction_Time': 9
		            /* ... */
	        	});
	        	mobileAnalyticsClient.submitEvents();

			}

			if (evt.getSource().getId()=='__xmlview0--device_location'){

				mobileAnalyticsClient.recordEvent('FioriAppEvent', {
					'AppName': 'Payroll',
		            'Transaction': 'View',
		            'Location': 'Plant4',
		            'Devices': 'Android',
		            'Model': 'Samsung'
		            /* ... */
	        	}, {
		            'USD_Value': 0,
		            'Transaction_Time': 10
		            /* ... */
	        	});
	        	mobileAnalyticsClient.submitEvents();

			}

			if (evt.getSource().getId()=='__xmlview0--end_session'){

	        	mobileAnalyticsClient.stopSession();
	        	mobileAnalyticsClient.submitEvents();
	        	location.reload();

			}




		}

	});

	return PageController;

});