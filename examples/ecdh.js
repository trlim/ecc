var ecc = require('../lib/ecc');
var ECKey = ecc.ECKey;
var ECCurves = ecc.ECCurves;

var curve = ECCurves.secp128r1; // This is just an the OpenSSL int NID_secp128r1

// Regenerate Alice's key from a private key.
var AlicePrivateKey = new Buffer('7ab8dca0b1bea71136250271d60d8446', 'hex');
var AliceKey = new ECKey(curve, AlicePrivateKey);

// If we wanted to generate a new key for alice we would do this.
//var AliceKey = new ECKey(curve);

// Make bob's public key.
var BobPublicKey = new Buffer('04ff8657149b011d8608f7aae3d7fe743f8d380242dd89248a7171fb920261c645', 'hex');
var BobKey = new ECKey(curve, BobPublicKey, true); // The third parameter tells ECKey to make a Public only ECKey.
if (BobKey.HasPrivateKey) throw ('BobKey should not have a private key');


// Compute the shared secret.
var secret = AliceKey.deriveSharedSecret(BobKey);
console.log(secret.toString('hex'));
