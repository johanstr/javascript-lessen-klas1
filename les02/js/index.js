var myParagraph = {
    el: document.getElementById('output'),
    color: 'blue',

    printText: function(msg) {
        this.el.innerHTML = msg;
        this.el.style.color = this.color;
    },

    setColor: function(new_color) {
        this.color = new_color;
        this.el.style.color = new_color;
    },

    printAsHeaderWithColor: function(msg, color) {
        this.el.outerHTML = '<h1>' + msg + '</h1>';
        this.el.style.color = color;
    }
};







