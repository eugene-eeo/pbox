(function(){
    'use strict';

    function getLock(cb) {
        var hash = lockInput.value;
        if (hash.length > 0) {
            cb(hash);
            return;
        }
        getRandomLock(function(lock) {
            lockInput.value = lock;
            cb(lock);
        });
    }

    function getRandomLock(callback) {
        var lock = "";
        var checkReady = setInterval(function() {
            if (sjcl.random.isReady(10)) {
                while (lock.length < 30) {
                    var r = sjcl.random.randomWords(10)[0];
                    lock += Base64.encode(r);
                }
                lock = lock.substr(0, 30);
                callback(lock);
                clearInterval(checkReady);
            }
        }, 10);
    }

    var lockInput    = document.getElementById("lock");
    var toEncrypt    = document.getElementById("to-encrypt");
    var encrypted    = document.getElementById("encrypted");
    var decryptBtn   = document.getElementById("decrypt");
    var copyBtn      = document.getElementById("copy");
    var errorDisplay = document.getElementById("error");

    function setEncrypt() {
        errorDisplay.textContent = "";
        if (lockInput.value === "") return;
        if (toEncrypt.value === "") {
            encrypted.value = "";
            return;
        }
        encrypted.value = encrypt(lockInput.value, toEncrypt.value);
    }

    toEncrypt.onchange = setEncrypt;

    function decryptNow() {
        if (lockInput.value === "") return;
        errorDisplay.textContent = "";
        var data;
        try {
            data = decrypt(lockInput.value, encrypted.value);
        } catch (e) {
            errorDisplay.textContent = ""+e;
            return;
        }
        toEncrypt.value = data;
    };

    encrypted.onchange = decryptNow;
    decryptBtn.onclick = decryptNow;

    copyBtn.onclick = function() {
        if (lock === null) return;
        setEncrypt();
        encrypted.focus();
        encrypted.select();
        document.execCommand('copy');
    };

    function onChange() {
        getLock(function(h) {
            document.getElementById("lockart").innerHTML = jdenticon.toSvg(h, 80);
            setEncrypt();
        });
    };

    onChange();
    lockInput.onchange = onChange;
    toEncrypt.value = "";
    encrypted.value = "";
})();
