function binEncode(data) {
	//array holds the initial set of un-padded binary results
	var binArray = []

	//the string to hold the padded results
	var datEncode = "";

	//encode each character in data to it's binary equiv and push it into an array
	for (i=0; i < data.length; i++) { 
		binArray.push(data[i].charCodeAt(0).toString(2)); 
	} 
	//loop through binArray to pad each binary entry. 
	for (j=0; j < binArray.length; j++){ 
	//pad the binary result with zeros to the left to ensure proper 8 bit binary 
		var pad = padding_left(binArray[j], '0', 8); 
		//append each result into a string 
		// datEncode += pad + ' '; 
		datEncode += pad;
	} 
			//function to check if each set is encoded to 8 bits, padd the left with zeros if not. 
	function padding_left(s, c, n) { 
		if (! s || ! c || s.length >= n) {
			return s;
		}
		var max = (n - s.length)/c.length;
		for (var i = 0; i < max; i++) { s = c + s; } 
		return s; 
	}
	//print array of unpadded results in console console.log(binArray); 
	//string of padded results in console 
	// console.log(datEncode);
	return datEncode; 
}

function hashFun(argument, bits) {
	var hash = CryptoJS.SHA1(argument);

	hash = hash.toString(CryptoJS.enc.Base64);
	hash = binEncode(hash);

	// console.log(hash.length, hash);
	hash = hash.substring(hash.length-bits, hash.length);
	return hash;
}


function collision (bits) {
	var totalAvg = 0;
	for (var i = 0; i < 100; i++) {

		var tryObj = {'numTries':1};

		while(1){
			var val = Math.random().toString(36).substring(7);
			// console.log(val);
			var temp = hashFun(val, bits);
			tryObj['numTries']++;
			if(temp in tryObj){
				console.log("Number of Attempts: ", tryObj['numTries'], "Hash: ", temp);
				break;
			}else{
				// console.log('adding: ', temp);
				tryObj[temp] = val;
			}
			// console.log(tryObj);
		}
		totalAvg += tryObj['numTries'];
	};
	console.log("Average Attempts: ", totalAvg/100);
	console.log("Should be: ", Math.pow(2, bits/2));
}


function preImage(bits) {
	var valS = Math.random().toString(36).substring(7);
	var tempS = hashFun(val, bits);
	var totalAvg = 0;

	for (var i = 0; i < 100; i++) {
		var numTries = 0;
		while(1){
			var val = Math.random().toString(36).substring(7);
			var temp = hashFun(val, bits);
			numTries++;
			if(temp == tempS){
				console.log("Number of Attempts: ", numTries, "Values: ", valS, val, "Hash: ", temp, tempS);
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

*/