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
                lock = atob(hash);
            } catch(e) {
                fail = true;
            }
            if (!fail) {
                cb(lock);
                return;
            }
        }
        getRandomLock(function(lock) {
            window.location.hash = btoa(lock);
            cb(lock);
        });
    }

    function getRandomLock(callback) {
        var lock = "";
        var checkReady = setInterval(function() {
            if (sjcl.random.isReady(10)) {
                while (lock.length < 50) {
                    var r = sjcl.random.randomWords(10)[0];
                    lock += btoa(r);
                }
                lock = lock.substr(0, 50);
                callback(lock);
                clearInterval(checkReady);
            }
        }, 10);
    }

    function debounce(func, delay) {
        var timeout;
        return function() {
            if (!timeout) func();
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                timeout = null;
                func();
            }, delay);
        };
    }

    var lock = null;
    var toEncrypt  = document.getElementById("to-encrypt");
    var encrypted  = document.getElementById("encrypted");
    var decryptBtn = document.getElementById("decrypt");
    var copyBtn    = document.getElementById("copy");
    var dataCache;

    var setEncrypt = debounce(function() {
        if (lock === null) return;
        var data = toEncrypt.value;
        if (data === dataCache) {
            return;
        }
        encrypted.value = btoa(sjcl.encrypt(lock, data));
        dataCache = data;
    }, 200);

    toEncrypt.addEventListener('keyup', setEncrypt);
    setEncrypt();

    decryptBtn.onclick = function() {
        if (lock === null) return;
        var data;
        try {
            data = sjcl.decrypt(lock, atob(encrypted.value));
        } catch (e) {
            document.getElementById("error").textContent = ""+e;
            return;
        }
        dataCache = data;
        toEncrypt.value = data;
    };

    copyBtn.onclick = function() {
        encrypted.focus();
        encrypted.select();
        document.execCommand('copy');
    };

    function hashChange() {
        getLock(function(h) {
            lock = h;
        });
    }

    hashChange();
    window.addEventListener('hashchange', hashChange);
})();
