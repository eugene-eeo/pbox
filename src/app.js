(function(){
    'use strict';
    var hashRegex = /#(.*)$/;
    function getHash() {
        // Workaround for Firefox which automatically
        // decodes the hash fragment [bug:483304]
        var hash = hashRegex.exec(window.location.href);
        return hash ? hash[1] : '';
    }

    function getLock(cb) {
        var fail = false;
        var hash = getHash();
        if (hash.length > 0) {
            var lock;
            try {
                lock = Base64.decode(hash);
            } catch(e) {
                fail = true;
            }
            if (!fail) {
                cb(lock);
                return;
            }
        }
        getRandomLock(function(lock) {
            window.location.hash = Base64.encode(lock);
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

    var lock = null;
    var toEncrypt    = document.getElementById("to-encrypt");
    var encrypted    = document.getElementById("encrypted");
    var decryptBtn   = document.getElementById("decrypt");
    var copyBtn      = document.getElementById("copy");
    var errorDisplay = document.getElementById("error");

    function setEncrypt() {
        if (lock === null) return;
        if (toEncrypt.value === "") {
            encrypted.value = "";
            return;
        }
        var s = JSON.parse(sjcl.encrypt(lock, toEncrypt.value));
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
        if (lock === null) return;
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
            data = sjcl.decrypt(lock, o);
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

    function onHashChange() {
        toEncrypt.value = "";
        encrypted.value = "";
        getLock(function(h) {
            lock = h;
            document.getElementById("lock").textContent = h;
        });
    }

    onHashChange();
    window.addEventListener('hashchange', onHashChange);
})();
