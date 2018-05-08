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

    function $(q) {
        return document.querySelector(q);
    }

    var lockInput    = $("#lock");
    var toEncrypt    = $("#to-encrypt");
    var encrypted    = $("#encrypted");
    var decryptBtn   = $("#decrypt");
    var copyBtn      = $("#copy");
    var errorDisplay = $("#error");

    function encryptNow() {
        errorDisplay.textContent = "";
        if (lockInput.value === "") return;
        if (toEncrypt.value === "") {
            encrypted.value = "";
            return;
        }
        encrypted.value = encrypt(lockInput.value, toEncrypt.value);
    }

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
    }

    toEncrypt.onchange = encryptNow;
    encrypted.onchange = decryptNow;
    decryptBtn.onclick = decryptNow;

    copyBtn.onclick = function() {
        if (lock === null) return;
        encryptNow();
        encrypted.focus();
        encrypted.select();
        document.execCommand('copy');
    };

    function keyChange() {
        getLock(function(h) {
            document.getElementById("lockart").innerHTML = jdenticon.toSvg(h, 80);
            encryptNow();
        });
    }

    keyChange();
    lockInput.onchange = keyChange;
})();
