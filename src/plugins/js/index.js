/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
var winWidth = window.innerWidth;
var oneRem = (winWidth / 360) * 16;
if(oneRem > 24){
    oneRem = 24;
}
$("html").css("fontSize", oneRem);
app.initialize();

function copyToClipAndroid(text){
	if(plus){
	    var Context = plus.android.importClass("android.content.Context");
    if(Context){
    	   var main = plus.android.runtimeMainActivity();
    var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
    plus.android.invoke(clip,"setText",text);
    return plus.android.invoke(clip,"getText") == text;
    }else{
    	return false;
    }
 	
	}else{
		return false;
	}	

}
function copyToClipIOS(text){
	if(plus){
	var UIPasteboard  = plus.ios.importClass("UIPasteboard");
	if(UIPasteboard){
	var generalPasteboard = UIPasteboard.generalPasteboard();
	// 设置/获取文本内容:
	generalPasteboard.setValueforPasteboardType(text, "public.utf8-plain-text");
	var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text"); 
	return value == text;
	}else{
		return false;
	}	
	}else{
		return false;
	}	
	

}
function copyToClip(text){
	return copyToClipAndroid(text) ||copyToClipIOS(text);
}

