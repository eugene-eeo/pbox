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
        if (lockInput.value === "") return;
        if (toEncrypt.value === "") {
            encrypted.value = "";
            return;
        }
        var s = JSON.parse(sjcl.encrypt(lockInput.value, toEncrypt.value));
        encrypted.value = s.ct + ":" + s.iv + ":" + s.salt;
    }

    done_typing(toEncrypt, {
        delay: 200,
        start: function() {
            errorDisplay.textContent = "";
        },
        stop:  setEncrypt,
    });

    decryptBtn.onclick = function() {
        if (lockInput.value === "") return;
        errorDisplay.textContent = "";
        var chunks = encrypted.value.split(':');
        if (chunks.length !== 3) {
            errorDisplay.textContent = "bad data";
            return;
        }
        var o = JSON.stringify({
            adata: "",
            cipher: "aes",
            ct: chunks[0],
            iter: 10000,
            iv: chunks[1],
            ks: 128,
            mode: "ccm",
            salt: chunks[2],
            ts: 64,
            v: 1
        });
        var data;
        try {
            data = sjcl.decrypt(lockInput.value, o);
        } catch (e) {
            errorDisplay.textContent = ""+e;
            return;
        }
        toEncrypt.value = data;
    };

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
