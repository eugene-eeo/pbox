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
                while (lock.length < 50) {
                    var r = sjcl.random.randomWords(10)[0];
                    lock += Base64.encode(r);
                }
                lock = lock.substr(0, 50);
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
        encrypted.value = Base64.encode(sjcl.encrypt(lock, toEncrypt.value));
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
        var data;
        try {
            data = sjcl.decrypt(lock, Base64.decode(encrypted.value));
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
            setTimeout(function() {
                document.getElementById("lockart").dataset.jdenticonValue = h;
                jdenticon.update("#lockart");
            }, 0);
        });
    }

    onHashChange();
    window.addEventListener('hashchange', onHashChange);
})();
