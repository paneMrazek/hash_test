function binEncode(hex) {
	var str = "";
	for(var i=0; i< hex.length; i++){
		var temp = "0x" + hex[i];
		temp = parseInt(temp);
		temp = temp.toString(2);
		if(hex[i] < 8){temp = "0" + temp;}
		if(hex[i] < 4){temp = "0" + temp;}
		if(hex[i] < 2){temp = "0" + temp;}
		str += temp;
	}
	return str;
}

function hashFun(argument, bits) {
	// var hash = CryptoJS.SHA1(argument);
	// hash = hash.toString(CryptoJS.enc.Base64);

	var hash = Sha1.hash(argument);
	hash = binEncode(hash);
	hash = hash.substring(hash.length-bits, hash.length);
	return hash;
}

function collision (bits) {
	var totalAvg = 0;
	for (var i = 0; i < 100; i++) {

		var tryObj = {'numTries':1};

		while(1){
			var val = Math.random().toString(36).substring(7);
			var temp = hashFun(val, bits);
			tryObj['numTries']++;
			if(temp in tryObj && val != tryObj[temp]){
				console.log(i, "Attempts: ", tryObj['numTries'], "Hash: ", temp);
				break;
			}else{
				tryObj[temp] = val;
			}
		}
		totalAvg += tryObj['numTries'];
	};
	console.log("Average Attempts: ", totalAvg/100);
	console.log("Should be: ", Math.pow(2, bits/2));
}

function preImage(bits) {
	var valS = Math.random().toString(36).substring(7);
	var tempS = hashFun(valS, bits);
	var totalAvg = 0;

	for (var i = 0; i < 100; i++) {
		var numTries = 0;
		while(1){
			var val = Math.random().toString(36).substring(7);
			var temp = hashFun(val, bits);
			numTries++;
			if(temp === tempS && val.length > 0 && val != valS){
				console.log(temp, val);
				console.log(tempS, valS);
				console.log(i, "Attempts: ", numTries, "Values: ", valS, val, "Hash: ", temp, tempS);
				break;
			}
		}
		totalAvg += numTries;
	};
	console.log("Average Attempts: ", totalAvg/100);
	console.log("Should be: ", Math.pow(2, bits));
}

/* 
base64 to binary function
http://vabate.com/convert-a-base64-encoded-string-to-binary-with-javascript/

CryptoJS - SHA1 hash function
https://code.google.com/p/crypto-js/#SHA-1

CryptoJS for dummies
http://www.davidebarranca.com/2012/10/crypto-js-tutorial-cryptography-for-dummies/

New Sha1 hash algorithm
http://www.movable-type.co.uk/scripts/sha1.html

*/