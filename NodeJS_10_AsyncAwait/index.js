const funcao1 = () => {
    const callback = (resolve, reject) => {
        console.log('teste de sistema 1');
        setTimeout(() => {
            console.log('teste de sistema 2');
            resolve();
        }, 2000);

    }
    return new Promise(callback);
}

const funcao2 = async () => {
    await funcao1();
    console.log('teste de sistema 3');
}

funcao2();