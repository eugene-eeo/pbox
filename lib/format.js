function encrypt(key, plaintext) {
    var t = sjcl.encrypt(key, plaintext, {
        adata: [],
        cipher: 'aes',
        iter: 1000,
        mode: 'ccm',
        ts: 64,
        ks: 128,
    }, {});
    console.log(t);
    var o = JSON.parse(t);
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
    var ct = JSON.stringify({
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
    });
    console.log(ct);
    return sjcl.decrypt(key, ct);
}
