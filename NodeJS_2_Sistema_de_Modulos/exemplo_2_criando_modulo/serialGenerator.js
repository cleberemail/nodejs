var SerialGenerator = () => {
    var max = 10000;
    this.generate = function () {
        return Math.floor(Math.random() * max);
    };
};
export default SerialGenerator;