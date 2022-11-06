function noCrypt(lowerBound=8000, upperBound=10100){
    document.body.innerHTML = "";

    function Button(index, text="", parent=document.body){
        this.el = document.createElement("button");
        this.el.innerHTML = index + " " + text;
        this.el.addEventListener("click", function(){
            window.open("https://cool.ntu.edu.tw/courses/" + index);
            console.log(index);
        });
        this.parent = parent;
        this.parent.appendChild(this.el);
        return this;
    };

    let li = []
    for (let i = lowerBound; i < upperBound; i++){
        let xhr = new XMLHttpRequest;
        xhr.open("get", "https://cool.ntu.edu.tw/courses/" + i);
        xhr.onload = function(){
            if (xhr.responseText.indexOf("Page Not Found") == -1){
                if (xhr.responseText.indexOf("存取被拒絕") == -1){
                    if (xhr.responseText.indexOf("Access Denied") == -1){
                        let idx1 = xhr.responseText.indexOf("<title>");
                        let idx2 = xhr.responseText.indexOf("</title>");
                        let text = xhr.responseText.slice(idx1+7, idx2);
                        li.push(new Button(i, text));
                    }
                }
            }
        }
        xhr.send();
    }
}
