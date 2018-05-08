function encrypt(key, plaintext) {
    var o = JSON.parse(sjcl.encrypt(key, plaintext, {
        adata: [],
        cipher: 'aes',
        iter: 1000,
        mode: 'ccm',
        ts: 64,
        ks: 128,
    }, {}));
    return [
        o.ct,
        o.iv,
        o.salt
    ].join(':');
}

function decrypt(key, ciphertext) {
    var chunks = ciphertext.split(':');
    if (chunks.length !== 3) {
        throw new Error("bad data");
    }
    return sjcl.decrypt(key, JSON.stringify({
        adata:  '',
        cipher: 'aes',
        ct:     chunks[0],
        iv:     chunks[1],
        salt:   chunks[2],
        v:      1,
        iter:   1000,
        ks:     128,
        ts:     64,
        mode:   'ccm',
    }));
}
